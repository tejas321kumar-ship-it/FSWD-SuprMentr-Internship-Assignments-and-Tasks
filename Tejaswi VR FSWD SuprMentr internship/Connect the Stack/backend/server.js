const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3020;

app.use(cors());
app.use(express.json());

let tasks = [
  { id: 1, title: 'Connect frontend to backend', status: 'pending' },
  { id: 2, title: 'Test API integration', status: 'done' }
];

app.get('/api/health', function (req, res) {
  res.json({ message: 'Backend is running' });
});

app.get('/api/tasks', function (req, res) {
  res.json(tasks);
});

app.post('/api/tasks', function (req, res) {
  const body = req.body;

  if (!body.title) {
    res.status(400).json({ message: 'title is required' });
    return;
  }

  const newTask = {
    id: tasks.length + 1,
    title: body.title,
    status: 'pending'
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put('/api/tasks/:id', function (req, res) {
  const id = Number(req.params.id);
  const body = req.body;
  let found = false;

  for (let i = 0; i < tasks.length; i = i + 1) {
    if (tasks[i].id === id) {
      tasks[i] = {
        id: tasks[i].id,
        title: body.title || tasks[i].title,
        status: body.status || tasks[i].status
      };
      found = true;
      res.json(tasks[i]);
      break;
    }
  }

  if (!found) {
    res.status(404).json({ message: 'Task not found' });
  }
});

app.delete('/api/tasks/:id', function (req, res) {
  const id = Number(req.params.id);
  const nextTasks = [];
  let found = false;

  for (let i = 0; i < tasks.length; i = i + 1) {
    if (tasks[i].id === id) {
      found = true;
    } else {
      nextTasks.push(tasks[i]);
    }
  }

  if (!found) {
    res.status(404).json({ message: 'Task not found' });
    return;
  }

  tasks = nextTasks;
  res.json({ message: 'Task deleted' });
});

if (require.main === module) {
  app.listen(PORT, function () {
    console.log('Connect the Stack backend running on http://localhost:' + PORT);
  });
}

module.exports = app;
