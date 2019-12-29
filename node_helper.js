'use strict'

const NodeHelper = require("node_helper");
const spawn = require("child_process").spawn;

module.exports = NodeHelper.create({
    start: function() {

    },

    socketNotificationReceived: function(notification, payload) {
        switch(notification) {
            case "GET_VERTRETUNGEN":
                
                var p = spawn("python", [payload.script_path, payload.classes, payload.base_url, payload.home_url]);
                
                p.stdout.on("stdout", (data) => {
                    this.sendSocketNotification("GET_VERTRETUNGEN", data);
                });

                p.stderr.on('data', (data) => {
                    this.sendSocketNotification("GET_VERTRETUNGEN", {error: data});
                });

                var data = {"6b": "Keine Vertretungen"};
                this.sendSocketNotification("GET_VERTRETUNGEN", data);

                break;
        }
    },

});