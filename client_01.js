const https = require('node:http');

const url = 'http://localhost:3000/data'; // Replace with the actual URL

https
  .get(url, (res) => {
    console.log('Status Code:', res.statusCode);
    console.log('Headers:', res.headers);

    let i = 1;
    // Handle the response data (optional)
    res.on('data', (chunk) => {
      console.log('chunk:', i);
      console.log(chunk.toString()); // Print response data in chunks
      i++;
    });

    res.on('end', () => {
      console.log('Response Finished');
    });
  })
  .on('error', (err) => {
    console.error('Error:', err);
  });
