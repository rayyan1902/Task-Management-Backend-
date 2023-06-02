// models/task.js

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: String,
    enum: ['Incomplete', 'Completed'],
    default: 'Incomplete',
  },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
