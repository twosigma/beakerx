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
 * M_bkHelper
 * The bkHelper should be a subset of bkCore({@link M_bkCore}) utilities that are exposed for
 * usages external to Beaker.
 */
(function() {
  'use strict';
  var module = angular.module('M_bkHelper', [
    'M_bkUtils',
    'M_bkCore',
    'M_bkSessionManager',
    'M_bkShare'
  ]);
  /**
   * bkHelper
   * - should be the only thing plugins depend on to interact with general beaker stuffs (other than
   * conforming to the API spec)
   * - except plugins, nothing should depends on bkHelper
   * - we've made this global. We should revisit this decision and figure out the best way to load
   *   plugins dynamically
   * - it mostly should just be a subset of bkUtil
   */
  module.factory('bkHelper', function(bkUtils, bkSessionManager, bkCoreManager, bkShare) {
    var bkHelper = {
      forDebugOnly: {
        bkSessionManager: bkSessionManager,
        bkCoreManager: bkCoreManager
      },
      getBkAppViewModel: function() {
        return bkCoreManager.getBkApp().getViewModel();
      },
      getBkNotebookViewModel: function() {
        var bkNotebook = bkCoreManager.getBkNotebook();
        if (bkNotebook) {
          return bkNotebook.getViewModel();
        }
      },

      // beaker (root)
      gotoControlPanel: function() {
        return bkCoreManager.gotoControlPanel();
      },
      openNotebook: function(notebookUri, uriType, readOnly, format) {
        return bkCoreManager.openNotebook(notebookUri, uriType, readOnly, format);
      },
      newSession: function() {
        return bkCoreManager.newSession();
      },

      // bk-control only
      showAnonymousTrackingDialog: function() {
        bkCoreManager.getBkApp().showAnonymousTrackingDialog();
      },
      // bk-app
      loadNotebook: function(notebookModel, alwaysCreateNewEvaluators, notebookUri, sessionId) {
        return bkCoreManager.getBkApp().loadNotebook(
            notebookModel, alwaysCreateNewEvaluators, notebookUri, sessionId);
      },
      closeNotebook: function() {
        return bkCoreManager.closeNotebook();
      },
      saveNotebook: function() {
        return bkCoreManager.saveNotebook();
      },
      saveNotebookAs: function(notebookUri, uriType) {
        return bkCoreManager.saveNotebookAs(notebookUri, uriType);
      },
      showDefaultSavingFileChooser: function() {
        return bkCoreManager.showDefaultSavingFileChooser();
      },
      setImporter: function(format, importer) {
        return bkCoreManager.setImporter(format, importer);
      },
      evaluate: function(toEval) {
        return bkCoreManager.evaluate(toEval);
      },
      evaluateCode: function(evaluator, code) {
        return bkCoreManager.evaluateCode(evaluator, code);
      },

      // bk-notebook
      shareNotebook: function() {
        return bkCoreManager.getBkNotebook().shareAndOpenPublished();
      },

      deleteAllOutputCells: function() {
        return bkCoreManager.getBkNotebook().deleteAllOutputCells();
      },

      // session and notebook model
      // TODO, refactor this so bkHelper perform these through the bkNotebookApp
      // the session manager should owned by the bkNotebookApp and bkHelper
      // shouldn't directly depend on it
      getSessionID: function() {
        return bkSessionManager.getSessionId();
      },
      toggleNotebookLocked: function() {
        return bkSessionManager.toggleNotebookLocked();
      },
      isNotebookLocked: function() {
        return bkSessionManager.isNotebookLocked();
      },

      // utils
      showFileChooser: function(callback, template, strategy) {
        return bkCoreManager.showFileChooser(callback, template, strategy);
      },
      showErrorModal: function(msgBody, msgHeader, callback) {
        if (!msgHeader) {
          msgHeader = "Oops...";
        }
        var template = "<div class='modal-header'>" +
            "<button class='close' ng-click='close()'>Close</button>" +
            "<h3>" + msgHeader + "</h3>" +
            "</div>" +
            "<div class='modal-body'><p>" + msgBody + "</p></div>";
        return this.showFileChooser(callback, template);
      },
      showOkCancelModal: function(msgBody, msgHeader, okCB, cancelCB, okBtnTxt, cancelBtnTxt) {
        if (!msgHeader) {
          msgHeader = "Question...";
        }
        var close = function(result) {
          if (result === "OK") {
            okCB ? okCB() : null;
          } else { // cancel
            cancelCB ? cancelCB() : null;
          }
        };
        okBtnTxt = okBtnTxt ? okBtnTxt : "OK";
        cancelBtnTxt = cancelBtnTxt ? cancelBtnTxt : "Cancel";
        var template = "<div class='modal-header'>" +
            "<h3>" + msgHeader + "</h3>" +
            "</div>" +
            "<div class='modal-body'><p>" + msgBody + "</p></div>" +
            '<div class="modal-footer">' +
            "   <button class='Yes' ng-click='close(\"OK\")' class='btn'>" + okBtnTxt + "</button>" +
            "   <button class='Cancel' ng-click='close()' class='btn'>" + cancelBtnTxt + "</button>" +
            '</div>'
        return this.showFileChooser(close, template);
      },
      showYesNoCancelModal: function(
          msgBody, msgHeader, yesCB, noCB, cancelCB, yesBtnTxt, noBtnTxt, cancelBtnTxt) {
        if (!msgHeader) {
          msgHeader = "Question...";
        }
        var close = function(result) {
          if (result === "Yes") {
            yesCB ? yesCB() : null;
          } else if (result === "No") {
            noCB ? noCB() : null;
          } else { // cancel
            cancelCB ? cancelCB() : null;
          }
        };
        yesBtnTxt = yesBtnTxt ? yesBtnTxt : "Yes";
        noBtnTxt = noBtnTxt ? noBtnTxt : "No";
        cancelBtnTxt = cancelBtnTxt ? cancelBtnTxt : "Cancel";
        var template = "<div class='modal-header'>" +
            "<h3>" + msgHeader + "</h3>" +
            "</div>" +
            "<div class='modal-body'><p>" + msgBody + "</p></div>" +
            '<div class="modal-footer">' +
            "   <button class='Yes' ng-click='close(\"Yes\")' class='btn'>" + yesBtnTxt + "</button>" +
            "   <button class='No' ng-click='close(\"No\")' class='btn'>" + noBtnTxt + "</button>" +
            "   <button class='Cancel' ng-click='close()' class='btn'>" + cancelBtnTxt + "</button>" +
            '</div>'
        return this.showFileChooser(close, template);
      },
      refreshRootScope: function() {
        return bkUtils.refreshRootScope();
      },
      loadJS: function(url, success) {
        return bkUtils.loadJS(url, success);
      },
      loadCSS: function(url) {
        return bkUtils.loadCSS(url);
      },
      loadList: function(url, success, failure) {
        return bkUtils.loadList(url, success, failure);
      },
      findTable: function(elem) {
        return bkUtils.findTable(elem);
      },
      getRecentMenuItems: function() {
        return bkCoreManager.getRecentMenuItems();
      },
      getLoadingPlugin: function(key) {
        return bkCoreManager.getLoadingPlugin(key);
      },
      generateId: function() {
        return bkUtils.generateId();
      },
      httpGet: function(url, data) {
        return bkUtils.httpGet(url, data);
      },
      httpPost: function(url, data) {
        return bkUtils.httpPost(url, data);
      },
      newDeferred: function() {
        return bkUtils.newDeferred();
      },
      newPromise: function(value) {
        return bkUtils.newPromise(value);
      },
      fcall: function(func) {
        return bkUtils.fcall(func);
      },
      getHomeDirectory: function() {
        return bkUtils.getHomeDirectory();
      },
      getFileSystemFileChooserStrategy: function() {
        return bkCoreManager.getFileSystemFileChooserStrategy();
      },

      // input cell
      setInputCellKeyMapMode: function(keyMapMode) {
        return bkCoreManager.setCMKeyMapMode(keyMapMode);
      },
      getInputCellKeyMapMode: function() {
        return bkCoreManager.getCMKeyMapMode();
      },

      // bkShare
      share: bkShare,

      locatePluginService: function(id, locator) {
        return bkUtils.httpGet("/beaker/rest/plugin-services/" + id,
            locator);
      },
      getEvaluatorFactory: function(shellConstructorPromise) {
        return shellConstructorPromise.then(function(Shell) {
          return {
            create: function(settings) {
              return bkUtils.newPromise(new Shell(settings));
            }
          };
        });
      },
      getEvaluatorMenuItems: function() {
        return bkCoreManager.getEvaluatorMenuItems();
      }
    };
    window.bkHelper = bkHelper; // TODO, we want to revisit the decision of making this global
    return bkHelper;
  });
})();
