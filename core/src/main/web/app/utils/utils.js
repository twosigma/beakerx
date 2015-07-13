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
    'bk.track',
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
      // Give the angular base URL
      // XXX This function is a HACK: '$location' should probably be used instead of
      // 'location', but '$location' seems to return the wrong path.
      getBaseUrl: function() {
        return location.protocol + '//' + location.host + location.pathname + '#';
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
      osName: osName
    };
    return bkUtils;
  });
})();
