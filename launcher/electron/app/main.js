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
var Menu = require('menu');
var MenuItem = require('menu-item');
var BrowserWindow = require('browser-window');  // Module to create native browser window.

var path = require('path');
var events = require('events');
var eventEmitter = new events.EventEmitter();

var java_home = path.resolve(__dirname + '/../jre/Contents/Home'); 
var backend;

// Report crashes to our server.
require('crash-reporter').start();

// Kill backend and quit electron
var ipc = require('ipc');
ipc.on('quit', function() {
  backend.kill('SIGTERM');
  app.quit();
});

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // app.quit();
});

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {
  // Run beaker backend
  runBeaker();

  eventEmitter.on('backendReady', function(data) {
    // Create the browser window.
    mainWindow = new BrowserWindow({
      width: 1500,
      height: 1000,
      // node-integration': false,
      icon: 'beaker.png'
    });
    
    mainWindow.loadUrl(data.beakerUrl);

    // Open the devtools.
    mainWindow.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      mainWindow = null;
    });
  });
});

function runBeaker() {
  var ReadLine = require('readline');
  var spawn = require('child_process').spawn;
  process.env['JAVA_HOME'] = java_home;
  backend = spawn(path.resolve(__dirname + '/../dist/beaker.command'), ['--open-browser', 'false']);

  var rl = ReadLine.createInterface({
    input: backend.stdout
  });

  rl.on('line', function(line) {
    console.log(line);
    if (line.includes('Beaker listening on')){
      eventEmitter.emit('backendReady', {
        beakerUrl: line.split(' ')[3]
      });
    }
  });
}