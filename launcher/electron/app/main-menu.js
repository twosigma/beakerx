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
  var app = require('app');
  var BrowserWindow = require('browser-window');
  var Menu = require('menu');
  var events = require('events');
  var eventEmitter = new events.EventEmitter();

  template = [
  {
    label: 'Beaker',
    submenu: [
    {
      label: 'Quit',
      click: function() {
        eventEmitter.emit('quit');
      },
      accelerator: 'Command+Q'
    },
    {
      label: 'Change server',
      click: eventEmitter.emit.bind(eventEmitter, 'try-change-server')
    },
    {
      label: 'Start new local backend',
      click: eventEmitter.emit.bind(eventEmitter, 'new-backend')
    }
    ]
  },
  {
    label: 'File',
    submenu: [
    {
      label: 'New Empty Notebook',
      click: eventEmitter.emit.bind(eventEmitter, 'new-empty-notebook')
    },
    {
      label: 'New Default Notebook',
      click: eventEmitter.emit.bind(eventEmitter, 'new-default-notebook')
    }
    ]
  }
  ];

  MainMenu = Menu.buildFromTemplate(template);
  // Quit when all windows are closed.
  app.on('window-all-closed', function() {
    // If all windows are dead, must handle menus from main thread (this thread)
    Menu.setApplicationMenu(MainMenu);
  });

  return eventEmitter;
})();
