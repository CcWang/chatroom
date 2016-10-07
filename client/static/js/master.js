$(document).ready(function(){
  // console.log('ready');
  var login =document.getElementById('logIn');
  var chat = document.getElementById('chatPage');
  // initial status
  var logStatus = false;
  var socket = io.connect('http://localhost:8899');
  var displayCheck =function(){
    if (logStatus){
      chat.style.display='initial';
      login.style.display='none';
      document.body.style.backgroundColor='white';
    }else{
      chat.style.display='none';
      // login.style.display='initial';
      document.body.style.backgroundColor='black';
      document.body.style.color='white';
    }
  };
  var enterFunction = function(){
    if(logStatus){

    }else{
      // before login
      $(document).keyup(function(e){
        if(e.keyCode==13){
          $('#enterRoom').click();
        }
      })
    }
  }
  displayCheck();
  enterFunction();
  $('#enterRoom').click(function(){
    var user = $('#name').val();
    logStatus=true;
    displayCheck();
    socket.emit('new_user',{name:user});
  });
  socket.on('users',function(data){
    var list='<ul id="list"> <h3>User lists </h3>';
    for(var i=0;i<data.all_user.length;i++){
      for(var key in data.all_user[i]){
        list += '<li>'+data.all_user[i][key]+'</li>';
      }
    }
    list+='</ul>'
    $('.nameList').html(list);
  })
  socket.on('new_user',function(data){
    var welcome = '';
    for(var key in data.new_user){
      welcome+=data.new_user[key]+' has joined the room.';
      var list = '<li>'+data.new_user[key]+'</li>';
    }
    alert(welcome);
    $('#list').append(list);
  })


});
