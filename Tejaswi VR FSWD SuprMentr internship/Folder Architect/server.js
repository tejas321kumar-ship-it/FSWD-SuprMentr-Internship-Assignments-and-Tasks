const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const BASE_DIR = __dirname;

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();

  if (ext === '.html') {
    return 'text/html';
  }

  if (ext === '.css') {
    return 'text/css';
  }

  if (ext === '.js') {
    return 'application/javascript';
  }

  return 'text/plain';
}

function sendFile(response, filePath) {
  fs.readFile(filePath, function (error, data) {
    if (error) {
      response.writeHead(404, { 'Content-Type': 'text/plain' });
      response.end('File not found');
      return;
    }

    response.writeHead(200, { 'Content-Type': getContentType(filePath) });
    response.end(data);
  });
}

const server = http.createServer(function (request, response) {
  let requestPath = request.url;

  if (requestPath === '/') {
    requestPath = '/index.html';
  }

  const safePath = path.normalize(requestPath).replace(/^\\+/, '').replace(/^\/+/, '');
  const filePath = path.join(BASE_DIR, safePath);

  if (!filePath.startsWith(BASE_DIR)) {
    response.writeHead(403, { 'Content-Type': 'text/plain' });
    response.end('Access denied');
    return;
  }

  sendFile(response, filePath);
});

server.listen(PORT, function () {
  console.log('Folder Architect server running at http://localhost:' + PORT);
});
