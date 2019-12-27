'use strict'

const NodeHelper = require("node_helper");
const spawn = require("child_process").spawn;

module.exports = NodeHelper.create({
    start: function() {
        
    },

    socketNotificationReceived: function(notification, payload) {
        switch(notification) {
            case "update_vertretungen":
            Log.log("Updating vertretungen...");


            this.sendSocketNotification("update_vertretungsplan");

            break;
        }
    },

});