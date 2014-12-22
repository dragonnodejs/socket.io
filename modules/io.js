"use strict";

/**
 * Initialize socket.io service
 * @example
    io: { port: process.env.PORT }
 */

module.exports = function (config, libraries, services) {
    var io = libraries.socketIo(config.port);
    services.io = io;
};
