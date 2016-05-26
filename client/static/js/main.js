console.log('hello');
var myApp = angular.module('myApp',[]);
myApp.factory('socket', function () {
	// body...
	var socket = io.connect('http://localhost:8899');
	socket.on('connetc',function(){
		console.log('socket created');
		
	})
	console.log('factory');
	return socket;
});

myApp.controller('ChatController',function($scope, socket){
	console.log('controller');
	$scope.user = {name:'user'};
});
// jQuery way
$(document).ready(function(){
	var socket = io.connect();
	if (socket) {
		console.log('jQuery works');
	}
	$('#enter').click(function(){
		var name = prompt('Welcome, please enter your name:');
		if (name == '') {
			name = prompt('Welcome, please enter your name:');
		}else{
			socket.emit('new_user',{name:name});
			$('#enter').hide();
		}
	})
	socket.on('new_user',function(data){
		// console.log(data);
		var welcome = '';
		for(var key in data.new_user){
			// console.log(data.yourself[key]);
			welcome+=data.new_user[key]+' has joined the room.';
			var list = '<li>'+data.new_user[key]+'</li>';
		}
		alert(welcome);
		$('#list').append(list);
	})
	socket.on('users',function(data){
		console.log('users',data);
		var list='<ul id="list">';
		for(var i=0;i<data.all_user.length;i++){
			for(var key in data.all_user[i]){
				console.log(data.all_user[i][key])
				list += '<li>'+data.all_user[i][key]+'</li>';
			}
		}
		list+='</ul>'
		$('#user_list').html(list);
	})
	socket.on('feed_back',function(data){
		$('p').html(data.answer);
	})
})