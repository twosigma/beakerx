/*
 *  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the 'License');
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an 'AS IS' BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

(function() {
  'use strict';
  var module = angular.module('bk.controlPanel');

  module.directive('bkControlPanel', function(
        bkUtils, bkHelper, bkCoreManager, bkSession, bkMenuPluginManager, bkTrack, bkElectron, connectionManager, bkRecentMenu, $location) {
    return {
      restrict: 'E',
      template: JST['controlpanel/controlpanel'](),
      controller: function($scope) {
        document.title = 'Beaker';
        var _impl = {
          name: 'bkControlApp',
          showAnonymousTrackingDialog: function() {
            $scope.$evalAsync(function() {
              $scope.isAllowAnonymousTracking = null;
            });
          }
        };

        bkCoreManager.setBkAppImpl(_impl);

        $scope.gotoControlPanel = function(event) {
          if (bkUtils.isMiddleClick(event)) {
            bkHelper.openWindow($location.absUrl() + '/beaker', 'control-panel');
          } else {
            location.reload();
          }
        };

        // setup menus
        bkMenuPluginManager.clear();
        if (window.beakerRegister === undefined || window.beakerRegister.isPublication === undefined) {
          bkUtils.httpGet('../beaker/rest/util/getControlPanelMenuPlugins')
            .success(function(menuUrls) {
              menuUrls.forEach(function(url) {
                bkMenuPluginManager.loadMenuPlugin(url);
              });
            });
        } else {
          var menues = window.beakerRegister.getControlMenuItems();
          bkMenuPluginManager.attachMenus(menues);
        }

        $scope.getMenus = function() {
          return bkMenuPluginManager.getMenus();
        };

        if (bkUtils.isElectron){
          window.addEventListener('focus', function() {
            bkElectron.updateMenus(bkMenuPluginManager.getMenus());
          });
        }

        // actions for UI
        $scope.newNotebook = function() {
          bkCoreManager.newSession(true);
        };
        $scope.newDefaultNotebook = function() {
          bkCoreManager.newSession(false);
        };
        $scope.openNotebook = function() {
          bkHelper.openWithDialog('bkr');
        };
        $scope.openTutorial = function() {
          var uri = window.beakerRegister.tutorialUri || 'file:config/tutorial.bkr'
          bkHelper.openNotebookInNewWindow(uri, 'file', true, 'bkr');
        };

        $scope.getElectronMode = function() {
          return bkUtils.isElectron;
        };

        // ask for tracking permission
        $scope.isAllowAnonymousTracking = false;
        if ((window.beakerRegister === undefined || window.beakerRegister.isPublication === undefined) && bkTrack.isNeedPermission()) {
          bkUtils.getBeakerPreference('allow-anonymous-usage-tracking').then(function(allow) {
            switch (allow) {
              case 'true':
                $scope.isAllowAnonymousTracking = true;
                break;
              case 'false':
                $scope.isAllowAnonymousTracking = false;
                break;
              default:
                $scope.isAllowAnonymousTracking = null;
            }
          });
        } else {
          $scope.isAllowAnonymousTracking = true;
        }
        if (window.beakerRegister === undefined || window.beakerRegister.isPublication === undefined) {
          $scope.$watch('isAllowAnonymousTracking', function(newValue, oldValue) {
            if (newValue !== oldValue) {
              var allow = null;
              if (newValue) {
                allow = 'true';
                bkTrack.enable();
              } else if (newValue === false) {
                allow = 'false';
                bkTrack.disable();
              }
              bkUtils.httpPost('../beaker/rest/util/setPreference', {
                preferencename: 'allow-anonymous-usage-tracking',
                preferencevalue: allow
              });
            }
          });
        }
        $scope.showWhatWeLog = function() {
          return bkCoreManager.showModalDialog(
              function() {},
              JST['controlpanel/what_we_log']()
              );
        };

        var keydownHandler = function(e) {
          if (bkHelper.isNewDefaultNotebookShortcut(e)) { // Ctrl/Alt + Shift + n
            bkUtils.fcall(function() {
              $scope.newDefaultNotebook();
            });
            return false;
          } else if (bkHelper.isNewNotebookShortcut(e)) { // Ctrl/Alt + n
            bkUtils.fcall(function() {
              $scope.newNotebook();
            });
            return false;
          } else if (bkUtils.isElectron) {
            var ctrlXORCmd = (e.ctrlKey || e.metaKey) && !(e.ctrlKey && e.metaKey);
            // Command H
            if (ctrlXORCmd && e.which === 72) {
              bkElectron.minimize();
            }

            // Command W
            if (ctrlXORCmd && e.which === 87) {
              bkElectron.closeWindow();
            }

            if (e.which === 123) { // F12
              bkElectron.toggleDevTools();
              return false;
            } else if (ctrlXORCmd && ((e.which === 187) || (e.which === 107))) { // Ctrl + '+'
              bkElectron.increaseZoom();
              return false;
            } else if (ctrlXORCmd && ((e.which === 189) || (e.which === 109))) { // Ctrl + '-'
              bkElectron.decreaseZoom();
              return false;
            } else if (ctrlXORCmd && ((e.which === 48) || (e.which === 13))) {
              bkElectron.resetZoom();
              return false;
            }
          }
        };
        $(document).bind('keydown', keydownHandler);

        var onDestroy = function() {
          $(document).unbind('keydown', keydownHandler);
        };
        $scope.$on('$destroy', onDestroy);

        // sessions list UI
        $scope.sessions = null;
        // get list of opened sessions
        $scope.reloadSessionsList = function() {
          bkSession.getSessions().then(function(sessions) {
            $scope.sessions = _.map(sessions, function(session, sessionId) {
              session.id = sessionId;
              return session;
            });
          });
        };
        $scope.reloadSessionsList();

        // Listen to backend for changes to session list
        $.cometd.subscribe('/sessionChange', function(reply){
          $scope.reloadSessionsList();
        });

        $scope.isSessionsListEmpty = function() {
          return _.isEmpty($scope.sessions);
        };

        $scope.recents = null;
        $scope.getRecentMenuItems = function() {
          $scope.recents = bkCoreManager.getRecentMenuItems();
        };

        $scope.isRecentEmpty = function() {
          var isEmpty = _.isEmpty($scope.recents);
          if ($scope.recents && $scope.recents.length) {
            isEmpty = $scope.recents[0] && $scope.recents[0].disabled;
          }

          return isEmpty;
        };

        $scope.getRecentMenuItems();

        $scope.openRecent = function (item, event) {
          if (_.isFunction(item.action)) {
            if ((bkUtils.isMacOS && event.metaKey) || (!bkUtils.isMacOS && event.ctrlKey)) {
              item.action(true);
            } else {
              item.action();
            }
          }
        };

        $scope.removeRecent = function (item, event) {
          bkRecentMenu.removeRecentDocument(item);
        };

        var isDisconnected = function() {
          return connectionManager.isDisconnected();
        };

        bkUtils.addConnectedStatusListener(function(msg) {
          if (isDisconnected() && msg.successful) {
            connectionManager.onReconnected();
          }
          if (msg.failure) {
            connectionManager.onDisconnected();
          }
          $scope.disconnected = isDisconnected();
          return $scope.$digest();
        });
      }
    };
  });

})();
