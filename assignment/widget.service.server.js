var app = require("../express");
var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../public/assignment/uploads' });

app.get("/api/user/:userId/website/:websiteId/page/:pageId/widget", findWidgetByPageId);
app.post("/api/user/:userId/website/:websiteId/page/:pageId/widget/new/:widgetType", createWidget);
app.get("/api/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId", findWidgetById);
app.put("/api/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId", updateWidget);
app.delete("/api/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId", deleteWidget);
app.post("/api/upload", upload.single('myFile'), uploadImage);
app.put('/api/page/:pageId/widget', sortWidget);

var widgets = [
    { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"},
    { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E" },
    { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
];

function sortWidget(req, res) {
    var initial = req.query.initial;
    var final = req.query.final;

    var widget = widgets.splice(initial, 1);
    widgets.splice(final, 0, widget);

    res.send(widgets);
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

    widget = req.body;
    widget.url = '/assignment/uploads/'+filename;

    var callbackUrl ="/assignment/index.html#!user/"+ userId +"/website/"+
        websiteId +"/page/"+pageId +"/widget/" + widgetId ;
    res.redirect(callbackUrl);

}




function deleteWidget(req, res) {
    var widgetId = req.params.widgetId;

    for(var i = 0; i < widgets.length; i++) {
        if(widgets[i]._id === widgetId) {
            widgets.splice(i, 1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);



}

function updateWidget(req, res) {
    var widgetId = req.params.widgetId;
    var widget = req.body;

    for (var w in widgets) {
        if (widgets[w]._id === widgetId) {
            widgets[w] = widget;
            res.send(widget);
            return;
        }
    }
    res.sendStatus(404);
}

function findWidgetById(req, res) {

    for (var w in widgets) {
        if (widgets[w]._id === req.params.widgetId) {
            res.json(widgets[w]);
            return;
        }
    }
    res.sendStatus(404);
}


function findWidgetByPageId(req, res) {

    var pageId = req.params.pageId;

    var _widgets = [];

    for (var w in widgets) {
        if (widgets[w].pageId === pageId) {
            _widgets.push(widgets[w]);
        }
    }
    res.json(_widgets);
}

function createWidget(req, res) {
    var pageId = req.params.pageId;
    var type = req.params.widgetType;
    var widget = req.body;

    widget._id = "c" + (new Date()).getTime();
    widget.pageId = pageId;
    widget.widgetType = type;
    widgets.push(widget);
    res.send(widgets);
}

