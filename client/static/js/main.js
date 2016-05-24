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
})