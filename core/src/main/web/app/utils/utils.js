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
 * Module bk.utils
 * This module contains the low level utilities used by Beaker
 */
(function() {
  'use strict';
  var module = angular.module('bk.utils', [
    'bk.commonUtils',
    'bk.angularUtils',
    'bk.cometdUtils',
    'bk.track'
  ]);
  /**
   * bkUtils
   * - holds general/low0level utilities that are beaker specific that has no effect to DOM directly
   * - it also serves the purpose of hiding underneath utils: commonUtils/angularUtils/...
   *    from other parts of beaker
   */
  module.factory('bkUtils', function(commonUtils, angularUtils, bkTrack, cometdUtils) {

    function endsWith(str, suffix) {
      return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }
    
    var serverRoot = endsWith(document.baseURI, 'beaker/') ? document.baseURI.substring(0,document.baseURI.length-7): document.baseURI;
    
    function serverUrl(path) {
      return serverRoot + path;
    }

    var fileRoot = document.baseURI;
    
    function fileUrl(path) {
      return fileRoot + path;
    }

    // ajax notebook location types should be of the form
    // ajax:/loading/path:/saving/path
    function parseAjaxLocator(locator) {
      var pieces = locator.split(":");
      return { source: pieces[1], destination: pieces[2] }
    }

    var bkUtils = {
        serverUrl: serverUrl,
        fileUrl: fileUrl,

      // wrap trackingService
      log: function(event, obj) {
        bkTrack.log(event, obj);
      },

      // wrap commonUtils
      generateId: function(length) {
        return commonUtils.generateId(length);
      },
      loadJS: function(url, success) {
        return commonUtils.loadJS(url, success);
      },
      loadCSS: function(url) {
        return commonUtils.loadCSS(url);
      },
      loadList: function(urls, success, failure) {
        return commonUtils.loadList(urls, success, failure);
      },
      formatTimeString: function(millis) {
        return commonUtils.formatTimeString(millis);
      },
      isMiddleClick: function(event) {
        return commonUtils.isMiddleClick(event);
      },
      getEventOffsetX: function(elem, event) {
        return commonUtils.getEventOffsetX(elem, event);
      },
      findTable: function(elem) {
        return commonUtils.findTable(elem);
      },
      saveAsClientFile: function(data, filename) {
        return commonUtils.saveAsClientFile(data, filename);
      },
      // give the angular base URL
      // This function is a HACK: '$location' should probably be used instead of
      // 'location', but '$location' seems to return the wrong path.
      getBaseUrl: function() {
        return location.protocol + '//' + location.host + location.pathname + '#';
      },
      // Open tab/window functions that handle the electron case
      openWindow: function(path) {
        if (bkHelper.isElectron) {
          var thisWindow = bkUtils.Electron.thisWindow;
          var width = 800;
          var height = 800;
          if (thisWindow !== undefined){
            var bounds = thisWindow.getBounds();
            width = bounds.width;
            height = bounds.height;
          }
          var newWindow = new bkUtils.Electron.BrowserWindow({
            width: width,
            height: height
          });
          if (path[0] == '/'){
            newWindow.loadUrl(bkUtils.getBaseUrl() + path);
          } else {
            newWindow.loadUrl(path);
          }
        } else {
          window.open(path);
        }
      },
      openStaticWindow: function(path) {
        if (bkHelper.isElectron) {
          var newWindow = new bkHelper.Electron.BrowserWindow({});
          newWindow.loadUrl(bkHelper.serverUrl('beaker/' + path));
        } else {
          window.open('./' + path);
        }
      },
      openBrowserWindow: function(path) {
        if (bkHelper.isElectron) {
          bkHelper.Electron.Shell.openExternal(path);
        } else {
          window.open(path);
        }
      },
      // wrap angularUtils
      refreshRootScope: function() {
        angularUtils.refreshRootScope();
      },
      toPrettyJson: function(jsObj) {
        return angularUtils.toPrettyJson(jsObj);
      },
      fromPrettyJson: function(jString) {
        return angularUtils.fromPrettyJson(jString);
      },
      httpGet: function(url, data) {
        return angularUtils.httpGet(url, data);
      },
      httpPost: function(url, data) {
        return angularUtils.httpPost(url, data);
      },
      spinUntilReady: function(url) {
        var deferred = angularUtils.newDeferred();
        var timeRemaining = 30 * 1000;
        var maxInterval = 1000;
        var interval = 10;
        console.log("note: probing until backend is ready, an error here is normal");
        function spin() {
          angularUtils.httpGet(url, {}).success(function (r) {
            deferred.resolve("ok");
          }).error(function (r) {
            if (timeRemaining <= 0) {
              deferred.reject("timeout");
            } else {
              interval *= 1.5;
              if (interval > maxInterval) {
                interval = maxInterval;
              }
              timeRemaining = timeRemaining - interval;
              angularUtils.timeout(spin, interval);
            }
          });
        }
        spin();
        return deferred.promise;
      },
      newDeferred: function() {
        return angularUtils.newDeferred();
      },
      newPromise: function(value) {
        return angularUtils.newPromise(value);
      },
      all: function() {
        return angularUtils.all.apply(angularUtils, arguments);
      },
      fcall: function(func) {
        return angularUtils.fcall(func);
      },
      delay: function(ms) {
        return angularUtils.delay(ms);
      },
      timeout: function(func,ms) {
        return angularUtils.timeout(func,ms);
      },
      cancelTimeout: function(promise) {
        return angularUtils.cancelTimeout(promise);  
      },
      setServerRoot: function(url) {
        serverRoot = url;
      },
      setFileRoot: function(url) {
        fileRoot = url;
      },

      // beaker server involved utils
      getHomeDirectory: function() {
        var deferred = angularUtils.newDeferred();
        this.httpGet(serverUrl("beaker/rest/file-io/getHomeDirectory"))
            .success(deferred.resolve)
            .error(deferred.reject);
        return deferred.promise;
      },
      getWorkingDirectory: function() {
        var deferred = angularUtils.newDeferred();
        this.httpGet(serverUrl("beaker/rest/file-io/getWorkingDirectory"))
            .success(deferred.resolve)
            .error(deferred.reject);
        return deferred.promise;
      },
      getVersionInfo: function() {
        var deferred = angularUtils.newDeferred();
        this.httpGet(serverUrl("beaker/rest/util/getVersionInfo"))
            .success(deferred.resolve)
            .error(deferred.reject);
        return deferred.promise;
      },
      getStartUpDirectory: function() {
        var deferred = angularUtils.newDeferred();
        this.httpGet(serverUrl("beaker/rest/file-io/getStartUpDirectory"))
            .success(deferred.resolve)
            .error(deferred.reject);
        return deferred.promise;
      },
      getDefaultNotebook: function() {
        var deferred = angularUtils.newDeferred();
        angularUtils.httpGet(serverUrl("beaker/rest/util/getDefaultNotebook")).
            success(function(data) {
              deferred.resolve(angular.fromJson(data));
            }).
            error(function(data, status, header, config) {
              deferred.reject(data, status, header, config);
            });
        return deferred.promise;
      },
      generateNotebook: function(evaluators, cells) {
        return {
          beaker: "2",
          evaluators: evaluators,
          cells: cells
        };
      },
      loadFile: function(path) {
        var deferred = angularUtils.newDeferred();
        angularUtils.httpGet(serverUrl("beaker/rest/file-io/load"), {path: path})
            .success(function(content) {
              if (!_.isString(content)) {
                // angular $http auto-detects JSON response and deserialize it using a JSON parser
                // we don't want this behavior, this is a hack to reverse it
                content = JSON.stringify(content);
              }
              deferred.resolve(content);
            })
            .error(deferred.reject);
        return deferred.promise;
      },

      loadHttp: function(url) {
        var deferred = angularUtils.newDeferred();
        angularUtils.httpGet(serverUrl("beaker/rest/http-proxy/load"), {url: url})
            .success(function(content) {
              if (!_.isString(content)) {
                // angular $http auto-detects JSON response and deserialize it using a JSON parser
                // we don't want this behavior, this is a hack to reverse it
                content = JSON.stringify(content);
              }
              deferred.resolve(content);
            })
            .error(deferred.reject);
        return deferred.promise;
      },
      loadAjax: function(ajaxLocator) {
        var deferred = angularUtils.newDeferred();
        angularUtils.httpGet(parseAjaxLocator(ajaxLocator).source)
            .success(function(content) {
              if (!_.isString(content)) {
                // angular $http auto-detects JSON response and deserialize it using a JSON parser
                // we don't want this behavior, this is a hack to reverse it
                content = JSON.stringify(content);
              }
              deferred.resolve(content);
            })
            .error(deferred.reject);
        return deferred.promise;
      },
      saveFile: function(path, contentAsJson, overwrite) {
        var deferred = angularUtils.newDeferred();
        if (overwrite) {
          angularUtils.httpPost(serverUrl("beaker/rest/file-io/save"), {path: path, content: contentAsJson})
              .success(deferred.resolve)
              .error(deferred.reject);
        } else {
          angularUtils.httpPost(serverUrl("beaker/rest/file-io/saveIfNotExists"), {path: path, content: contentAsJson})
              .success(deferred.resolve)
              .error(function(data, status, header, config) {
                if (status === 409) {
                  deferred.reject("exists");
                } else if (data === "isDirectory") {
                  deferred.reject(data);
                } else {
                  deferred.reject(data, status, header, config);
                }
              });
        }

        return deferred.promise;
      },
      saveAjax: function(ajaxLocator, contentAsJson) {
        var deferred = angularUtils.newDeferred();
        var destination = parseAjaxLocator(ajaxLocator).destination;
        angularUtils.httpPutJson(destination, {data: contentAsJson})
          .success(deferred.resolve)
          .error(deferred.reject);
        return deferred.promise;
      },
      initializeCometd: function(uri) {
        return cometdUtils.initializeCometd(uri);
      },
      addConnectedStatusListener: function(cb) {
        return cometdUtils.addConnectedStatusListener(cb);
      },
      removeConnectedStatusListener: function() {
        return cometdUtils.removeConnectedStatusListener();
      },
      disconnect: function() {
        return cometdUtils.disconnect();
      },

      beginsWith: function(haystack, needle) {
        return (haystack.substr(0, needle.length) === needle);
      },

      // wrapper around requireJS
      moduleMap: {},
      loadModule: function(url, name) {
        // name is optional, if provided, it can be used to retrieve the loaded module later.
        var that = this;
        if (_.isString(url)) {
          var deferred = this.newDeferred();
          window.requirejs([url], function (ret) {
            if (!_.isEmpty(name)) {
              that.moduleMap[name] = url;
            }
            deferred.resolve(ret);
          }, function(err) {
            deferred.reject({
              message: "module failed to load",
              error: err
            });
          });

          return deferred.promise;
        } else {
          throw "illegal arg" + url;
        }
      },
      require: function(nameOrUrl) {
        var url = this.moduleMap.hasOwnProperty(nameOrUrl) ? this.moduleMap[nameOrUrl] : nameOrUrl;
        return window.require(url);
      },

      // Electron: require('remote')
      isElectron: navigator.userAgent.indexOf('beaker-desktop') > -1,
    };
    if (bkUtils.isElectron){
      // Should I refactor this?
      bkUtils.Electron = {};
      bkUtils.Electron.remote = require('remote');
      bkUtils.Electron.BrowserWindow = bkUtils.Electron.remote.require('browser-window');
      bkUtils.Electron.Menu = bkUtils.Electron.remote.require('menu');
      bkUtils.Electron.Dialog = bkUtils.Electron.remote.require('dialog');
      bkUtils.Electron.Shell = bkUtils.Electron.remote.require('shell');
      bkUtils.Electron.IPC = require('ipc');
      bkUtils.Electron.toggleDevTools = function() {
        bkUtils.Electron.BrowserWindow.getFocusedWindow().toggleDevTools();
      };
      bkUtils.Electron.thisWindow = bkUtils.Electron.remote.getCurrentWindow();

      bkUtils.Electron.updateMenus = function(menus) {
        var assignShortcut = function(name){
          switch(name) {
            case 'Save':
              return 'Command+S';
            case 'Open... (.bkr)':
              return 'Command+O';
            case 'New Notebook':
              return 'Command+N';
            case 'Tutorial':
              return 'Command+H';
            default:
              return undefined;
          }
        }
        var beakerMenu = {
          label: 'Beaker',
          submenu: [
            {
              label: 'Quit',
              click: function() {
                bkUtils.Electron.IPC.send('quit');
              },
              accelerator: 'Command+Q'
            },
            {
              label: 'Change server',
              click: function() {
                bkUtils.Electron.IPC.send('try-change-server');
              }
            },
            {
              label: 'Start new local backend',
              click: function() {
                  bkUtils.Electron.IPC.send('new-backend');
              }
            }
          ]
        };
        var makeMenu = function(bkmenu){
          var menu = [];
          for (var i = 0; i < bkmenu.length; i++){
            var bkItem = bkmenu[i];
            var newItem = {
              label: bkItem.name
            }
            if (bkItem.action !== undefined)
              newItem.click = bkItem.action.bind({});
            if (bkItem.isChecked !== undefined){
              newItem.type = 'checkbox';
              newItem.checked = bkItem.isChecked();
            }
            newItem.accelerator = assignShortcut(bkItem.name);
            // Process submenu
            if (Array.isArray(bkItem.items))
              newItem.submenu = makeMenu(bkItem.items);
            if (bkItem.index !== undefined)
              menu[bkItem.index] = newItem;
            else
              menu.push(newItem);
          }
          return menu;
        };

        var template = makeMenu(Object.keys(menus).map(function(k) { return menus[k]; } ));
        template.unshift(beakerMenu);
        var menu = bkUtils.Electron.Menu.buildFromTemplate(template);
        bkUtils.Electron.Menu.setApplicationMenu(menu);
      }
    }
    return bkUtils;
  });
})();
