'use strict'

const NodeHelper = require("node_helper");
const spawn = require("child_process").spawn;

module.exports = NodeHelper.create({
    start: function() {

    },

    socketNotificationReceived: function(notification, payload) {
        switch(notification) {
            case "GET_VERTRETUNGEN":
                
                /*var process = spawn("python", [payload.script.path]);
                
                process.on("data", (data) => {
                    Log.log("New Vertretungen: " + data);
                    this.sendSocketNotification("update_vertretungsplan", data);
                });*/

                var data = {"6b": "Keine Vertretungen"};

                this.sendSocketNotification("GET_VERTRETUNGEN", data);


                break;
        }
    },

});