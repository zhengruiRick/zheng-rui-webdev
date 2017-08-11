var app = require("../../express");
var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../public/assignment/uploads' });

var widgetModel = require('../models/widget.model.server.js');

app.get("/api/user/:userId/website/:websiteId/page/:pageId/widget", findWidgetByPageId);
app.post("/api/user/:userId/website/:websiteId/page/:pageId/widget/", createWidget);
app.get("/api/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId", findWidgetById);
app.put("/api/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId", updateWidget);
app.delete("/api/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId", deleteWidget);
app.post("/api/upload", upload.single('myFile'), uploadImage);
app.put('/api/page/:pageId/widget', sortWidget);

// var widgets = [
//     { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
//     { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
//     { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
//         "url": "http://lorempixel.com/400/200/"},
//     { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
//     { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
//     { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
//         "url": "https://youtu.be/AM2Ivdi9c4E" },
//     { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
// ];

function sortWidget(req, res) {
    var pageId = req.params.pageId;
    var initial = req.query.initial;
    var final = req.query.final;

    widgetModel
        .reorderWidget(pageId, initial, final)
        .then(function () {
            res.sendStatus(404);
        });
}



function uploadImage(req, res) {

    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    widgetModel
        .findWidgetById(widgetId)
        .then(function(widget) {
            widget.url = '/uploads/' + filename;
            return widget.save();
        })
        .then(function(widget) {
            var callbackUrl = '/assignment/#!/user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget/' + widgetId;
            res.redirect(callbackUrl);
        });
}




function deleteWidget(req, res) {
    var widgetId = req.params.widgetId;

    widgetModel
        .deleteWidget(widgetId)
        .then(function(status) {
            res.sendStatus(404);
     });

}

function updateWidget(req, res) {
    var widgetId = req.params.widgetId;
    var widget = req.body;
    console.log(widget);

    widgetModel
        .updateWidget(widgetId, widget)
        .then(function(widget) {
            res.send(widget);
        });
}

function findWidgetById(req, res) {

    var widgetId = req.params.widgetId;

    widgetModel
        .findWidgetById(widgetId)
        .then(function(widget) {
            res.send(widget);
        });
}


function findWidgetByPageId(req, res) {

    var pageId = req.params.pageId;

    widgetModel
        .findAllWidgetsForPage(pageId)
        .then(function(widgets) {
            res.send(widgets);
        });
}

function createWidget(req, res) {
    var pageId = req.params.pageId;
    var widget = req.body;

    widgetModel.createWidget(pageId, widget)
        .then(function(widget) {
            res.send(widget);
    });
}

