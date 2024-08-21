const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to log request details
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Middleware for task validation
const validateTask = (req, res, next) => {
  const { name, status } = req.body;
  if (!name || !status) {
    return res.status(400).json({ error: 'Name and status are required' });
  }
  next();
};

// Middleware to check if task exists
const checkTaskExists = (req, res, next) => {
    const id = parseInt(req.params.id);
    const tasks = loadTasks();
    const task = tasks.find(t => t.id === id);
    if (!task) {
      console.error(`Task with ID ${id} not found.`);
      return res.status(404).json({ error: 'Task not found' });
    }
    req.task = task; // Add task to request object
    next();
  };
  

// Load tasks from JSON file
// Load tasks from JSON file with error handling
const loadTasks = () => {
    try {
      return JSON.parse(fs.readFileSync(path.join(__dirname, 'tasks.json')));
    } catch (err) {
      console.error('Error loading tasks:', err);
      throw err; // Re-throw to let the error handling middleware catch it
    }
  };
  

// Save tasks to JSON file
const saveTasks = (tasks) => fs.writeFileSync(path.join(__dirname, 'tasks.json'), JSON.stringify(tasks, null, 2));

// GET /tasks - Retrieve all tasks
app.get('/tasks', (req, res) => {
  const { status } = req.query;
  let tasks = loadTasks();
  
  if (status) {
    tasks = tasks.filter(task => task.status === status);
  }
  
  res.json(tasks);
});

// GET /tasks/:id - Retrieve a specific task by ID
app.get('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const tasks = loadTasks(); // Ensure loadTasks function exists
  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.json(task);
});


// POST /tasks - Add a new task
// POST /tasks - Add a new task
app.post('/tasks', validateTask, (req, res) => {
  const tasks = loadTasks();
  const newTask = {
    id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
    name: req.body.name,
    description: req.body.description || '',
    status: req.body.status,
  };
  tasks.push(newTask);
  saveTasks(tasks);
  res.status(201).json(newTask);
});

// PUT /tasks/:id - Update a specific task by ID
// PUT /tasks/:id - Update a specific task by ID
app.put('/tasks/:id', checkTaskExists, validateTask, (req, res) => {
  const id = parseInt(req.params.id);
  const tasks = loadTasks();
  const taskIndex = tasks.findIndex(t => t.id === id);
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  const updatedTask = {
    ...tasks[taskIndex],
    name: req.body.name,
    description: req.body.description || '',
    status: req.body.status,
  };
  tasks[taskIndex] = updatedTask;
  saveTasks(tasks);
  res.json(updatedTask);
});

// PATCH /tasks/:id - Partially update a task's status
app.patch('/tasks/:id', checkTaskExists, (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;
  if (!status) {
    return res.status(400).json({ error: 'Status is required' });
  }

  const tasks = loadTasks();
  const taskIndex = tasks.findIndex(t => t.id === id);
  const updatedTask = { ...tasks[taskIndex], status };
  tasks[taskIndex] = updatedTask;
  saveTasks(tasks);
  res.json(updatedTask);
});

// DELETE /tasks/:id - Delete a specific task by ID
app.delete('/tasks/:id', checkTaskExists, (req, res) => {
  const id = parseInt(req.params.id);
  let tasks = loadTasks();
  tasks = tasks.filter(t => t.id !== id);
  saveTasks(tasks);
  res.json({ message: 'Task deleted' });
});

// Error Handling Middleware
// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  });
  
  
// Start the server
const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

