var app = require("../../express");
var taskModel = require("../models/task.model.server");



//http handlers

app.post("/loanerApp/task", createTask);
app.delete("/loanerApp/task/:taskId", deleteTask);
app.get("/loanerApp/tasks", findAllTask)


function findAllTask(req, res) {
    taskModel
        .findAllTasks()
        .then(function (tasks) {
            res.json(tasks);
        })
}

function deleteTask(req, res) {
    var taskId = req.params.taskId;

    taskModel
        .deleteTask(taskId)
        .then(function (status) {
            res.sendStatus(200);
        }, function (status) {
            res.sendStatus(404);
        })


}


function createTask(req, res) {
    var task = req.body;

    taskModel
        .createTask(task)
        .then(function (task) {
            res.json(task);
        })
}


