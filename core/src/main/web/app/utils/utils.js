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
  module.factory('bkUtils', function($rootScope, commonUtils, angularUtils, bkTrack, cometdUtils, $localStorage) {

    function endsWith(str, suffix) {
      return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }
    
    var serverRoot = endsWith(document.baseURI, 'beaker/') ? document.baseURI.substring(0,document.baseURI.length-7): document.baseURI;

    var osName = "Unknown";
    if (navigator.appVersion.indexOf("Win") != -1) {
      osName="Windows";
    } else if (navigator.appVersion.indexOf("Mac") != -1) {
      osName="MacOS";
    } else if (navigator.appVersion.indexOf("Linux") != -1) {
      osName="Linux";
    }


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
      var prefix = window.location.protocol + '//' + window.location.host + '/';
      var src = prefix + pieces[1];
      var dest = prefix + pieces[2];
      return { source:  src, destination: dest }
    }

    var getServerOS = function () {
      var _isWindows = function (version) {
        return (version.toLowerCase().indexOf("win") >= 0);
      };
      var _isMacOS = function (version) {
        return version.toLowerCase().indexOf("mac") >= 0;
      };
      var _isUnix = function (version) {
        return (version.toLowerCase().indexOf("nix") >= 0 || version.indexOf("aix") > 0 );
      };
      var _isLinux = function (version) {
        return version.toLowerCase().indexOf("nux") >= 0;
      };

      var _osName = function (version) {
        var osName = "unknown";
        if (_isWindows(version)) {
          osName = "Windows";
        } else if (_isMacOS(version)) {
          osName = "MacOS";
        } else if (_isLinux(version)) {
          osName = "Linux";
        } else if (_isUnix(version)) {
          osName = "Unix";
        }
        return osName
      };

      var isWindows = false;
      var isMacOS = false;
      var isLinux = false;
      var isUnix = false;
      var osName = 'unknown';

      if (window.beakerRegister === undefined || window.beakerRegister.isPublication === undefined) {
        angularUtils.httpGet(serverUrl("beaker/rest/util/version"))
          .success(function (result) {
            isWindows = _isWindows(result);
            isMacOS = _isMacOS(result);
            isLinux = _isLinux(result);
            isUnix = _isUnix(result);
            osName = _osName(result);
          });
      } else if (window.beakerRegister === undefined || window.beakerRegister.prefsPreset === undefined) {
        isWindows = false;
        isMacOS = false;
        isLinux = true;
        isUnix = false;
        osName = "Linux";
      } else {
        isWindows = window.beakerRegister.prefsPreset.isWindows;
        isMacOS = window.beakerRegister.prefsPreset.isMacOS;
        isLinux = window.beakerRegister.prefsPreset.isLinux;
        isUnix = window.beakerRegister.prefsPreset.isUnix;
        osName = window.beakerRegister.prefsPreset.osName;
      }
      return {
        isWindows: function(){
          return isWindows;
        },
        isMacOS: function(){
          return isMacOS;
        },
        isLinux: function(){
          return isLinux;
        },
        isUnix: function(){
          return isUnix;
        },
        osName: function(){
          return osName;
        }
      };
    };

    var serverOS = getServerOS();

    var bkUtils = {
        serverUrl: serverUrl,
        fileUrl: fileUrl,

      // wrap trackingService
      log: function(event, obj) {
        obj["version"] = $rootScope.getVersion();
        bkTrack.log(event, obj);
      },

      mime: function (extension) {

        if (extension === 'bkr') {
          return ['directory', 'Beaker-Notebook'];
        } else if (extension === 'py') {
          return ['directory', 'text/x-python'];
        } else if (extension === 'csv') {
          return ['directory', 'text/x-comma-separated-values'];
        }else if (extension === 'ipynb') {
          return ['directory', 'IPython-Notebook'];
        }

        return [];
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
      formatTimestamp: function(timestamp, tz, format) {
        return commonUtils.formatTimestamp(timestamp, tz, format);
      },
      applyTimezone: function(timestamp, tz) {
        return commonUtils.applyTimezone(timestamp, tz);
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
      // Give the angular base URL
      // XXX This function is a HACK: '$location' should probably be used instead of
      // 'location', but '$location' seems to return the wrong path.
      getBaseUrl: function() {
        return location.protocol + '//' + location.host + location.pathname + '#';
      },
      removeSpecialChars: function(str) {
        return commonUtils.removeSpecialChars(str);
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
      httpGet: function(url, data, headers) {
        return angularUtils.httpGet(url, data, headers);
      },
      httpGetCached: function(url, data, headers) {
        return angularUtils.httpGetCached(url, data, headers);
      },
      httpGetJson: function(url, data, headers) {
        return angularUtils.httpGetJson(url, data, headers);
      },
      httpDeleteJson: function(url, data, headers) {
        return angularUtils.httpDeleteJson(url, data, headers);
      },
      httpPost: function(url, data, headers) {
        return angularUtils.httpPost(url, data, headers);
      },
      httpPostJson: function(url, data,headers) {
        return angularUtils.httpPostJson(url, data, headers);
      },
      httpPutJson: function(url, data, headers) {
        return angularUtils.httpPutJson(url, data, headers);
      },
      spinUntilReady: function(url) {
        var deferred = angularUtils.newDeferred();
        var timeRemaining = 60 * 1000;
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
      getLocalDrives: function() {
        var deferred = angularUtils.newDeferred();
        this.httpGet(serverUrl("beaker/rest/file-io/getLocalDrives"))
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
      getVersionString: function () {
        var deferred = angularUtils.newDeferred();
        this.httpGet(serverUrl("beaker/rest/util/version"))
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
              deferred.resolve(data);
            }).
            error(function(data, status, header, config) {
              deferred.reject(data, status, header, config);
            });
        return deferred.promise;
      },
      getBeakerPreference: function(preferenceName) {
        return angularUtils.httpGet(serverUrl("beaker/rest/util/getPreference"), {preference: preferenceName})
          .then(function(response) {
            return response.data;
          });
      },
      generateNotebook: function(evaluators, cells, metadata) {
        var notebook = {
          beaker: "2",
          evaluators: evaluators,
          cells: cells
        };
        return _.isUndefined(metadata) ? notebook : _.extend(notebook, {metadata: metadata});
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
        angularUtils.httpGet(parseAjaxLocator(ajaxLocator).source, {}, {"X-Authorization": "Token " + $localStorage.token})
            .success(function(content) {
              if (!_.isString(content)) {
                // angular $http auto-detects JSON response and deserialize it using a JSON parser
                // we don't want this behavior, this is a hack to reverse it
                content = JSON.stringify(content);
              }
              // apply hooks
              if (window.beakerRegister !== undefined && window.beakerRegister.hooks !== undefined && window.beakerRegister.hooks.loadAjax !== undefined) {
                window.beakerRegister.hooks.loadAjax(ajaxLocator);
              }
              deferred.resolve(content);
            })
            .error(deferred.reject);
        return deferred.promise;
      },
      renameFile: function(oldPath, newPath, overwrite) {
        var deferred = angularUtils.newDeferred();
        angularUtils.httpPost(serverUrl("beaker/rest/file-io/rename"), {newPath: newPath, oldPath: oldPath, overwrite: overwrite})
            .success(deferred.resolve)
            .error(function (data, status, header, config) {
              if (status === 409) {
                deferred.reject("exists");
              } else if (data === "isDirectory") {
                deferred.reject(data);
              } else {
                deferred.reject(data, status, header, config);
              }
            });
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
        angularUtils.httpPutJson(destination, {data: contentAsJson}, {"X-Authorization": "Token " + $localStorage.token})
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
      addHandshakeListener: function(cb) {
        return cometdUtils.addHandshakeListener(cb);
      },
      removeHandshakeListener: function() {
        return cometdUtils.removeHandshakeListener();
      },
      disconnect: function() {
        return cometdUtils.disconnect();
      },
      reconnect: function() {
        return cometdUtils.reconnect();
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
          return window.loadQueuePromise.then(function() {
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
          }).catch(function(e) {console.error(e.message + " - " + e.error)});

        }
        throw "illegal arg" + url;
      },
      require: function(nameOrUrl) {
        var url = this.moduleMap.hasOwnProperty(nameOrUrl) ? this.moduleMap[nameOrUrl] : nameOrUrl;
        return window.require(url);
      },
      setEasyFormValue: function (name, value, session, onSuccess, onError) {
        var data = {
            session: session,
            name: name,
            value: value,
            publish: false
        };
        this.httpPost(
                this.serverUrl("beaker/rest/easyform/set"),
                data)
                .success(function(ret) {
                    if (onSuccess) {
                        onSuccess(ret);
                    }
                })
                .error(function(data, status, headers, config) {
                    console.error("Failed to set easyform value. " + status);
                    if (onError) {
                        onError(data);
                    }
                });
    },
    getValidNgModelString: function(str) {
      if (str) {
        return str.replace(/[\s\d`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
      }
    },
    showLanguageManagerSpinner: function(pluginName) {
      angularUtils.showLanguageManagerSpinner(pluginName);
    },
    hideLanguageManagerSpinner: function(error) {
      angularUtils.hideLanguageManagerSpinner(error);
    },
    getEvaluationFinishedNotificationUrl: function () {
      return window.beakerRegister === undefined || !window.beakerRegister.evaluationFinishedNotificationUrl
        ? null : window.beakerRegister.evaluationFinishedNotificationUrl;
    },
    // Electron: require('remote')
    isElectron: navigator.userAgent.indexOf('beaker-desktop') > -1,

    serverOS:  serverOS,

    isWindows: osName === 'Windows',
    isMacOS: osName === 'MacOS',
    osName: osName,

    rgbaToHex: function (r, g, b, a) {
      if(a == undefined){
        a = 0xFF;
      }
      var num = ((a & 0xFF) << 24) |
        ((r & 0xFF) << 16) |
        ((g & 0xFF) << 8)  |
        ((b & 0xFF));
      if(num < 0) {
        num = 0xFFFFFFFF + num + 1;
      }
      return "#" + num.toString(16);
    }

    };

    if (typeof window.loadQueuePromise === 'undefined') {
      window.loadQueuePromise = bkUtils.newPromise();
    }

    return bkUtils;
  });
})();
