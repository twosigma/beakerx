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
 * Module bk.helper
 * The bkHelper should be a subset of bkCore utilities that are exposed for
 * usages external to Beaker.
 */
(function() {
  'use strict';
  var module = angular.module('bk.helper', ['bk.utils', 'bk.core', 'bk.debug', 'bk.electron', 'bk.publication','bk.katexhelper']);
  /**
   * bkHelper
   * - should be the only thing plugins depend on to interact with general beaker stuffs (other than
   * conforming to the API spec)
   * - except plugins, nothing should depends on bkHelper
   * - we've made this global. We should revisit this decision and figure out the best way to load
   *   plugins dynamically
   * - it mostly should just be a subset of bkUtil
   */
  module.factory('bkHelper', function($location, $rootScope, $httpParamSerializer, $uibModal,  bkUtils, bkCoreManager, bkSessionManager, bkEvaluatorManager, bkDebug, bkElectron, bkPublicationAuth, katexhelper, GLOBALS) {
    var getCurrentApp = function() {
      return bkCoreManager.getBkApp();
    };
    var getBkNotebookWidget = function() {
      if (getCurrentApp() && getCurrentApp().getBkNotebookWidget) {
        return getCurrentApp().getBkNotebookWidget();
      } else {
        return undefined;
      }
    };

    var rgbaToHex = bkUtils.rgbaToHex;
    var defaultPlotColors = {};
    defaultPlotColors[GLOBALS.THEMES.DEFAULT] = [
      "#FF1F77B4", // blue
      "#FFFF7F0E", // orange
      "#FF2CA02C", // green
      "#FFD62728", // red
      "#FF9467BD", // purple
      "#FF8C564B", // brown
      "#FFE377C2", // pink
      "#FF7F7F7F", // gray
      "#FFBCBD22", // pear
      "#FF17BECF",  // aqua
      "#FFAEC7E8",
      "#FFFFBB78",
      "#FF98DF8A",
      "#FFFF9896",
      "#FFC5B0D5",
      "#FFC49C94",
      "#FFF7B6D2",
      "#FFC7C7C7",
      "#FFDBDB8D",
      "#FF9EDAE5"
    ];

    defaultPlotColors[GLOBALS.THEMES.AMBIANCE] = [
      "#FF1F77B4", // blue
      "#FFFF7F0E", // orange
      "#FF2CA02C", // green
      "#FFD62728", // red
      "#FF9467BD", // purple
      "#FF8C564B", // brown
      "#FFE377C2", // pink
      "#FF7F7F7F", // gray
      "#FFBCBD22", // pear
      "#FF17BECF",  // aqua
      "#FFAEC7E8",
      "#FFFFBB78",
      "#FF98DF8A",
      "#FFFF9896",
      "#FFC5B0D5",
      "#FFC49C94",
      "#FFF7B6D2",
      "#FFC7C7C7",
      "#FFDBDB8D",
      "#FF9EDAE5"
    ];

    var defaultEvaluator = GLOBALS.DEFAULT_EVALUATOR;
    $rootScope.$on("defaultEvaluatorChanged", function (event, data) {
      defaultEvaluator = data;
    });



      var bkHelper = {

      isNewNotebookShortcut: function (e){
        if (this.isMacOS){
          return e.ctrlKey && (e.which === 78);// Ctrl + n
        }
        return e.altKey && (e.which === 78);// Alt + n
      },
      isNewDefaultNotebookShortcut: function (e){
        if (this.isMacOS){
          return e.ctrlKey && e.shiftKey && (e.which === 78);// Ctrl + Shift + n
        }
        return e.altKey && e.shiftKey && (e.which === 78);// Cmd + Shift + n
      },
      isAppendCodeCellShortcut: function (e){
        if (this.isMacOS){
          return e.metaKey && !e.ctrlKey && !e.altKey && e.shiftKey && (e.which === 65);// Ctrl + Shift + A
        }
        return e.ctrlKey && !e.altKey && e.shiftKey && (e.which === 65);// Cmd + Shift + A
      },
      isAppendTextCellShortcut: function (e){
        if (this.isMacOS){
          return e.metaKey && !e.ctrlKey && !e.altKey && e.shiftKey && (e.which === 89);// Ctrl + Shift + Y
        }
        return e.ctrlKey && !e.altKey && e.shiftKey && (e.which === 89);// Cmd + Shift + Y
      },
      isInsertCodeCellAboveShortcut: function (e){
        if (this.isMacOS){
          return e.metaKey && !e.ctrlKey && !e.altKey && e.shiftKey && (e.which === 85);// Ctrl + Shift + U
        }
        return e.ctrlKey && !e.altKey && e.shiftKey && (e.which === 85);// Cmd + Shift + U
      },
      isSaveNotebookShortcut: function (e){
        if (this.isMacOS){
          return e.metaKey && !e.ctrlKey && !e.altKey && (e.which === 83);// Cmd + s
        }
        return e.ctrlKey && !e.altKey && (e.which === 83);// Ctrl + s
      },
      isLanguageManagerShortcut: function (e) {
        if (this.isMacOS) {
          return e.ctrlKey && (e.which === 76);// Ctrl + l
        }
        return e.altKey && (e.which === 76);//Alt + l
      },
      isResetEnvironmentShortcut: function (e) {
        if (this.isMacOS) {
          return e.ctrlKey && (e.which === 82); // ctrlKey + r
        }
        return e.altKey && (e.which === 82); // Alt + r
      },
      isRaiseSectionLevelShortcut: function (e) {
        if (this.isMacOS){
          return e.metaKey && !e.ctrlKey && !e.altKey && e.shiftKey && (e.which === 190);// Ctrl + Shift + >
        }
        return e.ctrlKey && !e.altKey && e.shiftKey && (e.which === 190);// Cmd + Shift + >
      },
      isLowerSectionLevelShortcut: function (e) {
        if (this.isMacOS){
          return e.metaKey && !e.ctrlKey && !e.altKey && e.shiftKey && (e.which === 188);// Ctrl + Shift + <
        }
        return e.ctrlKey && !e.altKey && e.shiftKey && (e.which === 188);// Cmd + Shift + <
      },
      isInsertAfterSectionShortcut: function(e) {
        if (this.isMacOS){
          return e.metaKey && !e.ctrlKey && !e.altKey && e.shiftKey &&
            ((e.which>=49) && (e.which<=50));// alt + Shift + 1...2
        }
        return e.ctrlKey && !e.altKey && e.shiftKey &&
          ((e.which>=49) && (e.which<=50));// alt + Shift + 1...2
      },
      isSearchReplace: function (e){
        if (this.isMacOS){
          return e.ctrlKey && (e.which === 70);// Ctrl + f
        }
        return e.altKey && (e.which === 70);// Alt + f
      },
  
      isPageUpKey: function (e) {
        return e.which === 33;
      },
      isPageDownKey: function (e) {
        return e.which === 34;
      },

      //see http://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
      // Firefox 1.0+
      isFirefox: typeof InstallTrigger !== 'undefined',
      // At least Safari 3+: "[object HTMLElementConstructor]"
      isSafari: Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0,
      // Chrome 1+
      isChrome: !!window.chrome && !!window.chrome.webstore,

      guid: function () {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
          s4() + '-' + s4() + s4() + s4();
      },

      setTheme: function (theme) {
        bkCoreManager.setTheme(theme);
      },
      getTheme: function () {
        return bkCoreManager.getTheme();
      },
      defaultPlotColors: defaultPlotColors,
      setThemeToBeakerObject: function () {
        var beakerObject = this.getBeakerObject().beakerObj;
        if (beakerObject && beakerObject.prefs) {
          beakerObject.prefs.theme = {
            name: this.getTheme(),
            plotColors: defaultPlotColors[this.getTheme()]
          };
        }
      },
      initBeakerLanguageSettings: function () {
        var beakerObj = this.getBeakerObject();
        var beaker = beakerObj.beakerObj;
        if (beaker) {
          beaker.language = {};
          beakerObj.beakerObjectToNotebook();
        }
      },
      setLanguageManagerSettingsToBeakerObject: function (plugin) {
        var beakerObject = this.getBeakerObject();
        var beaker = beakerObject.beakerObj;
        if (beaker && beaker.language) {
          var spec = plugin.spec;
          var beakerLanguageSettings = {};
          _.forOwn(spec, function(value, property){
            if(value.type === 'settableString'){
              beakerLanguageSettings[property] = plugin.settings[property] || '';
            }
          });
          beaker.language[plugin.pluginName] = beakerLanguageSettings;
          beakerObject.beakerObjectToNotebook();
        }
      },
      updateLanguageManagerSettingsInBeakerObject: function (pluginName, propertyName, propertyValue) {
        var beakerObject = this.getBeakerObject();
        var beaker = beakerObject.beakerObj;
        if (beaker && beaker.language) {
          var settings = beaker.language[pluginName];
          if (settings) {
            settings[propertyName] = propertyValue;
          }
          beakerObject.beakerObjectToNotebook();
        }
      },
      removeLanguageManagerSettingsFromBeakerObject: function (pluginName) {
        var beakerObject = this.getBeakerObject();
        var beaker = beakerObject.beakerObj;
        if (beaker && beaker.language && pluginName) {
          delete beaker.language[pluginName];
          beakerObject.beakerObjectToNotebook();
        }
      },

      // enable debug
      debug: function() {
        window.bkDebug = bkDebug;
      },

      // beaker (root)
      gotoControlPanel: function() {
        return bkCoreManager.gotoControlPanel();
      },
      openNotebook: function(notebookUri, uriType, readOnly, format) {
        return bkCoreManager.openNotebook(notebookUri, uriType, readOnly, format);
      },
      importNotebookDialog: function() {
        return bkCoreManager.importNotebookDialog();
      },
      // Empty true means truly empty new session.
      // otherwise use the default notebook.
      newSession: function(empty) {
        return bkCoreManager.newSession(empty);
      },
      getBaseUrl: function () {
        return bkUtils.getBaseUrl();
      },
      openNotebookInNewWindow: function (notebookUri, uriType, readOnly, format) {
        var params = {
          'uri': notebookUri
        };
        if (uriType) {
          params.type = uriType;
        }
        if (readOnly) {
          params.readOnly = readOnly;
        }
        if (format) {
          params.format = format;
        }
        bkHelper.openWindow(
          bkHelper.getBaseUrl() + "/open?" + $httpParamSerializer(params),
          'notebook');
      },
      // Open tab/window functions that handle the electron case
      openWindow: function(path, type) {
        if (bkUtils.isElectron) {
          if (path[0] == '/'){
            bkElectron.IPC.send('new-window', bkUtils.getBaseUrl() + path, type);
          } else {
            bkElectron.IPC.send('new-window', path, type);
          }
        } else {
          window.open(path);
        }
      },
      openStaticWindow: function(path) {
        if (bkHelper.isElectron) {
          var newWindow = new bkElectron.BrowserWindow({});
          newWindow.loadUrl(bkHelper.serverUrl('beaker/' + path));
        } else {
          window.open('./' + path);
        }
      },
      openBrowserWindow: function(path) {
        if (bkUtils.isElectron) {
          bkElectron.Shell.openExternal(path);
        } else {
          window.open(path);
        }
      },
      // Save file with electron or web dialog
      saveWithDialog: function(thenable) {
        if (bkUtils.isElectron) {
          var BrowserWindow = bkElectron.BrowserWindow;
          var Dialog = bkElectron.Dialog;
          var thisWindow = BrowserWindow.getFocusedWindow();
          var path = showElectronSaveDialog(thisWindow, options).then(function(path) {
            if (path === undefined) {
              saveFailed('cancelled');
              return;
            }
            bkUtils.httpPost('rest/file-io/setWorkingDirectory', {dir: path});
            var ret = {
              uri: path,
              uriType: 'file'
            };
            bkSessionManager.dumpDisplayStatus();
            var saveData = bkSessionManager.getSaveData();
            var fileSaver = bkCoreManager.getFileSaver(ret.uriType);
            var content = saveData.notebookModelAsString;
            fileSaver.save(ret.uri, content, true).then(function() {
              thenable.resolve(ret);
            }, thenable.reject);
          });
          return thenable.promise.then(saveDone, saveFailed);
        } else {
          thenable = savePromptChooseUri();
          return thenable.then(saveDone, saveFailed);
        }
      },
      showElectronSaveDialog: function() {
        var BrowserWindow = bkElectron.BrowserWindow;
        var Dialog = bkElectron.Dialog;
        return bkUtils.getWorkingDirectory().then(function(defaultPath) {
          var options = {
            title: 'Save Beaker Notebook',
            defaultPath: defaultPath,
            filters: [
              {name: 'Beaker Notebook Files', extensions: ['bkr']}
            ]
          };
          var path = Dialog.showSaveDialog(options);
          return path;
        });
      },
      // Open file with electron or web dialog
      openWithDialog: function(ext, uriType, readOnly, format) {
        if (bkUtils.isElectron) {
          var BrowserWindow = bkElectron.BrowserWindow;
          var Dialog = bkElectron.Dialog;
          return bkUtils.getWorkingDirectory().then(function(defaultPath) {
            var options = {
              title: 'Open Beaker Notebook',
              defaultPath: defaultPath,
              multiSelections: false,
              filters: [
                {name: 'Beaker Notebook Files', extensions: [ext]}
              ]
            };
            // Note that the open dialog return an array of paths (strings)
            var path = Dialog.showOpenDialog(options);
            if (path === undefined) {
              console.log('Open cancelled');
              return;
            } else {
              // For now, multiSelections are off, only get the first
              path = path[0];
            }
            bkUtils.httpPost('rest/file-io/setWorkingDirectory', {dir: path});
            // Format this accordingly!
            var routeParams = {
              uri: path
            };
            if (uriType) {
              routeParams.type = uriType;
            }
            if (readOnly) {
              routeParams.readOnly = true;
            }
            if (format) {
              routeParams.format = format;
            }
            bkHelper.openWindow(bkUtils.getBaseUrl() + '/open?' + jQuery.param(routeParams), 'notebook');
          });
        } else {
            bkCoreManager.showFileOpenDialog(ext).then(function(selected){
              if (selected && selected.uri)
                bkHelper.openNotebook(selected.uri, uriType, readOnly, format);
            });
        }
      },
      Electron: bkElectron,
      // current app
      getCurrentAppName: function() {
        if (!_.isEmpty(getCurrentApp().name)) {
          return getCurrentApp().name;
        }
        return "Unknown App";
      },
      hasSessionId: function() {
        if (getCurrentApp().getSessionId) {
          return true;
        }
        return false;
      },
      getSessionId: function() {
        if (getCurrentApp() && getCurrentApp().getSessionId) {
          return getCurrentApp().getSessionId();
        } else {
          return "unknown";
        }
      },
      getNotebookModel: function() {
        if (getCurrentApp() && getCurrentApp() && getCurrentApp().getNotebookModel) {
          return getCurrentApp().getNotebookModel();
        } else {
          return { };
        }
      },
      getBeakerObject: function() {
        if (getCurrentApp() && getCurrentApp().getBeakerObject) {
          return getCurrentApp().getBeakerObject();
        } else {
          return { };
        }
      },
      initBeakerPrefs: function () {
        var beakerObj = this.getBeakerObject();
        beakerObj.setupBeakerObject({});
        beakerObj.notebookToBeakerObject();
        var beaker = beakerObj.beakerObj;
        beaker.prefs = {useOutputPanel: false, outputLineLimit: 1000, outputColumnLimit: 50};
        beaker.client = {
          mac: navigator.appVersion.indexOf("Mac") != -1,
          windows: navigator.appVersion.indexOf("Win") != -1,
          linux: navigator.appVersion.indexOf("Linux") != -1
        };
        this.setThemeToBeakerObject();
        beakerObj.beakerObjectToNotebook();
      },
      stripOutBeakerPrefs: function(model) {
        if (model && model.namespace && model.namespace.prefs)
          delete model.namespace.prefs;
      },
      stripOutBeakerLanguageManagerSettings: function(model) {
        if (model && model.namespace && model.namespace.language)
          delete model.namespace.language;
      },
      stripOutBeakerClient: function(model) {
        if (model && model.namespace && model.namespace.client)
          delete model.namespace.client;
      },
      getNotebookElement: function(currentScope) {
        return bkCoreManager.getNotebookElement(currentScope);
      },
      collapseAllSections: function() {
        if (getCurrentApp() && getCurrentApp().collapseAllSections) {
          return getCurrentApp().collapseAllSections();
        } else {
          return false;
        }
      },
      openAllSections: function() {
        if (getCurrentApp() && getCurrentApp().openAllSections()) {
          return getCurrentApp().openAllSections();
        } else {
          return false;
        }
      },
      closeNotebook: function() {
        if (getCurrentApp() && getCurrentApp().closeNotebook) {
          return getCurrentApp().closeNotebook();
        } else {
          return false;
        }
      },
        saveNotebook: function() {
        if (getCurrentApp() && getCurrentApp().saveNotebook) {
          return getCurrentApp().saveNotebook();
        } else {
          return false;
        }
      },
      saveNotebookAs: function(notebookUri, uriType) {
        if (getCurrentApp() && getCurrentApp().saveNotebookAs) {
          return getCurrentApp().saveNotebookAs(notebookUri, uriType);
        } else {
          return false;
        }
      },
      renameNotebookTo: function(notebookUri, uriType) {
        if (getCurrentApp() && getCurrentApp().renameNotebookTo) {
          return getCurrentApp().renameNotebookTo(notebookUri, uriType);
        } else {
          return false;
        }
      },
      runAllCellsInNotebook: function () {
        if (getCurrentApp() && getCurrentApp().runAllCellsInNotebook) {
          return getCurrentApp().runAllCellsInNotebook();
        } else {
          return false;
        }
      },
      resetAllKernelsInNotebook: function () {
        if (getCurrentApp() && getCurrentApp().resetAllKernelsInNotebook) {
          return getCurrentApp().resetAllKernelsInNotebook();
        } else {
          return false;
        }
      },
      hasCodeCell: function(toEval) {
        if (getCurrentApp() && getCurrentApp().evaluate) {
          return getCurrentApp().hasCodeCell(toEval);
        } else {
          return false;
        }
      },
      evaluate: function(toEval) {
        if (getCurrentApp() && getCurrentApp().evaluate) {
          return getCurrentApp().evaluate(toEval);
        } else {
          return false;
        }
      },
      evaluateRoot: function(toEval) {
        if (getCurrentApp() && getCurrentApp().evaluateRoot) {
          return getCurrentApp().evaluateRoot(toEval);
        } else {
          return false;
        }
      },
      evaluateCode: function(evaluator, code) {
        if (getCurrentApp() && getCurrentApp().evaluateCode) {
          return getCurrentApp().evaluateCode(evaluator, code);
        } else {
          return false;
        }
      },
      loadLibrary: function(path, modelOutput) {
        if (getCurrentApp() && getCurrentApp().loadLibrary) {
          return getCurrentApp().loadLibrary(path, modelOutput);
        } else {
          return false;
        }
      },        
      typeset: function(element) {
        try {
          katexhelper.renderElem(element[0], {
            delimiters: [
              {left: "$$", right: "$$", display: true},
              {left: "$", right:  "$", display: false},
              {left: "\\[", right: "\\]", display: true},
              {left: "\\(", right: "\\)", display: false}
            ]
          });
        } catch(err) {
          bkHelper.show1ButtonModal(err.message + '<br>See: ' +
              '<a target="_blank" href="http://khan.github.io/KaTeX/">KaTeX website</a> and its ' +
              '<a target="_blank" href="https://github.com/Khan/KaTeX/wiki/Function-Support-in-KaTeX">' +
              'list of supported functions</a>.',
              "KaTex error");
        }
      },
      markupCellContent: function(cellContent, evaluateFn) {
        var markupDeferred = bkHelper.newDeferred();
        if (!evaluateFn) {
          evaluateFn = this.evaluateCode;
        }
        var markIt = function(content) {
          var markdownFragment = $('<div>' + content + '</div>');
          bkHelper.typeset(markdownFragment);
          var escapedHtmlContent = angular.copy(markdownFragment.html());
          markdownFragment.remove();
          var unescapedGtCharacter = escapedHtmlContent.replace(/&gt;/g, '>');
          var md = window.markdownit({
            html: true,
            linkify: true,
            typographer: true
          });

          // Remember old renderer, if overridden, or proxy to default renderer
          var defaultRender = md.renderer.rules.link_open || function (tokens, idx, options, env, self) {
              return self.renderToken(tokens, idx, options);
            };

          md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
            // check if 'target' attr has already been added
            var aIndex = tokens[idx].attrIndex('target');
            if (aIndex < 0) {
              tokens[idx].attrPush(['target', '_blank']); //add new attribute
            } else {
              tokens[idx].attrs[aIndex][1] = '_blank'; //replace value of existing attr
            }
            // pass token to default renderer.
            return defaultRender(tokens, idx, options, env, self);
          };

          var result = md.render(unescapedGtCharacter);
          markupDeferred.resolve(result);
        };

        var results = [], re = /{{([^}]+)}}/g, text;

        while (text = re.exec(cellContent)) {
          if (results.indexOf(text) === -1)
            results.push(text);
        }

        var evaluateCode = function (index) {

          if (index === results.length) {
            markIt(cellContent);
          } else {
            evaluateFn("JavaScript", results[index][1]).then(
                function (r) {
                  cellContent = cellContent.replace(results[index][0], r);
                },
                function (r) {
                  cellContent = cellContent.replace(results[index][0], "<font color='red'>" + "Error: **" + r.object[0] + "**" + "</font>");
                }
            ).finally(function () {
                  evaluateCode(index + 1);
                }
            );
          }
        };

        evaluateCode(0);

        return markupDeferred.promise;
      },
      evaluateJSinHTML: function(code, evaluateFn) {
        var markupDeferred = bkHelper.newDeferred();
        if (!evaluateFn) {
          evaluateFn = this.evaluateCode;
        }

        var results = [], re = /{{([^}]+)}}/g, text;

        while (text = re.exec(code)) {
          if (results.indexOf(text) === -1)
            results.push(text);
        }
        
        var evaluateCode = function (index) {
          if (index === results.length) {
            markupDeferred.resolve(code);
          } else {
            evaluateFn("JavaScript", results[index][1]).then(
                function (r) {
                  code = code.replace(results[index][0], r);
                },
                function (r) {
                  code = code.replace(results[index][0], "<font color='red'>" + "Error: **" + r.object[0] + "**" + "</font>");
                }
            ).finally(function () {
                  evaluateCode(index + 1);
                }
            );
          }
        };

        evaluateCode(0);

        return markupDeferred.promise;
      },
      getEvaluatorMenuItems: function() {
        if (getCurrentApp() && getCurrentApp().getEvaluatorMenuItems) {
          return getCurrentApp().getEvaluatorMenuItems();
        } else {
          return [];
        }
      },
      toggleNotebookLocked: function() {
        if (getCurrentApp() && getCurrentApp().toggleNotebookLocked) {
          return getCurrentApp().toggleNotebookLocked();
        } else {
          return false;
        }
      },
      isNotebookLocked: function() {
        if (getCurrentApp() && getCurrentApp().isNotebookLocked) {
          return getCurrentApp().isNotebookLocked();
        } else {
          return true;
        }
      },
      showAnonymousTrackingDialog: function() {
        if (getCurrentApp() && getCurrentApp().showAnonymousTrackingDialog) {
          return getCurrentApp().showAnonymousTrackingDialog();
        } else {
          return false;
        }
      },
      showStatus: function(message, nodigest) {
        if (getCurrentApp() && getCurrentApp().showStatus) {
          return getCurrentApp().showStatus(message, nodigest);
        } else {
          return false;
        }
      },
      updateStatus: function() {
        if (getCurrentApp() && getCurrentApp().updateStatus) {
          return getCurrentApp().updateStatus();
        } else {
          return false;
        }
      },
      getStatus: function() {
        if (getCurrentApp() && getCurrentApp().getStatus) {
          return getCurrentApp().getStatus();
        } else {
          return false;
        }
      },
      clearStatus: function(message, nodigest) {
        if (getCurrentApp() && getCurrentApp().clearStatus) {
          return getCurrentApp().clearStatus(message, nodigest);
        } else {
          return false;
        }
      },
      showTransientStatus: function(message, nodigest) {
        if (getCurrentApp() && getCurrentApp().showTransientStatus) {
          return getCurrentApp().showTransientStatus(message, nodigest);
        } else {
          return false;
        }
      },
      getEvaluators: function() {
        if (getCurrentApp() && getCurrentApp().getEvaluators) {
          return getCurrentApp().getEvaluators();
        } else {
          return [];
        }
      },
      setIPythonCookiesCleaned: function (value) {
        this.iPythonCookiesCleaned = value;
      },
      isIPythonCookiesCleaned: function () {
        return this.iPythonCookiesCleaned;
      },
      go2FirstErrorCodeCell: function() {
        if (getCurrentApp() && getCurrentApp().go2FirstErrorCodeCell) {
          return getCurrentApp().go2FirstErrorCodeCell();
        } else {
          return [];
        }
      },
      go2LastCodeCell: function() {
        if (getCurrentApp() && getCurrentApp().go2LastCodeCell) {
          getCurrentApp().go2LastCodeCell();
        } else {
          return [];
        }
      },
      go2FirstCell: function() {
        if (getCurrentApp() && getCurrentApp().go2FirstCell) {
          getCurrentApp().go2FirstCell();
        } else {
          return [];
        }
      },
      go2Cell: function(cellId) {
        if (getCurrentApp() && getCurrentApp().go2Cell) {
          getCurrentApp().go2Cell(cellId);
        } else {
          return [];
        }
      },
      getCodeCells: function(filter) {
        if (getCurrentApp() && getCurrentApp().getCodeCells) {
          return getCurrentApp().getCodeCells(filter);
        } else {
          return [];
        }
      },
      setCodeCellBody: function(name, code) {
        if (getCurrentApp() && getCurrentApp().setCodeCellBody) {
          return getCurrentApp().setCodeCellBody(name,code);
        } else {
          return false;
        }
      },
      setCodeCellEvaluator: function(name, evaluator) {
        if (getCurrentApp() && getCurrentApp().setCodeCellEvaluator) {
          return getCurrentApp().setCodeCellEvaluator(name, evaluator);
        } else {
          return false;
        }
      },
      setCodeCellTags: function(name, tags) {
        if (getCurrentApp() && getCurrentApp().setCodeCellTags) {
          return getCurrentApp().setCodeCellTags(name, tags);
        } else {
          return false;
        }
      },
      getVersionNumber: function () {
        return window.beakerRegister.version;
      },
      getVersionString: function () {
        return window.beakerRegister.versionString;
      },
      getPluginStartFailedMessage: function (pluginId) {
        var template;
        if(window.beakerRegister.evaluatorStartFailedMessage) {
          template = window.beakerRegister.evaluatorStartFailedMessage;
        } else {
          template = "<p>Failed to start ${pluginId}.</p>\n" +
                    "<p>Did you install it according to the instructions\n" +
                    "on <a target=\"_blank\" href=\"http://beakernotebook.com/getting-started#${pluginId}\">BeakerNotebook.com</a>?\n" +
                    "</p>\n" +
                    "<p>If you already have it, then <a target=\"_blank\"\n" +
                    "href=\"https://github.com/twosigma/beaker-notebook/wiki/Language-Preferences\">edit\n" +
                    "your preferences file</a> to help Beaker find it on your system, and\n" +
                    "then restart Beaker and try again.\n" +
                    "</p>\n" +
                    "<p>Any other languages in your notebook should still work.</p>";
        }
        return template.split('${pluginId}').join(pluginId);
      },
      // bk-notebook
      refreshBkNotebook: function () {
        var bkNotebook = getBkNotebookWidget();
        if (bkNotebook) {
          return bkNotebook.refreshScope();
        }
      },
      deleteAllOutputCells: function() {
        var bkNotebook = getBkNotebookWidget();
        if (bkNotebook) {
          return bkNotebook.deleteAllOutputCells();
        }
      },
      getBkNotebookViewModel: function() {
        var bkNotebook = getBkNotebookWidget();
        if (bkNotebook) {
          return bkNotebook.getViewModel();
        }
      },
      setInputCellKeyMapMode: function(keyMapMode) {
        var bkNotebook = getBkNotebookWidget();
        if (bkNotebook) {
          return bkNotebook.setCMKeyMapMode(keyMapMode);
        }
      },
      getInputCellKeyMapMode: function() {
        var bkNotebook = getBkNotebookWidget();
        if (bkNotebook) {
          return bkNotebook.getCMKeyMapMode();
        }
      },
      setInputCellTheme: function(theme) {
        var bkNotebook = getBkNotebookWidget();
        if (bkNotebook) {
          return bkNotebook.setCMTheme(theme);
        }
      },
      getInputCellTheme: function() {
        var bkNotebook = getBkNotebookWidget();
        if (bkNotebook) {
          return bkNotebook.getCMTheme();
        }
      },

      // low level utils (bkUtils)
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
      generateId: function(length) {
        return bkUtils.generateId(length);
      },
      serverUrl: function(path) {
        return bkUtils.serverUrl(path);
      },
      fileUrl: function(path) {
        return bkUtils.fileUrl(path);
      },
      httpGet: function(url, data) {
        return bkUtils.httpGet(url, data);
      },
      httpPost: function(url, data) {
        return bkUtils.httpPost(url, data);
      },
      spinUntilReady: function(url) {
        return bkUtils.spinUntilReady(url);
      },
      newDeferred: function() {
        return bkUtils.newDeferred();
      },
      newPromise: function(value) {
        return bkUtils.newPromise(value);
      },
      all: function(promises) {
        return bkUtils.all(promises);
      },
      fcall: function(func) {
        return bkUtils.fcall(func);
      },
      timeout: function(func, ms) {
        return bkUtils.timeout(func,ms);
      },
      cancelTimeout: function(promise) {
        return bkUtils.cancelTimeout(promise);
      },
      getHomeDirectory: function() {
        return bkUtils.getHomeDirectory();
      },
      getWorkingDirectory: function() {
        return bkUtils.getWorkingDirectory();
      },
      saveFile: function(path, contentAsJson, overwrite) {
        return bkUtils.saveFile(path, contentAsJson, overwrite);
      },
      loadFile: function(path) {
        return bkUtils.loadFile(path);
      },

      // utils (bkCore)
      setNotebookImporter: function(format, importer) {
        return bkCoreManager.setNotebookImporter(format, importer);
      },
      setFileLoader: function(uriType, fileLoader) {
        return bkCoreManager.setFileLoader(uriType, fileLoader);
      },
      setFileSaver: function(uriType, fileSaver) {
        return bkCoreManager.setFileSaver(uriType, fileSaver);
      },
      showFileSaveDialog: function(data) {
        return bkCoreManager.showFileSaveDialog(data);
      },
      showSQLLoginModalDialog: function(connectionName, connectionString, user, okCB, cancelCB) {
        return bkCoreManager.showSQLLoginModalDialog(connectionName, connectionString, user, okCB, cancelCB);
      },
      getRecentMenuItems: function() {
        return bkCoreManager.getRecentMenuItems();
      },
      showModalDialog: function(callback, template, strategy) {
        return bkCoreManager.showModalDialog(callback, template, strategy).result;
      },
      showErrorModal: function (msgBody, msgHeader, errorDetails, callback) {
        return bkCoreManager.showErrorModal(msgBody, msgHeader, errorDetails, callback);
      },
      show1ButtonModal: function(msgBody, msgHeader, callback) {
        return bkCoreManager.show1ButtonModal(msgBody, msgHeader, callback);
      },
      show2ButtonModal: function(msgBody, msgHeader, okCB, cancelCB, okBtnTxt, cancelBtnTxt) {
        return bkCoreManager.show2ButtonModal(
            msgBody, msgHeader, okCB, cancelCB, okBtnTxt, cancelBtnTxt);
      },
      show3ButtonModal: function(
          msgBody, msgHeader, yesCB, noCB, cancelCB, yesBtnTxt, noBtnTxt, cancelBtnTxt) {
        return bkCoreManager.show3ButtonModal(
            msgBody, msgHeader, yesCB, noCB, cancelCB, yesBtnTxt, noBtnTxt, cancelBtnTxt);
      },
      showMultipleButtonsModal: function(params) {
        return bkCoreManager.showMultipleButtonsModal(params);
      },
      getFileSystemFileChooserStrategy: function() {
        return bkCoreManager.getFileSystemFileChooserStrategy();
      },

      // eval utils
      locatePluginService: function(id, locator) {
        return bkUtils.httpGet(bkUtils.serverUrl("beaker/rest/plugin-services/" + id), locator);
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
      showLanguageManager: function () {
        return bkCoreManager.showLanguageManager();
      },
      showSparkConfiguration: function () {
        return bkCoreManager.showSparkConfiguration();
      },
      appendCodeCell: function () {
        var notebookCellOp = bkSessionManager.getNotebookCellOp();
        var currentCellId = $(':focus').parents('bk-cell').attr('cellid');
        var newCell;
        if (currentCellId) {
          var cell = notebookCellOp.getCell(currentCellId);
          var evaluator = cell.type === 'code' ? cell.evaluator : defaultEvaluator;
          newCell = bkSessionManager.getNotebookNewCellFactory().newCodeCell(evaluator);
          notebookCellOp.insertAfter(currentCellId, newCell);
        } else {
          newCell = bkSessionManager.getNotebookNewCellFactory().newCodeCell(defaultEvaluator);
          notebookCellOp.insertLast(newCell);
        }
        bkUtils.refreshRootScope();
        this.go2Cell(newCell.id);
      },
      appendTextCell: function () {
        var notebookCellOp = bkSessionManager.getNotebookCellOp();
        var newCell = bkSessionManager.getNotebookNewCellFactory().newMarkdownCell();
        var currentCellId = $(':focus').parents('bk-cell').attr('cellid');
        if (currentCellId) {
          notebookCellOp.insertAfter(currentCellId, newCell);
        } else {
          notebookCellOp.insertLast(newCell);
        }
        bkUtils.refreshRootScope();
        this.go2Cell(newCell.id);
      },
      insertCodeCellAbove: function () {
        var notebookCellOp = bkSessionManager.getNotebookCellOp();
        var currentCellId = $(':focus').parents('bk-cell').attr('cellid');
        var newCell;
        if (currentCellId) {
          var cell = notebookCellOp.getCell(currentCellId);
          var evaluator = cell.type === 'code' ? cell.evaluator : defaultEvaluator;
          newCell = bkSessionManager.getNotebookNewCellFactory().newCodeCell(evaluator);
          notebookCellOp.insertBefore(currentCellId, newCell);
        } else {
          newCell = bkSessionManager.getNotebookNewCellFactory().newCodeCell(defaultEvaluator);
          notebookCellOp.insertFirst(newCell);
        }
        bkUtils.refreshRootScope();
        this.go2Cell(newCell.id);
      },
      raiseSectionLevel: function () {
        var notebookCellOp = bkSessionManager.getNotebookCellOp();
        var currentCellId = $(':focus').parents('bk-cell').attr('cellid');
        if (currentCellId) {
          var cell = notebookCellOp.getCell(currentCellId);
          if (cell.type === 'section' && cell.level > 1) {
            cell.level--;
            notebookCellOp.reset();
          }
        }
      },
      lowerSectionLevel: function () {
        var notebookCellOp = bkSessionManager.getNotebookCellOp();
        var currentCellId = $(':focus').parents('bk-cell').attr('cellid');
        if (currentCellId) {
          var cell = notebookCellOp.getCell(currentCellId);
          if (cell.type === 'section' && cell.level < 4) {
            cell.level++;
            notebookCellOp.reset();
          }
        }
      },
      insertNewSectionWithLevel: function (level) {
        bkSessionManager.setNotebookModelEdited(true);
        var notebookCellOp = bkSessionManager.getNotebookCellOp();
        var currentCellId = $(':focus').parents('bk-cell').attr('cellid');
        var newCell;
        if (currentCellId){
          var cell = notebookCellOp.getCell(currentCellId);
          newCell = bkSessionManager.getNotebookNewCellFactory().newSectionCell(level);
          notebookCellOp.insertAfter(currentCellId, newCell);
        } else {
          newCell = bkSessionManager.getNotebookNewCellFactory().newSectionCell(level);
          notebookCellOp.insertFirst(newCell);
        }
        bkUtils.refreshRootScope();
        this.go2Cell(newCell.id);
      },
      showPublishForm: function() {
        return bkCoreManager.showPublishForm();
      },
      isSignedIn: function() {
        return bkPublicationAuth.isSignedIn();
      },
      signOutFromPublications: function() {
        return bkPublicationAuth.signOut();
      },
      // other JS utils
      updateCellsFromDOM: function(cells) {
        function convertCanvasToImage(elem) {
          if (elem.nodeName == 'CANVAS') {
            var img = document.createElement('img');
            img.src = elem.toDataURL();
            return img;
          }
          var childNodes = elem.childNodes;
          for (var i = 0; i < childNodes.length; i++) {
            var result = convertCanvasToImage(childNodes[i]);
            if (result != childNodes[i]) {
              elem.replaceChild(result, childNodes[i]);
            }
          }
          return elem;
        }

        for(var i = 0; i < cells.length; i++){
          var cell = cells[i];
          if (cell.type === 'section') { continue; }
          var elem = $("bk-cell[cellid='" + cell.id +"']");
          var body = elem.find( "bk-output-display[type='Html'] div div" );
          if(body.length > 0){

            // 2.5) search for any canvas elements in body and replace each with an image.
            body = convertCanvasToImage(body[0]);

            // 2) convert that part of the DOM to a string
            var newOutput = body.innerHTML;

            // 3) set the result.object to that string.
            var res = cell.output.result;
            if (res.innertype === "Html") {
              res.object = newOutput;
            }
          }
        }
      },
      sanitizeNotebookModel: function(m) {
        var notebookModelCopy = angular.copy(m);
        bkHelper.stripOutBeakerPrefs(notebookModelCopy);
        bkHelper.stripOutBeakerLanguageManagerSettings(notebookModelCopy);
        bkHelper.stripOutBeakerClient(notebookModelCopy);
        delete notebookModelCopy.evaluationSequenceNumber; //remove evaluation counter
        if (notebookModelCopy.cells) {
          for (var i = 0; i < notebookModelCopy.cells.length; i++) {
            var currentCell = notebookModelCopy.cells[i];
            if (currentCell && currentCell.output) {

              //save output height
              var cellId = currentCell.id;
              var output = $("[cellid=" + cellId + "] div.code-cell-output");
              if (output && output[0]) {
                currentCell.output.height = output[0].offsetHeight;
              }

              //Save running cells as interrupted
              if (currentCell.output.result && currentCell.output.result.innertype === 'Progress') {
                currentCell.output.result.innertype = 'Error';
                currentCell.output.result.object = 'Interrupted, saved while running.'
              }

              //remove update_id to avoid subscribing to a nonexistent object
              if (currentCell.output.result) {
                delete currentCell.output.result.update_id;
              }

              //remove evaluation counter
              delete currentCell.output.evaluationSequenceNumber;
            }
          }
        }

        //strip out the shell IDs
        _.each(notebookModelCopy.evaluators, function(evaluator) {
          if (_.isObject(evaluator)) delete evaluator.shellID;
        });

        // generate pretty JSON
        var prettyJson = bkUtils.toPrettyJson(notebookModelCopy);
        return prettyJson;
      },
      updateDocumentModelFromDOM: function(id) {
        // 1) find the cell that contains elem
        var elem = $("#" + id).closest("bk-cell");
        if (elem === undefined || elem[0] === undefined) {
          console.log("ERROR: cannot find an Html cell containing the element '" + id + "'.");
          return;
        }
        var cellid = elem[0].getAttribute("cellid");
        if (cellid === undefined) {
          console.log("ERROR: cannot find an Html cell containing the element '" + id + "'.");
          return;
        }
        var cell = bkCoreManager.getNotebookCellManager().getCell(cellid);
        if (cell === undefined) {
          console.log("ERROR: cannot find an Html cell containing the element '" + id + "'.");
          return;
        }
        this.updateCellsFromDOM([cell]);
      },

      // language plugin utilities
      setupProgressOutput: function(modelOutput) {
        var progressObj = {
            type: "BeakerDisplay",
            innertype: "Progress",
            object: {
              message: "submitting ...",
              startTime: new Date().getTime(),
              outputdata: [],
              payload: undefined
            }
          };
        modelOutput.result = progressObj;
      },
      printCanceledAnswer: function(modelOutput) {
        var progressObj = {
          type: "BeakerDisplay",
          innertype: "Error",
          object: "No password provided."
        };
        modelOutput.result = progressObj;
      },
      setupCancellingOutput: function(modelOutput) {
        if (modelOutput.result.type !== "BeakerDisplay" || modelOutput.result.innertype !== "Progress")
          setupProgressOutput(modelOutput);
        modelOutput.result.object.message = "cancelling ...";
      },
      printEvaluationProgress: function (modelOutput, text, outputType) {
        this.receiveEvaluationUpdate(modelOutput,
          {outputdata:[{type:outputType, value: text+"\n"}]}, "JavaScript");
        // XXX should not be needed but when progress meter is shown at same time
        // display is broken without this, you get "OUTPUT" instead of any lines of text.
        this.refreshRootScope();
      },  
      receiveEvaluationUpdate: function(modelOutput, evaluation, pluginName, shellId) {
        var beakerObj = bkHelper.getBeakerObject().beakerObj;
        var maxNumOfLines = beakerObj.prefs
            && beakerObj.prefs.outputLineLimit ? beakerObj.prefs.outputLineLimit : 1000;

        if (modelOutput.result !== undefined)
          modelOutput.result.status = evaluation.status;

        // save information to handle updatable results in displays
        modelOutput.pluginName = pluginName;
        modelOutput.shellId = shellId;

        // append text output (if any)
        if (evaluation.outputdata !== undefined && evaluation.outputdata.length>0) {
          var idx;
          for (idx=0; idx<evaluation.outputdata.length>0; idx++) {
            modelOutput.result.object.outputdata.push(evaluation.outputdata[idx]);
          }
          var cnt = 0;
          for (idx = 0; idx < modelOutput.result.object.outputdata.length; idx++) {
            var l = modelOutput.result.object.outputdata[idx].value.split(/\n/).length;
            if (l > 0)
              cnt += l - 1;
          }
          if (cnt > maxNumOfLines) {
            cnt -= maxNumOfLines;
            while(cnt > 0) {
              var l = modelOutput.result.object.outputdata[0].value.split(/\n/).length;
              if (l<=cnt) {
                modelOutput.result.object.outputdata.splice(0,1);
                cnt -= l;
              } else {
                var a = modelOutput.result.object.outputdata[0].value.split(/\n/);
                a.splice(0,cnt);
                modelOutput.result.object.outputdata[0].value = '...\n' + a.join('\n');
                cnt = 0;
              }
            }
          }
        }

        if (modelOutput.result === undefined) {
          console.log("WARNING: this should not happen - your plugin javascript is broken!");
          setupProgressOutput(modelOutput);
        }

        // now update payload (if needed)
        if (evaluation.payload !== undefined && modelOutput.result !== undefined && modelOutput.result.object !== undefined) {
          modelOutput.result.object.payload = evaluation.payload;
        }

        if (modelOutput.result.object !== undefined) {
          if (modelOutput.result.object.payload === undefined) {
            if (modelOutput.result.object.outputdata.length > 0) {
              modelOutput.result.object.payload = { type : "Results", outputdata : modelOutput.result.object.outputdata, payload : undefined };
            }
          } else if (modelOutput.result.object.payload.type === "Results") {
            modelOutput.result.object.payload.outputdata = modelOutput.result.object.outputdata;
          } else if (modelOutput.result.object.outputdata.length > 0) {
            modelOutput.result.object.payload = { type : "Results", outputdata : modelOutput.result.object.outputdata, payload : modelOutput.result.object.payload };
          }
        }

        if (evaluation.status === "FINISHED") {
          if (evaluation.payload === undefined) {
            if (modelOutput.result.object.payload !== undefined && modelOutput.result.object.payload.type === "Results")
              evaluation.payload = modelOutput.result.object.payload.payload;
            else
              evaluation.payload = modelOutput.result.object.payload;
          }
          modelOutput.elapsedTime = new Date().getTime() - modelOutput.result.object.startTime;

          if (modelOutput.result.object.outputdata.length === 0) {
            // single output display
            modelOutput.result = evaluation.payload;
          } else {
            // wrapper display with standard output and error
            modelOutput.result = { type : "Results", outputdata : modelOutput.result.object.outputdata, payload : evaluation.payload };
            // build output container
          }
          if (evaluation.jsonres !== undefined)
            modelOutput.dataresult = evaluation.jsonres;
        } else if (evaluation.status === "ERROR") {
          if (evaluation.payload === undefined) {
            if (modelOutput.result.object.payload !== undefined && modelOutput.result.object.payload.type === "Results")
              evaluation.payload = modelOutput.result.object.payload.payload;
            else
              evaluation.payload = modelOutput.result.object.payload;
          }
          if (evaluation.payload !== undefined && $.type(evaluation.payload)=='string') {
            evaluation.payload = evaluation.payload.split('\n');
          }
          modelOutput.elapsedTime = new Date().getTime() - modelOutput.result.object.startTime;

          if (modelOutput.result.object.outputdata.length === 0) {
            // single output display
            modelOutput.result = {
              type: "BeakerDisplay",
              innertype: "Error",
              object: evaluation.payload
            };
          } else {
            // wrapper display with standard output and error
            modelOutput.result = { type : "Results", outputdata : modelOutput.result.object.outputdata, payload : { type: "BeakerDisplay", innertype: "Error", object: evaluation.payload } };
          }
        } else if (evaluation.status === "RUNNING") {
          if (evaluation.message === undefined)
            modelOutput.result.object.message     = "running...";
          else
            modelOutput.result.object.message     = evaluation.message;
          modelOutput.result.object.progressBar   = evaluation.progressBar;
        }

        return (evaluation.status === "FINISHED" || evaluation.status === "ERROR");
      },
      getUpdateService: function() {
        var cometdUtil = {
            initialized: false,
            subscriptions: { },
            init: function(pluginName, serviceBase) {
              if (!this.initialized) {
                this.cometd = new $.Cometd();
                this.cometd.init(bkUtils.serverUrl(serviceBase + "/cometd/"));
                var self = this;
                this.hlistener = this.cometd.addListener('/meta/handshake', function(message) {
                  if (window.bkDebug) console.log(pluginName+'/meta/handshake');
                  if (message.successful) {
                    this.cometd.batch(function() {
                      var k;
                      for (k in Object.keys(self.subscriptions))
                      {
                        self.subscriptions[k] = self.cometd.resubscribe(self.subscriptions[k]);
                      }
                    });
                  }
                });
                this.initialized = true;
              }
            },
            destroy: function() {
              if (this.initialized) {
                this.cometd.removeListener(this.hlistener);
                var k;
                for (k in Object.keys(this.subscriptions))
                {
                  this.cometd.unsubscribe(this.subscriptions[k]);
                }
              }
              this.initialized = true;
              this.cometd = null;
              this.subscriptions = { };
            },
            subscribe: function(update_id, callback) {
              if (!update_id)
                return;
              if (window.bkDebug) console.log('subscribe to '+update_id);
              if (this.subscriptions[update_id]) {
                this.cometd.unsubscribe(this.subscriptions[update_id]);
                this.subscriptions[update_id] = null;
              }
              var cb = function(ret) {
                callback(ret.data);
              };
              var s = this.cometd.subscribe('/object_update/' + update_id, cb);
              this.subscriptions[update_id] = s;
            },
            unsubscribe: function(update_id) {
              if (!update_id)
                return;
              if (window.bkDebug) console.log('unsubscribe from '+update_id);
              if (this.subscriptions[update_id]) {
                this.cometd.unsubscribe(this.subscriptions[update_id]);
                this.subscriptions[update_id] = null;
              }
            },
            issubscribed: function(update_id) {
              if (!update_id)
                return false;
              return this.subscriptions[update_id] !== null;
            }
        };
        return cometdUtil;
      },
      showLanguageManagerSpinner: function(pluginName) {
        bkUtils.showLanguageManagerSpinner(pluginName);
      },
      hideLanguageManagerSpinner: function(error) {
        bkUtils.hideLanguageManagerSpinner(error);
      },
      asyncCallInLanguageManager: function(settings) {
        bkUtils.showLanguageManagerSpinner(settings.pluginName);

        bkUtils.httpPost(settings.url, settings.data).success(function(ret) {
          bkUtils.hideLanguageManagerSpinner();
          settings.onSuccess && settings.onSuccess(ret);
        }).error(function(response) {
          var statusText = response ? response.statusText : "No response from server";

          bkUtils.hideLanguageManagerSpinner(statusText);
          console.error("Request failed: " + statusText);
          settings.onFail && settings.onFail(statusText);
        });
      },

      winHeight: function () {
        return window.innerHeight || (document.documentElement || document.body).clientHeight;
      },

      isFullScreen: function (cm) {
        return /\bCodeMirror-fullscreen\b/.test(cm.getWrapperElement().className);
      },

      setFullScreen: function (cm, full) {
        var wrap = cm.getWrapperElement();
        if (full) {
          wrap.className += ' CodeMirror-fullscreen';
          wrap.style.height = this.winHeight() + 'px';
          document.documentElement.style.overflow = 'hidden';
        } else {
          wrap.className = wrap.className.replace(' CodeMirror-fullscreen', '');
          wrap.style.height = '';
          document.documentElement.style.overflow = '';
        }
        cm.refresh();
      },

      elfinder: function($elfinder, elfinderOptions){
        var elfinder;

        elFinder.prototype.i18.en.messages['cmdeditpermissions'] = 'Edit Permissions';
        elFinder.prototype._options.commands.push('editpermissions');
        elFinder.prototype._options.contextmenu.files.push('copypath');
        elFinder.prototype._options.contextmenu.cwd.push('editpermissions');

        elFinder.prototype._options.commands.push('copypath');
        elFinder.prototype._options.contextmenu.files.push('copypath');
        elFinder.prototype._options.contextmenu.cwd.push('copypath');
        elFinder.prototype.i18.en.messages['cmdcopypath'] = 'Copy Path';
        elFinder.prototype.commands.copypath = function() {
          this.exec = function(hashes) {
            bkCoreManager.show1ButtonModal(
              "<p><input type='text' autofocus onfocus='this.select();' style='width: 100%' value='"+elfinder.path(hashes[0])+"'></p>",
              "Copy to clipboard: "+ (bkHelper.isMacOS ? "&#x2318;" : "Ctrl") + "+C");

          };
          this.getstate = function() {
            //return 0 to enable, -1 to disable icon access
            return 0;
          }
        };
        elfinder = $elfinder.elfinder(elfinderOptions).elfinder('instance');
        return elfinder;
      },

      //http://stackoverflow.com/questions/7370943/retrieving-binary-file-content-using-javascript-base64-encode-it-and-reverse-de
      base64Encode: function(str) {
        var CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var out = "", i = 0, len = str.length, c1, c2, c3;
        while (i < len) {
          c1 = str.charCodeAt(i++) & 0xff;
          if (i == len) {
            out += CHARS.charAt(c1 >> 2);
            out += CHARS.charAt((c1 & 0x3) << 4);
            out += "==";
            break;
          }
          c2 = str.charCodeAt(i++);
          if (i == len) {
            out += CHARS.charAt(c1 >> 2);
            out += CHARS.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += CHARS.charAt((c2 & 0xF) << 2);
            out += "=";
            break;
          }
          c3 = str.charCodeAt(i++);
          out += CHARS.charAt(c1 >> 2);
          out += CHARS.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
          out += CHARS.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
          out += CHARS.charAt(c3 & 0x3F);
        }
        return out;
      },

      getVolume : function(elfinder)  {
        var cwd = elfinder.cwd();
        var phash = cwd.phash;
        var file = elfinder.file(cwd.hash);
        while (phash) {
          file = elfinder.file(phash);
          phash = file.phash;
        }
        return file;
      },

      path2hash : function (elfinder, path){

        var file = bkHelper.getVolume(elfinder);

        var _hash_ = function (path) {
          path = path.replace(file.name, '');
          var base = bkHelper.base64Encode(path);
          return file.hash + base
              .replace(/\+/g, "_P")
              .replace(/\-/g, "_M")
              .replace(/\\/g, "_S")
              .replace(/\./g, "_D")
              .replace(/=/g, "_E");
        };

        var _cached_ = function(hash){
          var files = elfinder.files();
          var _hashes = Object.keys(files);
          for (var i=0; i< _hashes.length; i++){
            var _hash = _hashes[i];
            if (_hash === hash)
              return true;
          }
          return false;
        };
        var hash = _hash_(path);
        var hashes = [];
        hashes.push(hash);

        while(!_cached_(hash)){
          path = path.substring(0, path.lastIndexOf(bkUtils.serverOS.isWindows() ? '\\' : '/'));
          hash = _hash_(path);
          hashes.push(hash);
        }
        return hashes;
      },

      elfinderOptions: function (getFileCallback, selectCallback, openCallback, mime, showHiddenFiles) {
        
        function getNavbarMenuItems() {
          var items = ['copy', 'cut', 'paste', 'duplicate', '|', 'rm'];
          if(!bkUtils.serverOS.isWindows()) {
            items.push('|', 'editpermissions');
          }
          return items;
        }
        
        function getToolbarItems() {
          var toolbar = [
            ['back', 'forward'],
            ['mkdir'],
            ['copy', 'cut', 'paste'],
            ['rm'],
            ['duplicate', 'rename'],
            ['view', 'sort']
          ];
          if(!bkUtils.serverOS.isWindows()) {
            toolbar.push(['editpermissions']);
          }
          return toolbar;
        }
        
        function getFileContextMenuItems() {
          var items = [
            'copy', 'copypath', 'cut', 'paste', 'duplicate', '|',
            'rm'
          ];
          if(!bkUtils.serverOS.isWindows()) {
            items.push('|', 'editpermissions');
          }
          return items;
        }

        return {
          url: bkHelper.serverUrl('beaker/connector'),
          useBrowserHistory: false,
          resizable: false,
          onlyMimes: mime,
          dragUploadAllow: false,
          showHiddenFiles: showHiddenFiles,
          getFileCallback: function (url) {
            if (getFileCallback)
              getFileCallback(url);
          },
          handlers: {
            select: function (event, elfinderInstance) {
              if (selectCallback)
                selectCallback(event, elfinderInstance);
            },
            open: function (event, elfinderInstance) {
              if (openCallback)
                openCallback(event, elfinderInstance);
            }
          },
          defaultView: 'icons',
          contextmenu: {
            // navbarfolder menu
            navbar: getNavbarMenuItems(),

            // current directory menu
            cwd: ['reload', 'back', '|', 'mkdir', 'paste'],

            // current directory file menu
            files: getFileContextMenuItems()
          },
          uiOptions: {
            // toolbar configuration
            toolbar: getToolbarItems(),

            // navbar options
            navbar: {
              minWidth: 150,
              maxWidth: 1200
            },

            // directories tree options
            tree: {
              // expand current root on init
              openRootOnLoad: false,
              // auto load current dir parents
              syncTree: true
            }
          }
        }
      },

      isElectron: bkUtils.isElectron,
      isMacOS: bkUtils.isMacOS
    };

    return bkHelper;
  });
})();
