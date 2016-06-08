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

(function() {
  'use strict';

  var initOutputDisplay = function()
  {
    ZeroClipboard.config( { swfPath: "app/images/ZeroClipboard.swf", hoverClass: 'dropdown-submenu-flash' } );
  };

  var setupBeakerConfigAndRun = function() {

    var beaker = angular.module('beaker', [
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
      'bk.globals'

    ]);


    // setup routing. the template is going to replace ng-view
    beaker.config(function($routeProvider) {
      var _newSession, _import, _open, _target;
      var sessionRouteResolve = {};
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

    beaker.config(function(bkRecentMenuProvider) {
//      var recentMenuServer = {
//        addItem: function(doc, callback) {
//          if (!doc) {
//            return;
//          }
//
//          var req = $.ajax({
//            type: "POST",
//            datatype: "json",
//            url: "../beaker/rest/recent-menu/addItem",
//            data: {item: doc}
//          });
//          req.done(callback);
//          req.fail(function(jqXHR, textStatus) {
//            console.error("Request failed: " + textStatus);
//          });
//        },
//        getItems: function(callback) {
//          var req = $.ajax({
//            type: "GET",
//            datatype: "json",
//            url: "../beaker/rest/recent-menu/getItems",
//            data: {}
//          });
//          req.done(callback);
//          req.fail(function(jqXHR, textStatus) {
//            console.error("Request failed: " + textStatus);
//          });
//        },
//        clear: function(callback) {
//          var req = $.ajax({
//            type: "POST",
//            datatype: "json",
//            url: "../beaker/rest/recent-menu/clear",
//            data: {}
//          });
//          req.done(callback);
//          req.fail(function(jqXHR, textStatus) {
//            console.error("Request failed: " + textStatus);
//          });
//        }
//      };
      //bkRecentMenuProvider.configServer(recentMenuServer);
    });

    beaker.config(function(bkShareProvider) {
//      if (window.bkInit && window.bkInit.shareService) {
//        bkShareProvider.config(window.bkInit.shareService);
//      }
    });
//
    beaker.config(function(bkTrackProvider) {
//      if (window.bkInit && window.bkInit.trackingService) {
//        bkTrackProvider.config(window.bkInit.trackingService);
//      }
    });

    beaker.run(function($rootScope, $location, $route, $document, bkUtils, bkCoreManager, bkHelper, bkDragAndDropHelper) {
      var user;
      var lastAction = new Date();
      var beakerRootOp = {
        gotoControlPanel: function() {
          return $location.path("/control").search({});
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
          return $location.path("/open").search(routeParams);
        },
        newSession: function(empty) {
          var name = "/session/new";
          if (empty) {
            name = "/session/empty";
          }
          if ($location.$$path === name) {
            return $route.reload();
          } else {
            return $location.path(name).search({});
          }
        },
        openSession: function(sessionId) {
          return $location.path("session/" + sessionId).search({});
        }
      };
      bkUtils.initializeCometd(document.baseURI+'cometd/');
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
      window.bkHelper = bkHelper;
      for (var i in window.beakerRegister.postHelperHooks) {
        window.beakerRegister.postHelperHooks[i]();
      }
    });

    beaker.run(function(bkEvaluatePluginManager) {
      // for known plugins, so we can refer to the plugin with either its name or URL
      var defaultEvaluatorUrlMap = {
        "HTML": { url: "./plugin/evaluator/html.js",             bgColor: "#E3502B", fgColor: "#FFFFFF", borderColor: "",        shortName: "Ht" },
        "TeX": { url: "./plugin/evaluator/latex.js",           bgColor: "#FFFFFF", fgColor: "#030303", borderColor: "#3D4444", shortName: "Tx" },
        "JavaScript": { url: "./plugin/evaluator/javaScript.js", bgColor: "#EFDB52", fgColor: "#4A4A4A", borderColor: "",        shortName: "Js" }
      };

      _.each(defaultEvaluatorUrlMap, function(value, key) {
        bkEvaluatePluginManager.addNameToUrlEntry(key, value);
      });

      if (window.bkInit && window.bkInit.getEvaluatorUrlMap) {
        var evaluatorsUrlMap = window.bkInit.getEvaluatorUrlMap();
        var keys = _.keys(evaluatorsUrlMap);
        _.each(keys, function(key) {
          var value = evaluatorsUrlMap[key];
          bkEvaluatePluginManager.addNameToUrlEntry(key, value);
        });
      }
    });

    beaker.run(function(bkUtils, $rootScope) {
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
    beaker.run(function(GLOBALS) {
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
  Q.fcall(initOutputDisplay)
    .then(setupBeakerConfigAndRun)
    .then(bootstrapBkApp)
    .catch(function (err) {
      console.log(err);
    });
})();
