/**
 * Created by Zion on 7/6/17.
 */
module.exports = function (app) {
    var multer = require('multer'); // npm install multer --save
    var upload = multer({dest: __dirname + '/public/assignment/uploads'});
    var widgetModel = require('./../model/widget/widget.model.server');

    var widgets = [
            {"_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            {"_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {
                "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"
            },
            {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            {"_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {
                "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E"
            },
            {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

    app.post("/api/upload", upload.single('myFile'), uploadImage);
    app.post('/api/assignment/page/:pageId/widget', createWidget);
    app.post('/api/assignment/upload', upload.single('uploadFile'), uploadImage);
    app.get('/api/assignment/page/:pageId/widget', findAllWidgetsForPage);
    app.get('/api/assignment/widget/:widgetId', findWidgetById);
    app.put('/api/assignment/page/:pageId/widget', reorderWidgets);
    app.put('/api/assignment/widget/:widgetId', updateWidget);
    app.delete('/api/assignment/widget/:widgetId', deleteWidget);

    function uploadImage(req, res) {

        var widgetId = req.body.widgetId;
        var myFile = req.file;

        var originalname = myFile.originalname; // file name on user's computer
        var filename = myFile.filename;     // new file name in upload folder
        var path = myFile.path;         // full path of uploaded file
        var destination = myFile.destination;  // folder where file is saved to
        var size = myFile.size;
        var mimetype = myFile.mimetype;
        widget = findWidgetById(widgetId);
        widget.url = '/assignment/uploads/' + filename;
        var callbackUrl = "/assignment/index.html#!/widget/345";
        res.redirect(callbackUrl);

    }

    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = req.body;
        widget._id = new Date().getTime() + "";
        widget.pageId = pageId;
        widgets.push(widget);
        res.sendStatus(200);
    }

    function findAllWidgetsForPage(req, res) {
        var results = [];
        var pageId = req.params.pageId;
        for (var w in widgets) {
            if (widgets[w].pageId === pageId) {
                results.push(widgets[w]);
            }
        }
        res.json(results);
    }

    function findWidgetById(req, res) {

        var widgetId = req.params.widgetId;
        for (var w in widgets) {
            if (widgets[w]._id === widgetId) {
                res.send(widgets[w]);
                return;
            }
        }
        res.sendStatus(404);
    }


    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;
        for(var w in widgets) {
            if(widgets[w]._id === widgetId) {
                widgets[w] = widget;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        for(var w in widgets) {
            if(widgets[w]._id === widgetId) {
                widgets.splice(w, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function reorderWidgets(req, res) {
        try
        {
            var pageId = req.params.pageId;
            var initial = req.query.initial;
            var final = req.query.final;
            widgetModel.reorderWidget(pageId, initial, final)
                .then(function (page) {
                    if (page) {
                        res.sendStatus(200);
                    }
                    else {
                        res.status(404).send(' Widget could not be reordered ');
                    }
                }, function (err) {
                    res.status(404).send(' Widget could not be reordered ' + err);
                })
        }
        catch(err)
        {
            res.sendStatus(404);
        }
    }
};