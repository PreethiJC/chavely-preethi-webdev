var express = require('express');
var app = express();
var goodreads = require('goodreads');
console.log("hi");
app.use(express.static(__dirname + '/project'));
app.get('/api/project/book/:title', findBookByTitle);
app.get('http://localhost:3000/api/project/services', function () {
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
// app.listen(3000);