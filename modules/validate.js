"use strict";

/**
 * Services for validate input from the clients
 * @example
    validate: function (validator) {
        return {
            emailaddress: function (input) {
                input = validator.trim(input);
                if (!validator.isEmail(input)) {
                    throw new Error('invalid emailaddress');
                }
                return input;
            }
        };
    }
 */

module.exports = function (config, libraries, services) {
    var validator = libraries.validator;

    var middlewares = {};
    var validates = config(validator);
    for (var key in validates) {
        middlewares[key] = function (validate) {
            return function (name) {
                return function (socket, req, res, next) {
                    try {
                        req[name] = validate(req[name]);
                        next();
                    } catch (e) {
                        res(e.message);
                    }
                };
            };
        }(validates[key]);
    }

    services.validate = middlewares;
};
