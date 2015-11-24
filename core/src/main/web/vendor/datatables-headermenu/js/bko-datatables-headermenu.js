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

(function (window, document, undefined) {

var factory = function ($, DataTable) {
"use strict";

var HeaderMenu = function(dt, options) {

  this.s = {
    dt: new DataTable.Api(dt)
  };

  this.c = options; //$.extend(true, {}, HeaderMenu.defaults, options);

  this._constructor();
};

HeaderMenu.prototype = {

  _constructor: function ()
  {
    var that = this;
    var dt = this.s.dt;
    var dtSettings = dt.settings()[0];
    //var table = dt.table().node();

    var header = dtSettings.aoHeader;

    this._build(header);

    dt.on('destroy', function () {
      that.destroy();
    });
  },

  /**
   * @param layout {object} should be Array with header layout in it
   */
  _build: function(layout) {
    if (!$.isArray(layout)) {
      return;
    }

    var cells = layout[0];
    var cols = this.c;

    for (var i = 0, ien = cells.length; i < ien ; i++) {
      var cell = cells[i];

      if (cols && cols[i] !== undefined) {
        this._buildHeaderMenu(cell, cols[i]);
      }
    }
  },

  /**
   * @param col {object} current column header configuration
   * @param oCell {object} layout cell object
   */
  _buildHeaderMenu: function (oCell, col)
  {
    var $wrap = $("<div/>", { 'class': 'dropdown dtmenu clearfix' })
      .css("z-index", "100")
      .css("float", "left")
      .append(
        $("<a/>", { 'class': 'dropdown-toggle' })
          .attr("data-toggle", "dropdown")
          .append(
            $('<span/>', { 'class': 'bko-menu' })
              .attr('aria-hidden', 'true')
          )
      );
    var $ul = $("<ul></ul>", { 'class': 'dropdown-menu' })
      .attr("role", "menu")
      .attr("submenu-classes", "drop-right")
      .attr("aria-labellebdy", "dLabel");

    var menu = col.header && col.header.menu;
    var cell = oCell.cell;

    if (cell && menu && $.isArray(menu.items)) {
      //this._buildMenuItems

      $wrap.appendTo(cell);
    }



  },

  /**
   * @param container {node} should be <ul> dropdown-menu container?
   * @param
   */
  _buildMenuItems: function (oItem, container)
  {
    var itemConfig = {};
    var itemDom = '<li><a tabindex="-1" href="#" id="dt-select-all" eat-click>Title</a></li>';


  }
};

HeaderMenu.defaults = {
  dom: {
    container: {
      tag: 'ul',
      class: 'dropdown-menu',
      attrs: {
        'role': 'menu',
        'submenu-classes': 'drop-right',
        'aria-labelledby': 'dLabel'
      }
    }
  }
};


$.fn.dataTable.HeaderMenu = HeaderMenu;
$.fn.DataTable.HeaderMenu = HeaderMenu;


// Attach a listener to the document which listens for DataTables initialisation
// events so we can automatically initialise
$(document).on( 'init.dt.dtr', function (e, settings, json) {
  if ( e.namespace !== 'dt' ) {
    return;
  }

  var init = settings.oInit.columns;
  var defaults = DataTable.defaults.columns;

  if (init || defaults) {
    var opts = $.extend({}, init, defaults);

    if (init !== false) {
      new HeaderMenu(settings, opts);
    }
  }
});

return HeaderMenu;
}; //factory


// Define as an AMD module if possible
if ( typeof define === 'function' && define.amd ) {
  define( ['jquery', 'datatables'], factory );
}
else if ( typeof exports === 'object' ) {
  // Node/CommonJS
  factory( require('jquery'), require('datatables') );
}
else if ( jQuery && !jQuery.fn.dataTable.HeaderMenu ) {
  // Otherwise simply initialise as normal, stopping multiple evaluation
  factory( jQuery, jQuery.fn.dataTable );
}

})(window, document);
