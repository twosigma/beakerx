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
 * M_evaluatorManager
 * This module loads/unloads plugins and evaluators and maintains the lists. It also serves as the
 * single point of contact of all eval plugins.
 */
(function() {
  'use strict';
  angular.module('M_evaluatorManager', [
        'M_generalUtils',
        'M_bkSession',
        'M_bkUtils',
        'M_bkHelper' // This is only for ensuring that window.bkHelper is set, don't use bkHelper directly
      ])
      .factory('evaluatorManager', function(
          generalUtils,
          bkUtils,
          bkSession
          ) {
        var nameToUrl = {// for known plugins, so we can refer to the plugin with either its name or URL
          "IPython": "./plugins/eval/ipythonPlugins/ipython/ipython.js",
          "IRuby": "./plugins/eval/ipythonPlugins/iruby/iruby.js",
          "Julia": "./plugins/eval/ipythonPlugins/julia/julia.js",
          "R": "./plugins/eval/r/r.js",
          "Groovy": "./plugins/eval/groovy/groovy.js",
          "JavaScript": "./plugin/evaluator/javaScript.js",
          "Latex": "./plugin/evaluator/latex.js",
          "Node": "./plugins/eval/node/node.js",
          "Html": "./plugin/evaluator/html.js"
        };
        var knownEvaluators = [
          {name: "IPython"},
          {name: "IRuby"},
          {name: "Julia"},
          {name: "R"},
          {name: "Groovy"},
          {name: "Node"},
          {name: "Html"},
          {name: "JavaScript"},
          {name: "Latex"}
        ];
        var plugins = [];
        var evaluators = [];
        var evaluatorsAndLoadingPlugins = [];
        var setEvaluators = function(map) {
          // XXX this should suffice but a copy of this pointer is escaping.
          // nameToUrl = {}
          for (var key in nameToUrl) {
            delete nameToUrl[key];
          }
          knownEvaluators = [];
          for (var key in map) {
            if (map.hasOwnProperty(key)) {
              nameToUrl[key] = map[key];
              knownEvaluators.push({name: key});
            }
          }
        }
        var getPlugin = function(pluginName, cb) {
          if (_.find(plugins, function(it) {
            return it.name === pluginName;
          })) {
            cb(_.find(plugins,function(it) {
              return it.name === pluginName;
            }).plugin);
          } else {
            setupPlugin(pluginName, cb);
          }
        };
        var updateEvaluatorsAndLoadingPlugins = function() {
          var i, j;
          evaluatorsAndLoadingPlugins.splice(0, evaluatorsAndLoadingPlugins.length);
          for (i in evaluators) {
            evaluators[i].loading = false;
            evaluatorsAndLoadingPlugins.push(evaluators[i]);
          }
          for (i in plugins) {
            var p = plugins[i];
            var found = false;
            for (j in evaluators) {
              var ep = evaluators[j].evaluator.settings.plugin;
              if (p.url == ep || p.url == nameToUrl[ep]) {
                found = true;
              }
            }
            if (found) continue;
            evaluatorsAndLoadingPlugins.push({loading: true, url: p.url});
          }
        };
        var newEvaluator = function(settings, alwaysCreateNewEvaluator) {
          var deferred = bkUtils.newDeferred();
          getPlugin(settings.plugin, function(Shell) {
            if (!Shell) {
              console.error("you need to setup plugin first");
            }
            if (alwaysCreateNewEvaluator) { // don't reuse even if found shell matching the ID in settings
              settings.shellID = null;
            }
            var evaluator = new Shell(settings, function() {
              // The callback is for when the plugin has
              // finished initialization.  Note that it
              // cannot be called synchronously, since
              // then evaluator would not yet be
              // defined.
              evaluators.push({name: settings.name, evaluator: evaluator});
              updateEvaluatorsAndLoadingPlugins();
              bkUtils.refreshRootScope();
            });
            deferred.resolve(evaluator);
          });
          return deferred.promise;
        };
        var setupPlugin = function(nameOrUrl, cb) {
          var url = nameToUrl[nameOrUrl] ? nameToUrl[nameOrUrl] : nameOrUrl;
          var pluginObj = _.find(plugins, function(it) {
            return it.url === url;
          });
          if (pluginObj) {
            if (cb) {
              if (pluginObj.status === "ready") {
                cb(pluginObj.plugin);
              } else {
                pluginObj.callbackOnReady.push(cb);
              }
            }
            return;
          } else {
            pluginObj = {
              url: url,
              name: "",
              plugin: null,
              status: "not ready",
              callbackOnReady: cb ? [cb] : [],
              onReady: function(MyShell) {
                this.status = "ready";
                this.name = MyShell.prototype.pluginName;
                this.plugin = MyShell;
                for (var i = 0; i < this.callbackOnReady.length; ++i) {
                  this.callbackOnReady[i](MyShell);
                }
                this.displayMessage = this.name + "(" + this.status + ")";
                bkUtils.refreshRootScope();
              },
              displayMessage: "loading from " + url
            };
            bkUtils.loadingPlugins.add(url, pluginObj);
            plugins.push(pluginObj);
            bkSession.recordLoadedPlugin(pluginObj.name, pluginObj.url);
            updateEvaluatorsAndLoadingPlugins();
            generalUtils.loadJS(url, function() {
            }, function() {
              alert("could not load plugin, bad url:\n" + url);
            });
          }
        }
        return {
          setupPlugin: setupPlugin,
          getPlugins: function() {
            return plugins;
          },
          getPlugin: getPlugin,
          newEvaluator: newEvaluator,
          setEvaluators: setEvaluators,
          nameToUrl: nameToUrl,
          createEvaluatorThenExit: function(settings) {
            this.getPlugin(settings.plugin, function(Shell) {
              if (!Shell) {
                console.error("you need to setup plugin first");
              }
              var temp = {};
              temp.evaluator = new Shell(settings, function() {
                if (temp.evaluator.exit) {
                  temp.evaluator.exit();
                }
              });
            });
          },
          getEvaluator: function(evaluatorName) {
            return _.find(evaluators, function(it) {
              return it.name === evaluatorName;
            });
          },
          getAllEvaluators: function() {
            return evaluators;
          },
          getEvaluatorsAndLoadingPlugins: function() {
            return evaluatorsAndLoadingPlugins;
          },
          getKnownEvaluators: function() {
            return knownEvaluators;
          },
          reset: function() {
            evaluatorsAndLoadingPlugins.splice(0, evaluatorsAndLoadingPlugins.length);
            plugins.splice(0, plugins.length);
            evaluators.splice(0, evaluators.length);
          },
          exitAndRemoveAllEvaluators: function() {
            _.each(evaluators, function(ev) {
              if (ev.evaluator && ev.evaluator.exit) {
                ev.evaluator.exit();
              }
            });
            evaluators.splice(0, evaluators.length);
          },
          getViewModel: function() {
            var ret = {};
            _.each(evaluators, function(ev) {
              ret[ev.name] = {
                cm: {
                  "background": ev.evaluator.background,
                  "mode": ev.evaluator.cmMode
                }
              };
            });
            return ret;
          }
        };
      });
})();
