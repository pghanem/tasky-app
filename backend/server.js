const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const taskRoutes = express.Router();
const PORT = 3000;

let Task = require('./task.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/tasks', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("Successful connection to mongoDB");
})

taskRoutes.route('/').get(function(req, res) {
    Task.find(function(err, tasks) {
        if (err) {
            console.log(err);
        } else {
            res.json(tasks);
        }
    });
});

taskRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Task.findById(id, function(err, task) {
        res.json(task);
    });
});

taskRoutes.route('/update/:id').post(function(req, res) {
    Task.findById(req.params.id, function(err, task) {
        if (!task)
            res.status(404).send("Data not found.");
        else
            task.task_description = req.body.task_description;
            task.task_responsible = req.body.task_responsible;
            task.task_priority = req.body.task_priority;
            task.task_completed = req.body.task_completed;

            task.save().then(task => {
                res.json('Task successfully updated.');
            })
            .catch(err => {
                res.status(400).send("Couldn't update.");
            });
    });
});

taskRoutes.route('/add').post(function(req, res) {
    let task = new Task(req.body);
    task.save()
        .then(task => {
            res.status(200).json({'task': 'Task successfully added.'});
        })
        .catch(err => {
            res.status(400).send('Failed to add new task.');
        });
});

app.use('/tasks', taskRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});