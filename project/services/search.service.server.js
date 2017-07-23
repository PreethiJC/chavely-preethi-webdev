var app = require('../../express');
var goodreads = require('goodreads');
console.log("hi");

app.get('/api/project/book/:title', findBookByTitle);
app.get('/api/project', function () {
    console.log("I am here");
});

var gr = new goodreads.client({ 'key': 'T3XmyOG438rZNaDB6kTcHQ', 'secret': 'D3voCuGGxlGhZpcze8KyhT4N8Zx2I2io3mWKhoG70g' });

function findBookByTitle(req, res) {
    var title = req.params['title'];

    gr.searchBooks(title, function (out) {
        res.json = out;
    });

    /*gr.searchBooks(title)
        .then(function (out) {
        res.json = out;
    });*/
}