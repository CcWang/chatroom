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
var users ={};
var io = require('socket.io').listen(server);
io.sockets.on('connection',function(socket){
	console.log('socket'+socket.id + 'is connected');
	socket.on('new_user',function(data){
		console.log(data.name);
		// var user ={}
		if(users[socket.id] == undefined){
			users[socket.id] = data.name;

		}
		socket.emit('users',{all_user:users});
		socket.broadcast.emit('new_user',{new_user:data.name})
	});
	// new message get
	socket.on('msg',function(msg){
		if(users[socket.id]){
			io.emit('msgDisplay',{'users':users[socket.id],'msg':msg,'id':socket.id})
		}else{
			io.emit('msgDisplay',{'msg':msg})
		}
	})
	//disconnect
	socket.on('disconnect',function(){
		var leftUser;
		if(users[socket.id]){
			leftUser=users[socket.id];
			delete users[socket.id];
			io.emit('user_disconnet',{'left':leftUser,'all_user':users});
		}
	})

})
