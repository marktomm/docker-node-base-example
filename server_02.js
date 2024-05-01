const { createServer } = require("node:http");
const fs = require("fs");
const { argv } = require("node:process");

const args = argv.slice(2);

const portIndex = args.indexOf("--port");

if (portIndex == -1) {
  console.log("you must supply --port <NUM> argument");
  return;
}

const portNumber = args[portIndex + 1];

const indexPathIndex = args.indexOf("--indexpath");

let indexPath = "index.html";
if (indexPathIndex != -1) {
  indexPath = args[indexPathIndex + 1];
}

const serverFunction = function (request, response) {
  console.log("method: ", request.method, " url: ", request.url);

  if (request.method === "GET") {
    if (request.url === "/data") {
      const frontendCodePath = __dirname + "/" + indexPath;
      const frontendCodeData = fs.readFileSync(frontendCodePath);
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write(frontendCodeData);
    } else if (request.url === "/favicon.ico") {
      const faviconPath = __dirname + "/favicon.ico";
      const imageData = fs.readFileSync(faviconPath);
      response.writeHead(200, { "Content-Type": "image/x-icon" });
      response.write(imageData);
    } else {
      response.statusCode = 404;
    }
  } else {
    response.statusCode = 404;
  }

  response.end();
};

const server = createServer(serverFunction);

const serverReady = function () {
  console.log("listening on port " + portNumber);
};

server.listen(portNumber, serverReady);
