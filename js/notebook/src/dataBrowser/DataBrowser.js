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
  'jquery-ui/ui/widgets/draggable',
  'jquery-ui/ui/widgets/droppable',
  './quandl/quandl',
  './enigma/enigma',
],function(
  draggable, 
  droppable,
  quandl,
  enigma
){
  var inNotebook = !Jupyter.NotebookList;
  if (!inNotebook) {
    return;
  }

  var impl = {
    "Quandl" : new quandl.quandlImpl(),
    "Enigma" : new enigma.enigmaImpl()
  };
  var datasets = [];
  for (key in impl) {
    datasets.push.apply(datasets, impl[key].getDataSet());
  }

  var side_panel_start_width = 35;
  var redo_panel;
  var active_page = 1;
  var active_product = 0;
  var dragging = '';
  var query = '';

  var build_side_panel = function(main_panel, side_panel) {
    side_panel.css('display', 'none');
    side_panel.insertAfter(main_panel);
    var side_panel_splitbar = $('<div class="data_side_panel_splitbar">');
    var side_panel_inner = $('<div class="data_side_panel_inner">');
    side_panel.append(side_panel_inner);
    side_panel.append(side_panel_splitbar);

    var min_rel_width = 10, max_rel_width = 90;
    side_panel_splitbar.mousedown(function(md_evt) {
      md_evt.preventDefault();
      $(document).mousemove(function (mm_evt){
        mm_evt.preventDefault();
        var pix_w = mm_evt.pageX;
        var rel_w = 100 * (pix_w) / side_panel.parent().width();
        rel_w = rel_w > min_rel_width ? rel_w : min_rel_width;
        rel_w = rel_w < max_rel_width ? rel_w : max_rel_width;
        main_panel.css('width', (100 - rel_w) + '%');
        side_panel.css('width', rel_w + '%').data('last_width', rel_w);
      });
      return false;
    });
    $(document).mouseup(function (mu_evt){
      $(document).unbind('mousemove');
    });
    return side_panel;
  };

  var slide_side_panel = function(main_panel, side_panel, desired_width) {
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
    side_panel.animate({width:  desired_width + '%' },anim_opts);
    return visible;
  };
  
  var populate_side_panel = function(side_panel) {
    var side_panel_inner = side_panel.find('.data_side_panel_inner');
    var src = '';
    // list view
    if (active_page === 1) {
      var searchbar = $('<br><div class="input-group"><input type="text" placeholder="Search..." class="form-control" id="data_query"> \
       <span class="input-group-btn"> \
       <button class="btn btn-default" title="clear search and reload" id="clear-search"><i class="fa-repeat fa"></i></button> </span></div>');
      // populate all products
      var divholder = $('<div class="holder">');
      $.each(datasets, function(idx){
        var d = datasets[idx];
        var hit = $('<div class="hit">');
        var hitimage = $('<div class="hit-image">').click(pf)
            .append($('<img src=' + d.img + '>'));
        var pf = (function(i){ return function(){ active_page = 2; active_product = i; redo_panel();} })(idx);
        var hitcontent = $('<div class="hit-content">')
            .append($('<h4 class="hit-name">').html(d.name).click(pf))
            .append($('<p class="hit-description">').html(d.description))
            .append($('<span>').html('Provider:'))
            .append($('<span class="hit-code">').html(d.provider));
        hit.append(hitimage).append(hitcontent);
        divholder.append(hit);
      });
      side_panel_inner.append(searchbar)
                      .append(divholder);
    } else if (active_page === 2) {
      // detail page
      var p = datasets[active_product];
      var provider = p.provider;

      var pf = (function(){ return function(){ active_page = 1; redo_panel();} })();
      var buttonRow = $('<div class="row">');
      var goBack = $('<div class="go-back"> &lt; Go back</div>').click(pf);
      var openOutside = $('<button class="btn outlinkbtn" style="background-color:' + impl[provider].color + '"><a href="' + 
      p.outlink + '" target="_blank"> \
      <i class="fa fa-external-link"></i> Open in ' + provider + '</a></button>');  
      var providerLink = $('<p>').append($('<img src="' + impl[provider].icon + '" style="width:140px">')).append(openOutside);
      buttonRow.append(goBack);
      
      var divholder = $('<div class="row" style="background-color:#FFFFFF">');
      var divcolumn = $('<div class="des-column">');
      // more code sample to come
      var code = impl[provider].getCodeSample(p, "python");
      var pf = (function(c){ return function() {dragging = c}})(code);
      var codeblock = $('<pre>' + code  + '</pre>')
          .draggable({'helper':'clone', 'appendTo': 'body', 'start':pf})
          .addClass('dsDrag');

      var hit = $('<div class="hit">');
      var hitimage = $('<div class="hit-image">')
            .append($('<img src=' + p.img + '>'));
      var hitcontent = $('<div class="hit-content">')
            .append($('<h4 class="hit-name">').html(p.name))
      hit.append(hitimage).append(hitcontent);

      divcolumn.append(hit)
               .append($('<div><strong>PROVIDER</strong></div>'))
               .append(providerLink)
               .append($('<hr>'))
               .append($('<div><strong>DESCRIPTION</strong></div>'))
               .append($('<p>').html(p.description))
               .append($('<hr>'))
               .append($('<div><strong>SOURCE</strong></div>'))
               .append($('<a href="' + p.outlink+ '" target="_blank">').html(p.outlink))
               .append($('<hr>'))
               .append($('<div><strong>PYTHON CODE EXAMPLE</strong></div>'))
               .append(codeblock)
      divholder.append(divcolumn);
      side_panel_inner.append(buttonRow)
                      .append(divholder);
    }
    
    button_bindings();
  };

  var button_bindings = function () {
    Jupyter.keyboard_manager.register_events($('.form-control'));
    var searchHits = function () {
      query = $('#data_query').val().toLowerCase();
      $.each(datasets, function(idx){
        var d = datasets[idx];
        var des = d.description.toLowerCase();
        var na = d.name.toLowerCase();
        if (query == '' || des.indexOf(query) >= 0 || na.indexOf(query) >= 0) {
          $('.hit:eq('+ idx +')').removeClass('hide');
        } else {
          $('.hit:eq('+ idx +')').addClass('hide');
        }
      });
    };
    if (query) {
      $('#data_query').val(query);
      searchHits();
    } 
    $('#data_query').keyup(searchHits);
    $('#clear-search').click(function(){
      $('#data_query').val('');
      searchHits();
    });
  };

  redo_panel = function() {
    var p = $('#data_side_panel');
    p.find('.data_side_panel_inner').html('');
    setTimeout(function() {populate_side_panel(p);}, 20);
  };

  var toggle_side_panel = function() {
    var main_panel = $('#notebook_panel');
    var side_panel = $('#data_side_panel');

    if (side_panel.length < 1) {
      side_panel = $('<div id=data_side_panel>');
      build_side_panel(main_panel, side_panel);
      populate_side_panel(side_panel);  
    }
    var visible = slide_side_panel(main_panel, side_panel);
    return visible;
  };
  
  Jupyter.toolbar.add_buttons_group([{
    'label'   : ' ',
    'icon'    : 'fa-database',
    'id'      : 'btn_datasets',
    'callback': function() {
      var visible = toggle_side_panel();
      var btn = $(this);
      setTimeout(function() {btn.blur();}, 500);
    }
  }]);

  $('#btn_datasets > span').remove();

  $('#btn_datasets').attr({
    'data-toggle': 'button',
    'aria-pressed': 'false'
  });

  // bind drop event
  var bindDroppable = function() {
    $('.cell').droppable({
      accept: '.dsDrag',
      hoverClass: 'cell-dragover',
      drop: function(event, ui) {
        Jupyter.notebook.select($(this).index());
        var new_cell = Jupyter.notebook.insert_cell_below('code');
        new_cell.set_text(dragging);
      }
    });
  };
  setInterval(bindDroppable, 1000);
});