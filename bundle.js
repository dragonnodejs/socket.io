"use strict";
/*global module:false */
/*global __dirname:false */

// Bundle with services to develop applications with Socket.IO

module.exports = function (config, _, services) {
    config = {
        npm: __dirname + '/node_modules/',
        libraries: {
            npm: {
                async: 'async',
                socketIo: 'socket.io',
                underscore: 'underscore',
                validator: 'validator'
            }
        },
        directory: __dirname + '/modules/',
        modules: {
            directory: config
        }
    };
    require('dragonnodejs')(config, services);
};
