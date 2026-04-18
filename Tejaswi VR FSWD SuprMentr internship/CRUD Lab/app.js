require('dotenv').config();
const mongoose = require('mongoose');
const Task = require('./models/taskModel');

async function runCrudLab() {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.log('MONGO_URI is missing.');
    console.log('Add MONGO_URI in .env to run CRUD operations.');
    console.log('Example: mongodb://127.0.0.1:27017/crud_lab');
    return;
  }

  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    await Task.deleteMany({});

    const createdTask = await Task.create({
      title: 'Complete CRUD Lab assignment',
      status: 'pending',
      priority: 'high'
    });
    console.log('Create:', createdTask);

    const allTasks = await Task.find();
    console.log('Read:', allTasks);

    const updatedTask = await Task.findByIdAndUpdate(
      createdTask._id,
      { status: 'done' },
      { new: true }
    );
    console.log('Update:', updatedTask);

    const deletedTask = await Task.findByIdAndDelete(createdTask._id);
    console.log('Delete:', deletedTask);

    const tasksAfterDelete = await Task.find();
    console.log('Final tasks:', tasksAfterDelete);
  } catch (error) {
    console.log('Error:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

runCrudLab();
