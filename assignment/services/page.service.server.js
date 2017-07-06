module.exports = function (app) {
    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];


    app.post('/api/assignment/website/:websiteId/page', createPage);
    app.get('/api/assignment/website/:websiteId/page', findAllPagesForWebsite);
    app.get('/api/assignment/page/:pageId', findPageById);
    app.put('/api/assignment/page/:pageId', updatePage);
    app.delete('/api/assignment/page/:pageId', deletePage);

    function findAllPagesForWebsite(req, res) {
        var results = [];
        for (var p in pages) {
            if (pages[p].developerId === req.params.userId) {
                results.push(pages[p]);
            }
        }
        res.json(results);
    }

    function createPage(req, res) {
        var page = req.body;
        var userId = req.params.userId;
        page._id = new Date().getTime() + "";
        page.developerId = userId;
        pages.push(page);
        res.sendStatus(200);
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        for(var p in pages) {
            if(pages[p]._id === pageId) {
                res.send(pages[p]);
                return;
            }
        }
        res.sendStatus(404);
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var page = req.body;
        for(var p in pages) {
            if(pages[p]._id === pageId) {
                pages[p] = page;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        for(var p in pages) {
            if(pages[p]._id === pageId) {
                pages.splice(w, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }
};