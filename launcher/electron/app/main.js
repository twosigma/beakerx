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
var ipc = require('ipc');
var http = require('http');
var crashReporter = require('crash-reporter');

var events = require('events');
var eventEmitter = new events.EventEmitter();
var makeMenuTemplate = require('./default-menu-maker.js');
var backendRunner = require('./backend-runner.js');
var windowOptions = require('./window-options.js');

var appReady = false;
var backend;
var openFile;
var mainMenu;
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;

// Report crashes to our server.
crashReporter.start();

// Electron ready
app.on('ready', function() {
  // Run beaker backend
  backendRunner.startNew().on('ready', connectToBackend);
});

// Kill backend before exiting 
app.on('quit', function() {
  killBackend();
});

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // If all windows are dead, must handle menus from main thread (this thread)
  Menu.setApplicationMenu(MainMenu); 
});

// Fired when OS opens file with application
app.on('open-file', function(event, path) {
  event.preventDefault();
  if (appReady){
    var newWindow = new BrowserWindow(windowOptions.defaultWindowOptions);
    newWindow.loadUrl(backend.url + '/beaker/#/open?uri=' + path);
  } else {
    openFile = path;
  }
});

ipc.on('quit', function() {
  app.quit();
});

ipc.on('try-change-server', function() {
  var popup = new BrowserWindow(windowOptions.popupOptions);
  popup.loadUrl(backend.url + '/beaker/#/changeserver');
});

ipc.on('change-server', function(event, addr){
  var windows = BrowserWindow.getAllWindows();
  for (var i = 0; i < windows.length; ++i){
    windows[i].close();
  }
  console.log('Killing backend');
  if (addr != backend.url) {
    killBackend();
  }
  // Open new control panel there
  var newWindow = new BrowserWindow(windowOptions.defaultWindowOptions);
  console.log('Switching to ' + addr);
  newWindow.loadUrl(addr);
  newWindow.toggleDevTools();
  backend.url = addr;
  backend.local = false;
  MainMenu = Menu.buildFromTemplate(makeMenuTemplate(backend.url));
});

ipc.on('new-backend', function() {
  var windows = BrowserWindow.getAllWindows();
  for (var i = 0; i < windows.length; ++i){
    windows[i].close();
  }
  console.log('Killing backend at' + backend.url);
  killBackend();
  
  backendRunner.startNew().on('ready', connectToBackend);
});

function connectToBackend(newBackend){
  backend = newBackend;
  // Have to wait until actually ready
  spinUntilReady(backend.hash + '/beaker/rest/util/ready', function() {
    // Create the browser window.
    mainWindow = new BrowserWindow(windowOptions.defaultWindowOptions);
    
    if (openFile !== undefined) {
      mainWindow.loadUrl(backend.url + '/beaker/#/open?uri=' + openFile);
      openFile = null;
    } else {
      mainWindow.loadUrl(backend.url);
    }

    MainMenu = Menu.buildFromTemplate(makeMenuTemplate(backend.url));

    // Open the devtools.
    mainWindow.openDevTools();
    
    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      mainWindow = null;
    });
    appReady = true;
  });
}

function killBackend() {
  if (backend.local)
    backend.kill('SIGTERM');
  backend.local = false;
}

function spinUntilReady(url, done) {
  var interval = 100;
  var dur = 10; // In seconds
  var timeout = dur * (1000 / interval);
  console.log("note: probing until backend is ready, an error here is normal");
  var spin = function() {
    var callback = function(response) {
      if (response.statusCode == 200){
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
    http.get(backend.url + url, callback);
  }
  spin();
}

