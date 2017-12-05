/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
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

define([
  'jquery',
  'base/js/dialog',
  './shared/bkUtils'
], function($, dialog, bkUtils) {

  var inNotebook = !Jupyter.NotebookList;
  if (!inNotebook) {
    return;
  }

  function saveWidgetsState() {
    var deferred = bkUtils.newDeferred();

    if (Jupyter.menubar.actions.exists('widgets:save-with-widgets')) {
      Jupyter.menubar.actions.call('widgets:save-with-widgets');
      deferred.resolve();
    } else {
      deferred.reject();
    }

    return deferred.promise();
  }

  var do_publish = function() {
    var url = "https://api.github.com/gists";
    var nbjson = Jupyter.notebook.toJSON();
    var filedata = {};

    filedata[Jupyter.notebook.notebook_name] = {content : JSON.stringify(nbjson, undefined, 1)};

    var settings = {
      type : 'POST',
      headers : {},
      data : JSON.stringify({
        public : true,
        files : filedata
      }),
      success : function (data, status) {
        console.log("gist successfully published: " + data.id);
        window.open('https://nbviewer.jupyter.org/' + data.id);
      },
      error : function (jqXHR, status, err) {
        console.log(err);
        alert("Uploading gist failed: " + err);
      }
    };
    $.ajax(url, settings);  
  };

  var beforePublish = function() {
    dialog.modal({
      title : 'Publish',
      body : 'Publish to an anonymous Github Gist, and open in nbviewer?',
      buttons: {
        'OK': {
          'class' : 'btn-primary',
          'click': function() {
            saveWidgetsState().then(do_publish);
          }
        },
        'Cancel': {}
      }
    });
  };

  Jupyter.toolbar.add_buttons_group([{
    'label'   : 'Publish...',
    'icon'    : 'fa-share-alt',
    'callback': beforePublish
  }]);

  var publish_menu = $('<li>').attr('id', 'publish_gist')
                              .append($('<a>').attr('href', '#')
                                              .html('Publish...'));
  publish_menu.insertAfter($('#print_preview'));
  publish_menu.click(beforePublish);

});