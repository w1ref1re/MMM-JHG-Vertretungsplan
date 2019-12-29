'use strict'


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

    getStyles: function() {
        return [this.file("style.css")]
    },


    start: function() {
        Log.log(this.name + " is started");
       /* Log.log(JSON.stringify(this.config));
        Log.log(JSON.stringify(this.data));
        Log.log(this.file("fetch_jhg.py"));'*/


        this.vertretungen = {};
    },

    getDom: function() {
        var wrapper = document.createElement("div");
        wrapper.className = "container";
        wrapper.appendChild(this.createTables(this.vertretungen));
		return wrapper;
    },

    notificationReceived: function(notification, payload) {
        switch (notification) {

            case "DOM_OBJECTS_CREATED":
                this.sendSocketNotification("GET_VERTRETUNGEN", {"script_path": this.file("fetch_jhg.py"), "base_url": this.config.base_url, "home_url": this.config.home_url, "classes": this.config.classes});
                
                var timer = setInterval(() => {
                    this.sendSocketNotification("GET_VERTRETUNGEN", {"script_path": this.file("fetch_jhg.py"), "base_url": this.config.base_url, "home_url": this.config.home_url, "classes": this.config.classes});
                }, 2000);

                break;
        
            }

    },

    socketNotificationReceived: function(notification, payload) {
        //Log.log(JSON.stringify(payload));

        switch (notification) {
            case "GET_VERTRETUNGEN":
                //Log.log("updated");
                this.vertretungen = payload;
                this.updateDom();
                
                break;
        }
    },


    createTables: function(data) {
        //Log.log(JSON.stringify(data));

        var table = document.createElement("table");
        table.setAttribute("id", "JHG-vertretungsplan-table");
        table.className = "table";

        var row = document.createElement("tr");
        row.className = "medium headline";
        for (var headline in data[0]) {
            var th = document.createElement("th");
            var p = document.createElement("p");

            th.appendChild(p);

            p.innerHTML = headline;
            row.appendChild(th);
        }

        table.appendChild(row);

        var i = 1;
        for (var vertretung in data) {
            var row = document.createElement("tr");

            if (i % 2 == 0) {
                row.className = "small regular normal row";
            } else {
                row.className = "small regular bright row";
            }

            for (var item in data[vertretung]) {
                var td = document.createElement("td");
                var p = document.createElement("p");

                td.appendChild(p)

                p.innerHTML = data[vertretung][item];
                row.appendChild(td);
                
            }

            table.appendChild(row);
            i++;
        }

        return table

    },

});