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
 * M_cometd
 * This module offers the cometd service that is used to receive 'pushes' from the server.
 */
(function() {
  'use strict';
  angular.module('M_cometd', [])
      .factory('cometd', function() {
        var subscriptions = {};
        $.cometd.unregisterTransport("websocket");
        $.cometd.init("cometd");
        var _statusListener;
        return {
          subscribe: function(update_id, callback) {
            if (!update_id) {
              return;
            }
            if (subscriptions[update_id]) {
              $.cometd.unsubscribe(subscriptions[update_id]);
              subscriptions[update_id] = null;
            }
            var cb = function(ret) {
              callback(ret.data);
            };
            var s = $.cometd.subscribe('/object_update/' + update_id, cb);
            subscriptions[update_id] = s;
          },
          unsubscribe: function(update_id) {
            if (!update_id) {
              return;
            }
            if (subscriptions[update_id]) {
              $.cometd.unsubscribe(subscriptions[update_id]);
              subscriptions[update_id] = null;
            }
          },
          addStatusListener: function(cb) {
            if (_statusListener) {
              this.removeStatusListener();
            }
            _statusListener = $.cometd.addListener("/meta/connect", cb);
          },
          removeStatusListener: function() {
            $.cometd.removeListener(_statusListener);
          }
        };
      });
})();
