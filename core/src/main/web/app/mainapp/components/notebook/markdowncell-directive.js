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
  'use strict';
  var module = angular.module('bk.notebook');

  module.directive('bkMarkdownCell', function(bkSessionManager) {
    return {
      restrict: 'E',
      template: "<div></div>",
      link: function(scope, element, attrs) {
        var div = element.find("div").first().get()[0];
        var options = {
          basePath: 'vendor/epiceditor',
          container: div,
          file: {
            defaultContent: scope.cellmodel.body
          },
          button: false,
          clientSideStorage: false,
          autogrow: {
            minHeight: 50,
            maxHeight: false,
            scroll: true
          }
        };
        var editor = new EpicEditor(options).load();
        editor.on('preview', function() {
          scope.cellmodel.mode = "preview";
        });
        editor.on('edit', function() {
          scope.cellmodel.mode = "edit";
        });
        editor.editorIframeDocument.addEventListener('keyup', function(e) {
          scope.cellmodel.body = editor.getText();
          scope.$apply();
        });
        if (scope.cellmodel.mode === "preview") {
          // set timeout otherwise the height will be wrong.
          // similar hack found in epic editor source:
          // epiceditor.js#L845
          setTimeout(function() {
            editor.preview();
          }, 1000);
        }
        scope.$watch('cellmodel.body', function(newVal, oldVal) {
          if (newVal !== oldVal) {
            bkSessionManager.setNotebookModelEdited(true);
          }
        });
      }
    };
  });

})();
