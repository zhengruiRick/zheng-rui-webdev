var mongoose = require("mongoose");
var websiteSchema = require("./website.schema.server");

var websiteModel = mongoose.model("WebsiteModel", websiteSchema);
var userModel = require("./user.model.server");

websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.updateWebsite = updateWebsite;
websiteModel.addPage = addPage;
websiteModel.removePage = removePage;

module.exports = websiteModel;

function removePage(websiteId, pageId) {
    return websiteModel
        .findWebsiteById(websiteId)
        .then(function (website) {
            var index = website.pages.indexOf(pageId);
            website.pages.splice(index, 1);
            return website.save();
        })
}

function addPage(websiteId, pageId) {

    return websiteModel
        .findWebsiteById(websiteId)
        .then(function (website) {
            website.pages.push(pageId);
            return website.save();
        });
}


function createWebsiteForUser(userId, website) {
    website.developer = userId;
    var websiteTemp = null;
    return websiteModel
        .create(website)
        .then(function (websiteDoc) {
            websiteTemp = websiteDoc;
            return userModel.addWebsite(userId, websiteDoc._id)
        })
        .then(function (userDoc) {
            return websiteTemp;
        })

}

function findAllWebsitesForUser(userId) {
    return websiteModel
        .find({developer: userId});
    
}


function findWebsiteById(websiteId) {
    return websiteModel
        .findById(websiteId)

}

function deleteWebsite(userId, websiteId) {
    return websiteModel
        .remove({_id: websiteId})
        .then(function (status) {
            return userModel.removeWebsite(userId, websiteId);
        });
}
function updateWebsite(websiteId, website) {
    return websiteModel.update({_id:websiteId},
        {$set: website});

}