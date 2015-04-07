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
  var module = angular.module('bk.helper', ['bk.utils', 'bk.core', 'bk.share', 'bk.debug']);
  /**
   * bkHelper
   * - should be the only thing plugins depend on to interact with general beaker stuffs (other than
   * conforming to the API spec)
   * - except plugins, nothing should depends on bkHelper
   * - we've made this global. We should revisit this decision and figure out the best way to load
   *   plugins dynamically
   * - it mostly should just be a subset of bkUtil
   */
  module.factory('bkHelper', function(bkUtils, bkCoreManager, bkShare, bkDebug) {
    var getCurrentApp = function() {
      return bkCoreManager.getBkApp();
    };
    var getBkNotebookWidget = function() {
      if (getCurrentApp().getBkNotebookWidget) {
        return getCurrentApp().getBkNotebookWidget();
      } else {
        console.error("Current app doesn't support getBkNotebookWidget");
      }
    };

    var bkHelper = {
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
        if (getCurrentApp().getSessionId) {
          return getCurrentApp().getSessionId();
        } else {
          console.error("Current app doesn't support getSessionId");
        }
      },
      getNotebookModel: function() {
        if (getCurrentApp().getNotebookModel) {
          return getCurrentApp().getNotebookModel();
        } else {
          console.error("Current app doesn't support getNotebookModel");
        }
      },
      getBeakerObject: function() {
        if (getCurrentApp().getBeakerObject) {
          return getCurrentApp().getBeakerObject();
        } else {
          console.error("Current app doesn't support getBeakerObject");
        }
      },
      collapseAllSections: function() {
        if (getCurrentApp().collapseAllSections) {
          return getCurrentApp().collapseAllSections();
        } else {
          console.error("Current app doesn't support collapseAllSections");
        }
      },
      closeNotebook: function() {
        if (getCurrentApp().closeNotebook) {
          return getCurrentApp().closeNotebook();
        } else {
          console.error("Current app doesn't support closeNotebook");
        }
      },
      saveNotebook: function() {
        if (getCurrentApp().saveNotebook) {
          return getCurrentApp().saveNotebook();
        } else {
          console.error("Current app doesn't support saveNotebook");
        }
      },
      saveNotebookAs: function(notebookUri, uriType) {
        if (getCurrentApp().saveNotebookAs) {
          return getCurrentApp().saveNotebookAs(notebookUri, uriType);
        } else {
          console.error("Current app doesn't support saveNotebookAs");
        }
      },
      hasCodeCell: function(toEval) {
        if (getCurrentApp().evaluate) {
          return getCurrentApp().hasCodeCell(toEval);
        } else {
          return false;
        }
      },
      evaluate: function(toEval) {
        if (getCurrentApp().evaluate) {
          return getCurrentApp().evaluate(toEval);
        } else {
          console.error("Current app doesn't support evaluate");
        }
      },
      evaluateRoot: function(toEval) {
        if (getCurrentApp().evaluateRoot) {
          return getCurrentApp().evaluateRoot(toEval);
        } else {
          console.error("Current app doesn't support evaluateRoot");
        }
      },
      evaluateCode: function(evaluator, code) {
        if (getCurrentApp().evaluateCode) {
          return getCurrentApp().evaluateCode(evaluator, code);
        } else {
          console.error("Current app doesn't support evaluateCode");
        }
      },
      getEvaluatorMenuItems: function() {
        if (getCurrentApp().getEvaluatorMenuItems) {
          return getCurrentApp().getEvaluatorMenuItems();
        } else {
          console.error("Current app doesn't support getEvaluatorMenuItems");
        }
      },
      toggleNotebookLocked: function() {
        if (getCurrentApp().toggleNotebookLocked) {
          return getCurrentApp().toggleNotebookLocked();
        } else {
          console.error("Current app doesn't support toggleNotebookLocked");
        }
      },
      isNotebookLocked: function() {
        if (getCurrentApp().isNotebookLocked) {
          return getCurrentApp().isNotebookLocked();
        } else {
          console.error("Current app doesn't support isNotebookLocked");
        }
      },
      showAnonymousTrackingDialog: function() {
        if (getCurrentApp().showAnonymousTrackingDialog) {
          return getCurrentApp().showAnonymousTrackingDialog();
        } else {
          console.error("Current app doesn't support showAnonymousTrackingDialog");
        }
      },
      showStatus: function(message, nodigest) {
        if (getCurrentApp().showStatus) {
          return getCurrentApp().showStatus(message, nodigest);
        } else {
          console.error("Current app doesn't support showStatus");
        }
      },
      updateStatus: function() {
        if (getCurrentApp().updateStatus) {
          return getCurrentApp().updateStatus();
        } else {
          console.error("Current app doesn't support updateStatus");
        }
      },
      clearStatus: function(message, nodigest) {
        if (getCurrentApp().clearStatus) {
          return getCurrentApp().clearStatus(message, nodigest);
        } else {
          console.error("Current app doesn't support clearStatus");
        }
      },
      showTransientStatus: function(message, nodigest) {
        if (getCurrentApp().showTransientStatus) {
          return getCurrentApp().showTransientStatus(message, nodigest);
        } else {
          console.error("Current app doesn't support showTransientStatus");
        }
      },
      getEvaluators: function() {
        if (getCurrentApp().getEvaluators) {
          return getCurrentApp().getEvaluators();
        } else {
          console.error("Current app doesn't support getEvaluators");
        }
      },
      getCodeCells: function(filter) {
        if (getCurrentApp().getCodeCells) {
          return getCurrentApp().getCodeCells(filter);
        } else {
          console.error("Current app doesn't support getCodeCells");
        }
      },
      setCodeCellBody: function(name, code) {
        if (getCurrentApp().setCodeCellBody) {
          return getCurrentApp().setCodeCellBody(name,code);
        } else {
          console.error("Current app doesn't support setCodeCellBody");
        }
      },
      setCodeCellEvaluator: function(name, evaluator) {
        if (getCurrentApp().setCodeCellEvaluator) {
          return getCurrentApp().setCodeCellEvaluator(name, evaluator);
        } else {
          console.error("Current app doesn't support setCodeCellEvaluator");
        }
      },
      setCodeCellTags: function(name, tags) {
        if (getCurrentApp().setCodeCellTags) {
          return getCurrentApp().setCodeCellTags(name, tags);
        } else {
          console.error("Current app doesn't support setCodeCellTags");
        }
      },
      // bk-notebook
      shareNotebook: function() {
        var bkNotebook = getBkNotebookWidget();
        if (bkNotebook) {
          return bkNotebook.shareAndOpenPublished();
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
      showDefaultSavingFileChooser: function() {
        return bkCoreManager.showDefaultSavingFileChooser();
      },
      getRecentMenuItems: function() {
        return bkCoreManager.getRecentMenuItems();
      },
      showModalDialog: function(callback, template, strategy) {
        return bkCoreManager.showModalDialog(callback, template, strategy).result;
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
      getFileSystemFileChooserStrategy: function() {
        return bkCoreManager.getFileSystemFileChooserStrategy();
      },
      selectFile: function(callback, title, extension, closebtn) {
          var strategy = bkCoreManager.getFileSystemFileChooserStrategy();
          strategy.treeViewfs.extFilter = [ extension ];
          strategy.ext = extension;
          strategy.title = title;
          strategy.closebtn = closebtn;
          return bkUtils.getHomeDirectory().then(
                  function(homeDir) {
                      return bkCoreManager.showModalDialog(
                              callback,
                              JST['template/opennotebook']({homedir: homeDir, extension: extension}),
                              strategy);
                  });
      },

      // eval utils
      locatePluginService: function(id, locator) {
        return bkUtils.httpGet("../beaker/rest/plugin-services/" + id,
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
      showLanguageManager: function() {
        return bkCoreManager.showLanguageManager();
      },

      // other JS utils
      updateDocumentModelFromDOM: function(id) {
	  function convertCanvasToImage(elem) {
	      if (elem.nodeName == "CANVAS") {
		  var img = document.createElement("img");
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
	  };
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
          var body = elem.find( "bk-output-display[type='Html'] div div" );
          if (body === undefined || body[0] === undefined) {
            console.log("ERROR: cannot find an Html cell containing the element '" + id + "'.");
            return;
          }
	  // 2.5) search for any canvas elements in body and replace each with an image.
	  body = convertCanvasToImage(body[0]);

          // 2) convert that part of the DOM to a string
          var newOutput = body.innerHTML;

          // 3) set the result.object to that string.
          var cell = bkCoreManager.getNotebookCellManager().getCell(cellid);
          if (cell === undefined) {
            console.log("ERROR: cannot find an Html cell containing the element '" + id + "'.");
            return;
          }

          var res = cell.output.result;
          if (res.innertype === "Html") {
            res.object = newOutput;
          } else {
            console.log("ERROR: cannot find an Html cell containing the element '" + id + "'.");
          }
      },

      // bkShare
      share: bkShare,

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

      setupCancellingOutput: function(modelOutput) {
        if (modelOutput.result.type !== "BeakerDisplay" || modelOutput.result.innertype !== "Progress")
          setupProgressOutput(modelOutput);
        modelOutput.result.object.message = "cancelling ...";
      },

      receiveEvaluationUpdate: function(modelOutput, evaluation, pluginName, shellId) {
        var maxNumOfLines = 200;

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
          for (idx=0; idx<modelOutput.result.object.outputdata.length; idx++) {
            cnt += modelOutput.result.object.outputdata[idx].value.split(/\n/).length;
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
                modelOutput.result.object.outputdata[0].value = a.join('\n');
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
                this.cometd.unregisterTransport("websocket");
                this.cometd.init(serviceBase + "/cometd");
                this.hlistener = this.cometd.addListener('/meta/handshake', function(message) {
                  if (window.bkDebug) console.log(pluginName+'/meta/handshake');
                  if (message.successful) {
                    this.cometd.batch(function() {
                      var k;
                      for (k in Object.keys(this.subscriptions))
                      {
                        this.subscriptions[k] = this.cometd.resubscribe(this.subscriptions[k]);
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
              if (window.bkDebug) console.log('subscribe to '+update_id)
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
              if (window.bkDebug) console.log('unsubscribe from '+update_id)
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
      }
    };

    return bkHelper;
  });
})();
