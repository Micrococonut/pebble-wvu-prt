var UI = require('ui');
      //var status = data.status;
      //var message = data.message;
      //var stations = data.stations;
      //var busses = data.bussesDispatched;
      //var duration = data.duration; // Not sure what this does. I'll have to wait until a day when the system reports this
      //var timestamp = data.timestamp; // Not needed but I need to keep it here to know it exists, since the service is not documented at all
getData();

var card = new UI.Card({
  title: "PRT",
  icon: "images/icon.png",
  body: "Fetching data...",
  scrollable: false
});

card.show();


card.on('click', 'up', function(e) {
  
});

card.on('click', 'select', function(e) {
  
});

card.on('click', 'down', function(e) {
  
});

function getData() {
  var time = (new Date()).getTime();
  var req = new XMLHttpRequest();
  req.onload = function(e) {
    var response = JSON.parse(req.responseText);
    parseInfo(response);
  };
  
  req.open('GET', 'http://prtstatus.wvu.edu/api/'+time+'?format=json', true);
  req.send();
}

function parseInfo(data) {
  var status = data.status;
  var message = data.message;
  
  if(message == "The PRT is closed.") {
    card.body(message);
  } else if (status == 1) {
    card.body("The PRT is up and running");
  } else {
    card.body(message);
  }
}