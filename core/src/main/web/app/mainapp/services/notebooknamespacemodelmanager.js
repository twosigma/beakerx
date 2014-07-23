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
        console.log("XXX setting up namespace websocket for sessionID = " + sessionId);
        // XXX this should be in another module 
        $.cometd.subscribe("/namespace/" + sessionId, function(reply) {
          console.log("XXX got commet msg sessionId=" + sessionId);
          console.log(reply);
          var name = reply.data.name;
          var value = reply.data.value;
          var sync = reply.data.sync;
          var namespace = notebookModel.namespace;
          if (undefined === sync) {
            console.log("getting");
            var reply2 = {name: name, defined: false, session: sessionId};
            if (undefined !== namespace) {
              var readValue = namespace[name];
              if (undefined !== readValue) {
                reply2.value = readValue;
                reply2.defined = true;
              }
            }
            console.log("getting4");
            console.log("sending reply back: " + reply2);
            $.cometd.publish("/service/namespace/receive", JSON.stringify(reply2));
          } else {
            console.log("setting, " + value);
            if (undefined === namespace) {
              notebookModel.namespace = {};
              namespace = notebookModel.namespace;
            }
            if (undefined === value) {
              console.log("undef");
              delete namespace[name];
            } else {
              namespace[name] = value;
            }
            console.log("checking sync");
            if (sync) {
              console.log("syncing");
              var reply2 = {name: name, session: sessionId};
              $.cometd.publish("/service/namespace/receive", JSON.stringify(reply2));
            }
          }
        });
      }
    };
  });
})();
