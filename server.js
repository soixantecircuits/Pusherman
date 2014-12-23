var five = require('johnny-five');
var config = require('./config');
var boards = config.boards;
var osc = require('node-osc');

if(config.mode == 'osc'){
  var osc = require('node-osc');
  var client = new osc.Client(config.osc.address, config.osc.port);
  initBoard('osc', client);
} else if(config.mode == 'socketio'){
  var io = require('socket.io')(config.socketio.port);
  initBoard('socketio', io);
}

function initBoard (mode, transporter){
  var ports = getBoardsPorts();
  new five.Boards(ports).on('ready', function (){
    var boardIndex = 0;

    this.each(function (board){
        for (var i = 0; i < boards[boardIndex].pins.length; i++) {
          var configPin = boards[boardIndex].pins[i];
          var pinIndex = configPin;
          createPin(board, pinIndex, mode, transporter);
        }

      boardIndex++;
    });
  });
}

function getBoardsPorts(){
  var ports = [];
  for (var i = 0; i < boards.length; i++) {
    if(boards[i].enable){
      port = {
        id: boards[i].name,
        port: boards[i].port
      };
      ports.push(port);
    }
  };
  return ports;
}

function createPin (board, pinIndex, mode, transporter){
  var button = new five.Button({
    pin: pinIndex,
    // isPullup: true, // right now this doesn't work for analog inputs, we still need to upload a custom firmware
    board: board
  })

  if(mode == 'osc'){
    var client = transporter;
    button.on('press', function (){
      client.send('/' + board.id + '/' + pinIndex, 'On');
      console.log('Button ' + pinIndex + ' on board ' + board.id + ' pressed');
    });
  } else if(mode == 'socketio'){
    var io = transporter;
    button.on('press', function (){
      io.emit('button-pressed', {board: board.id, pin: pinIndex});
      console.log('Button ' + pinIndex + ' on board ' + board.id + ' pressed');
    })
  }
}