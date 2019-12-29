'use strict'

const NodeHelper = require("node_helper");
const spawn = require("child_process").spawn;

module.exports = NodeHelper.create({
    start: function() {

    },

    socketNotificationReceived: function(notification, payload) {
        switch(notification) {
            case "GET_VERTRETUNGEN":
                
                //var p = spawn("python3", [payload.script_path, payload.classes, payload.base_url, payload.home_url]);
                
                //var p = spawn("python3", ["fetch_jhg.py", "d", "f", "5"]);

                var p = spawn("ls");

                p.stdout.on("data", (data) => {
                    this.sendSocketNotification("GET_VERTRETUNGEN", data);
                });

                p.stderr.on("data", (data) => {
                    this.sendSocketNotification("GET_VERTRETUNGEN", data);
                });

                break;
        }
    },

});