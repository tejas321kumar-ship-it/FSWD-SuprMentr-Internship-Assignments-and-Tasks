const express = require('express');
const booksRoutes = require('./routes/booksRoutes');
const authorsRoutes = require('./routes/authorsRoutes');

const app = express();
const PORT = 3014;

app.use(express.json());

app.get('/', function (req, res) {
  res.send('Route Master API is running. Use /books and /authors');
});

app.use('/books', booksRoutes);
app.use('/authors', authorsRoutes);

app.use(function (req, res) {
  res.status(404).json({ message: 'Route not found' });
});

if (require.main === module) {
  app.listen(PORT, function () {
    console.log('Route Master server running on http://localhost:' + PORT);
  });
}

module.exports = app;
