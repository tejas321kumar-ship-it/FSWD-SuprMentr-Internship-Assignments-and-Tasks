const express = require('express');
const taskStore = require('./tasks');

const app = express();
const PORT = 3015;

app.use(express.json());

app.get('/', function (req, res) {
  res.send('Task API is running. Use /tasks routes.');
});

app.get('/tasks', function (req, res) {
  const completed = req.query.completed;
  const allTasks = taskStore.getAllTasks();

  if (completed === undefined) {
    res.json(allTasks);
    return;
  }

  const shouldBeCompleted = completed === 'true';
  const filtered = [];

  for (let i = 0; i < allTasks.length; i = i + 1) {
    if (allTasks[i].completed === shouldBeCompleted) {
      filtered.push(allTasks[i]);
    }
  }

  res.json(filtered);
});

app.get('/tasks/:id', function (req, res) {
  const id = Number(req.params.id);
  const task = taskStore.getTaskById(id);

  if (!task) {
    res.status(404).json({ message: 'Task not found' });
    return;
  }

  res.json(task);
});

app.post('/tasks', function (req, res) {
  const body = req.body;
  const allTasks = taskStore.getAllTasks();

  if (!body.title) {
    res.status(400).json({ message: 'title is required' });
    return;
  }

  const newTask = {
    id: allTasks.length + 1,
    title: body.title,
    completed: body.completed === true,
    priority: body.priority || 'medium'
  };

  taskStore.addTask(newTask);
  res.status(201).json(newTask);
});

app.put('/tasks/:id', function (req, res) {
  const id = Number(req.params.id);
  const body = req.body;
  const currentTask = taskStore.getTaskById(id);

  if (!currentTask) {
    res.status(404).json({ message: 'Task not found' });
    return;
  }

  const updatedTask = {
    id: currentTask.id,
    title: body.title || currentTask.title,
    completed: body.completed !== undefined ? body.completed === true : currentTask.completed,
    priority: body.priority || currentTask.priority
  };

  taskStore.updateTask(id, updatedTask);
  res.json(updatedTask);
});

app.delete('/tasks/:id', function (req, res) {
  const id = Number(req.params.id);
  const deleted = taskStore.deleteTask(id);

  if (!deleted) {
    res.status(404).json({ message: 'Task not found' });
    return;
  }

  res.json({ message: 'Task deleted' });
});

app.use(function (req, res) {
  res.status(404).json({ message: 'Route not found' });
});

if (require.main === module) {
  app.listen(PORT, function () {
    console.log('Task API server running on http://localhost:' + PORT);
  });
}

module.exports = app;
