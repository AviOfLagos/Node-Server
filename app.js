const http = require('node:http');
const os = require('node:os');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS requests for CORS preflight
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  // Handle GET requests
  if (req.method === 'GET') {
    if (req.url === '/') {
      // Simulate an asynchronous operation with a random delay
      const delay = Math.floor(Math.random() * 5000) + 1000; // Random delay between 1 and 6 seconds
      setTimeout(() => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(`Hello from the server! This response was delayed by ${delay} milliseconds.`);
      }, delay);
    } else if (req.url === '/system-info') {
      const cpuInfo = os.cpus().map((cpu) => `
        Model: ${cpu.model}
        Speed: ${cpu.speed} MHz
      `).join('\n');

      const systemInfo = `
        CPU Information:
        ${cpuInfo}

        OS Information:
        Platform: ${os.platform()}
        Release: ${os.release()}
        Architecture: ${os.arch()}
      `;

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end(systemInfo);
    } else {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Not found');
    }
  } else {
    res.statusCode = 405; // Method Not Allowed
    res.setHeader('Content-Type', 'text/plain');
    res.end('Method not allowed');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});