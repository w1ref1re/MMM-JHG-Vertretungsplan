'use strict'

const crypto = require("crypto");

Module.register("MMM-JHG-Vertretungsplan", {
    defaults: {
        classes: ["6b"],

        base_url: "http://vertretungsplan.jhg-blaubeuren.de/schueler",
        home_url: "Ver_Kla_1.htm"
    },

   /* getScripts: function() {
        return [
        this.file("fetch_jhg.py")
        ]
    },*/


    start: function() {
        Log.log(this.name + " is started");
       /* Log.log(JSON.stringify(this.config));
        Log.log(JSON.stringify(this.data));
        Log.log(this.file("fetch_jhg.py"));'*/

        this.vertretungen = {};
        this.vertretungen_hash = this.hash(this.vertretungen);

        var timer = setInterval(() => {
            this.sendSocketNotification("GET_VERTRETUNGEN", {script_path: this.file("fetch_jhg.py"), classes: this.config.classes, base_url: this.config.base_url, home_url: this.config.home_url})
        }, 2000);
    },

    getDom: function() {
        var wrapper = document.createElement("div");
        wrapper.appendChild(this.createTables(this.vertretungen));
		return wrapper;
    },

    socketNotificationReceived: function(notification, payload) {
        Log.log(JSON.stringify(payload));

        switch (notification) {
            case "GET_VERTRETUNGEN":
                var new_hash = this.hash(payload);
                if (new_hash !== this.vertretungen_hash) {
                    Log.log("updated");
                    this.vertretungen = payload;
                    this.updateDom();
                }
                break;
        }
    },


    createTables: function(data) {

        var createTH = (text) => {
            var th = document.createElement("th");
            th.setAttribute("style", "border: 1px solid black;");
            th.innerHTML = text;
            return th
        };

        var createTable = () => {
            var th = document.createElement("table");
            th.setAttribute("style", "border: 1px solid black;");
            return th
        };

        var createTD = (text) => {
            var th = document.createElement("td");
            th.setAttribute("style", "border: 1px solid black;");
            th.innerHTML = text;
            return th
        };

        var list = document.createElement("ul")
        list.setAttribute("style", "list-style: none;");
        
        for (var c in data) {
            var list_item = document.createElement("li");
           // list_item.setAttribute("display", "inline");

            var table = createTable();
            table.setAttribute("id", c);

            var row = document.createElement("tr");
            for (var headline in data[c][0]) {
                var th = createTH(headline);
                row.appendChild(th);
            }


            table.appendChild(row);

            for (var vertretung in data[c]) {
                var row = document.createElement("tr");

                //console.log(data[c][vertretung]);

                for (var item in data[c][vertretung]) {
                    var td = createTD(data[c][vertretung][item]);
                    row.appendChild(td);
                    
                    //console.log(item);
                    //console.log(data[c][vertretung][item]);
                }

                table.appendChild(row);
            }
            
            list_item.appendChild(table);
            list.appendChild(list_item);

        }
        
        return list
    },

    hash: function(object) {
        return crypto.createHash("md5").update(JSON.stringify(object)).digest("hex");
    },

});