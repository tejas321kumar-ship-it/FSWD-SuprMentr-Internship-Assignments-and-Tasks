const express = require('express');
const data = require('./data');

const app = express();
const PORT = 3004;

app.get('/', function (req, res) {
  res.send('Task 3 Mini Backend Website is running. Use /students and /courses');
});

app.get('/students', function (req, res) {
  res.json(data.students);
});

app.get('/courses', function (req, res) {
  res.json(data.courses);
});

app.listen(PORT, function () {
  console.log('Task 3 server running on http://localhost:' + PORT);
});
