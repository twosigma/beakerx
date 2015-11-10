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

module.exports = (function() {
  var BrowserWindow = require('browser-window');
  var backendRunner = require('./backend-runner.js');
  var ipc = require('ipc');
  var Faye = require('faye');
  // Do not rename to 'screen', because window.screen exists
  var electronScreen = require('screen');
  var request = require('request');

  var _windows = {};
  var _windowToSession = {};
  var _sessionToWindow = {};

  var windowRelativeWidth = 0.4;
  var windowRelativeHeight = 0.8;

  var client;

  var changeServerDialogId;

  // Initialize cometd

  ipc.on('window-session', function(event, msg) {
    var oldSession = _windowToSession[msg.windowId];

    _sessionToWindow[msg.sessionId] = msg.windowId;
    _windowToSession[msg.windowId] = msg.sessionId;

    // Check if that window already had a session
    if (typeof oldSession !== 'undefined') {
      delete _sessionToWindow[oldSession];
      // If so, close that session
      request.post({
        'url': backendRunner.getUrl() + '/' + backendRunner.getHash() + '/beaker/rest/session-backup/close',
        'form': {
          'sessionid': oldSession,
          'isElectron': true
        }
      });
    }
  });

  ipc.on('session-focused', function(event, sessionId) {
    var windowId = _sessionToWindow[sessionId];
    if (typeof windowId === 'undefined') {
      // Have to open window with session
      newWindow(backendRunner.getUrl() + '/beaker/#/session/' + sessionId, 'notebook');
      return;
    }
    BrowserWindow.fromId(windowId).focus();
  });

  var primaryDisplay = electronScreen.getPrimaryDisplay();
  var defaultOptions = {
    width: primaryDisplay.bounds.width * windowRelativeWidth,
    height: primaryDisplay.bounds.height * windowRelativeHeight,
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

  function inheritOptions(child, parent) {
    var parentBounds = parent.getBounds();
    child.height = parentBounds.height;
    child.width = parentBounds.width;
    child.x = parentBounds.x + 20;
    child.y = parentBounds.y + 20;
  }

  function connectToBackend() {
    client = new Faye.Client(backendRunner.getUrl() + backendRunner.getHash() + '/beaker/cometd/');
    var subscription = client.subscribe('/sessionClosed', function(msg) {
      var windowId = _sessionToWindow[msg.id];
      if (typeof windowId !== 'undefined') {
        BrowserWindow.fromId(windowId).destroy();
      }
    });
  }

  function newWindow(url, type, parentContents) {
    var options;
    var devTools = false;
    if (type && type.startsWith('popup')) {
      options = popupOptions;
    } else {
      devTools = false;
      options = defaultOptions;
    }

    // Inherit properties from parent
    if (parentContents) {
      var parent = BrowserWindow.fromWebContents(parentContents);
      inheritOptions(options, parent);
    }

    var window = new BrowserWindow(options);

    _windows[window.id] = window;

    window.unref = function() {
      delete _windows[window.id];
    }

    switch (type) {
      case 'notebook':
        // Let smarter windows handle their own close
        window.on('close', function(e) {
          // Start close sequence
          window.webContents.send('close-window');
          e.preventDefault();
        });
        window.on('closed', function(e) {
          var sessionId = _windowToSession[window.id];
          delete _sessionToWindow[sessionId];
          delete _windowToSession[window.id];
          window.unref();
        });
        break;
      case 'control-panel':
        break;
      case 'popup-change-server-dialog':
        window.on('close', function(e) {
          changeServerDialogId = undefined;
        });
        break;
      default:
        break;
    }

    if (type != 'notebook') {
      window.on('closed', function(e) {
        window.unref();
      });
    }

    if (devTools) {
      window.toggleDevTools();
    }

    window.webContents.once('did-finish-load', function() {
      window.show();
    });
    window.loadUrl(url);

    return window;
  }

  function openChangeServerDialog() {
    if ((typeof changeServerDialogId) != 'undefined') {
      BrowserWindow.fromId(changeServerDialogId).focus();
    } else {
      var dialog = newWindow('file://' + __dirname + '/templates/change-server-dialog.html',
        'popup-change-server-dialog');
      changeServerDialogId = dialog.id;
    }
  }

  function closeAll() {
    var windows = BrowserWindow.getAllWindows();
    for (var i = 0; i < windows.length; ++i) {
      windows[i].close();
    }
  }

  function openControlPanel() {
    return newWindow(backendRunner.getUrl());
  }

  return {
    newWindow: newWindow,
    openChangeServerDialog: openChangeServerDialog,
    closeAll: closeAll,
    windows: _windows,
    connectToBackend: connectToBackend,
    openControlPanel: openControlPanel
  };
})();
