$(document).ready(function(){
  // console.log('ready');
  var login =document.getElementById('logIn');
  var chat = document.getElementById('chatPage');
  // initial status
  var logStatus = false;
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
  });

});
