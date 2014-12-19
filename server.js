var five = require('johnny-five');
var config = require('./config');
var boards = config.boards;
var osc = require('node-osc');

var client = new osc.Client(config.osc.address, config.osc.port);

new five.Boards(getBoardsID()).on('ready', function (){
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

function getBoardsID(){
  var ids = [];
  for (var i = 0; i < boards.length; i++) {
    ids.push(boards[i].name);
  };
  return ids;
}

function createPin (board, pinIndex){
  var pin  = new five.Pin(pinIndex);
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