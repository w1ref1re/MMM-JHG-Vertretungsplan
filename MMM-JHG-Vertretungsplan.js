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

        this.vertretungen = {};

        var timer = setInterval(() => {
            this.sendSocketNotification("GET_VERTRETUNGEN", {script_path: "fetch_jhg.py", classes: this.config.classes, base_url: this.config.base_url, home_url: this.config.home_url})
        }, 5000);
    },

    getDom: function() {
        var wrapper = document.createElement("div");
		wrapper.innerHTML = JSON.stringify(this.vertretungen);
		return wrapper;
    },

    socketNotificationReceived: function(notification, payload) {
        Log.log(JSON.stringify(payload));

        switch (notification) {
            case "GET_VERTRETUNGEN":
                this.vertretungen = {"payload": payload};
                this.updateDom();
                break;
        }
    },

});