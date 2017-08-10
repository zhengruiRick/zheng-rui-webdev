var app = require("../../express");
var pageModel = require("../models/page.model.server");

app.get("/api/user/:userId/website/:websiteId/page", findPageByWebsiteId);
app.post("/api/user/:userId/website/:websiteId/page", createPage);
app.get("/api/user/:userId/website/:websiteId/page/:pageId", findPageById);
app.put("/api/user/:userId/website/:websiteId/page/:pageId", updatePage);
app.delete("/api/user/:userId/website/:websiteId/page/:pageId", deletePage);

var pages = [
    {_id: "321", name: "Post 1", websiteId: "456", description: "Lorem"},
    {_id: "432", name: "Post 2", websiteId: "456", description: "Lorem"},
    {_id: "543", name: "Post 3", websiteId: "456", description: "Lorem"}
];

function deletePage(req, res) {
    var pageId = req.params.pageId;
    var websiteId = req.params.websiteId;

    pageModel
        .deletePage(websiteId,pageId)
        .then(function (status) {
            res.sendStatus(200);
        }, function (status) {
            res.sendStatus(404);
        });



}

function updatePage(req, res) {
    var pageId = req.params.pageId;
    var page = req.body;

    pageModel
        .updatePage(pageId, page)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function findPageById(req, res) {

    pageModel
        .findPageById(req.params.pageId)
        .then(function (page) {
            res.json(page);
        })
}


function findPageByWebsiteId(req, res) {

    var websiteId = req.params.websiteId;

    pageModel
        .findAllPagesForWebsite(websiteId)
        .then(function (pages) {
            res.json(pages)
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function createPage(req, res) {
    var websiteId = req.params.websiteId;
    var page = req.body;

    pageModel
        .createPage(websiteId, page)
        .then(function (page) {
            res.json(page);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

