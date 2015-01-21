"use strict";

// Bundle with services to develop applications with Socket.IO

module.exports = function (config, _, services) {
    config = {
        npm: __dirname + '/node_modules/',
        libraries: {
            npm: {
                async: 'async',
                socketIo: 'socket.io',
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
