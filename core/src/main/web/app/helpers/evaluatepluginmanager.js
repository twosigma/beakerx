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
 * Module bk.evaluatePluginManager
 */
(function() {
  'use strict';
  var module = angular.module('bk.evaluatePluginManager', ['bk.utils']);
  module.factory('bkEvaluatePluginManager', function(bkUtils) {
    var nameToUrlMap = {};
    var nameToVisualParams = {};
    var plugins = {};
    var loadingInProgressPlugins = [];
    
    var evaluatorLoadQueue = (function() {
      var _queue = [];
      var _loadInProgress = undefined;

      var loadEvaluator = function(ev) {
        bkHelper.showStatus("Loading plugin "+ev.name);
        console.log("loading "+ev.url+" "+ev.name);
        return bkUtils.loadModule(ev.url, ev.name);        
      };
      var doNext = function() {        
        if (_loadInProgress) {
          return;
        }
        _loadInProgress = _queue.shift();
        if (_loadInProgress) {
          console.log("do next on "+_loadInProgress.name);
          if (plugins[_loadInProgress.name] || plugins[_loadInProgress.url]) { // plugin code already loaded
            console.log("already loaded bis "+_loadInProgress.name);
            if (plugins[_loadInProgress.name]) {
              _loadInProgress.resolve(plugins[_loadInProgress.name])
              .finally(function () {
                console.log("completed 1 "+_loadInProgress.name);
                _loadInProgress = undefined;
              })
              .then(doNext);
            } else {
              _loadInProgress.resolve(plugins[_loadInProgress.url])
              .finally(function () {
                console.log("completed 2 "+_loadInProgress.name);
                _loadInProgress = undefined;
              })
              .then(doNext);
            }
            return;
          }
          return loadEvaluator(_loadInProgress)
          .then(_loadInProgress.resolve,  _loadInProgress.reject)
          .finally(function () {
            console.log("completed 3 "+_loadInProgress.name);
            bkHelper.clrStatus("Loading plugin "+_loadInProgress.name)
            _loadInProgress = undefined;
          })
          .then(doNext);
        }
      };

      return {
        add: function(evl) {
          _queue.push(evl);
          bkUtils.fcall(doNext);
        }
      };
    })();

    return {
      getKnownEvaluatorPlugins: function() {
        return nameToUrlMap;
      },
      addNameToUrlEntry: function(name, url) {
        if ( typeof url === 'string' ) {
          nameToUrlMap[name] = url;
        } else {
          nameToUrlMap[name] = url.url;
          delete url.url;
          nameToVisualParams[name] = url;
        }
      },
      getVisualParams: function(name) {
        return nameToVisualParams[name];
      },
      getEvaluatorFactoryAndShell: function(evaluatorSettings) {
        var nameOrUrl = evaluatorSettings.plugin;
        if (plugins[nameOrUrl]) { // plugin code already loaded
          console.log("already loaded");
          var deferred = bkUtils.newDeferred();
          plugins[nameOrUrl].getEvaluatorFactory().then(function(factory) {
            if (factory !== undefined && factory.create !== undefined) {
              console.log("calling create for "+name)
              return factory.create(evaluatorSettings).then(function(ev) { console.log("calling create finished for "+name);  deferred.resolve(ev); });
            } else {
              console.log("no factory for plugin "+name);
              deferred.reject("no factory for evaluator plugin");
            }
          }, function(err) {
            console.log(err);
            deferred.reject(err);
          });
          return deferred.promise;
        } else {
          var deferred = bkUtils.newDeferred();
          var name, url;
          if (nameToUrlMap[nameOrUrl]) {
            name = nameOrUrl;
            url = nameToUrlMap[nameOrUrl];
          } else {
            name = "";
            url = nameOrUrl;
          }
                
          var loadJob = {
              name: name,
              url: url,
              resolve: function(ex) {
                console.log("loadJob.resolve()");
                if (!_.isEmpty(ex.name)) {
                  plugins[ex.name] = ex;
                }
                if (!_.isEmpty(name) && name !== ex.name) {
                  plugins[name] = ex;
                }
                return ex.getEvaluatorFactory()
                  .then(function(factory) {
                    if (factory !== undefined && factory.create !== undefined) {
                      console.log("calling create for "+name);
                      return factory.create(evaluatorSettings).then(function(ev) { console.log("calling create finished for "+name); deferred.resolve(ev); });
                    } else
                      deferred.reject("no factory for evaluator plugin");
                  }, function(err) {
                    if (!_.isEmpty(ex.name)) {
                      delete plugins[ex.name];
                    }
                    if (!_.isEmpty(name) && name !== ex.name) {
                      delete plugins[name];
                    }
                    console.error(err);
                    if (_.isEmpty(name)) {
                      deferred.reject("failed to load plugin: " + url);
                    } else {
                      deferred.reject("failed to load plugin: " + name + " at " + url);
                    }
                  });
              },
              reject: function(err) {
                bkHelper.showTransientStatus("Failed loading plugin "+name+": "+err);
                console.log("loadJob.reject()");
                console.error(err);
                if (_.isEmpty(name)) {
                  deferred.reject("failed to load plugin: " + url);
                } else {
                  deferred.reject("failed to load plugin: " + name + " at " + url);
                }
              }
          };
          evaluatorLoadQueue.add(loadJob);
          return deferred.promise;
        }
      },
      createEvaluatorThenExit: function(settings) {
        var theShell;
        return this.getEvaluatorFactoryAndShell(settings)
        .then(function(evaluator) {
          if (evaluator.exit) {
            evaluator.exit();
          }
        })
        .then(function() {
          _(plugins).filter(function(aShell) {
            return aShell !== theShell;
          });
        });
      }
    };
  });
})();
