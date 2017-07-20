//console.log("hi");
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/webdev_summer1_2017');
mongoose.Promise = require('q').Promise;

require('./services/user.service.server')(app);
require('./services/website.service.server')(app);
require('./services/widget.service.server')(app);
require('./services/page.service.server')(app);
// require('./services/website.service.server');
// require('./services/widget.service.server');
    