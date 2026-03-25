const http = require('http');
const routeHandler = require('./routeHandler');

const PORT = 3001;

const server = http.createServer(routeHandler);

server.listen(PORT, function () {
  console.log('Hello Server is running at http://localhost:' + PORT);
});
