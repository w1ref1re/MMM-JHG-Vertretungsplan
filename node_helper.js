'use strict'

const NodeHelper = require("node_helper");
//const spawn = require("child_process").spawn;

module.exports = NodeHelper.create({
    start: function() {

    },

    socketNotificationReceived: function(notification, payload) {
        switch(notification) {
            case "GET_VERTRETUNGEN":


                const child_process = require('child_process');

                const child = child_process.spawn("python3", ["fetch_jhg.py", "h", "4", "f"]);
                
                child.stdout.on('data', (data) => {
                    console.log(`stdout: ${data}`);
                    this.sendSocketNotification("GET_VERTRETUNGEN", data);
                });
                
                child.stderr.on('data', (data) => {
                    console.error(`stderr: ${data}`);
                    this.sendSocketNotification("GET_VERTRETUNGEN", data);
                });
                
                child.on('close', (code) => {
                    console.log(`child process exited with code ${code}`);
                });
                
                
                
                //var p = spawn("python3", [payload.script_path, payload.classes, payload.base_url, payload.home_url]);
                
                //var p = spawn("python3", ["fetch_jhg.py", "d", "f", "5"]);

               /* var p = spawn("ls");

                p.stdout.on("data", (data) => {
                    this.sendSocketNotification("GET_VERTRETUNGEN", data);
                });

                p.stderr.on("data", (data) => {
                    this.sendSocketNotification("GET_VERTRETUNGEN", data);
                });*/

                break;
        }
    },

});