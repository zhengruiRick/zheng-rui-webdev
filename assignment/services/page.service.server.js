var app = require("../../express");

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

    for(var i = 0; i < pages.length; i++) {
        if(pages[i]._id === pageId) {
            pages.splice(i, 1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);



}

function updatePage(req, res) {
    var pageId = req.params.pageId;
    var page = req.body;

    for (var p in pages) {
        if (pages[p]._id === pageId) {
            pages[p] = page;
            res.send(page);
            return;
        }
    }
    res.sendStatus(404);
}

function findPageById(req, res) {

    for (var p in pages) {
        if (pages[p]._id === req.params.pageId) {
            res.json(pages[p]);
            return;
        }
    }
    res.sendStatus(404);
}


function findPageByWebsiteId(req, res) {

    var websiteId = req.params.websiteId;

    var _pages = [];

    for (var p in pages) {
        if (pages[p].websiteId === websiteId) {
            _pages.push(pages[p]);
        }
    }
    res.json(_pages);
}

function createPage(req, res) {
    var websiteId = req.params.websiteId;
    var page = req.body;

    page._id = "p" + (new Date()).getTime();
    page.websiteId = websiteId;
    pages.push(page);
    res.json(page);
}

