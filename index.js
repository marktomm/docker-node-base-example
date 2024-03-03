// // Import required modules
// const http = require("http");

// // Create an HTTP server
// const server = http.createServer((req, res) => {
//   // Check if the request method is GET and the URL is "/hello"
//   if (req.method === "GET" && req.url === "/hello") {
//     // Set the response headers
//     res.writeHead(200, { "Content-Type": "text/plain" });

//     // Send the response
//     res.end("Hello, World!");
//   } else {
//     // Handle other requests with a 404 Not Found response
//     res.writeHead(404, { "Content-Type": "text/plain" });
//     res.end("Not Found");
//   }
// });

// // Set the port for the server to listen on
// const port = 3000;

// // Start the server and listen on the specified port
// server.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}/hello`);
// });

const { Client } = require("pg");

// Replace these values with your actual database credentials
const config = {
  user: "project_docker_node",
  password: "project_docker_node",
  database: "project_docker_node",
  host: "db",
  port: 5432, // Default PostgreSQL port
};

const client = new Client(config);

async function run() {
  try {
    // Connect to the database
    await client.connect();

    // Create a table
    await client.query(`
      CREATE TABLE IF NOT EXISTS example_table (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL
      );
    `);

    // Insert three rows of data
    await client.query(`
      INSERT INTO example_table (name) VALUES
        ('John Doe'),
        ('Jane Doe'),
        ('Bob Smith');
    `);

    // Read the data back
    const result = await client.query("SELECT * FROM example_table");
    const rows = result.rows;

    // Display the data
    console.log("Table data:");
    rows.forEach((row) => {
      console.log(`ID: ${row.id}, Name: ${row.name}`);
    });
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Disconnect the client
    await client.end();
  }
}

// Run the example
run();
