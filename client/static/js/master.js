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
  var makeUserList = function(data){
    // console.log(data);
    var list='<ul id="list"> <h3>User lists </h3>';
    for(var key in data){
      list += '<li>'+data[key]+'</li>';
    }
    list+='</ul>'
    $('.nameList').html(list);
  }
  displayCheck();
  enterFunction();
  // enter room
  $('#enterRoom').click(function(){
    var user = $('#name').val();
    logStatus=true;
    displayCheck();
    socket.emit('new_user',{name:user});
  });
  // listing all users
  socket.on('users',function(data){
    makeUserList(data.all_user);
  })
  // welcome new user
  socket.on('new_user',function(data){
    var welcome = '';
    welcome+=data.new_user+' has joined the room.';
    var list = '<li>'+data['new_user']+'</li>';
    alert(welcome);
    $('#list').append(list);
  })
// user left the room
  socket.on('user_disconnet',function(data){
    if(data){
      var left ='User '+data['left'] +' just left the room';
      makeUserList(data.all_user);
      alert(left);
    }
  })

  // send messages
  // var sendingMsg = function
  $("#myButton").click(function(){
    var msg = $("#m").val();
    if(msg){
      socket.emit('msg',msg);
      $("#m").val('');
    }else{
      alert('please do not send empty message');
    }
  });
  socket.on('msgDisplay',function(data){
    console.log(socket.id)
    console.log(data['users'],data['id'],socket.id)
    if(data['users']){
      if(data['id'] == '/#'+socket.id){
        var list ="<li style='color:red;'> "+ data['users']+" (me) : "+data['msg']+"</li>";
      }else{
        var list ='<li>'+data['users']+": "+data['msg']+"</li>";

      }

    }else{
      var list ="<li> ??? : "+data['msg']+"</li>";
    }
    $('#messages').append(list);
  })
});
