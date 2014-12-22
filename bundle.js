"use strict";

// Bundle with services to develop applications with socket.io

module.exports = function (config, _, services) {
    config = {
        npm: __dirname + '/node_modules/',
        libraries: {
            nodejs: {},
            npm: {
                async: 'async',
                socketIo: 'socket.io',
                validator: 'validator'
            }
        },
        directory: __dirname + '/modules/',
        modules: {
            npm: {},
            directory: config
        }
    };
    require('dragonnodejs')(config, services);
};
