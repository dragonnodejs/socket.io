"use strict";
/*global module:false */

/**
 * Initialize Socket.IO service to define endpoints for Socket.IO communication
 * @example
    io: { port: process.env.PORT }
 */

module.exports = function (config, libraries, services) {
    var io = libraries.socketIo(config.port);
    services.io = io;
};
