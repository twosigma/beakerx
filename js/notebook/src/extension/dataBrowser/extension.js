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
  'jquery-ui/ui/widgets/droppable',
  'jquery-ui/ui/widgets/draggable',
  './discover.js',
  './settings.json'
], function(
  droppable,
  draggable,
  discover_page,
  settings
) {
  require('./dataBrowser.css');

  var inNotebook = !Jupyter.NotebookList;

  var side_panel_min_rel_width = 10;
  var side_panel_max_rel_width = 90;
  var side_panel_start_width = 35;

  var section = {
    DISCOVER: 1,
    COMPUTE: 2,
    VISUALIZE: 3,
    PUBLISH: 4,
    prop: {
      1:{display_name: "Discover"},
      2:{display_name: "Computer"},
      3:{display_name: "Visualize"},
      4:{display_name: "Publish"}
    }
  };

  var active_section = 1;

  // state is an object to memorize user's UI config
  var state = {
    discover_source: '',
    discover_is_search: 0,
    discover_show_search_bar: 1,
    discover_is_detail: 0,
    discover_active_parent: '',
    discover_search_query: ''
  };

  var slide_side_panel = function (main_panel, side_panel, desired_width) {
    var anim_opts = {
      step: function (now, tween) {
        main_panel.css('width', 100 - now + '%');
      }
    };
    if (desired_width === undefined) {
      if (side_panel.is(':hidden')) {
        desired_width = (side_panel.data('last_width') || side_panel_start_width);
      } else {
        desired_width = 0;
      }
    }
    var visible = desired_width > 0;
    if (visible) {
      main_panel.css({'float': 'right', 'overflow-x':'auto'});
      side_panel.show();
    } else {
      anim_opts['complete'] = function () {
        side_panel.hide();
        main_panel.css({'float': '', 'overflow-x':'', 'width':''});
      };
    }
    side_panel.animate({ width:  desired_width + '%' }, anim_opts);
    return visible;
  };

  var build_side_panel = function(main_panel, side_panel) {
    side_panel.css('display', 'none');
    side_panel.insertAfter(main_panel);
    var side_panel_splitbar = $('<div>', { class: 'data_side_panel_splitbar', });
    var side_panel_inner = $('<div>', { class: 'data_side_panel_inner', });
    side_panel.append(side_panel_inner);
    side_panel.append(side_panel_splitbar);

    var min_rel_width = 10, max_rel_width = 90;
    side_panel_splitbar.on('mousedown', function(md_evt) {
      md_evt.preventDefault();
      $(document).on('mousemove', function (mm_evt) {
        mm_evt.preventDefault();
        let pix_w = mm_evt.pageX;
        let rel_w = 100 * (pix_w) / side_panel.parent().width();
        rel_w = rel_w > min_rel_width ? rel_w : min_rel_width;
        rel_w = rel_w < max_rel_width ? rel_w : max_rel_width;
        main_panel.css('width', (100 - rel_w) + '%');
        side_panel.css('width', rel_w + '%').data('last_width', rel_w);
      });
      return false;
    });
    $(document).on('mouseup',function (mu_evt){
      $(document).off('mousemove');
    });

    return side_panel;
  };

  var populate_side_panel = function(side_panel) {
    var side_panel_inner = side_panel.find('.data_side_panel_inner');
    var section_nav_bar = build_section_nav_bar();
    //side_panel_inner.append(section_nav_bar);
    switch(active_section) {
      case section.DISCOVER:
        state = discover_page.populate_discover_page(side_panel, state, redo_panel);
        break;
      case section.COMPUTE:
        break;
      case section.VISUALIZE:
        break;
      case section.PUBLISH:
        break;
    }
  };

  var build_section_nav_bar = function() {
    var section_nav_bar = $('<div class="nav-row">');
    for (var i = 1; i <= 4; i++){
      var pf = (function(index){
        return function() {active_section = index; redo_panel();}
      })(i);
      var nav_entry = $('<a>').click(pf);
      var className = "tablink";
      if (active_section == i) {
        className += "active_tablink";
      }
      nav_entry.append($('<div class="' + className + '">').text(section.prop[i].display_name));
    }
    return section_nav_bar;
  };

  redo_panel = function() {
    var p = $('#data_side_panel');
    p.find('.data_side_panel_inner').html('');
    setTimeout(function() { populate_side_panel(p); }, 20);
  };

  var toggle_side_panel = function() {
    // turn off table of contents
    if ($('#toc-wrapper:visible').length) {
      $('#toc_button').click();
    }
    var main_panel = $('#notebook_panel');
    var side_panel = $('#data_side_panel');

    if (side_panel.length < 1) {
      side_panel = $('<div>', {
        id: 'data_side_panel',
      });
      build_side_panel(main_panel, side_panel);
      populate_side_panel(side_panel);
    }
    return slide_side_panel(main_panel, side_panel);
  };

  var registerFeature = function () {
    $('.cell').droppable({
      accept: '.dsDrag',
      hoverClass: 'cell-dragover',
      drop: function(event, ui) {
        Jupyter.notebook.select($(this).index());
        let new_cell = Jupyter.notebook.insert_cell_below('code');
        new_cell.set_text(dragging);
      }
    });
  };

  var load_ipython_extension = function() {
    if (inNotebook) {
      Jupyter.notebook.config.loaded.then(function() {
        Jupyter.toolbar.add_buttons_group([{
          id: 'btn_datasets',
          label: 'Show dataset panel',
          icon: 'fa fa-database',
          callback: function() {
            var visible = toggle_side_panel();
            var btn = $(this);
            setTimeout(function() { btn.blur();}, 500);
          }
        }]);
        $('#btn_datasets').attr({
          'data-toggle': 'button',
          'aria-pressed': 'false'
        });

        var prefix = 'jupyter-notebook';
        var action_name = 'toggle-dataset-panel';
        var action = {
          icon: 'fa fa-database',
          help: 'Toggle Dataset Panel',
          help_index: 'zz',
          handler: toggle_side_panel
        };
        Jupyter.notebook.keyboard_manager.actions.register(action, action_name, prefix);
        Jupyter.notebook.keyboard_manager.command_shortcuts.add_shortcut('shift-d', prefix + ':' + action_name);
      });
      setInterval(registerFeature, 1000);
    }
  };

  return {
    load_ipython_extension: load_ipython_extension
  };

});