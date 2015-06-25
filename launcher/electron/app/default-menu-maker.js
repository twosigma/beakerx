module.exports = function(serverUrl){
    var app = require('app');
    var BrowserWindow = require('browser-window');
    var windowOptions = require('./window-options.js');

    var template =[
        {
            label: 'Beaker',
            submenu: [
                {
                    label: 'Quit',
                    click: function() {
                        app.quit();
                    },
                    accelerator: 'Command+Q'
                },
                {
                    label: 'Change server',
                    click: function() {
                        var popup = new BrowserWindow(windowOptions.popupOptions);
                        popup.loadUrl('file://' + __dirname + '/templates/change-server-dialog.html');
                    }
                },
                {
                    label: 'Start local backend',
                    click: function() {
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
                        var newWindow = new BrowserWindow(windowOptions.defaultWindowOptions);
                        newWindow.loadUrl(serverUrl + 'beaker/#/session/empty')
                    }
                },
                {
                    label: 'New Default Notebook',
                    click: function() {
                        var newWindow = new BrowserWindow(windowOptions.defaultWindowOptions);
                        newWindow.loadUrl(serverUrl + 'beaker/#/session/new')

                        newWindow.on('closed', function() {
                            // Dereference the window object, usually you would store windows
                            // in an array if your app supports multi windows, this is the time
                            // when you should delete the corresponding element.
                            newWindow = null;
                        });

                    }
                }
            ]
        }
    ];
    return template;
};
