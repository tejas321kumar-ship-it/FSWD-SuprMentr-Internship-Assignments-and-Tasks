const express = require('express');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = 3016;

app.use(express.json());

app.get('/', function (req, res) {
  res.send('MVC Refactor API is running. Use /tasks routes.');
});

app.use('/tasks', taskRoutes);

app.use(function (req, res) {
  res.status(404).json({ message: 'Route not found' });
});

if (require.main === module) {
  app.listen(PORT, function () {
    console.log('MVC Refactor server running on http://localhost:' + PORT);
  });
}

module.exports = app;
