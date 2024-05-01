// Import required modules
const http = require('http');
const { Client } = require('pg');

// Replace these values with your actual database credentials
const config = {
  user: 'project_docker_node',
  password: 'project_docker_node',
  database: 'project_docker_node',
  host: 'db',
  port: 5432, // Default PostgreSQL port
};

const client = new Client(config);

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Set CORS headers for all routes
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Check if the request method is GET and the URL is "/api/user"
  if (req.method === 'GET' && req.url === '/api/user') {
    // Set the response headers
    res.writeHead(200, { 'Content-Type': 'application/json' });

    // Query the database for user data
    client.query('SELECT * FROM users', (err, result) => {
      if (err) {
        console.error('Error fetching user data:', err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        // Send the user data as JSON response
        res.end(JSON.stringify(result.rows[0]));
      }
    });
  } else if (req.method === 'GET' && req.url.startsWith('/api/posts')) {
    // Extract user ID from the URL
    const userId = req.url.split('=')[1];

    // Set the response headers
    res.writeHead(200, { 'Content-Type': 'application/json' });

    // Query the database for user posts
    client.query(
      `SELECT * FROM posts WHERE user_id = $1`,
      [userId],
      (err, result) => {
        if (err) {
          console.error('Error fetching user posts:', err);
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error');
        } else {
          // Send the user posts as JSON response
          res.end(JSON.stringify(result.rows));
        }
      },
    );
  } else if (req.method === 'GET' && req.url.startsWith('/api/comments')) {
    // Extract post ID from the URL
    const postId = req.url.split('=')[1];

    // Set the response headers
    res.writeHead(200, { 'Content-Type': 'application/json' });

    // Query the database for post comments
    client.query(
      `SELECT * FROM comments WHERE post_id = $1`,
      [postId],
      (err, result) => {
        if (err) {
          console.error('Error fetching post comments:', err);
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error');
        } else {
          // Send the post comments as JSON response
          res.end(JSON.stringify(result.rows));
        }
      },
    );
  } else {
    // Handle other requests with a 404 Not Found response
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Set the port for the server to listen on
const port = 3000;

// Start the server and listen on the specified port
server.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);

  // Connect to the PostgreSQL database
  await client.connect();

  // Create example tables if they don't exist
  await client.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100)
    );
    
    CREATE TABLE IF NOT EXISTS posts (
      id SERIAL PRIMARY KEY,
      user_id INT,
      title VARCHAR(255)
    );

    CREATE TABLE IF NOT EXISTS comments (
      id SERIAL PRIMARY KEY,
      post_id INT,
      text TEXT
    );
  `);

  // Populate example data if tables are empty
  const usersResult = await client.query('SELECT COUNT(*) FROM users');
  if (usersResult.rows[0].count === '0') {
    await client.query('INSERT INTO users (name) VALUES ($1)', ['John Doe']);
  }

  const postsResult = await client.query('SELECT COUNT(*) FROM posts');
  if (postsResult.rows[0].count === '0') {
    await client.query('INSERT INTO posts (user_id, title) VALUES ($1, $2)', [
      1,
      'First Post',
    ]);
  }

  const commentsResult = await client.query('SELECT COUNT(*) FROM comments');
  if (commentsResult.rows[0].count === '0') {
    await client.query('INSERT INTO comments (post_id, text) VALUES ($1, $2)', [
      1,
      'First comment on the first post',
    ]);
  }
});
