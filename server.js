var five = require('johnny-five');
// var board = new five.Board();
var config = require('./config');
var osc = require('node-osc');

var client = new osc.Client(config.osc.address, config.osc.port);

// board.on('ready', function () {
new five.Boards(['A', 'B']).on('ready', function (){
  var boardIndex = 0;

  this.each(function (board){
      for (var i = 0; i < config.boards[boardIndex].pins.length; i++) {
        var configPin = config.boards[boardIndex].pins[i];
        var pinIndex = (typeof(configPin) === 'string') ? analogPinMap(configPin) : configPin;
        createPin(board, pinIndex);
      }

    boardIndex++;
  });
});

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