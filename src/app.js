var UI = require('ui');
var ajax = require('ajax');

var main = new UI.Card({
  title: 'PRT',
  icon: 'images/icon.png',
  body: 'Press Select to check',
  scrollable: false
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
      var stations = data.stations;
      var busses = data.bussesDispatched;
      var duration = data.duration; // Not sure what this does. I'll have to wait until a day when the system reports this
      var timestamp = data.timestamp; // Not needed but I need to keep it here to know it exists, since the service is not documented at all
      
      if(status == 1) {
        main.body = 'The PRT is up';
      } else {
        
        var downList = "Down at: ";
        var busDis;
        
        if(message == "The PRT is closed.") {
          main.body = message;
        } 
        else if(busses == 1) {
          busDis = "Busses have been dspatched";
          
          for	(var i = 0; i < stations.length; i++) {
            downList += stations[i] + ", ";
          }
          
          main.body = message + "\n" + downList + "\n" + busDis;
        } 
        else {
          busDis = "Busses are not dispatched";
          
          for	(var i = 0; i < stations.length; i++) {
            downList += stations[i] + ", ";
          }
          
          main.body = message + "\n" + downList + "\n" + busDis;
        }
      }
    }
  ); 
}