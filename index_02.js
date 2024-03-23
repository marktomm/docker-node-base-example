const http = require("http");

const serverTask = function (req, res) {
  if (req.method === "POST" && req.url === "/post_name") {
    let requestBody = "";

    req.on("data", (data) => {
      requestBody += data.toString();
    });

    req.on("end", () => {
      console.log("body of the request: ", requestBody);
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Received post request");
    });
  }
};

const server = http.createServer(serverTask);

const whenServerStartsTask = function () {
  console.log("Server started successfully");
};

server.listen(3000, whenServerStartsTask);
