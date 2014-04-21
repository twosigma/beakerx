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
    // duplicated in generalUtils.js
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

    $.get('/beaker/rest/util/getInitPlugins')
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
      'M_bkCore',
      'M_bkControl',
      'M_bkApp',
      'M_bkCloseSessionApp',
      'M_bkDebug'
    ]);
    // setup routing. the template is going to replace ng-view
    beaker.config(function($routeProvider) {
      $routeProvider.when('/session/:sessionID', {
        template: "<bk-app></bk-app>"
      }).when('/open', {
            template: "<bk-app></bk-app>"
          }).when('/open/:uri', {
            template: "<bk-app></bk-app>"
          }).when('/control', {
            template: "<bk-control></bk-control>"
          }).when('/close/:sessionID', {
            template: "<bk-close-session-app></bk-close-session-app>"
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
            url: "/beaker/rest/recent-menu/addItem",
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
            url: "/beaker/rest/recent-menu/getItems",
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
            url: "/beaker/rest/recent-menu/clear",
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

    beaker.config(function(trackingServiceProvider) {
      if (window.bkInit && window.bkInit.trackingService) {
        trackingServiceProvider.config(window.bkInit.trackingService);
      }
    });

    beaker.run(function($location, $document, bkCoreManager, generalUtils, bkDebug) {
      var user;
      var lastAction = new Date();
      var beakerRootOp = {
        gotoControlPanel: function() {
          $location.path("/control");
        },
        openURI: function(uri) {
          if (!uri) return;
          bkCoreManager.log("open", {uri: uri, user: user});
          $location.path("/open").search({"uri": uri});
        },
        newSession: function() {
          $location.path("/session/new");
        }
      };
      bkCoreManager.init(beakerRootOp);
      Q.delay(1000).then(function() {
        $.get("/beaker/rest/util/whoami", {}, function(data) {
          user = data;
          bkCoreManager.log("start", {user: data});
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
          bkCoreManager.log("tick", {user: user});
        }
      }, 60 * 1000);
      $document.bind('keydown', function(e) {
        if (e.which === 27) {
          $('.dropdown.open .dropdown-toggle').dropdown('toggle');
        }
      });
      window.bkDebug = bkDebug;
    });

    beaker.run(function(evaluatorManager) {
      if (window.bkInit && window.bkInit.getEvaluators) {
        evaluatorManager.setEvaluators(window.bkInit.getEvaluators());
      }
    });
  };
  var bootstrapBkApp = function() {
    angular.element(document).ready(function() {
      angular.bootstrap(document, ["beaker"]);
    });
  };
  Q.fcall(initPlugins).then(setupBeakerConfigAndRun).then(bootstrapBkApp);
})();
