// Import required modules
const http = require("http");

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Check if the request method is GET and the URL is "/hello"
  if (req.method === "GET" && req.url === "/hello") {
    // Set the response headers
    res.writeHead(200, { "Content-Type": "text/plain" });

    // Send the response
    res.end("Hello, World!");
  } else {
    // Handle other requests with a 404 Not Found response
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

// Set the port for the server to listen on
const port = 3000;

// Start the server and listen on the specified port
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/hello`);
});
