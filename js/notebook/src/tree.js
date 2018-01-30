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
  'require'
], function(
  require
) {
  "use strict";
  var $ = require('jquery');
  var Widget = require('@phosphor/widgets').Widget;

  // var BeakerXTreeWidget = require('BeakerXTreeWidget').default;

  var load_ipython_extension = function() {
    // var bxWidget = new BeakerXTreeWidget();
    var bxWidget = new Widget();
    bxWidget.id = 'test';
    Widget.attach(bxWidget, $('.tab-content').get(0));

    $('#tabs').append(
      $('<li>').append(
        $('<a>', {
          id: 'beakerx_tab',
          href: '#beakerx',
          'data-toggle': 'tab',
          text: 'BeakerX'
        }).click(function(e) {
          if (window.location.hash === '#beakerx') {
            return;
          }

          window.history.pushState(null, null, '#beakerx');
          bxWidget.update();
          // version.load();
          // settings.load();
        })
      )
    );
  };

  return {
    load_ipython_extension : load_ipython_extension
  };
});