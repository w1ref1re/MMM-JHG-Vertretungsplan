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

        this.vertretungen = {};

        var timer = setInterval(updateVertretungen, 1000);
    },

    socketNotificationReceived: function(notification, payload) {
        switch (notification) {
            case "GET_VERTRETUNGEN":
                this.vertretungen = payload;
                this.updateDom();
                break;
        }
    },

    getDom: function() {
        var wrapper = document.createElement("div");
		wrapper.innerHTML = JSON.stringify(this.vertretungen);
		return wrapper;
    },

    updateVertretungen: function() {
        this.sendSocketNotification("GET_VERTRETUNGEN", {script: {path: this.file("fetch_jhg.py")}})
    }, 

});