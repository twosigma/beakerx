var ipc = require('ipc');
var BrowserWindow = require('browser-window');

ipc.on('window-ready', function(event) {
  // Use sender to find window to find id
  var id = BrowserWindow.fromWebContents(event.sender).id;
  event.sender.send('window-id', id);
});