To view this document better do Ctrl+Shift+P and type "Open Preview"

# Task description

1. Create a HTTP server that will provide the happyperson.jpg on url `/imagedata`
2. Create a HTTP client that will request this URL from the HTTP server and save the image as `recv.jpg`

# Frist clean the working folder

```shell
git clean -fd .
git pull
```

# Setup server file

```shell
touch server_t1.js
```

Step by step help:

1. `require('node:http')` module into a `const` variable.
1. you need to access the filesystem. `require('node:fs')` module into a `const` variable.
1. as good practice store the port number in a `const` variable.
1. you need to create a function that will be invoked when someone connects to the HTTP server. It takes two arguments. Assign it to a `const` variable. How to write a function: `const serverFn = function (req, resp) {}`
1. The first argument `req` has `method` and `url` member varables. use them to check if the request is to the right place. `req.method == 'GET'` and `req.url == '/imagedata'`.
1. use the variable that has the `node:fs` module to get the image from the filesystem. It has a function `readFileSync` that accepts one argument. Pass it `__dirname + '/happyperson.jpg'`. Store the result in `imageData` variable.
1. If the user acesses the correct url uring the correct method, call second `resp` object like so:

```javascript
response.writeHead(200, { 'Content-Type': 'text/html' });
response.write(imageData);
```

1. Now craete the server and pass it the `serverFn`. If you have done like `const http = require('node:http')`, then do `http.createServer(serverFn)`. If you have done line `const { createServer } = require('node:http')` then do `createServer(serverFn)`. This function returns a server object. Store in in a variable
1. Finally call this server variables `listen` function and give it the port number as the first and only parameter.
