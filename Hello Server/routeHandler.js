const messages = require('./messages');

function routeHandler(request, response) {
  const url = request.url;

  response.setHeader('Content-Type', 'text/plain');

  if (url === '/') {
    response.statusCode = 200;
    response.end(messages.home);
    return;
  }

  if (url === '/about') {
    response.statusCode = 200;
    response.end(messages.about);
    return;
  }

  if (url === '/contact') {
    response.statusCode = 200;
    response.end(messages.contact);
    return;
  }

  if (url === '/help') {
    response.statusCode = 200;
    response.end(messages.help);
    return;
  }

  response.statusCode = 404;
  response.end(messages.notFound);
}

module.exports = routeHandler;
