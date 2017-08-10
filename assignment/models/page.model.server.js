var mongoose = require("mongoose");
var pageSchema = require("./page.schema.server");

var pageModel = mongoose.model("PageModel", pageSchema);
var websiteModel = require("./website.model.server");

pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.deletePage = deletePage;
pageModel.updatePage = updatePage;

module.exports = pageModel;

function createPage(websiteId, page) {
    page.websiteId = websiteId;
    var pageTemp = null;
    return pageModel
        .create(page)
        .then(function (pageDoc) {
            pageTemp = pageDoc;
            return websiteModel.addPage(websiteId, page._id);
        })
        .then(function (websiteDoc) {
            return pageTemp;
        });

}

function findAllPagesForWebsite(websiteId) {
    return pageModel
        .find({websiteId: websiteId})
        .populate('website')
        .exec();

}


function findPageById(pageId) {
    return pageModel
        .findById(pageId);
}

function deletePage(websiteId, pageId) {
    return pageModel
        .remove({_id: pageId})
        .then(function (status) {
            return websiteModel.removePage(websiteId, pageId);
        });
}

function updatePage(pageId, page) {
    return pageModel.update({_id:pageId},
        {$set: page});

}