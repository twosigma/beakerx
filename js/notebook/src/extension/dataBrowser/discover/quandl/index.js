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
  './quandlData.json',
],function(
  quandlData
){

  function quandlImpl() {
    this.providerName = "Quandl";
    this.icon = "https://d3rlqa3rnk4r1f.cloudfront.net/assets/images/logos/v2/quandl-word-mark-fb41d14c7a394be8118897fb977de828.svg";
    this.color = "#e25829";
    this.async = false;
    this.labelName = "Quandl"
    
    var baseuri = 
    this.getListAsync = function(state, callback_sucess, callback_error) {
      // N/A
    }; 
    /*
      uri:
      description: unused
      childFolderNames [{desciption:"", name:""}]
      ChildProductNames [{desciption:"", name:""}]
    */
    this.getList = function(state) {
      var ret = {};
      ret['uri'] = state.discover_active_parent;
      if (quandlData !== null) {
        ret['childProductNames'] = quandlData.datasets;
      }
      ret['childFolderNames'] = [];
      return ret;
    };

    this.getDetailAsync = function(state, callback_sucess, callback_error) {

    };

    this.getDetail = function(state) {
      var ret = {};
      var source = state.discover_source;
      var target = state.discover_active_parent;
      for (idx in quandlData.datasets) {
        var entry = quandlData.datasets[idx];
        if (entry.name == target) {
          return entry;
        }
      }
    };

    this.getSearchResultAsync = function(state, callback_sucess, callback_error) {

    };

    this.getSearchResult = function(state) {
      var ret = {};
      var query = state.discover_search_query.toLowerCase();
      ret['uri'] = state.discover_active_parent;
      if (quandlData !== null) {
        ret['results'] = []
        for (idx in quandlData.datasets) {
          var entry = quandlData.datasets[idx];
          if (entry.name.toLowerCase().includes(query)) {
            ret['results'].push(entry);
          }
        }
      }
      return ret;
    };

    this.getDataSet = function () {
      if (quandlData !== null) {
        return quandlData.datasets;
      }
    };

    this.getCodeSample = function(entry, language) {
      if (language.includes("python")) {
        return 'quandl.get("' + entry.code + '")';
      } else {
        return 'Code not available in this kernel.'
      }
    };

    this.updateBindings = function () {
      // nothing to bind
    };
  }

  module.exports = {
    quandlImpl: quandlImpl
  };
});
