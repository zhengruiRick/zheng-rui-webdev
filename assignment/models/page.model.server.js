var mongoose = require("mongoose");
var pageSchema = require("./page.schema.server");

var pageModel = mongoose.model("PageModel", pageSchema);
var websiteModel = require("./website.model.server");

pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.deletePage = deletePage;
pageModel.updatePage = updatePage;

pageModel.addWidget = addWidget;
pageModel.removeWidget= removeWidget;

module.exports = pageModel;

function removeWidget(pageId, widgetId) {
    return pageModel
        .findPageById(pageId)
        .then(function (page) {
            var index = page.widgets.indexOf(widgetId);
            page.widgets.splice(index, 1);
            return page.save();
    });
}

function addWidget(pageId, widgetId) {
    return pageModel
        .findPageById(pageId)
        .then(function (page) {
            page.widgets.push(widgetId);
            return page.save();
    });
}

function createPage(websiteId, page) {
    page.websiteId = websiteId;
    var pageTemp = null;
    return pageModel
        .create(page)
        .then(function (pageDoc) {
            pageTemp = pageDoc;
            return websiteModel.addPage(websiteId, pageTemp._id)
            // return pageTemp;
        })
        .then(function (websiteDoc) {
            return pageTemp;
        })

}

function findAllPagesForWebsite(websiteId) {
    return pageModel
        .find({websiteId: websiteId});

}


function findPageById(pageId) {
    return pageModel
        .findById(pageId);
}

function deletePage(websiteId, pageId) {
    return pageModel
        .remove({_id: pageId})
        .then(function (res) {
            return websiteModel.removePage(websiteId, pageId);
        });
}

function updatePage(pageId, page) {
    return pageModel.update({_id:pageId},
        {$set: page});

}