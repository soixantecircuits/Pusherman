var five = require('johnny-five');
var config = require('./config');
var boards = config.boards;
var osc = require('node-osc');

var client = new osc.Client(config.osc.address, config.osc.port);

var ports = getBoardsPorts();
new five.Boards(ports).on('ready', function (){
  var boardIndex = 0;

  this.each(function (board){
      for (var i = 0; i < boards[boardIndex].pins.length; i++) {
        var configPin = boards[boardIndex].pins[i];
        var pinIndex = (typeof(configPin) === 'string') ? analogPinMap(configPin) : configPin;
        createPin(board, pinIndex);
      }

    boardIndex++;
  });
});

function getBoardsPorts(){
  var ports = [];
  for (var i = 0; i < boards.length; i++) {
    port = {
      id: boards[i].name,
      port: boards[i].port
    }
    ports.push(port);
  };
  return ports;
}

function createPin (board, pinIndex){
  var pin  = new five.Pin({
    pin: pinIndex,
    board: board
  });
  pin.mode = 0; // 0 = INPUT
  pin.read(function (value){
    console.log('Pin ' + pinIndex + ' on board ' + board.id + ': ' + (value ? 'On' : 'Off'));
    if(value){
      client.send('/' + board.id + '/' + pinIndex, 'On');
    }
  });
}

// You can't write 'A0', 'A1', etc, and change mode to INPUT. To do so, you'll have to map the analog identifier to digital pin number
function analogPinMap (pinToParse){
  var re = /[^0-9]/gi;
  var intPin = pinToParse.replace(re, '');
  var mappedPin = parseInt(intPin) + 14; // Analogs pins starts at 14 (the 13 before are digitals)
  return mappedPin;
}