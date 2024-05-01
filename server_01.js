const http = require('node:http');
const fs = require('fs');

// console.log(__dirname);

const serverFunction = function (request, response) {
  console.log('method: ', request.method, ' url: ', request.url);

  if (request.method === 'GET') {
    if (request.url === '/data') {
      const frontendCodePath = __dirname + '/index.html';
      const frontendCodeData = fs.readFileSync(frontendCodePath);
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write(frontendCodeData);
    } else if (request.url === '/favicon.ico') {
      const faviconPath = __dirname + '/favicon.ico';
      const imageData = fs.readFileSync(faviconPath);
      response.writeHead(200, { 'Content-Type': 'image/x-icon' });
      response.write(imageData);
    } else {
      response.statusCode = 404;
    }
  } else {
    response.statusCode = 404;
  }

  response.end();
};

const server = http.createServer(serverFunction);

server.listen(3000);
