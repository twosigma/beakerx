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
                    click: function() {
                        eventEmitter.emit('try-change-server');
                    }
                },
                {
                    label: 'Start new local backend',
                    click: function() {
                        eventEmitter.emit('new-backend');
                    }
                }
            ]
        },
        {
            label: 'File',
            submenu: [
                {
                    label: 'New Empty Notebook',
                    click: function() {
                        eventEmitter.emit('new-empty-notebook');
                    }
                },
                {
                    label: 'New Default Notebook',
                    click: function() {
                        eventEmitter.emit('new-default-notebook');
                    }
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
