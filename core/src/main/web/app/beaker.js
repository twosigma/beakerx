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
 * beaker
 * - the very root of everything, the starting point of everything
 * - setup routing
 * - only the most fundamental configs go here.
 */
(function() {
  'use strict';

  window.beaker = {
    toBeAddedToOutputDisplayFactory: {},
    bkoDirective: function(type, impl) {
      if (window.beaker.outputDisplayFactory) {
        window.beaker.outputDisplayFactory.add(type, impl);
      } else {
        this.toBeAddedToOutputDisplayFactory[type] = impl;
      }
    },
    toBeAddedToOutputDisplayService: {},
    bkoFactory: function(name, impl) {
      if (window.beaker.outputDisplayService) {
        window.beaker.outputDisplayService.addService(name, impl);
      } else {
        this.toBeAddedToOutputDisplayService[name] = impl;
      }
    },
    toBeAddedToOutputDisplayType: {},
    registerOutputDisplay: function(type, displays) {
      if (window.beaker.outputDisplayFactory) {
        window.beaker.outputDisplayFactory.addOutputDisplayType(type, displays);
      } else {
        this.toBeAddedToOutputDisplayType[type] = displays;
      }
    }
  };

  var initPlugins = function() {
    var deferred = Q.defer();
    var plugins;
    // duplicated in commonUtils.js
    function loadJS(url, success, failure) {
      var e = document.createElement('script');
      e.type = "text/javascript";
      var millis = new Date().getTime();
      e.src = url + "?_=" + millis;
      if (success) {
        e.onload = success;
      }
      if (failure) {
        e.onerror = failure;
      }
      document.head.appendChild(e);
    };
    function loadList(urls, success, failure) {
      if (urls.length == 0) {
        if (success)
          return success();
        return;
      }
      var url = urls.shift();
      loadJS(url, function() {
        loadList(urls, success, failure);
      }, failure);
    }

    $.get('../beaker/rest/util/getInitPlugins')
        .done(function(list) {
          loadList(list, function() {
            deferred.resolve();
          }, function() {
            console.log("error loading init plugins");
          });
        });
    return deferred.promise;
  };

  var setupBeakerConfigAndRun = function() {

    var beaker = angular.module('beaker', [
      'ngRoute',
      'bk.core',
      'bk.evaluatePluginManager',
      'bk.controlPanel',
      'bk.mainApp',
      'bk.helper'
    ]);

    // setup routing. the template is going to replace ng-view
    beaker.config(function($routeProvider) {
      var sessionRouteResolve = {};
      var generateId = function() {
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        return _(_.range(6)).map(function() {
          return possible.charAt(Math.floor(Math.random() * possible.length));
        }).join('');
      };
      $routeProvider
          .when('/session/new', {
            redirectTo: function() {
              var newSessionId = generateId();
              sessionRouteResolve.isNewSession = function() {
                return true;
              };
              return '/session/' + newSessionId;
            }
          })
          .when('/session/:sessionId', {
            template: JST["template/mainapp/app"](),
            resolve: sessionRouteResolve
          })
          .when('/open', {
            redirectTo: function(routeParams, path, search) {
              var newSessionId = generateId();
              sessionRouteResolve.isOpen = function() {
                return true;
              };
              sessionRouteResolve.target = function() {
                return search;
              };
              return '/session/' + newSessionId;
            }
          })
          .when('/control', {
            template: JST["template/dashboard/app"](),
          }).otherwise({
            redirectTo: "/control"
          });
    });

    beaker.config(function(bkRecentMenuProvider) {
      var recentMenuServer = {
        addItem: function(doc, callback) {
          if (!doc) {
            return;
          }

          var req = $.ajax({
            type: "POST",
            datatype: "json",
            url: "../beaker/rest/recent-menu/addItem",
            data: {item: doc}
          });
          req.done(callback);
          req.fail(function(jqXHR, textStatus) {
            console.error("Request failed: " + textStatus);
          });
        },
        getItems: function(callback) {
          var req = $.ajax({
            type: "GET",
            datatype: "json",
            url: "../beaker/rest/recent-menu/getItems",
            data: {}
          });
          req.done(callback);
          req.fail(function(jqXHR, textStatus) {
            console.error("Request failed: " + textStatus);
          });
        },
        clear: function(callback) {
          var req = $.ajax({
            type: "POST",
            datatype: "json",
            url: "../beaker/rest/recent-menu/clear",
            data: {}
          });
          req.done(callback);
          req.fail(function(jqXHR, textStatus) {
            console.error("Request failed: " + textStatus);
          });
        }
      };
      bkRecentMenuProvider.configServer(recentMenuServer);
    });

    beaker.config(function(bkShareProvider) {
      if (window.bkInit && window.bkInit.shareService) {
        bkShareProvider.config(window.bkInit.shareService);
      }
    });

    beaker.config(function(bkTrackProvider) {
      if (window.bkInit && window.bkInit.trackingService) {
        bkTrackProvider.config(window.bkInit.trackingService);
      }
    });

    beaker.run(function($location, $route, $document, bkUtils, bkCoreManager, bkHelper) {
      var user;
      var lastAction = new Date();
      var beakerRootOp = {
        gotoControlPanel: function() {
          return $location.path("/control").search({});
        },
        openNotebook: function(notebookUri, uriType, readOnly, format) {
          if (!notebookUri) {
            return;
          }

          var routeParams = {
            uri: notebookUri
          };
          if (uriType) {
            routeParams.type = uriType;
          }
          if (readOnly) {
            routeParams.readOnly = true;
          }
          if (format) {
            routeParams.format = format;
          }
          return $location.path("/open").search(routeParams);
        },
        newSession: function() {
          if ($location.$$path === "/session/new") {
            return $route.reload();
          } else {
            return $location.path("/session/new").search({});
          }
        },
        openSession: function(sessionId) {
          return $location.path("session/" + sessionId).search({});
        }
      };
      bkCoreManager.init(beakerRootOp);
      Q.delay(1000).then(function() {
        $.get("../beaker/rest/util/whoami", {}, function(data) {
          user = data;
          bkUtils.log("start", {user: data});
        }, "json");
      });
      var noteAction = function() {
        lastAction = new Date();
      };
      window.addEventListener('click', noteAction, false);
      window.addEventListener('keypress', noteAction, false);
      window.setInterval(function() {
        var now = new Date();
        if ((now - lastAction) < 60 * 1000) {
          bkUtils.log("tick", {user: user});
        }
      }, 60 * 1000);
      $document.bind('keydown', function(e) {
        if (e.which === 27) {
          $('.dropdown.open .dropdown-toggle').dropdown('toggle');
        }
      });
      window.bkHelper = bkHelper;
    });

    beaker.run(function(bkEvaluatePluginManager) {
      var defaultEvaluatorUrlMap = {// for known plugins, so we can refer to the plugin with either its name or URL
        "Html": "./plugin/evaluator/html.js",
        "Latex": "./plugin/evaluator/latex.js",
        "JavaScript": "./plugin/evaluator/javaScript.js"
      };

      _.chain(defaultEvaluatorUrlMap).each(function(value, key) {
        bkEvaluatePluginManager.addNameToUrlEntry(key, value);
      });

      if (window.bkInit && window.bkInit.getEvaluatorUrlMap) {
        var evaluatorsUrlMap = window.bkInit.getEvaluatorUrlMap();
        _.chain(evaluatorsUrlMap).keys().each(function(key) {
          var value = evaluatorsUrlMap[key];
          bkEvaluatePluginManager.addNameToUrlEntry(key, value);
        });
      }
    });

    beaker.run(function(bkUtils, $rootScope) {
      bkUtils.getVersionInfo().then(function(versionInfo) {
        window.beaker.version = versionInfo.version;
        window.beaker.buildTime = versionInfo.buildTime;
        $rootScope.getVersion = function() {
          return window.beaker.version;
        };
        $rootScope.getBuildTime = function() {
          return window.beaker.buildTime;
        };
      });
    });
  };
  var bootstrapBkApp = function() {
    // make sure requirejs reports error
    requirejs.config({
      enforceDefine: true
    });

    angular.element(document).ready(function() {
      angular.bootstrap(document, ["beaker"]);
    });
  };
  Q.fcall(initPlugins)
      .then(setupBeakerConfigAndRun)
      .then(bootstrapBkApp)
      .then(function() {
        bkHelper.debug();
        bkDebug.debugUI();
      })
      .catch(function (err) {
        console.error(err.stack);
      });
})();
