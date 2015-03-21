'use strict';

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
    var _ = libraries.underscore,
        validator = libraries.validator;

    var middlewares = {};
    var validates = config(validator);
    _.each(validates, function (validate, name) {
        middlewares[name] = function (name) {
            return function (socket, req, res, next) {
                try {
                    req[name] = validate(req[name]);
                    next();
                } catch (e) {
                    res(e.message);
                }
            };
        };
    });

    services.validate = middlewares;
};
