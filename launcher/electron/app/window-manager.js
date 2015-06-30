module.exports = (function() {
	var BrowserWindow = require('browser-window');
	var ipc = require('ipc');

	var _windows = {};
	var _sessions = {};

	ipc.on('window-session', function(event, msg) {
		_sessions[msg.sessionId] = msg.windowId;
	});

	ipc.on('session-closed', function(event, id) {
		// Cannot use _windows instead of BrowserWindow until it is completely accurate.
		// Right now, windows that are closed through non-beaker means remain in this map.
		// There is also no handling of multiple windows working on the same session.
		BrowserWindow.fromId(_sessions[id]).close();
		event.returnValue = 'done';
	});

	var defaultOptions = {
		  width: 1500,
		  height: 1000,
		  show: false
	};

	var popupOptions = {
			type: 'toolbar',
		  width: 420,
		  height: 153,
		  show: false,
		  resizable: false,
		  'auto-hide-menu-bar': true,
		  'skip-taskbar': true
	};

	function newWindow(url, type){
		var options;
		var devTools = false;
		switch (type){
			case 'popup':
				options = popupOptions;
				break;
			default:
				devTools = true;
				options = defaultOptions;
				break;
		}
		var window = new BrowserWindow(options);

		_windows[window.id] = window;

	  window.unref = function () {
	    delete _windows[window.id];
	  }

	  window.once('closed', function () {
	    window.unref()
	  });

	  if (devTools){
	  	window.toggleDevTools();
	  }

	 	window.webContents.once('did-finish-load', function () {
      window.show();
    });
		window.loadUrl(url);
	}

	function closeAll() {
		for(var i in _windows) {
			_windows[i].close();
		}
	}

	return {
		newWindow: newWindow,
		closeAll: closeAll,
		windows: _windows
	};
})();
