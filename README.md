# DragonNode.js socket.io
Bundle with services to develop applications with socket.io
- Initialize socket.io service
- Initialize namespace service to support socket.io with middlewares
- Services for validate input from the clients 

# Installation
- Add bundle to the "package.json":
```javascript
{
    "dependencies": {
        "dragonnodejs-socket.io": "1.*"
    }
}
```
- Run "npm install"
- Extend the configuration "app/config.js":
```javascript
module.exports = {
    modules: {
        npm: {
            'dragonnodejs-socket.io': {
                io: { port: process.env.PORT },
                namespace: {},
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
            }
        }
    }
};
```
