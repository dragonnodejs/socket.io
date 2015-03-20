# DragonNode.js Socket.IO
Bundle with services to develop applications with Socket.IO
- Initialize Socket.IO service to define endpoints for Socket.IO communication
- Initialize namespace service to support Socket.IO with namespacing and middlewares
- Services for validate input from the clients 

## Installation
- Add bundle to the "package.json":
```javascript
{
    "dependencies": {
        "dragonnodejs-socket.io": "^2.1.4"
    }
}
```
- Run "npm install"
- Extend the configuration in "app.js":
```javascript
var config = {
    modules: {
        npm: [
            [require('dragonnodejs-socket.io'), {
                io: { port: process.env.PORT },
                namespace: { delimiter: ':' },
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
            }]
        ]
    }
};
```
