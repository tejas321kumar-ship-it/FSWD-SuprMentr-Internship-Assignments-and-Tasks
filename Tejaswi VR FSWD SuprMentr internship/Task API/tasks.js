let tasks = [
  { id: 1, title: 'Learn Express basics', completed: false, priority: 'high' },
  { id: 2, title: 'Build Task API routes', completed: true, priority: 'medium' },
  { id: 3, title: 'Test APIs in Postman', completed: false, priority: 'low' }
];

function getAllTasks() {
  return tasks;
}

function getTaskById(id) {
  for (let i = 0; i < tasks.length; i = i + 1) {
    if (tasks[i].id === id) {
      return tasks[i];
    }
  }
  return null;
}

function addTask(task) {
  tasks.push(task);
}

function updateTask(id, updatedTask) {
  for (let i = 0; i < tasks.length; i = i + 1) {
    if (tasks[i].id === id) {
      tasks[i] = updatedTask;
      return true;
    }
  }
  return false;
}

function deleteTask(id) {
  const nextTasks = [];
  let found = false;

  for (let i = 0; i < tasks.length; i = i + 1) {
    if (tasks[i].id === id) {
      found = true;
    } else {
      nextTasks.push(tasks[i]);
    }
  }

  if (found) {
    tasks = nextTasks;
  }

  return found;
}

module.exports = {
  getAllTasks,
  getTaskById,
  addTask,
  updateTask,
  deleteTask
};
