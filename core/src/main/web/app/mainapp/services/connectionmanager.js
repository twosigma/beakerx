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
 * Module bk.sessionManager
 */
(function() {
  'use strict';
  angular.module('bk.connectionManager',['bk.globals', 'bk.utils', 'bk.sessionManager'])
  .factory('connectionManager', function($timeout, $rootScope, bkUtils, bkSessionManager, GLOBALS) {
    var OFFLINE_MESSAGE = "offline, click to download a copy";
    var CONNECTING_MESSAGE = "reconnecting";
    var reconnectTimeout;
    var statusMessage = OFFLINE_MESSAGE;
    var disconnected = false;

    var indicateReconnectFailed = function() {
      stopWaitingReconnect();
      statusMessage = OFFLINE_MESSAGE;
      bkUtils.disconnect(); // prevent further attempting to reconnect
      $rootScope.$emit(GLOBALS.EVENTS.RECONNECT_FAILED);
    };
    var waitReconnect = function() {
      statusMessage = CONNECTING_MESSAGE;

      // if reconnect didn't happen during the timeout period, prompt to save
      if (!reconnectTimeout) {
        reconnectTimeout = $timeout(indicateReconnectFailed, GLOBALS.RECONNECT_TIMEOUT);
      }
    };
    var stopWaitingReconnect = function() {
      if (reconnectTimeout) {
        $timeout.cancel(reconnectTimeout);
        reconnectTimeout = undefined;
      }
    };

    return {
      onDisconnected: function() {
        disconnected = true;
        waitReconnect();
      },
      onReconnected: function() {
        bkSessionManager.isSessionValid().then(function(isValid) {
          if (isValid) {
            stopWaitingReconnect();
            disconnected = false;
            bkSessionManager.reconnectEvaluators();
          } else {
            indicateReconnectFailed();
          }
        });
      },
      getStatusMessage: function() {
        return statusMessage;
      },
      isDisconnected: function() {
        return disconnected;
      }
    };

  });
})();