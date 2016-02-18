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
/**
 * Module bk.notebookNamespaceModelManager
 */
(function() {
  'use strict';
  var module = angular.module('bk.notebookManager', []);

  module.factory('bkNotebookManager', function() {
    var registrations = [];
    var listeners = [];
    return {
      init: function(notebookModel) {
        registrations.push(
          $.cometd.subscribe('/request-latest-notebook-model', function(resp) {
            if (resp.data.sessionId !== notebookModel.getSessionId()) { return; }

            $.cometd.publish('/latest-notebook-model', {
              notebookJson: notebookModel.getSaveData().notebookModelAsString
            });
          })
        );

        registrations.push($.cometd.subscribe('/sessionChange', function(reply){}));
        listeners.push($.cometd.addListener("/meta/handshake", function (reply) {
          if (reply.successful) {
            registrations.push($.cometd.subscribe('/sessionChange', function(reply){}));
          }
        }));
        bkHelper.initBeakerLanguageSettings();
      },
      reset: function() {
        _.each(registrations, function(v) {
          $.cometd.unsubscribe(v);
        });
        _.each(listeners, function(l) {
          $.cometd.removeListener(l);
        });
      }
    };
  });
})();
