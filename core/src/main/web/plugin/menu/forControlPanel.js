/*
 *  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
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
/**
 * This plugins menu items for the control panel
 */
(function() {
  'use strict';
  var loadFromFile = function(path) {
    var deferred = bkHelper.newDeferred();
    bkHelper.httpGet("/beaker/rest/file-io/load", {path: path}).
        success(function(content) {
          deferred.resolve(content);
        }).
        error(function(data, status, header, config) {
          deferred.reject(data, status, header, config);
        });
    return deferred.promise;
  };
  var loadFromHttp = function(url) {
    var deferred = bkHelper.newDeferred();
    bkHelper.httpGet("/beaker/rest/http-proxy/load", {url: url}).
        success(function(content) {
          deferred.resolve(content);
        }).
        error(function(data, status, header, config) {
          deferred.reject(data, status, header, config);
        });
    return deferred.promise;
  };

  var save = function(path, json) {
    var deferred = bkHelper.newDeferred();
    bkHelper.httpPost("/beaker/rest/file-io/save", {path: path, content: json}).
        success(function() {
          bkHelper.setNotebookUrl(path);
          deferred.resolve();
        }).
        error(function(data, status, header, config) {
          deferred.reject(data, status, header, config);
        });
    return deferred.promise;
  };

  var errorHandler = function(data, status, headers, config) {
    bkHelper.showErrorModal(data);
    bkHelper.refreshRootScope();
  };

  bkHelper.registerSaveFunc("file", function(path, notebookModel) {
    var notebookJson = bkHelper.toPrettyJson(notebookModel);
    return save(path, notebookJson);
  });
  bkHelper.setPathOpener("file", {
    open: function(path) {
      if (!path) {
        return;
      }
      var load = /^https?:\/\//.exec(path) ? loadFromHttp : loadFromFile;
      load(path).then(function(content) {
        var notebookJson = content;
        bkHelper.loadNotebook(notebookJson, true, path);
        bkHelper.setSaveFunction(function(notebookModel) {
          return save(path, bkHelper.toPrettyJson(notebookModel));
        });
        bkHelper.evaluate("initialization");
        document.title = path.replace(/^.*[\\\/]/, '');
      }, errorHandler);
    }
  });
  var IPYNB_PATH_PREFIX = "ipynb";
  bkHelper.setPathOpener(IPYNB_PATH_PREFIX, {
    open: function(path) {
      if (path.indexOf(IPYNB_PATH_PREFIX + ":/") === 0) {
        path = path.substring(IPYNB_PATH_PREFIX.length + 2);
      }
      if (path) {
        var load = /^https?:\/\//.exec(path) ? loadFromHttp : loadFromFile;
        load(path).then(function(content) {
          var ipyNbJson = content;
          var ipyNb = JSON.parse(ipyNbJson);
          var bkrNb = notebookConverter.convert(ipyNb);
          bkHelper.loadNotebook(bkrNb, true);
          bkHelper.evaluate("initialization");
          document.title = path.replace(/^.*[\\\/]/, '');
        }, function(data, status, headers, config) {
          bkHelper.showErrorModal(data);
          bkHelper.refreshRootScope();
        });
      }
    }
  });
  var fileMenuItems = [
    {
      name: "New",
      tooltip: "Open a new notebook with default languages(Evaluators)",
      action: function() {
        bkHelper.newSession();
      }
    },
    {
      name: "Open recent",
      items: function() {
        return bkHelper.getRecentMenuItems();
      }
    }
  ];
  var helpMenuItems = [
    {
      name: "About Beaker",
      action: function() {
        bkHelper.showFileChooser(undefined, "template/about.html");
      },
      tooltip: "Basic information about this application"
    },
    {
      name: "Tutorial notebook",
      action: function() {
        bkHelper.openURI("file:config/tutorial.bkr");
      },
      tooltip: "Open the tutorial notebook"
    },
    {
      name: "Keyboard shortcuts",
      action: function() {
        window.open("./keyboardShortcuts.html");
      },
      tooltip: "Show keyboard shortcuts"
    },
    {
      name: "Report a bug or feature request",
      action: function() {
        window.open("https://github.com/twosigma/beaker-notebook/issues/new");
      },
      tooltip: "Log an issue in GitHub"
    },
    {
      name: "Privacy policy",
      action: function() {
        window.open("http://beakernotebook.com/privacy");
      },
      tooltip: "Privacy policy on beakernotebook.com"
    }    
  ];
  bkHelper.httpGet("/beaker/rest/file-io/getHomeDirectory").success(function(homeDir) {
    var fileChooserStrategy = { result: "" };
    fileChooserStrategy.close = function(ev, closeFunc) {
      if (ev.which === 13) {
        closeFunc(this.result);
      }
    };
    fileChooserStrategy.treeViewfs = { // file service
      getChildren: function(path, callback) {
        var self = this;
        this.showSpinner = true;
        $http({
          method: 'GET',
          url: "/beaker/rest/file-io/getDecoratedChildren",
          params: {
            path: path
          }
        }).success(function(list) {
              self.showSpinner = false;
              callback(list);
            }).error(function() {
              self.showSpinner = false;
              console.log("Error loading children");
            });
      },
      open: function(path) {
        fileChooserStrategy.result = path;
      },
      showSpinner: false
    };
    var treeViewChooserTemplate = '<div class="modal-header">' +
        '   <h1>Open <span ng-show="getStrategy().treeViewfs.showSpinner"><i class="fa fa-refresh fa-spin"></i></span></h1>' +
        '</div>' +
        '<div class="modal-body">' +
        '   <tree-view rooturi="/" fs="getStrategy().treeViewfs"></tree-view>' +
        '   <tree-view rooturi="' + homeDir + '" fs="getStrategy().treeViewfs"></tree-view>' +
        '</div>' +
        '<div class="modal-footer">' +
        "   <div class='text-left'>Enter a file path (e.g. /Users/...) or URL (e.g. http://...):</div>" +
        '   <p><input id="openFileInput" class="input-xxlarge" ng-model="getStrategy().result" ng-keypress="getStrategy().close($event, close)" focus-start /></p>' +
        '   <button ng-click="close()" class="btn">Cancel</button>' +
        '   <button ng-click="close(getStrategy().result)" class="btn btn-primary">Open</button>' +
        '</div>';
    var toAdd = [
      { parent: "File", items: fileMenuItems },
      {
        parent: "File",
        submenu: "Open",
        items: [
          {
            name: "Open... (File)",
            tooltip: "Open a file from file system",
            action: function() {
              bkHelper.showFileChooser(
                  bkHelper.openURI,
                  treeViewChooserTemplate,
                  fileChooserStrategy
              );
            }
          },
          {
            name: "Open... (.ipynb)",
            reducedName: "Open...",
            tooltip: "Open a IPython notebook from file system and convert it to Beaker notebook",
            action: function() {
              bkHelper.showFileChooser(
                  function(path) {
                    if (path) {
                      bkHelper.openURI(IPYNB_PATH_PREFIX + ":/" + path);
                    }
                  },
                  treeViewChooserTemplate,
                  fileChooserStrategy
              );
            }
          }
        ]
      },
      {
        parent: "Settings",
        items: [{
          name: "Set anonymous tracking permission",
          action: function() {
            bkHelper.showAnonymousTrackingDialog();
          },
          tooltip: "Show the dialog for setting anonymous tracking permission"
        }]
      },
      { parent: "Help", items: helpMenuItems }
    ];
    pluginObj.onReady(toAdd);
  });
})();
