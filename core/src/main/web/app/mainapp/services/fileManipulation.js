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
 * Module bk.fileManipulation
 */
(function () {
  'use strict';
  var module = angular.module('bk.fileManipulation', [
    'bk.core',
    'bk.sessionManager',
    'bk.utils',
    'bk.electron'
  ]);
  module.factory('bkFileManipulation',
      function (bkCoreManager, bkSessionManager, bkUtils, bkElectron, $timeout) {

      var promptUriChooser = function (uriType, initUri) {
        if (!uriType) {
          uriType = "file";
        }
        var deferred = bkUtils.newDeferred();
        var fileSaver = bkCoreManager.getFileSaver(uriType);
        if (!fileSaver || !fileSaver.showFileChooser) {
          fileSaver = bkCoreManager.getFileSaver("file");
        }
        fileSaver.showFileChooser(initUri).then(function (ret) {
          if (_.isEmpty(ret.uri)) {
            deferred.reject("cancelled");
          } else {
            deferred.resolve(ret);
          }
        });
        return deferred.promise;
      };

      var promptIfOverwrite = function (uri) {
        var deferred = bkUtils.newDeferred();
        bkCoreManager.show2ButtonModal(
                "File " + uri + " exists. Overwrite?",
            "File exists",
            function () {
              deferred.resolve();
            },
            function () {
              deferred.reject();
            }, "Overwrite", "Cancel", "btn-danger", "");
        return deferred.promise;
      };

      var _renamePromptUriChooser = function (deferred, uriType, initUri) {
        promptUriChooser(uriType, initUri).then(function (ret) {
          _renamePromptIfOverwrite(deferred, ret.uri, ret.uriType);
        }, function () {
          deferred.reject("cancelled"); // file rename cancelled
        });
      };

      var _renamePromptIfOverwrite = function (deferred, uri, uriType) {
        var fileSaver = bkCoreManager.getFileSaver(uriType);
        bkSessionManager.dumpDisplayStatus();
        var oldPath = bkSessionManager.getNotebookPath();
        $timeout(function () {
          return fileSaver.rename(oldPath, uri, false);
        }, 1).then(function () {
          deferred.resolve({uri: uri, uriType: uriType}); // file rename succeed
        }, function (reason) {
          if (reason === "exists") {
            promptIfOverwrite(uri).then(function () {
              fileSaver.rename(oldPath, uri, true).then(function () {
                deferred.resolve({uri: uri, uriType: uriType}); // file rename succeed
              }, function (reason) {
                deferred.reject(reason); // file rename failed
              });
            }, function () {
              _renamePromptUriChooser(deferred, uriType, uri);
            });
          } else if (reason === "isDirectory") {
            bkCoreManager.show1ButtonModal(
                    uri + " is a directory. Please choose a different location",
                "Rename Failed",
                function () {
                  _renamePromptUriChooser(deferred, uriType, uri);
                });
          } else if (reason !== "cancelled") {
            console.log(reason);
            bkCoreManager.show1ButtonModal(
                    "Error renaming to " + uri,
                "Rename Failed",
                function () {
                  _renamePromptUriChooser(deferred, uriType, uri);
                });
          }
          else {
            deferred.reject(reason); // file rename failed
          }
        });
      };

      var saveAlwaysOverwrite = function (uri, uriType) {
        var deferred = bkUtils.newDeferred();
        var fileSaver = bkCoreManager.getFileSaver(uriType);
        bkSessionManager.dumpDisplayStatus();
        $timeout(function () {
          var content = bkSessionManager.getSaveData().notebookModelAsString;
          return fileSaver.save(uri, content, true);
        }, 1).then(function () {
          deferred.resolve({uri: uri, uriType: uriType});
        }, function (reason) {
          deferred.reject(reason);
        });
        return deferred.promise;
      };

      var _savePromptUriChooser = function (deferred, uriType, initUri) {
        promptUriChooser(uriType, initUri).then(function (ret) {
          _savePromptIfOverwrite(deferred, ret.uri, ret.uriType);
        }, function () {
          deferred.reject("cancelled"); // file save cancelled
        });
      };

      var savePromptChooseUri = function () {
        var deferred = bkUtils.newDeferred();
        _savePromptUriChooser(deferred);
        return deferred.promise;
      };

      var checkShouldSaveAtTheSameLocation = function () {
        var deferred = bkUtils.newDeferred();
        if(!bkSessionManager.isSavable()) {
          deferred.resolve(false);
        } else {
          // otherwise we should check if file has been modified since notebook was opened
          bkSessionManager.checkFileModifiedSinceOpened().then(function (modified) {
            if(modified) {
              bkHelper.show2ButtonModal(
                "The file was modified since the time it was loaded. Would you like to save it to another location or override existing file?",
                "File was modified", function () {
                  deferred.resolve(false);
                }, function () {
                  deferred.resolve(true);
                }, "Save As", "Override");
            } else {
              deferred.resolve(true);
            }
          }, deferred.reject)
        }
        return deferred.promise;
      };

      var _savePromptIfOverwrite = function (deferred, uri, uriType) {
        var fileSaver = bkCoreManager.getFileSaver(uriType);
        bkSessionManager.dumpDisplayStatus();
        $timeout(function () {
          var content = bkSessionManager.getSaveData().notebookModelAsString;
          return fileSaver.save(uri, content);
        }, 1).then(function () {
          deferred.resolve({uri: uri, uriType: uriType}); // file save succeed
        }, function (reason) {
          if (reason === "exists") {
            promptIfOverwrite(uri).then(function () {
              saveAlwaysOverwrite(uri, uriType).then(function (ret) {
                deferred.resolve(ret); // file save succeed
              }, function (reason) {
                deferred.reject(reason); // file save failed
              });
            }, function () {
              _savePromptUriChooser(deferred, uriType, uri);
            });
          } else if (reason === "isDirectory") {
            bkCoreManager.show1ButtonModal(
                    uri + " is a directory. Please choose a different location",
                "Save Failed",
                function () {
                  _savePromptUriChooser(deferred, uriType, uri);
                });
          } else if (reason !== "cancelled") {
            console.log(reason);
            bkCoreManager.show1ButtonModal(
                    "Error saving to " + uri,
                "Save Failed",
                function () {
                  _savePromptUriChooser(deferred, uriType, uri);
                });
          }
          else {
            deferred.reject(reason); // file save failed
          }
        });
      };

      var service = {
        renameNotebook: function (uri, uriType) {
          var deferred = bkUtils.newDeferred();
          _renamePromptIfOverwrite(deferred, uri, uriType);
          return deferred.promise;
        },
        saveNotebookAs: function (uri, uriType) {
          var deferred = bkUtils.newDeferred();
          _savePromptIfOverwrite(deferred, uri, uriType);
          return deferred.promise;
        },
        saveNotebook: function (saveFailed) {
          var deferred = bkUtils.newDeferred();
          checkShouldSaveAtTheSameLocation().then(function (saveToTheSameLocation) {
            if(saveToTheSameLocation) {
              bkSessionManager.dumpDisplayStatus();
              $timeout(function () {
                var saveData = bkSessionManager.getSaveData();
                var fileSaver = bkCoreManager.getFileSaver(saveData.uriType);
                var content = saveData.notebookModelAsString;
                fileSaver.save(saveData.notebookUri, content, true).then(function () {
                  deferred.resolve({uri: saveData.notebookUri, uriType: saveData.uriType});
                }, function (reason) {
                  deferred.reject(reason);
                });
              }, 1);
            } else {
              if (bkUtils.isElectron) {
                var Dialog = bkElectron.Dialog;
                var thisWindow = bkElectron.thisWindow;
                bkUtils.getWorkingDirectory().then(function (defaultPath) {
                  var options = {
                    title: 'Save Beaker Notebook',
                    defaultPath: defaultPath,
                    filters: [
                      { name: 'Beaker Notebook Files', extensions: ['bkr'] }
                    ]
                  };
                  var path = Dialog.showSaveDialog(thisWindow, options);
                  if (path === undefined) {
                    saveFailed('cancelled');
                    return;
                  }
                  bkUtils.httpPost('rest/file-io/setWorkingDirectory', { dir: path });
                  var ret = {
                    uri: path,
                    uriType: 'file'
                  };
                  bkSessionManager.dumpDisplayStatus();
                  var saveData = bkSessionManager.getSaveData();
                  var fileSaver = bkCoreManager.getFileSaver(ret.uriType);
                  var content = saveData.notebookModelAsString;
                  fileSaver.save(ret.uri, content, true).then(function () {
                    deferred.resolve(ret);
                  }, function (reason) {
                    deferred.reject(reason);
                  });
                });
              } else {
                savePromptChooseUri().then(deferred.resolve, deferred.reject);
              }
            }
          }, deferred.reject);
          return deferred.promise;
        }
      };
      return service;
    });
})();
