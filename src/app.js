var UI = require('ui');
var Vector2 = require('vector2');
var ajax = require('ajax');

var main = new UI.Card({
  title: 'PRT',
  icon: 'images/icon.png',
  body: 'Press Select to check'
});

main.show();

main.on('click', 'up', function(e) {
  
});

main.on('click', 'select', function(e) {
  checkPrt();
});

main.on('click', 'down', function(e) {
  
});


function checkPrt() {
  var milliseconds = (new Date()).getTime();
  
  ajax( 
    {
      url:'http://prtstatus.wvu.edu/api/'+milliseconds+'/?format=json',
      type:'json'
    },
    
    function(data) {
      var status = data.status;
      var message = data.message;
      
      if(status == 1) {
        main.body = 'The PRT is up';
      } else {
        main.body = message;
      }
    }
    
  ); 
}
