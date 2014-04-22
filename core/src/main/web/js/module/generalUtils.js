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
 * M_generalUtils
 * - this should be the most general utilities, the utilities that could have been found in a
 * 3rd-party library
 * and we just happen to write our own.
 */
(function() {
  'use strict';
  var module = angular.module('M_generalUtils', []);
  module.factory('generalUtils', function() {
    return {
      generateID: function(length) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < length; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
      },
      // duplicated in beaker.js
      loadJS: function(url, success, failure) {
        // use http://requirejs.org ? XXX
        // note: http://stackoverflow.com/questions/8315088/prevent-requirejs-from-caching-required-scripts
        var e = document.createElement('script');
        e.type = "text/javascript";
        // Add the time to the URL to avoid caching.
        var millis = new Date().getTime();
        e.src = url + "?_=" + millis;
        if (success) {
          e.onload = success;
        }
        if (failure) {
          e.onerror = failure;
        }
        document.head.appendChild(e);
      },
      loadCSS: function(url) {
        var link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = url;
        document.getElementsByTagName("head")[0].appendChild(link);
      },
      // offsetX is not defined in firefox
      eventOffsetX: function(elem, event) {
        var x = event.offsetX;
        if (typeof x == 'undefined')
          x = event.pageX - elem.offset().left;
        return x;
      },
      loadList: function(urls, success, failure) {
        if (urls.length == 0) {
          if (success)
            return success();
          return;
        }
        var url = urls.shift();
        var me = this;
        this.loadJS(url, function() {
          me.loadList(urls, success, failure);
        }, failure);
      },
      findTable: function(elem) {
        function findColumnNames(elem) {
          var row = elem.children[0];
          var result = [];
          for (var i = 0; i < row.children.length; i++)
            result.push(row.children[i].innerHTML);
          return result;
        }

        function findEntries(elem) {
          var result = [];
          for (var i = 0; i < elem.children.length; i++)
            result.push(elem.children[i].innerHTML);
          return result;
        }

        function findValues(elem) {
          var result = [];
          for (var i = 0; i < elem.children.length; i++)
            result.push(findEntries(elem.children[i]));
          return result;
        }

        var tag = elem.tagName;
        if (tag === 'DIV') {
          for (var i = 0; i < elem.children.length; i++) {
            var sub = this.findTable(elem.children[i]);
            if (sub) return sub;
          }
          return null;
        }
        if (tag === 'TABLE') {
          if (elem.children.length < 2) {
            return null;
          }

          // To prevent from mangling user created html table,
          // only use table display for dataframe tables (BEAKER-456)
          if (!_.contains(elem.classList, 'dataframe')) {
            return null;
          }

          // check if this is a table with multiple rows
          // currently the table displays can't handle multiple rows of header (BEAKER-416)
          var headerRows = $(elem).find('thead').find('tr');
          if (headerRows.length == 2) {
            //if there are two rows, allow tabledisplay as long as no column has values in both rows
            //this is because pandas renders dataframes with the index col header on a second row
            var row0 = headerRows.eq(0).find('th');
            var row1 = headerRows.eq(1).find('th');
            var minLength = Math.min(row0.length, row1.length);

            for (var i = 0; i < minLength; i++) {
              //if any column has html in both rows, don't use tabledisplay
              if (row0.eq(i).html() && row1.eq(i).html()) {
                return null;
              }
            }

          } else if (headerRows.length > 2) {
            //if there are more than two header, forget about it
            return null;
          }


          // also confirm use of thead?
          var cols = findColumnNames(elem.children[0]);
          var vals = findValues(elem.children[1]);
          return {
            type: "TableDisplay",
            tableDisplayModel: {
              columnNames: cols,
              values: vals
            },
            columnNames: cols,
            values: vals
          };
        }
        return null;
      },
      formatTimeString: function(millis) {
        if (millis < 60 * 1000) {
          return (millis / 1000).toFixed(1) + "s";
        } else {
          var date = new Date(millis);
          var d = Math.floor(millis / (24 * 60 * 60 * 1000));
          var h = date.getUTCHours();
          var m = date.getUTCMinutes();
          var s = date.getUTCSeconds();
          var result = "";
          if (d > 0) {
            result += (d + "d");
          }
          if (h > 0) {
            result += (h + "h");
          }
          if (m > 0) {
            result += (m + "m");
          }
          if (s > 0) {
            result += (s + "s");
          }
          return result;
        }
      },
      isMiddleClick: function(event) {
        return event.button === 1 // middle click
            || (event.button === 0 // left click
            && (navigator.appVersion.indexOf("Mac") != -1 ? event.metaKey : event.ctrlKey));
      }
    };
  });
})();
