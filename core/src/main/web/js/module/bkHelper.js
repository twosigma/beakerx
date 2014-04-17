/*
 *  Copyright 2014 TWO SIGMA INVESTMENTS, LLC
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
    'M_bkCore',
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
  module.factory('bkHelper', function(bkBaseSessionModel, bkCoreManager, bkShare) {
    var bkHelper = {
      forDebugOnly: {
        bkBaseSessionModel: bkBaseSessionModel,
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
      openURI: function(path) {
        return bkCoreManager.openURI(path);
      },
      newSession: function() {
        return bkCoreManager.newSession();
      },

      // bk-control only
      showAnonymousTrackingDialog: function() {
        bkCoreManager.getBkApp().showAnonymousTrackingDialog();
      },
      // bk-app
      loadNotebook: function(notebookModel, alwaysCreateNewEvaluators, notebookUri, sessionID) {
        return bkCoreManager.getBkApp().loadNotebook(
            notebookModel, alwaysCreateNewEvaluators, notebookUri, sessionID);
      },
      closeNotebook: function() {
        return bkCoreManager.getBkApp().closeNotebook();
      },
      saveNotebook: function() {
        return bkCoreManager.getBkApp().saveNotebook();
      },
      setSaveFunction: function(saveFunc) {
        return bkCoreManager.getBkApp().setSaveFunction(saveFunc);
      },
      setPathOpener: function(pathType, opener) {
        return bkCoreManager.getBkApp().setPathOpener(pathType, opener);
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
      getNotebookModel: function() {
        return bkBaseSessionModel.getNotebookModel();
      },
      getSessionID: function() {
        return bkBaseSessionModel.getSessionID();
      },
      setNotebookUrl: function(notebookUrl) {
        bkBaseSessionModel.setNotebookUrl(notebookUrl);
        bkCoreManager.recordRecentDocument(notebookUrl);
      },
      getSessionData: function() {
        return bkBaseSessionModel.getSessionData();
      },
      toggleNotebookLocked: function() {
        return bkBaseSessionModel.toggleNotebookLocked();
      },
      isNotebookLocked: function() {
        return bkBaseSessionModel.isNotebookLocked();
      },

      // notebook save functions
      registerSaveFunc: function(type, saveFunc) {
        return bkCoreManager.registerSaveFunc(type, saveFunc);
      },
      getSaveFunc: function(type) {
        return bkCoreManager.getSaveFunc(type);
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
        return bkCoreManager.refreshRootScope();
      },
      loadJS: function(url, success) {
        return bkCoreManager.loadJS(url, success);
      },
      loadCSS: function(url) {
        return bkCoreManager.loadCSS(url);
      },
      loadList: function(url, success, failure) {
        return bkCoreManager.loadList(url, success, failure);
      },
      findTable: function(elem) {
        return bkCoreManager.findTable(elem);
      },
      getDefaultNotebook: function() {
        return bkCoreManager.getDefaultNotebook();
      },
      getRecentMenuItems: function() {
        return bkCoreManager.getRecentMenuItems();
      },
      getCurrentOpenMenuItems: function() {
        return bkCoreManager.getCurrentOpenMenuItems();
      },
      getLoadingPlugin: function(key) {
        return bkCoreManager.getLoadingPlugin(key);
      },
      generateID: function() {
        return bkCoreManager.generateID();
      },
      toPrettyJson: function(jsObj) {
        return bkCoreManager.toPrettyJson(jsObj);
      },
      httpGet: function(url, data) {
        return bkCoreManager.httpGet(url, data);
      },
      httpPost: function(url, data) {
        return bkCoreManager.httpPost(url, data);
      },
      newDeferred: function() {
        return bkCoreManager.newDeferred();
      },
      loadModule: function(url, name) {
        return bkCoreManager.loadModule(url, name);
      },
      require: function(nameOrUrl) {
        return bkCoreManager.require(nameOrUrl);
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
        return bkCoreManager.httpGet("/beaker/rest/plugin-services/" + id,
            locator);
      }
    };
    window.bkHelper = bkHelper; // TODO, we want to revisit the decision of making this global
    return bkHelper;
  });
})();
