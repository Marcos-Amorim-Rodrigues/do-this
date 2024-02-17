const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const app = express();
app.use(express.json());
const port = 3000;

app.use((request, response, next) => {
  request.header('Access-Control-Allow-Origin', '*');
  request.header(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PATCH,DELETE,PUT',
  );
  request.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  response.header('Access-Control-Allow-Origin', '*');
  response.header(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PATCH,DELETE,PUT',
  );
  response.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  next();
});

mongoose.connect(process.env.DB_HOST_DATABASE);

// ${}

const Task = mongoose.model('task', {
  title: String,
  description: String,
  date: Date,
  finaldate: Date,
});

app.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.send(tasks);
  return tasks;
});

app.post('/', async (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    finaldate: req.body.finaldate,
  });

  await task.save();
  res.send(task);
});

app.delete('/:id', async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  return res.send(task);
});

app.put('/:id', async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    finaldate: req.body.finaldate,
  });
  return res.send(task);
});

app.listen(port, () => {
  console.log('App running');
});
