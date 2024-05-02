const { createServer } = require('node:http');
const fs = require('fs');
const { argv } = require('node:process');
const { Client } = require('pg');

const dbconfig = {
  host: 'localhost',
  port: 5432,
  user: 'project_docker_node',
  password: 'project_docker_node',
  database: 'project_docker_node',
};
const dbclient = new Client(dbconfig);

const args = argv.slice(2);

const portIndex = args.indexOf('--port');

if (portIndex == -1) {
  console.log('you must supply --port <NUM> argument');
  return;
}

const portNumber = args[portIndex + 1];

const indexPathIndex = args.indexOf('--indexpath');

let indexPath = 'index.html';
if (indexPathIndex != -1) {
  indexPath = args[indexPathIndex + 1];
}

const serverFunction = async function (request, response) {
  console.log('method: ', request.method, ' url: ', request.url);

  if (request.method === 'GET') {
    if (request.url === '/data') {
      const frontendCodePath = __dirname + '/' + indexPath;
      const frontendCodeData = fs.readFileSync(frontendCodePath);
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write(frontendCodeData);
    } else if (request.url === '/favicon.ico') {
      const faviconPath = __dirname + '/favicon.ico';
      const imageData = fs.readFileSync(faviconPath);
      response.writeHead(200, { 'Content-Type': 'image/x-icon' });
      response.write(imageData);
    } else if (request.url.startsWith('/adduser')) {
      const name = 'new_user';
      await dbclient.query('INSERT INTO users(name) VALUES($1)', [name]);
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write('User ' + name + ' created');
    } else {
      response.statusCode = 404;
    }
  } else {
    response.statusCode = 404;
  }

  response.end();
};

const server = createServer(serverFunction);

const serverReady = async function () {
  console.log('listening on port ' + portNumber);

  await dbclient.connect();

  await dbclient.query(`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
  );
  `);
};

server.listen(portNumber, serverReady);
