'use strict'

Module.register("MMM-JHG-Vertretungsplan", {
    defaults: {
        classes: ["6b"],

        base_url: "http://vertretungsplan.jhg-blaubeuren.de/schueler",
        home_url: "Ver_Kla_1.htm"
    },

    getScripts: function() {
        return [
        this.file("fetch_jhg.py")
        ]
    },

    start: function() {
        Log.log(this.name + " is started");

        this.vertretungen = {};
    },

    socketNotificationReceived: function(notification, payload) {
        switch (notification) {
            case "update_vertretungen":
                this.vertretungen = payload;
                this.updateDom(0.5);
                break;
        }
    },

    getDom: function() {
        var wrapper = document.createElement("div");
		wrapper.innerHTML = this.vertretungen + "this is the JHG module";
		return wrapper;
    },

    updateVertretungen: function() {
        this.sendSocketNotification("update_vertretungen", {script: {path: this.file("fetch_jhg.py")}})
    }, 

});