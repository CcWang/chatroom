var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(path.join(__dirname,'./client')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);
var server = app.listen(8899,function () {
	// body...
	console.log('listening on 8899 for chatroom');
})