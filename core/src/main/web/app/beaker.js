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

  window.beakerRegister = {
    toBeAddedToOutputDisplayFactory: {},
    bkoDirective: function(type, impl) {
      if (window.beakerRegister.outputDisplayFactory) {
        window.beakerRegister.outputDisplayFactory.add(type, impl);
      } else {
        this.toBeAddedToOutputDisplayFactory[type] = impl;
      }
    },
    toBeAddedToOutputDisplayService: {},
    bkoFactory: function(name, impl) {
      if (window.beakerRegister.outputDisplayService) {
        window.beakerRegister.outputDisplayService.addService(name, impl);
      } else {
        this.toBeAddedToOutputDisplayService[name] = impl;
      }
    },
    toBeAddedToOutputDisplayType: {},
    registerOutputDisplay: function(type, displays) {
      if (window.beakerRegister.outputDisplayFactory) {
        window.beakerRegister.outputDisplayFactory.addOutputDisplayType(type, displays);
      } else {
        this.toBeAddedToOutputDisplayType[type] = displays;
      }
    },
    postHelperHooks: []
  };

  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1);
      if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return undefined;
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
    };

    $.ajaxSetup({headers: { "X-XSRF-TOKEN": getCookie("XSRF-TOKEN")}});
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

  var initOutputDisplay = function()
  {
    var deferred = Q.defer();

    ZeroClipboard.config( { swfPath: "app/images/ZeroClipboard.swf", hoverClass: 'dropdown-submenu-flash' } );

    function loadJS(url, success, failure) {
      var e = document.createElement('script');
      e.type = "text/javascript";
      e.src = url;
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


    if (window.bkInit && window.bkInit.getOutputDisplayCssList) {
      for ( var i = 0; i < window.bkInit.getOutputDisplayCssList.length; i++) {
        var url = window.bkInit.getOutputDisplayCssList[i];
        var link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = url;
        document.head.appendChild(link);
      }
    }
    if (window.bkInit && window.bkInit.getOutputDisplayJsList) {
      loadList(window.bkInit.getOutputDisplayJsList, function() {
        deferred.resolve();
      }, function() {
        console.log("error loading output displays");
      });
    } else
      deferred.resolve();
    return deferred.promise;
  }

  var setupBeakerConfigAndRun = function() {

    var beakerModule = angular.module('beaker', [
      'ngRoute',
      'ngStorage',
      'ngFileUpload',
      'ui.gravatar',
      'bk.core',
      'bk.evaluatePluginManager',
      'bk.controlPanel',
      'bk.mainApp',
      'bk.helper',
      'bk.utils',
      'bk.publication',
      'bk.electron',
      'bk.globals'
    ]);


    beakerModule.config(function($compileProvider) {
      $compileProvider.debugInfoEnabled(false);
    });

    // setup routing. the template is going to replace ng-view
    beakerModule.config(function($routeProvider) {
      var _newSession, _import, _open, _target;
      var generateId = function() {
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        return _(_.range(6)).map(function() {
          return possible.charAt(Math.floor(Math.random() * possible.length));
        }).join('');
      };
      var makeNewProvider = function(result) {
        return function() {
          var newSessionId = generateId();
          _newSession = result;
          return '/session/' + newSessionId;
        };
      };
      $routeProvider
          .when('/session/new', {
            redirectTo: makeNewProvider("new")
          })
          .when('/session/empty', {
            redirectTo: makeNewProvider("empty")
          })
          .when('/session/import', {
            redirectTo: function() {
              _import = true;
              return '/session/' + generateId();
            }
          })
          .when('/session/:sessionId', {
            template: JST["template/mainapp/app"](),
            controller: 'notebookRouter',
            resolve: {
              isNewSession: function() {
                return _newSession;
              },
              isImport: function() {
                return _import;
              },
              isOpen: function() {
                return _open;
              },
              target: function() {
                return _target;
              },
              clearResolves: function() {
                return function() {_newSession = _import = _open = _target = undefined;};
              }
            }
          })
          .when('/open', {
            redirectTo: function(routeParams, path, search) {
              var newSessionId = generateId();
              _open = true;
              _target = search;
              return '/session/' + newSessionId;
            }
          })
          .when('/control', {
            template: JST["template/dashboard/app"]()
          }).otherwise({
            redirectTo: "/control"
          });
    });

    beakerModule.config(function(bkRecentMenuProvider) {
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
        removeItem: function(doc, callback) {
          if (!doc) {
            return;
          }
          var req = $.ajax({
            type: "POST",
            datatype: "json",
            url: "../beaker/rest/recent-menu/removeItem",
            data: {item: angular.toJson({
              uri: doc.meta.uri,
              type: doc.meta.type,
              readOnly: doc.meta.readOnly,
              format: doc.meta.format
            })}
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

    beakerModule.config(function(bkShareProvider) {
      if (window.bkInit && window.bkInit.shareService) {
        bkShareProvider.config(window.bkInit.shareService);
      }
    });

    beakerModule.config(function(bkTrackProvider) {
      if (window.bkInit && window.bkInit.trackingService) {
        bkTrackProvider.config(window.bkInit.trackingService);
      }
    });

    beakerModule.run(function($rootScope, $location, $route, $document, bkUtils, bkCoreManager, bkHelper, bkElectron, bkDragAndDropHelper, bkSparkContextManager) {
      var user;
      var lastAction = new Date();
      var beakerRootOp = {
        gotoControlPanel: function() {
          var ret = $location.path("/control").search({});
          if (bkUtils.isElectron && !$rootScope.$$phase) {
            $rootScope.$apply();
          }
          return ret;
        },
        openNotebook: function(notebookUri, uriType, readOnly, format, newWindow) {
          if (!notebookUri) {
            return;
          }
          if (newWindow === true){
            bkHelper.openNotebookInNewWindow(notebookUri, uriType, readOnly, format);
            return null;
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

          var ret = $location.path('/open').search(routeParams);
          if (bkUtils.isElectron) {
            $rootScope.$apply();
          }
          return ret;
        },
        newSession: function(empty) {
          var name = "/session/new";
          if (empty) {
            name = "/session/empty";
          }
          if (bkUtils.isElectron){
            bkHelper.openWindow(name, 'notebook');
            return;
          }
          if ($location.$$path === name) {
            return $route.reload();
          } else {
            return $location.path(name).search({});
          }
        },
        openSession: function(sessionId) {
          if (bkUtils.isElectron) {
            bkElectron.IPC.send('session-focused', sessionId);
          } else {
            return $location.path("session/" + sessionId).search({});
          }
        }
      };
      bkUtils.initializeCometd(document.baseURI + 'cometd-' + getCookie("XSRF-TOKEN") + '/');
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
      bkCoreManager.addImportInput();
      $rootScope.hasScroll = function () {
        return window.innerHeight < document.body.clientHeight;
      };
      var doit = true;
      if (window.beakerRegister !== undefined && window.beakerRegister.hooks !== undefined && window.beakerRegister.hooks.disableDragAndDropImport !== undefined) {
        if (!window.beakerRegister.hooks.disableDragAndDropImport()) {
          doit = false;
        }
      }
      if (doit) {
        $document.bind('drop dragover', function (e) {
          e.preventDefault();
        });
        var counter = 0;
        $document.bind('dragenter', function (e) {
          if (bkDragAndDropHelper.isFileForImportDragging(e)) {
            counter++;
            $('body').addClass('dragover');
          }
        });
        $document.bind('dragleave', function (e) {
          if (bkDragAndDropHelper.isFileForImportDragging(e)) {
            counter--;
            if (counter === 0) {
              $('body').removeClass('dragover');
            }
          }
        });
        $document.bind('drop', function() {
          $('body').removeClass('dragover');
        });
      }
      
      window.bkHelper = bkHelper;
      for (var i in window.beakerRegister.postHelperHooks) {
        window.beakerRegister.postHelperHooks[i]();
      }
      window.bkSparkContextManager = bkSparkContextManager;
    });

    beakerModule.run(function(bkEvaluatePluginManager) {
      // for known plugins, so we can refer to the plugin with either its name or URL
      var defaultEvaluatorUrlMap = {
        "HTML": { url: "./plugin/evaluator/html.js",             bgColor: "#E3502B", fgColor: "#FFFFFF", borderColor: "",        shortName: "Ht", tooltip: "HTML stands for Hyper text markup language, including CSS." },
        "TeX": { url: "./plugin/evaluator/latex.js",           bgColor: "#FFFFFF", fgColor: "#030303", borderColor: "#3D4444", shortName: "Tx", tooltip: "TeX is Donald Knuth's mathematical typesetting language." },
        "JavaScript": { url: "./plugin/evaluator/javaScript.js", bgColor: "#EFDB52", fgColor: "#4A4A4A", borderColor: "",        shortName: "Js", tooltip: "JavaScript is the native scripting language of the web." }
      };

      _.each(defaultEvaluatorUrlMap, function(value, key) {
        bkEvaluatePluginManager.addNameToUrlEntry(key, value);
      });

      if (window.bkInit && window.bkInit.getEvaluatorUrlMap) {
        var evaluatorsUrlMap = window.bkInit.getEvaluatorUrlMap();
        _(evaluatorsUrlMap).keys().each(function(key) {
          var value = evaluatorsUrlMap[key];
          bkEvaluatePluginManager.addNameToUrlEntry(key, value);
        }).value();
      }
    });

    beakerModule.run(function(bkUtils, $rootScope) {
      bkUtils.getVersionInfo().then(function(versionInfo) {
        window.beakerRegister.version = versionInfo.version;
        window.beakerRegister.buildTime = versionInfo.buildTime;
        $rootScope.getVersion = function() {
          return window.beakerRegister.version;
        };
        $rootScope.getBuildTime = function() {
          return window.beakerRegister.buildTime;
        };
      });
      bkUtils.getVersionString().then(function (versionString) {
        window.beakerRegister.versionString = versionString;
      });
    });
    beakerModule.run(function(bkPublicationAuth, $location, $localStorage, $window) {
      var params = $location.search();
      if (params["token"]) {
        $localStorage.token = params["token"];
        $window.close();
      }
    });
    beakerModule.run(function(GLOBALS) {
      // make sure requirejs reports error
      requirejs.config({
        waitSeconds: GLOBALS.REQUIREJS_TIMEOUT,
        enforceDefine: true
      });
    });
  };
  var bootstrapBkApp = function() {
    angular.element(document).ready(function() {
      angular.bootstrap(document, ["beaker"]);
    });
  };
  Q.fcall(initPlugins).then(initOutputDisplay)
      .then(setupBeakerConfigAndRun)
      .then(bootstrapBkApp)
      .catch(function (err) {
        console.log(err);
      });
})();
