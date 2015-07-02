module.exports = (function() {
	var path = require('path');
	
	var ReadLine = require('readline');
	var spawn = require('child_process').spawn;
	var events = require('events');
	var os = require('os');

	var _url;
	var _hash;
	var _local;
	var _backend;

	return {
		startNew: function() {
			var eventEmitter = new events.EventEmitter();

			var osName = os.type();
			if (osName.startsWith('Windows')){
			  process.env['JAVA_HOME'] = path.resolve(__dirname + '/../jre');
			  process.chdir(__dirname + '/../dist');
				_backend = spawn(path.resolve(__dirname + '/../dist/beaker.command.bat'), ['--open-browser', 'false']);
			} else  if (osName.startsWith('Darwin')) {
			  process.env['JAVA_HOME'] = path.resolve(__dirname + '/../jre/Contents/Home');
				_backend = spawn(path.resolve(__dirname + '/../dist/beaker.command'), ['--open-browser', 'false']);
			}

		  var rl = ReadLine.createInterface({
		    input: _backend.stdout
		  });

		  rl.on('line', function(line) {
		    console.log(line); // Pipe backend's stdout to electron's stdout
		    if (line.startsWith('Beaker hash')){
		    	_hash = line.split(' ')[2];
		    }
		    else if (line.startsWith('Beaker listening on')){
		      _url = line.split(' ')[3];
		      _local = true;
		      eventEmitter.emit('ready', {
		      	url: _url,
		      	hash: _hash,
		      	local: _local
		      });
		    }
		  });
		  return eventEmitter;
		},
		kill: function() {
			if (_backend.local) {
				_backend.kill('SIGTERM');
			}
			_backend = {};
		},
		getInfo: function() {
			return {
				url: _url,
				hash: _hash,
				local: _local
			};
		},
		getUrl: function() {
			return _url;
		},
		setUrl: function(url){
			_url = url;
		},
		getHash: function() {
			return _hash;
		},
		setHash: function(hash) {
			_hash = hash;
		},
		getLocal: function() {
			return _local;
		},
		setLocal: function(local) {
			_local = local;
		}
	}
})();