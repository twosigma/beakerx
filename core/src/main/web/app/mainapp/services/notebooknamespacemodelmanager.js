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
 * Module bk.notebookNamespaceModelManager
 */
(function() {
  'use strict';
  var module = angular.module("bk.notebookNamespaceModelManager", []);

  module.factory("bkNotebookNamespaceModelManager", function() {
    return {
      init: function(sessionId, notebookModel) {
        $.cometd.subscribe("/namespace/" + sessionId, function(reply) {
          var name = reply.data.name;
          var value = reply.data.value;
          var sync = reply.data.sync;
          var namespace = notebookModel.namespace;
          if (undefined === sync) {
            var reply2 = {name: name, defined: false, session: sessionId};
            if (undefined !== namespace) {
              var readValue = namespace[name];
              if (undefined !== readValue) {
                reply2.value = readValue;
                reply2.defined = true;
              }
            }
            $.cometd.publish("/service/namespace/receive", JSON.stringify(reply2));
          } else {
            if (undefined === namespace) {
              notebookModel.namespace = {};
              namespace = notebookModel.namespace;
            }
            if (undefined === value) {
              delete namespace[name];
            } else {
              namespace[name] = value;
            }
            if (sync) {
              var reply2 = {name: name, session: sessionId};
              $.cometd.publish("/service/namespace/receive", JSON.stringify(reply2));
            }
          }
        });
      }
    };
  });
})();
