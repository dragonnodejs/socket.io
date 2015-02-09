"use strict";
/*global module:false */
/*global __dirname:false */

// Bundle with services to develop applications with Socket.IO

module.exports = function (config, _, services) {
    config = {
        libraries: {
            async: require('async'),
            socketIo: require('socket.io'),
            underscore: require('underscore'),
            validator: require('validator')
        },
        directory: __dirname + '/modules/',
        modules: {
            directory: config
        }
    };
    require('dragonnodejs')(config, services);
};
