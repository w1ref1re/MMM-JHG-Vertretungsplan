'use strict'

Module.register("MMM-JHG-Vertretungsplan", {
    defaults: {
        classes: ["6b"],

        base_url: "http://vertretungsplan.jhg-blaubeuren.de/schueler",
        home_url: "Ver_Kla_1.htm"
    },

    getScripts: [
        this.File("fetch_jhg.py")
    ],

    start: function() {
        Log.log(this.name + " is started");
    }

});