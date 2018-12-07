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
  'jquery-ui/ui/widgets/tooltip',
  './settings.json',
  './discover/quandl/index.js',
  './discover/enigma/index.js',
], function(
  droppable,
  draggable,
  tooltip,
  settings,
  quandl,
  enigma
){
  var providers = {
    "Quandl": new quandl.quandlImpl()
    //"Enigma": new enigma.enigmaImpl()
  };
  var redo_panel_func;
  var populate_discover_page = function(side_panel, state, redo_panel) {
    redo_panel_func = redo_panel;
    var side_panel_inner = side_panel.find('.data_side_panel_inner');
    side_panel_inner.append(populate_search_bar(state));
    var discover_nav_bar = $('<ul class="nav nav-tabs">');
    for (p in providers) {
      if (state.discover_source == '') {
        state.discover_source = p;
      }
      var entry = $('<li role="presentation">');
      if (state.discover_source == p) {
        entry.addClass("active");
      }
      var link = $('<a>').text(providers[p].providerName);
      var pf = (function(path){
        return function () {
          state.discover_active_parent = "";
          state.discover_source = path;
          state.discover_is_detail = 0;
          state.discover_show_search_bar = 1;
          redo_panel_func();
        }
      })(p);
      link.click(pf);
      entry.append(link);
      discover_nav_bar.append(entry);
    }
    side_panel_inner.append(discover_nav_bar);
    side_panel_inner.append($('<div id="datasets_body" class="dataset-container">'));

    var impl = providers[state.discover_source];
    if (state.discover_is_search) {
      if (impl.async) {
        if (state.discover_is_detail) {
          impl.getDetailAsync(state, display_detail, build_error_page);
        } else {
          impl.getSearchResultAsync(state, display_search_result, build_error_page);
        }
      } else {
        if (state.discover_is_detail) {
          var data = impl.getDetail(state);
          display_detail(data, state);
        } else {
          var data = impl.getSearchResult(state);
          display_search_result(data, state);
        }
      }
    } else {
      if (impl.async) {
        if (state.discover_is_detail) {
          impl.getDetailAsync(state, display_detail, build_error_page);
        } else {
          impl.getListAsync(state, display_list, build_error_page);
        }
      } else {
        if (state.discover_is_detail) {
          var data = impl.getDetail(state);
          display_detail(data, state);
        } else {
          var data = impl.getList(state);
          display_list(data, state);
        }
      }
    }
    return state;
  };

  var display_list = function(data, state) { 
    // breadcrumb, based on data.uri
    var breadcrumb = $('<ul class="breadcrumb"></ul>');
    data.uri.split('/').forEach(function(e){
      var pf = (function(path){
        return function () {
          state.discover_active_parent = path;
          state.discover_is_detail = 0;
          state.discover_is_search = 0;
          state.discover_show_search_bar = 1;
          redo_panel_func();
        }
      })(data.uri.slice(0, data.uri.indexOf(e + '/') + e.length + 1));
      breadcrumb.append($('<li>').append($('<a>').text(e).click(pf)));
    });

    var row_layout = $('<div class="row"></div>');
    var col_layout = $('<div class="col-md-12"></div>');
    var panel = $('<div class="panel panel-default"></div>');
    var panel_heading = $('<div class="panel-heading"></div>');
    var panel_body = $('<div class="panel-body"></div>');
    row_layout.append(col_layout);
    col_layout.append(panel);
    panel_heading.append(breadcrumb);
    panel.append(panel_heading);
    panel.append(panel_body);

    var impl = providers[state.discover_source];
    var divholder = $('<div class="holder">');
    panel_body.append(divholder);
    var j, fnames = data.childFolderNames;
    var pnames = data.childProductNames;
    for (j in fnames) {
      var entry = fnames[j];
      var newuri = data.uri + '/' +  entry;
      if (data.uri.endsWith('/')) { 
        newuri = data.uri + entry; 
      }
      var pf = (function(path) {
        return function() {
          state.discover_active_parent = path;
          state.discover_is_search = 0;
          state.discover_is_detail = 0;
          state.discover_show_search_bar = 1;
          redo_panel_func();
        }
      })(newuri);
      var hit = $('<div class="hit">');
      var hitcontent = $('<div class="hit-content">')
        .append($('<h4 class="hit-name">').html(entry).on('click', pf))
      hit.append(hitcontent);
      divholder.append(hit);
    }

    pnames.sort(function(a,b) {
      var nameA = a.name.toUpperCase();
      var nameB = b.name.toUpperCase();
      return nameA.localeCompare(nameB);
    });
    for (j in pnames) {
      var entry = pnames[j];
      var newuri = entry.name;
      if (data.uri) {
        if (data.uri.endsWith('/')) { 
          newuri = data.uri + entry.name; 
        } else {
          newuri = data.uri + '/' +  entry.name;
        }
      }
      var pf = (function(path) {
        return function() {
          state.discover_active_parent = path;
          state.discover_is_search = 0;
          state.discover_is_detail = 1;
          state.discover_show_search_bar = 0;
          redo_panel_func();
        }
      })(newuri);

      var hit = $('<div class="hit">');
      var hitimage = $('<div class="hit-image">').on('click', pf)
        .append($('<img src=' + entry.img + '>'));
      var hitcontent = $('<div class="hit-content">')
        .append($('<h4 class="hit-name">').html(entry.name).on('click', pf))
        .append($('<p class="hit-description">').html(entry.description))
      hit.append(hitcontent);
      divholder.append(hit);
    }
    $('#datasets_body').append(row_layout);
    update_bindings(state);
  };

  var display_search_result = function(data, state) {
    var row_layout = $('<div class="row"></div>');
    var col_layout = $('<div class="col-md-12"></div>');
    var panel = $('<div class="panel panel-default"></div>');
    var panel_heading = $('<div class="panel-heading"></div>');
    var panel_body = $('<div class="panel-body"></div>');
    row_layout.append(col_layout);
    col_layout.append(panel);
    panel.append(panel_heading);
    panel.append(panel_body);
    var divholder = $('<div class="holder">');
    panel_body.append(divholder);

    var impl = providers[state.discover_source];
    var ul_itemlist = $('<ul class="datasets-list">');
    panel_body.append(ul_itemlist);

    var res = data.results;
    for (idx in res) {
      var entry = res[idx];
      var pf = (function(path) {
        return function() {
          state.discover_active_parent = path;
          state.discover_is_detail = 1;
          state.discover_is_search = 1;
          state.discover_show_search_bar = 0;
          redo_panel_func();
        }
      })(entry.name);
      
      var hit = $('<div class="hit">');
      var hitimage = $('<div class="hit-image">').on('click', pf)
        .append($('<img src=' + entry.img + '>'));
      var hitcontent = $('<div class="hit-content">')
        .append($('<h4 class="hit-name">').html(entry.name).on('click', pf))
        .append($('<p class="hit-description">').html(entry.description))
      hit.append(hitcontent);
      divholder.append(hit);
    }
    $('#datasets_body').append(row_layout);
    update_bindings(state);
  };

  var display_detail = function(data, state) {
    var parent = state.discover_active_parent;
    var breakup = parent.split('/');
    var breadcrumb = $('<ul class="breadcrumb"></ul>');
    parent.split('/').slice(0, -1).forEach(function(e){
      var pf = (function(path) {
        return function() {
          state.discover_active_parent = path;
          state.discover_is_detail = 1;
          state.discover_is_search = 1;
          state.discover_show_search_bar = 0;
          redo_panel_func();
        }
      })(parent.slice(0, parent.indexOf(e) + e.length));
      breadcrumb.append($('<li>').append($('<a>').text(e).click(pf)));
    });

    var row_layout = $('<div class="row"></div>');
    var col_layout = $('<div class="col-md-12"></div>');
    var panel = $('<div class="panel panel-default"></div>');
    var panel_heading = $('<div class="panel-heading"></div>');
    var panel_body = $('<div class="panel-body"></div>');
    row_layout.append(col_layout);
    col_layout.append(panel);
    panel_heading.append(breadcrumb);
    panel.append(panel_heading);
    panel.append(panel_body);


    // need explain
    var productName = state.discover_active_parent.split('/').slice(-1)[0];
    var impl = providers[state.discover_source];
    
    var openOutside = $(`
<button class="btn outlinkbtn" style="background-color: ${impl.color};">
<a href="${data.outlink}" target="_blank"><i class="fa fa-external-link"></i> Open in ${impl.providerName}</a>
</button>`);
    var providerLink = $('<p>').append($(`<img src="${impl.icon}" style="width:140px">`))
      .append(openOutside);

    var divholder2 = $('<div class="row" style="background-color: #FFFFFF">');
    var divcolumn = $('<div class="des-column">');
    // more code sample to come
    var kernel_name = Jupyter.notebook.kernel.name;
    var code = impl.getCodeSample(data, kernel_name);
    var pf2 = (function(c){ return function() { dragging = c }})(code);
    var codeblock = $('<pre>' + code  + '</pre>');
    codeblock.draggable({'helper':'clone', 'appendTo': 'body', 'start':pf2})
      .addClass('dsDrag');

    var hit = $('<div class="hit">');
    var hitimage = $('<div class="hit-image">')
      .append($('<img src=' + data.img + '>'));
    var hitcontent = $('<div class="hit-content">')
      .append($('<h4 class="hit-name">').html(data.name))
    hit.append(hitcontent);

    divcolumn.append($('<div><strong>PROVIDER</strong></div>'))
      .append(providerLink)
      .append($('<hr>'))
      .append($('<div><strong>DESCRIPTION</strong></div>'))
      .append($('<p>').html(data.description))
      .append($('<hr>'))
      .append($('<div><strong>SOURCE</strong></div>'))
      .append($('<a href="' + data.outlink+ '" target="_blank">').html(data.outlink))
      .append($('<hr>'))
      .append($('<div><strong>PYTHON CODE EXAMPLE</strong></div>'))
      .append(codeblock)
    divholder2.append(divcolumn);
    panel_body.append(hit)
    .append(divholder2);
    $('#datasets_body').append(row_layout);
    update_bindings(state);
  };

  var set_code_example = function(domEle, data, state) {
    var kernel_name = Jupyter.notebook.kernel.name;
    var impl = providers[state.discover_source];
    var codeSamples = impl.getCodeSample(data, kernel_name);
    domEle.empty();
    var buildUpCode = function(code) {
      var pf = (function(c){return function(){dragging = c;}})(code);
      domEle.append($('<pre>' + code + '</pre>')
        .draggable({helper: 'clone', appendTo: 'body', start: pf})
        .addClass('dsDrag'));
    };
    for (var s in codeSamples) {
      var sample = codeSamples[s];
      domEle.append($('<div><strong>' + sample.name.toUpperCase() + 
        ' CODE SAMPLE</strong></div>'));
      buildUpCode(sample.code);
      domEle.append($('<hr>'));
    }
  };

  var populate_search_bar = function(state) {
    var searchbar = $('<div class="input-group discover_searchbar">');
    var textholder = $('<input type="text" placeholder="Search..." class="form-control" id="data_query">');
    if (state.discover_is_search) {
      textholder.val(state.discover_search_query);
    }
    var button_group = $('<span class="input-group-btn">');
    var search_button = $('<button class="btn btn-default" title="search" id="search_data"><i class="fa-search fa"></i></button>');
    var clear_button = $('<button class="btn btn-default" title="clear search and reload" id="clear-search"><i class="fa-repeat fa"></i></button>');
    button_group.append(search_button);
    button_group.append(clear_button);
    searchbar.append(textholder);
    searchbar.append(button_group);
    return searchbar;
  };

  var update_bindings = function (state) {
    Jupyter.keyboard_manager.register_events($('.form-control'));
    $('form-control').prop("disabled", false);

    var do_search = function () {
      var query = $('#data_query').val();
      if (!query) {
        return;
      } else {
        state.discover_search_query = query;
        state.discover_is_detail = 0;
        state.discover_is_search = 1;
        redo_panel_func();
      }
    };
    $('#search_data').click(function() {
      do_search();
    });
    $('#data_query').on('keyup', function(e) {
      if (e.keyCode == 13) {
        do_search();
      }
    });
    $('#clear-search').click(function(){
      state.discover_active_parent = '';
      state.discover_is_detail = 0;
      state.discover_is_search = 0;
      state.discover_show_search_bar = 1;
      redo_panel_func();
    });
    // then bind specific actions in user's implementation
    var impl = providers[state.discover_source];
    impl.updateBindings();
  };

  var build_error_page = function(state) {
    var body = $('<div class="row">');
    body.append($('<strong>').text("Error: Data not available for now"));
    body.append($('<br>'));
    body.append($('<button class="btn restartbtn btn-primary">Go Back</button>'));
    var side_panel_inner = $('#data_side_panel').find('.data_side_panel_inner');
    side_panel_inner.empty();
    side_panel_inner.append(body);
    $('.restartbtn').click(function() {
      state.discover_active_parent = '';
      state.discover_is_detail = 0;
      state.discover_is_search = 0;
      state.discover_show_search_bar = 1;
      redo_panel_func();
    });
  };

  return {
    populate_discover_page : populate_discover_page
  }
});