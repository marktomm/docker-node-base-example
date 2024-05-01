const https = require('node:http');
const fs = require('node:fs');

const url = 'http://localhost:3000/data'; // Replace with the actual URL

https
  .get(url, (res) => {
    console.log('Status Code:', res.statusCode);
    console.log('Headers:', res.headers);

    const imageData = []; // Store image data chunks

    res.on('data', (chunk) => {
      imageData.push(chunk);
    });

    res.on('end', () => {
      const buffer = Buffer.concat(imageData); // Combine all chunks into a single buffer

      // Option 1: Loop through each byte and print in hex format
      for (let i = 0; i < buffer.length; i++) {
        const byte = buffer[i].toString(16).padStart(2, '0'); // Convert byte to hex string, pad with zeros
        process.stdout.write(` ${byte}`);
        if ((i + 1) % 16 === 0) {
          // Print newline after every 16 bytes
          console.log();
        }
      }
      console.log('\nImage data written in hex format.');

      // Save the image data to a file (optional)
      fs.writeFileSync('image.jpg', buffer); // Replace with desired filename
    });
  })
  .on('error', (err) => {
    console.error('Error:', err);
  });
