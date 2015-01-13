"use strict";

/**
 * Initialize namespace service to support socket.io with middlewares
 * @example
    namespace: { delimiter: ':' }
 */

module.exports = function (config, libraries, services) {
    var async = libraries.async,
        io = services.io;

    /**
     * Initialize namespace to define endpoints for socket communication
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
                        for (var key in middlewares) {
                            series.push(function (middleware) { return function (next) {
                                middleware(socket, req, res, next);
                            } }(middlewares[key]));
                        }
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
