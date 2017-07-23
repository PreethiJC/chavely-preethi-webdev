var express = require('express');
var app = express();
var goodreads = require('goodreads');
//var gr = new goodreads.client({ 'key': 'T3XmyOG438rZNaDB6kTcHQ', 'secret': 'D3voCuGGxlGhZpcze8KyhT4N8Zx2I2io3mWKhoG70g' });

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

app.get('/api/project/books/:title', findBookByTitle);

function findBookByTitle(req, res) {
    var title = req.params['title'];
    //var dump = json  {json && res.write(JSON.stringify(json)); res.end()}

    gr = goodreads.client({ 'key': 'T3XmyOG438rZNaDB6kTcHQ', 'secret': 'D3voCuGGxlGhZpcze8KyhT4N8Zx2I2io3mWKhoG70g' })

    gr.searchBooks(title, function (out) {
        out && res.write(JSON.stringify(out));
        res.end();
            //res.json = JSON.stringify(out);
    });

        /*var response = out.GoodreadsResponse;
        console.log
        console.log(response.search[0].results);
        res.json = response.search;*/
}

require ("./test/app");
require ("./assignment/app");
require("./project/app");

var port = process.env.PORT || 3000;

app.listen(port);
