const taskModel = require('../models/taskModel');

function getTasks(req, res) {
  const completed = req.query.completed;
  const allTasks = taskModel.getAllTasks();

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
}

function getTaskById(req, res) {
  const id = Number(req.params.id);
  const task = taskModel.getTaskById(id);

  if (!task) {
    res.status(404).json({ message: 'Task not found' });
    return;
  }

  res.json(task);
}

function createTask(req, res) {
  const body = req.body;
  const allTasks = taskModel.getAllTasks();

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

  taskModel.addTask(newTask);
  res.status(201).json(newTask);
}

function updateTask(req, res) {
  const id = Number(req.params.id);
  const body = req.body;
  const currentTask = taskModel.getTaskById(id);

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

  taskModel.updateTask(id, updatedTask);
  res.json(updatedTask);
}

function removeTask(req, res) {
  const id = Number(req.params.id);
  const deleted = taskModel.deleteTask(id);

  if (!deleted) {
    res.status(404).json({ message: 'Task not found' });
    return;
  }

  res.json({ message: 'Task deleted' });
}

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  removeTask
};
