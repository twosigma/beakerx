module.exports = (function() {
	var path = require('path');
	var java_home = path.resolve(__dirname + '/../jre/Contents/Home'); 
	
	var ReadLine = require('readline');
	var spawn = require('child_process').spawn;
	var events = require('events');

	return {
		startNew: function() {
			var url;
			var hash;
			var eventEmitter = new events.EventEmitter();

		  process.env['JAVA_HOME'] = java_home;
		  backend = spawn(path.resolve(__dirname + '/../dist/beaker.command'), ['--open-browser', 'false']);

		  var rl = ReadLine.createInterface({
		    input: backend.stdout
		  });

		  rl.on('line', function(line) {
		    console.log(line); // Pipe backend's stdout to electron's stdout
		    if (line.startsWith('Beaker hash')){
		      backend.hash = line.split(' ')[2];
		    }
		    else if (line.startsWith('Beaker listening on')){
		      backend.url = line.split(' ')[3];
		      backend.local = true;
		      eventEmitter.emit('ready', backend);
		    }
		  });
		  return eventEmitter;
		}
	}
})();