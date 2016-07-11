/*
 *  Copyright 2015 TWO SIGMA OPEN SOURCE, LLC
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
(function () {
  'use strict';
  var module = angular.module('bk.windowsManager', ['bk.utils', 'bk.electron']);

  module.factory('bkWindowsManager', function (bkUtils, bkElectron) {
    var _windowId = bkUtils.generateId(6);
    var _windows = {};
    var _subscriptions = [];

    var findWindowId = function (sessionId) {
      var found = _.find(_windows, {sessionId: sessionId});
      return found ? found.windowId : null;
    };

    function thisWindow(msg) {
      return msg.data.windowId === getWindowId();
    }

    function getWindowId() {
      return bkUtils.isElectron ? bkElectron.remote.getCurrentWindow().id : _windowId
    }

    return {
      init: function (disconnectCallback) {
        var self = this;
        _subscriptions.push($.cometd.subscribe('/windows/update', function (msg) {
          if (msg.data.windows) {
            _windows = msg.data.windows;
            console.log('received windows list update ' + _.size(_windows));
            console.log(_windows);
          }
        }));
        _subscriptions.push($.cometd.subscribe('/windows/close', function (msg) {
          if (thisWindow(msg) && disconnectCallback) {
            disconnectCallback();
            self.reportNotebookClosed();
          }
        }));
        $.cometd.publish('/service/windows/check', {windowId: getWindowId()});
      },
      reportOpenedNotebook: function (sessionId) {
        if (sessionId) {
          $.cometd.publish('/service/windows/report', 
            {
              windowId: getWindowId(),
              sessionId: sessionId
            }
          );
        }
      },
      isNotebookOpen: function (sessionId) {
        return _.some(_windows, function (window) {
          return window.sessionId === sessionId && window.windowId !== _windowId;
        })
      },
      disconnectWindow: function (sessionId) {
        _.forEach(_.filter(_windows,  function (window) {
          return !!sessionId && sessionId === window.sessionId; 
        }), function (window) {
          if (window.windowId !== getWindowId()) {
            $.cometd.publish('/windows/close', {windowId: window.windowId});
          }
        });
      },
      reportNotebookClosed: function () {
        $.cometd.publish('/service/windows/closed', {windowId: getWindowId()});
      },
      destroy: function () {
        if (_subscriptions) {
          _.forEach(_subscriptions, function (subscription) {
            $.cometd.unsubscribe(subscription);
          });
        }
      },
      // just for electron version
      activateOtherWindow: function (sessionId) {
        bkElectron.IPC.send('activate-window', {windowId: findWindowId(sessionId)});
        bkElectron.thisWindow.destroy();
      }
    };
  });
})();