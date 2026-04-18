require('dotenv').config();
const mongoose = require('mongoose');

const User = require('./models/userModel');
const Category = require('./models/categoryModel');
const Post = require('./models/postModel');
const Comment = require('./models/commentModel');

function printSchemaFields(modelName, model) {
  const keys = Object.keys(model.schema.paths);
  console.log('\n' + modelName + ' fields:');

  for (let i = 0; i < keys.length; i = i + 1) {
    const key = keys[i];
    if (key === '__v') {
      continue;
    }
    console.log('- ' + key);
  }
}

function runSchemaPreview() {
  console.log('Data Modeler: Blog schema preview');
  printSchemaFields('User', User);
  printSchemaFields('Category', Category);
  printSchemaFields('Post', Post);
  printSchemaFields('Comment', Comment);
}

async function tryMongoConnection() {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.log('\nNo MONGO_URI found.');
    console.log('Schemas are designed and ready. You can connect later using MongoDB local or Atlas.');
    return;
  }

  try {
    await mongoose.connect(mongoUri);
    console.log('\nMongoDB connection successful.');
    await mongoose.connection.close();
  } catch (error) {
    console.log('\nMongoDB connection failed: ' + error.message);
  }
}

async function start() {
  runSchemaPreview();
  await tryMongoConnection();
}

start();
