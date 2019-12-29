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


    start: function() {
        Log.log(this.name + " is started");
       /* Log.log(JSON.stringify(this.config));
        Log.log(JSON.stringify(this.data));
        Log.log(this.file("fetch_jhg.py"));'*/

        this.sendSocketNotification("GET_VERTRETUNGEN", {"script_path": this.file("fetch_jhg.py"), "base_url": this.config.base_url, "home_url": this.config.home_url});

        this.vertretungen = {};
    },

    getDom: function() {
        var wrapper = document.createElement("div");
        wrapper.appendChild(this.createTables(this.vertretungen));
		return wrapper;
    },

    socketNotificationReceived: function(notification, payload) {
        //Log.log(JSON.stringify(payload));

        switch (notification) {

            case "DOM_OBJECTS_CREATED":
                Log.log("Starting...");

                var timer = setInterval(() => {
                    this.sendSocketNotification("GET_VERTRETUNGEN", {"script_path": this.file("fetch_jhg.py"), "base_url": this.config.base_url, "home_url": this.config.home_url});
                }, 2000);
                break;

            case "GET_VERTRETUNGEN":
                Log.log("updated");
                this.vertretungen = payload;
                this.updateDom();
                
                break;
        }
    },


    createTables: function(data) {
        var table = document.createElement("table");
        table.setAttribute("id", "JHG-vertretungsplan-table");

        var row = document.createElement("tr");
        for (var headline in data[0]) {
            var th = document.createElement("th");
            th.innerHTML = headline;
            row.appendChild(th);
        }

        table.appendChild(row);

        for (var vertretung in data) {
            var row = document.createElement("tr");

            for (var item in vertretung) {
                var td = document.createElement("td");
                td.innerHTML = vertretung[item];
                row.appendChild(td);
                
            }

            table.appendChild(row);
        }

        return table

    },

});