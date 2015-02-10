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

  module.directive('bkMarkdownCell', ['bkSessionManager', 'bkHelper', '$timeout', function(bkSessionManager, bkHelper, $timeout) {

    function initializeEditor(scope, element, attrs) {
      var div = element.find("div").first().get()[0];
      var options = {
        basePath: 'vendor/epiceditor',
        container: div,
        theme: {
          editor: '../../../css/markdown-edit.css',
          preview: '../../../css/markdown-preview.css'
        },
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
      var saveToScope = function() {
        scope.cellmodel.body = scope.editor.getText();
        scope.$apply();
      };

      if (scope.editor) {
        scope.editor.removeListener("preview");
        scope.editor.removeListener("edit");
        scope.editor.removeListener("focus");
        scope.editor.removeListener("blur");
        scope.editor.removeListener("preview-clicked");
        scope.editor.editorIframeDocument.removeEventListener('keyup', saveToScope);
        if (!scope.editor.is('unloaded')) {
          scope.editor.unload();
        }
      }

      scope.editor = new EpicEditor(options).load();

      // config MathJax
      var deferred = Q.defer();
      var previewer = scope.editor.getElement('previewer');

      var config = previewer.createElement('script');
      config.type = 'text/x-mathjax-config';
      config.text = "MathJax.Hub.Config({tex2jax: {inlineMath: [['$','$']], displayMath: [['$$','$$']], processEscapes: true}});";
      previewer.body.appendChild(config);

      var mathjax = previewer.createElement('script');
      mathjax.type = 'text/javascript';
      mathjax.src = "./vendor/mathjax/MathJax.js?config=TeX-AMS-MML_HTMLorMML";
      previewer.body.appendChild(mathjax);

      mathjax.onload = function() {
        deferred.resolve();
      };
      mathjax.onerror = function() {
        deferred.reject("Failed to config MathJax in EpicEditor");
      };
      var mathJaxReady = deferred.promise;

      scope.editor.on('preview', function() {
        scope.cellmodel.mode = "preview";
        mathJaxReady.then(function() {
          scope.editor
            .getElement('previewerIframe')
            .contentWindow
            .eval('MathJax.Hub.Queue(["Typeset",MathJax.Hub]);');
          $timeout(function() {
            scope.editor.reflow();
          });
        });
      });
      scope.editor.on('edit', function() {
        scope.cellmodel.mode = "edit";
      });
      scope.editor.on('focus', function() {
        scope.focused = true;
      });
      scope.editor.on('blur', function() {
        scope.focused = false;
        scope.editor.preview();
      });
      scope.editor.on('preview-clicked', function() {
        scope.edit();
      });
      scope.editor.on('reflow', function(size) {
        div.style.height = size.height;
      });

      scope.editor.editorIframeDocument.addEventListener('keyup', saveToScope);

      scope.editor.preview();
      //return editor;
    }

    return {
      restrict: 'E',
      template: JST["mainapp/components/notebook/markdowncell"](),
      controller: function($scope) {
        $scope.getFullIndex = function() {
          return $scope.$parent.$parent.$parent.getFullIndex() + "." + ($scope.$parent.index + 1);
        }
      },
      link: function(scope, element, attrs) {
        var args  = arguments;
        var _this = this;

        scope.edit = function() {
          if (bkHelper.isNotebookLocked()) {
            return
          }

          scope.editor && scope.editor.edit();
        }

        if (scope.cellmodel.mode === "preview") {
          // set timeout otherwise the height will be wrong.
          // similar hack found in epic editor source:
          // epiceditor.js#L845
          $timeout(function() {
            scope.editor && scope.editor.preview();
          }, 0);
        }
        scope.$watch('cellmodel.body', function(newVal, oldVal) {
          if (newVal !== oldVal) {
            bkSessionManager.setNotebookModelEdited(true);
          }
        });

        scope.$parent.$watch('index', function(newV, oldV) {
          if (newV === oldV) {
            return;
          }

          $timeout(function() {
            initializeEditor(scope, element);
          }, 0);
        });

        scope.$on('$destroy', function() {
          if (scope.editor && !scope.editor.is('unloaded')) {
            scope.editor.unload();
          }

          EpicEditor._data.unnamedEditors = [];
        });

        initializeEditor(scope, element);
      }
    };
  }]);

})();
