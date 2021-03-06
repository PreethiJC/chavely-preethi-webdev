module.exports = function (app) {

    var q = require('q');
    app.get("/api/test", findAllMessages);
    app.post("/api/test", createMessage);
    app.delete("/api/test/:id", deleteMessage);

    var connectionString = 'mongodb://127.0.0.1:27017/test';


    if (process.env.USER_MLAB) {
        //      connectionString = process.env.MLAB_USERNAME + ":" +
        // -            process.env.MLAB_PASSWORD + "@" +
        // -            process.env.MLAB_HOST + ':' +
        // -            process.env.MLAB_PORT + '/' +
        // -            process.env.MLAB_APP_NAME;
        var username = process.env.USER_MLAB; // get from environment
        var password = process.env.PASSWORD_MLAB;
        connectionString = 'mongodb://' + username + ':' + password;
        connectionString += '@ds139781.mlab.com:39781/heroku_678tfrxq';
    }

    var mongoose = require("mongoose");
    mongoose.connect(connectionString);
    mongoose.Promise = q.Promise;

    var TestSchema = mongoose.Schema({
        message: String
    });

    var TestModel = mongoose.model("TestModel", TestSchema);

    function findAllMessages(req, res) {
        TestModel
            .find()
            .then(
                function (tests) {
                    res.json(tests);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createMessage(req, res) {
        TestModel
            .create(req.body)
            .then(
                function (test) {
                    res.json(test);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteMessage(req, res) {
        TestModel
            .remove({_id: req.params.id})
            .then(
                function (result) {
                    res.json(result);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
};

