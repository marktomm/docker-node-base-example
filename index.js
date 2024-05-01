const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url);

  // Set CORS headers for all routes
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (pathname === '/exampleEndpoint' && req.method === 'GET') {
    // Simulate a 2-second delay
    setTimeout(() => {
      // Send example data as the response
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          message: 'Server response after 5 seconds',
          data: { key: 'value' },
        }),
      );
    }, 5000);
  } else {
    // Handle other routes or methods if needed
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const port = 3000;

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
