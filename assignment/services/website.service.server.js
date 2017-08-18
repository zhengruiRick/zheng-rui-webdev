var app = require("../../express");
var websiteModel = require("../models/website.model.server");

app.get("/api/user/:userId/website", findWebsitesByUser);
app.post("/api/user/:userId/website", createWebsite);
app.get("/api/user/:userId/website/:websiteId", findWebsiteById);
app.put("/api/user/:userId/website/:websiteId", updateWebsite);
app.delete("/api/user/:userId/website/:websiteId", deleteWebsite);

var websites = [
    { _id: "123", name: "Facebook",    developerId: "456", description: "Lorem" },
    { _id: "234", name: "Tweeter",     developerId: "456", description: "Lorem" },
    { _id: "456", name: "Gizmodo",     developerId: "456", description: "Lorem" },
    { _id: "890", name: "Go",          developerId: "123", description: "Lorem" },
    { _id: "567", name: "Tic Tac Toe", developerId: "123", description: "Lorem" },
    { _id: "678", name: "Checkers",    developerId: "123", description: "Lorem" },
    { _id: "789", name: "Chess",       developerId: "234", description: "Lorem" }
];

function deleteWebsite(req, res) {
    var websiteId = req.params.websiteId;
    var userId = req.params.userId;

    websiteModel
        .deleteWebsite(userId, websiteId)
        .then(function (status) {
            res.sendStatus(200);
        }, function (status) {
            res.sendStatus(404);
        });


}

function updateWebsite(req, res) {
    var websiteId = req.params.websiteId;
    var website = req.body;

    websiteModel
        .updateWebsite(websiteId, website)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}


function findWebsiteById(req, res) {

   websiteModel
       .findWebsiteById(req.params.websiteId)
       .then(function (website) {
           res.json(website);
       })
}

function findWebsitesByUser(req, res) {

    var userId = req.params.userId;

    websiteModel
        .findAllWebsitesForUser(userId)
        .then(function (websites) {
            res.json(websites)
        }, function (err) {
            res.sendStatus(404).send(err);
        });

}

function createWebsite(req, res) {

    var website = req.body;
    var userId = req.params.userId;

    websiteModel
        .createWebsiteForUser(userId, website)
        .then(function (website) {
            res.json(website)
        }, function (err) {
            res.sendStatus(404).send(err);
        });

}