var mongoose = require('mongoose');

var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model('WidgetModel', widgetSchema);
var pageModel = require('./page.model.server');

widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;

module.exports = widgetModel;




function createWidget(pageId, widget) {
    widget.pageId = pageId;
    console.log(widget);
    var widgetTemp = null;
    return widgetModel
        .create(widget)
        .then(function (widgetDoc) {
            widgetTemp = widgetDoc;
            return pageModel.addWidget(pageId, widgetTemp._id);
        })
        .then(function (pageDoc) {
            return widgetTemp;
        })

}

function findAllWidgetsForPage(pageId) {
    return widgetModel
        .find({pageId: pageId});

}


function findWidgetById(widgetId) {
    return widgetModel
        .findById(widgetId);

}

function deleteWidget(pageId, widgetId) {

    return widgetModel
        .remove({_id: widgetId})
        .then(function () {
            return pageModel.removeWidget(pageId, widgetId);
        });
}

function updateWidget(widgetId, widget) {
    return widgetModel
        .update({_id: widgetId}, {$set: widget});
}

function reorderWidget(pageId, start, end) {
    return pageModel.findById(pageId)
        .then(function(page) {
        var temp = page.widgets.splice(start, 1)[0];
        page.widgets.splice(end, 0, temp);
        return page.save();
    });
}