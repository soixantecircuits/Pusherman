var list;
var timer;

function initList(){
  list = document.getElementById('js-list');
  for (var i = 0; i < config.limit; i++) {
    var item = document.createElement('li');
    item.textContent = i + 1;
    list.appendChild(item);
  };
}

function initSocket(){
  var socket = io('http://localhost:8080');
  socket.on('button-pressed', function (data) {
    resetList();
    timer = window.clearTimeout();
    list.childNodes[data].className = 'active';
    timer = window.setTimeout(function(){
      resetList()
    }, 500);
  });
}

function resetList(){
  for (var i = 0; i < list.childNodes.length; i++) {
    list.childNodes[i].className = '';
  }
}

initList();
initSocket();
