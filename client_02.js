const https = require('node:http');

const url = 'http://localhost:3000/data'; // Replace with the actual URL

https
  .get(url, (res) => {
    console.log('Status Code:', res.statusCode);
    console.log('Headers:', res.headers);

    const imageData = []; // Store image data as an array of bytes (represented as numbers)

    res.on('data', (chunk) => {
      // Assuming each chunk contains multiple bytes (might need adjustments)
      for (let i = 0; i < chunk.length; i++) {
        imageData.push(chunk[i]); // Push each byte value from the chunk
      }
    });

    res.on('end', () => {
      console.log('Image data retrieved (as array of bytes):');

      // Print each byte value in the array (might overflow for large images)
      for (const byte of imageData) {
        console.log(byte);
      }
    });
  })
  .on('error', (err) => {
    console.error('Error:', err);
  });
