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

(function(){

  var inNotebook = !Jupyter.NotebookList;
  if (!inNotebook) {
    return;
  }

  var do_publish = function() {
    var url = "https://api.github.com/gists";
    var filedata = {};
    var nbjson = Jupyter.notebook.toJSON();
    filedata[Jupyter.notebook.notebook_name] = {content : JSON.stringify(nbjson, undefined, 1)};
    var settings = {
      type : 'POST',
      headers : {},
      data : JSON.stringify({
        public : true,
        files : filedata,
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
  }
  
  Jupyter.toolbar.add_buttons_group([{
    'label'   : 'Publish as Gist',
    'icon'    : 'fa-share-alt',
    'callback': do_publish
  }]);

  var publish_menu = $('<li>').attr('id', 'publish_gist')
                              .append($('<a>').attr('href', '#')
                                              .html('Publish as Gist ...'));
  publish_menu.insertAfter($('#print_preview'));
  publish_menu.click(do_publish);
})();