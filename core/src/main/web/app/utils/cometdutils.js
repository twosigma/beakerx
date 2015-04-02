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
 * Module bk.cometdUtils
 * This module offers the cometd service that is used to receive 'pushes' from the server.
 */
(function() {
  'use strict';
  var module = angular.module('bk.cometdUtils', []);
  module.factory('cometdUtils', function () {
    $.cometd.init({
      url: document.baseURI+'cometd/'
    });
    var _statusListener;
    return {
      addConnectedStatusListener: function (cb) {
        if (_statusListener) {
          this.removeConnectedStatusListener();
        }
        _statusListener = $.cometd.addListener("/meta/connect", cb);
      },
      removeConnectedStatusListener: function () {
        $.cometd.removeListener(_statusListener);
      },
      addOutputlogUpdateListener: function (cb) {
        var listener = $.cometd.subscribe("/outputlog", cb);
        return function() {
          $.cometd.removeListener(listener);
        };
      },
      disconnect: function() {
        return $.cometd.disconnect();
      }
    };
  });
})();
