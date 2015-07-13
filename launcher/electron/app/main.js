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
var crashReporter = require('crash-reporter');
var os = require('os');

var events = require('events');
var backendRunner = require('./backend-runner.js');
var mainMenu = require('./main-menu.js');
var windowManager = require('./window-manager.js');
var server;

var backendReady = false;
var appReady = false;
var filesToOpen = [];
var mainMenu;
var ipcPort = 35046;

// Report crashes to our server.
crashReporter.start();

var osName = os.type();

if (process.argv.length > 1) {
  var resolve = function(onlyInstance) {
    for (var i = 1; i < process.argv.length; ++i) {
      if (osName.startsWith('Windows') || osName.startsWith('Linux')) {
        if (!onlyInstance) {
          request.post('http://localhost:' + ipcPort + '/open-file').form({
            path: process.argv[i]
          });
        } else {
          filesToOpen.push(process.argv[i]);
        }
      }
    }
    if (onlyInstance){
      app.emit('ready');
    } else {
    }
  };

  // Check if an Electron instance already exists
  http.get('http://localhost:' + ipcPort + '/version', function(res){
    var body = '';
    res.on('data', function(data) {
      body += data;
    });
    res.on('end', function() {
      if (body.startsWith('Electron')) {
        resolve(false);
      } else {
        resolve(true);
      }
    })
  }).on('error', function() {
    resolve(true);
  });
} else {
  appReady = true;
}

// Electron ready
app.on('ready', function() {
  // Run beaker backend
  if (appReady) {
    startServer();
    backendRunner.startNew().on('ready', connectToBackend);
  } else {
    appReady = true;
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
    windowManager.newWindow(backendRunner.getUrl() + '/beaker/#/open?uri=' + path)
  } else {
    filesToOpen.push(path);
  }
});

ipc.on('quit', function() {
  app.quit();
});

mainMenu.on('quit', function() {
  app.quit();
});

ipc.on('try-change-server', function() {
  windowManager.openChangeServerDialog();
});

mainMenu.on('try-change-server', function() {
  windowManager.openChangeServerDialog();
});

ipc.on('change-server', function(e, address) {
  switchToBackend(address);
});

mainMenu.on('change-server', function(e, address) {
  switchToBackend(address);
});

ipc.on('new-backend', function() {
  killBackend();
  backendRunner.startNew().on('ready', connectToBackend);
});

mainMenu.on('new-backend', function() {
  killBackend();
  backendRunner.startNew().on('ready', connectToBackend);
});

mainMenu.on('new-empty-notebook', function() {
  windowManager.newWindow(backendRunner.getUrl() + 'beaker/#/session/empty', 'notebook');
});

mainMenu.on('new-default-notebook', function() {
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
  server.on('open-file', function(path) {
    windowManager.newWindow(backendRunner.getUrl() + '/beaker/#/open?uri=' + path);
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
      for (var i = 0; i < filesToOpen.length; ++i){
        windowManager.newWindow(backendRunner.getUrl() + '/beaker/#/open?uri=' + filesToOpen[i]);
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
    http.get(backendRunner.getUrl() + url, callback);
  }
  spin();
}

