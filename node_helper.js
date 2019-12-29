'use strict'

const NodeHelper = require("node_helper");
const child_process = require('child_process');
const crypto = require("crypto");

module.exports = NodeHelper.create({
    start: function() {
        this.old_hash = "";
    },

    socketNotificationReceived: function(notification, payload) {
        switch(notification) {
            case "GET_VERTRETUNGEN":



                const child = child_process.spawn("python3", [payload.script_path, payload.classes, payload.base_url, payload.home_url]);

                child.stdout.on('data', (data) => {

                    // create new hash
                    var new_hash = this.hash(data);

                    if (this.old_hash != new_hash) {
                        this.old_hash = new_hash;
                        this.sendSocketNotification("GET_VERTRETUNGEN", JSON.parse(data));
                    }

                    //console.log(`stdout: ${data}`);
                });
                
                child.stderr.on('data', (data) => {
                    //this.sendSocketNotification("GET_VERTRETUNGEN", {"error": data});
                    console.error(`stderr: ${data}`);
                });
                
                child.on('close', (code) => {
                    //console.log(`child process exited with code ${code}`);
                });
                
                
                break;
        }
    },

    hash: function(object) {
        return crypto.createHash("md5").update(JSON.stringify(object)).digest("hex");
    },

});