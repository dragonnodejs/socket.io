"use strict";
/*global module:false */

/**
 * Initialize namespace service to support Socket.IO with namespacing and middlewares
 * @example
    namespace: { delimiter: ':' }
 */

module.exports = function (config, libraries, services) {
    var async = libraries.async,
        io = services.io,
        _ = libraries.underscore;

    /**
     * Initialize namespace to define endpoints for Socket.IO communication
     * @example
         namespace('example', [])
            .on('example', [], function (socket, req, res) {});
     */
    var namespace = function (namespace, namespaceMiddlewares) {
        var obj = {
            on: function (name, handlerMiddlewares, handler) {
                var middlewares = namespaceMiddlewares.concat(handlerMiddlewares);
                io.on('connection', function (socket) {
                    if (namespace) {
                        name = namespace + config.delimiter + name;
                    }
                    socket.on(name, function (req, res) {
                        res = res || function () {};
                        var series = [];
                        _.each(middlewares, function (middleware) {
                            series.push(function (next) {
                                middleware(socket, req, res, next);
                            });
                        });
                        async.series(series, function () { handler(socket, req, res); });
                    });
                });
                return obj;
            }
        };
        return obj;
    };

    services.namespace = namespace;
};
