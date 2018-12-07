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
  'base/js/utils',
  './enigmaData.json'
],function(
  utils,
  engimaData
){

  function enigmaImpl() {
    this.providerName = "Engima";
    this.icon = "https://assets.enigma.com/blocks/Meet-the-new-Public-3.svg?mtime=20170620130459";
    this.color = "#000000";
    this.async = true;
    this.labelName = "Engima"
    this.homeDir = ''

    var enigma_base = 'Enigma/';

    this.getListAsync = function(state, callback_success, callback_error) {
      // read from local folder, using rest api
      var cur_parent = state.discover_active_parent;
      if (cur_parent.includes(enigma_base)) {
        cur_parent = cur_parent.slice(enigma_base.length, cur_parent.length);
      }
      var cur_path = this.homeDir + cur_parent;
      $.ajax({
        url: '/listfolder',
        type: 'GET',
        data: {path: cur_path},
        success: function(data) {
          var ret = {}
          ret.uri = enigma_base + cur_parent;
          ret.childProductNames = data.childProductNames;
          ret.childFolderNames = data.childFolderNames;
          callback_success(ret, state);
        },
        error: function(data) {
          console.log(data);
          callback_error(state);
        }
      })

    }; 

    this.getList = function() {

    };

    this.getDetailAsync = function(state, callback_success, callback_error) {
      var cur_parent = state.discover_active_parent;
      if (cur_parent.includes(enigma_base)) {
        cur_parent = cur_parent.slice(enigma_base.length, cur_parent.length);
      }
      var cur_path = this.homeDir + cur_parent;
      $.ajax({
        url: '/getfile',
        type: 'GET',
        data: {path: cur_path},
        success: function(data) {
          console.log(data);
          callback_success(data.content, state);
        },
        error: function(data) {
          console.log(data);
          callback_error(state);
        }
      })
    };

    this.getDetail = function() {

    };

    this.getSearchResultAsync = function(state, callback_success, callback_error) {

    };

    this.getSearchResult = function() {

    };

    /* return a list of dictionary of code samples
      [ 
        {
          "name": string, code language (python, scala, pyspark etc.)
          "code": string, string of code 
        }, ....
      ]
    */
    this.getCodeSample = function (data, kernel_name) {
      var params = '';
      if (kernel_name.includes("python3")) {
        var code = "import requests \n\
url = 'https://public.enigma.com/api/snapshots/" + data.dataid + "?&row_limit=100'\n\
response = requests.get(url)\n\
data = response.json()\n\
df = pd.DataFrame(data=data['table_rows']['rows'],columns=data['table_rows']['fields']) \n\
df\n ";
        return code;
      }
    };

    this.updateBindings = function () {

    };

    this.getDataSet = function () {
      if (engimaData !== null) {
        return engimaData.datasets;
      }
    };

  }

  module.exports = {
    enigmaImpl: enigmaImpl
  };
});
