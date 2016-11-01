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
    window.beakerRegister.bunsenNotebookId = up[3];
    // inform beakerLab loading did fail
    parent.$(parent.document).trigger('beaker.embedded.notebookLoadFailed', [window.beakerRegister.bunsenNotebookId, message]);
  };

  window.beakerRegister.hooks.loadFinished = function(edited) {
    var uri = bkHelper.getNotebookUri();
    var up = uri.split(':');
    window.beakerRegister.bunsenNotebookId = up[3];
    // inform beakerLab loading is done
    parent.$(parent.document).trigger('beaker.embedded.notebookLoaded', [window.beakerRegister.bunsenNotebookId, bkHelper.isNotebookModelEdited()]);
  };

  window.beakerRegister.hooks.saveNotebookAsShortcut = function() {
    bkHelper.backupNotebook().then(function() {
      parent.$(parent.document).trigger('beaker.embedded.saveAs', [window.beakerRegister.bunsenNotebookId]);
    });
  };
  window.beakerRegister.hooks.newDefaultNotebookShortcut = function() {
    bkHelper.backupNotebook().then(function() {
      parent.$(parent.document).trigger('beaker.embedded.newNotebook', [window.beakerRegister.bunsenNotebookId]);
    });
  };
  window.beakerRegister.hooks.newNotebookShortcut = function() {
    bkHelper.backupNotebook().then(function() {
      parent.$(parent.document).trigger('beaker.embedded.newNotebook', [window.beakerRegister.bunsenNotebookId]);
    });
  };
  window.beakerRegister.hooks.onbeforeunload = function() {
  };
  window.beakerRegister.hooks.disableDragAndDropImport = function() {
    return true;
  };
  window.beakerRegister.hooks.codemirrorEventConfig = function(cm, allowImageDropping) {
    var cmm = cm;
    $(cm.display.sizer).on('beaker.embedded.dropItem', function (e, d) {
      e.preventDefault();
      e.stopPropagation();
      var display = cmm.display;
      var x, y, space = display.lineSpace.getBoundingClientRect();
      try { x = e.clientX - space.left; y = e.clientY - space.top; }
      catch (e) { return; }
      var pos =  cm.coordsChar({left: x, top: y}, "div");
      cm.setSelection(cm.clipPos(pos));
      cm.replaceSelection(d.payload);
    });
  };
  window.beakerRegister.hooks.preSave = function(nb) {
    if (window.beakerRegister.bunsenComment !== undefined) {
      nb.comment = window.beakerRegister.bunsenComment;
    }
    return nb;
  };

  // beakerlab is ending some data to beaker   
  $('body').bind('beaker.embedded.setBeakerLabObject', function(e, notebookId, notebookName, bkLabObj, isFullScreen, canPublish, isPublished, canBlog) {
    window.beakerRegister.notebookName = notebookName;
    window.beakerRegister.bunsenObject = bkLabObj;
    window.beakerRegister.isFullScreen = isFullScreen;
    window.beakerRegister.canPublish   = canPublish;
    window.beakerRegister.isPublished  = isPublished;
    window.beakerRegister.canBlog      = canBlog;
  });

  // beakerlab is asking beaker to save the notebook
  $('body').bind('beaker.embedded.doSave', function(e, data, comment) {
    parent.$(parent.document).trigger('beaker.embedded.saveStarted', [window.beakerRegister.bunsenNotebookId, data]);
    window.beakerRegister.bunsenComment = comment;
    bkHelper.saveNotebook().then(function() {
      parent.$(parent.document).trigger('beaker.embedded.saveDone', [window.beakerRegister.bunsenNotebookId, data]);
      parent.$(parent.document).trigger('beaker.embedded.notebookChanged', [window.beakerRegister.bunsenNotebookId, bkHelper.isNotebookModelEdited()]);
      window.beakerRegister.bunsenComment = undefined;
    },
    function(e) {
      parent.$(parent.document).trigger('beaker.embedded.saveFail', [window.beakerRegister.bunsenNotebookId, data, e]);
    });
  });

  // beakerlab is informing about a rename
  $('body').bind('beaker.embedded.renameDone', function(e, nid, newName) {
    window.beakerRegister.notebookName = newName;
  });

  // beakerlab is informing about a drag operation start
  $('body').bind('beaker.embedded.dragStart', function(e, nid, path) {
    window.beakerRegister.draggingPath = path;
  });

  // beakerlab is informing about a drag operation drop
  $('body').bind('beaker.embedded.dropped', function(e, nid, cX, cY) {
    if (window.beakerRegister.draggingPath !== undefined) {
      $(document.elementFromPoint(cX, cY)).trigger('beaker.embedded.dropItem', { 'payload': window.beakerRegister.draggingPath, 'cX': cX, 'cY': cY });
      window.beakerRegister.draggingPath = undefined;
    }
  });

})();
