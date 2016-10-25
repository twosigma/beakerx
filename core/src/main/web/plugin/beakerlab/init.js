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
  "use strict";
    
  window.beakerRegister.postHelperHooks = [];
  window.beakerRegister.isEmbedded = true;
  window.beakerRegister.disablePluginLoadFromUrl = true;
  if (window.beakerRegister.hooks === undefined) {
    window.beakerRegister.hooks = {};
  }
  window.beakerRegister.hooks.evaluate = function(a,d) {
    bkHelper.getBeakerObject().beakerObj.beakerLab = window.beakerRegister.bunsenObject;
  };
  
  window.beakerRegister.hooks.edited = function(edited) {
    // inform beakerLab about edited flag
    parent.$(parent.document).trigger('beaker.embedded.notebookChanged', [window.beakerRegister.bunsenNotebookId, edited]);
  };

  window.beakerRegister.hooks.loadFailed = function(message) {
    var uri = bkHelper.getNotebookUri();
    var up = uri.split(':');
    window.beakerRegister.bunsenNotebookId = up[4];
    console.log('my id is ',window.beakerRegister.bunsenNotebookId);
    // inform beakerLab loading did fail
    parent.$(parent.document).trigger('beaker.embedded.notebookLoadFailed', [window.beakerRegister.bunsenNotebookId, message]);
  };

  window.beakerRegister.hooks.loadFinished = function(edited) {
    var uri = bkHelper.getNotebookUri();
    var up = uri.split(':');
    window.beakerRegister.bunsenNotebookId = up[4];
    console.log('my id is ',window.beakerRegister.bunsenNotebookId);
    // inform beakerLab loading is done
    parent.$(parent.document).trigger('beaker.embedded.notebookLoaded', [window.beakerRegister.bunsenNotebookId, bkHelper.isNotebookModelEdited()]);
  };

  // beakerlab is asking beaker to save the notebook
  $('body').bind('beaker.embedded.setBeakerLabObject', function(e, data) {
    window.beakerRegister.bunsenObject = data;
  });
  
  // beakerlab is asking beaker to save the notebook
  $('body').bind('beaker.embedded.doSave', function(e, data) {
    parent.$(parent.document).trigger('beaker.embedded.saveStarted', [window.beakerRegister.bunsenNotebookId, data]);
    bkHelper.saveNotebook().then(function() { 
      parent.$(parent.document).trigger('beaker.embedded.saveDone', [window.beakerRegister.bunsenNotebookId, data]);
      parent.$(parent.document).trigger('beaker.embedded.notebookChanged', [window.beakerRegister.bunsenNotebookId, bkHelper.isNotebookModelEdited()]);
    },
    function(e) {
      parent.$(parent.document).trigger('beaker.embedded.saveFail', [window.beakerRegister.bunsenNotebookId, data, e]);
    });
  });

})();
