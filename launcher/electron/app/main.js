/*
 *  Copyright 2015 TWO SIGMA OPEN SOURCE, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

var app = require('app');  // Module to control application life.
var ipc = require('ipc');
var http = require('http');
var request = require('request');
var os = require('os');
var crashReporter = require('crash-reporter');

var events = require('events');
var backendRunner = require('./backend-runner.js');
var mainMenu = require('./main-menu.js');
var windowManager = require('./window-manager.js');
var server;

var backendReady = false;
var appReady = false;
var filesToOpen = [];
var ipcPort = 32326;
var osName = os.type();

// Report crashes to our server.
crashReporter.start();

var osName = os.type();

// Electron ready
app.on('ready', function() {
  if (process.argv.length > 1) {
    var paths = process.argv.splice(1, process.argv.length);
    request.post({
      'url':'http://localhost:' + ipcPort + '/open-files',
      'form': {
        'paths': JSON.stringify(paths)
      }
    }, function(err, response, body) {
      if (body && body.startsWith('Electron')) {
        app.quit();
      } else {
        filesToOpen = paths;
        startServer();
        backendRunner.startNew().on('ready', connectToBackend);
      }
    });
  } else {
    startServer();
    backendRunner.startNew().on('ready', connectToBackend);
  }
});

// Kill backend before exiting
app.on('before-quit', function() {
  killBackend();
});

// Fired when OS opens file with application
app.on('open-file', function(event, path) {
  event.preventDefault();
  if (backendReady) {
    windowManager.newWindow(backendRunner.getUrl() + '/beaker/#/open?uri=' + path, 'notebook');
  } else {
    filesToOpen.push(path);
  }
});

// When all windows die
app.on('window-all-closed', function() {
  if (osName.startsWith('Darwin')) {
    mainMenu.show();
  } else {
    app.quit();
  }
});

ipc.on('quit', function() {
  app.quit();
});

mainMenu.emitter.on('quit', function() {
  app.quit();
});

ipc.on('try-change-server', function() {
  windowManager.openChangeServerDialog();
});

mainMenu.emitter.on('try-change-server', function() {
  windowManager.openChangeServerDialog();
});

ipc.on('change-server', function(e, address) {
  switchToBackend(address);
});

mainMenu.emitter.on('change-server', function(e, address) {
  switchToBackend(address);
});

ipc.on('new-backend', function() {
  killBackend();
  backendRunner.startNew().on('ready', connectToBackend);
});

mainMenu.emitter.on('new-backend', function() {
  killBackend();
  backendRunner.startNew().on('ready', connectToBackend);
});

mainMenu.emitter.on('new-empty-notebook', function() {
  windowManager.newWindow(backendRunner.getUrl() + 'beaker/#/session/empty', 'notebook');
});

mainMenu.emitter.on('new-default-notebook', function() {
  windowManager.newWindow(backendRunner.getUrl() + 'beaker/#/session/new', 'notebook');
});

ipc.on('new-window', function(e, url, type) {
  windowManager.newWindow(url, type, e.sender);
});

// Launches a server in this thread. Used for IPC between
// multiple electron threads (e.g. for opening files with
// only one instance)
function startServer() {
  server = require('./server.js')(ipcPort);
  server.on('open-files', function(paths) {
    for (var i = 0; i < paths.length; ++i) {
      windowManager.newWindow(backendRunner.getUrl() + '/beaker/#/open?uri=' + paths[i], 'notebook');
    }
  });
}

function switchToBackend(address) {
  if (address != backendRunner.getUrl()) {
    killBackend();
  }
  // Open new control panel there
  console.log('Switching to ' + address);
  windowManager.newWindow(address);
  backendRunner.setUrl(address);
  backendRunner.setLocal(false);
}

function connectToBackend() {
  // Have to wait until backend is fully ready
  spinUntilReady(backendRunner.getHash() + '/beaker/rest/util/ready', function() {
    windowManager.connectToBackend();
    // Open file if launched with file
    if (filesToOpen.length > 0) {
      for (var i = 0; i < filesToOpen.length; ++i) {
        windowManager.newWindow(backendRunner.getUrl() + '/beaker/#/open?uri=' + filesToOpen[i], 'notebook');
      }
    } else {
      windowManager.newWindow(backendRunner.getUrl());
    }
    backendReady = true;
  });
}

function killBackend() {
  windowManager.closeAll();
  console.log('Killing backend at ' + backendRunner.getUrl());
  backendRunner.kill();
}

function spinUntilReady(url, done) {
  var interval = 100;
  var dur = 10; // In seconds
  var timeout = dur * (1000 / interval);
  console.log('note: probing until backend is ready, an error here is normal');
  var spin = function() {
    var callback = function(response) {
      if (response.statusCode == 200) {
        done();
      } else {
        if (timeout <= 0) {
          console.log('Application did not start correctly. Please try relaunching it.');
          app.quit();
        } else {
          timeout--;
          setTimeout(spin, interval);
        }
      }
    }
    request.get(backendRunner.getUrl() + url).on('response', callback);
  }
  spin();
}

