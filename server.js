// server.js

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const Task = require('./models/task');
const cors = require('cors');
require('dotenv').config();
app.use(cors());
app.use(express.json());


const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Create a new task
app.post('/api/tasks', async (req, res) => {
    try {
      const task = await Task.create(req.body);
      res.status(201).json(task);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // Get all tasks
app.get('/api/tasks', async (req, res) => {
    try {
      const tasks = await Task.find();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Get all tasks in home route too
app.get('/', async (req, res) => {
    try {
      const tasks = await Task.find();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
// Update a task
app.put('/api/tasks/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, status } = req.body;
      const task = await Task.findByIdAndUpdate(
        id,
        { title, description, status },
        { new: true }
      );
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json(task);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // Delete a task
app.delete('/api/tasks/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const task = await Task.findByIdAndDelete(id);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.sendStatus(204);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
