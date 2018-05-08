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

import * as $ from 'jquery';
import * as enigma from './enigma/enigma';
import * as quandl from './quandl/quandl';

const droppable = require('jquery-ui/ui/widgets/droppable');

export function registerFeature(): void {
  if (!!Jupyter.NotebookList) {
    return;
  }
  DataBrowserFeature.register();
}

var dragging = '';

class DataBrowserFeature {
  public static readonly SIDE_PANEL_START_WIDTH: number = 35;
  public static datasets: any[] = [];
  public static activePage: number = 1;
  public static activeProduct: number = 0;
  public static impl = {
    "Quandl" : new quandl.quandlImpl(),
    "Enigma" : new enigma.enigmaImpl()
  };

  public static register() {
    this.loadDataSets();
    this.addButton();

    // bind drop event
    let bindDroppable = function() {
      ($('.cell') as any).droppable({
        accept: '.dsDrag',
        hoverClass: 'cell-dragover',
        drop: function(event, ui) {
          Jupyter.notebook.select($(this).index());
          let new_cell = Jupyter.notebook.insert_cell_below('code');
          new_cell.set_text(dragging);
        }
      });
    };

    setInterval(bindDroppable, 1000);
  }

  private static loadDataSets() {
    for (let key in this.impl) {
      this.datasets.push(...(this.impl[key]).getDataSet());
    }
  }

  private static addButton() {

    Jupyter.toolbar.add_buttons_group([{
      'label'   : ' ',
      'icon'    : 'fa-database',
      'id'      : 'btn_datasets',
      'callback': function() {
        DataBrowserFeature.toggle_side_panel();
        let btn = $(this);
        setTimeout(function() { btn.trigger('blur'); }, 500);
      }
    }]);

    $('#btn_datasets > span').remove();

    $('#btn_datasets').attr({
      'title': 'Data Browser',
      'data-toggle': 'button',
      'aria-pressed': 'false'
    });
  }

  private static toggle_side_panel(): boolean {
    let main_panel = $('#notebook_panel');
    let side_panel = $('#data_side_panel');

    if (side_panel.length < 1) {
      side_panel = $('<div>', {
        id: 'data_side_panel',
      });

      DataBrowserFeature.build_side_panel(main_panel, side_panel);
      DataBrowserFeature.populate_side_panel(side_panel);
    }
    return DataBrowserFeature.slide_side_panel(main_panel, side_panel);
  }

  private static build_side_panel(main_panel, side_panel): void {
    side_panel.css('display', 'none');
    side_panel.insertAfter(main_panel);
    let side_panel_splitbar = $('<div>', { class: 'data_side_panel_splitbar', });
    let side_panel_inner = $('<div>', { class: 'data_side_panel_inner', });
    side_panel.append(side_panel_inner);
    side_panel.append(side_panel_splitbar);

    let min_rel_width = 10, max_rel_width = 90;
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
  }

  private static populate_side_panel(side_panel) {
    let side_panel_inner = side_panel.find('.data_side_panel_inner');
    // list view
    switch (this.activePage) {
      case 1:
        let searchbar = $(`<br />
<div class="input-group">
  <input type="text" placeholder="Search..." class="form-control" id="data_query" />
  <span class="input-group-btn">
    <button class="btn btn-default" title="clear search and reload" id="clear-search">
      <i class="fa-repeat fa"></i>
    </button> 
  </span>
</div>`);
        // populate all products
        let  divholder = $('<div class="holder">');
        for (let idx in this.datasets) {
          let d = this.datasets[idx];
          let hit = $('<div class="hit">');
          let pf = (function(i) {
            return function() {
              DataBrowserFeature.activePage = 2;
              DataBrowserFeature.activeProduct = parseInt(i);
              DataBrowserFeature.redo_panel();}
          })(idx);

          let hitimage = $('<div class="hit-image">').on('click', pf)
            .append($('<img src=' + d.img + '>'));
          let hitcontent = $('<div class="hit-content">')
            .append($('<h4 class="hit-name">').html(d.name).on('click', pf))
            .append($('<p class="hit-description">').html(d.description))
            .append($('<span>').html('Provider:'))
            .append($('<span class="hit-code">').html(d.provider));
          hit.append(hitimage).append(hitcontent);
          divholder.append(hit);
        }
        side_panel_inner
          .append(searchbar)
          .append(divholder);
        break;
      case 2:
        // detail page
        let p = this.datasets[this.activeProduct];
        let provider = p.provider;

        let pf = (function(){ return function() {
          DataBrowserFeature.activePage = 1;
          DataBrowserFeature.redo_panel();
        } })();
        let buttonRow = $('<div class="row">');
        let goBack = $('<div class="go-back"> &lt; Go back</div>').on('click', pf);
        let openOutside = $(`
<button class="btn outlinkbtn" style="background-color: ${this.impl[provider].color};">
  <a href="${p.outlink}" target="_blank"><i class="fa fa-external-link"></i> Open in ${provider}</a>
</button>`);
        let providerLink = $('<p>').append($(`<img src="${this.impl[provider].icon}" style="width:140px">`))
          .append(openOutside);
        buttonRow.append(goBack);

        let divholder2 = $('<div class="row" style="background-color: #FFFFFF">');
        let divcolumn = $('<div class="des-column">');
        // more code sample to come
        let code = this.impl[provider].getCodeSample(p, "python");
        let pf2 = (function(c){ return function() { dragging = c }})(code);
        let codeblock: any = $('<pre>' + code  + '</pre>');
        codeblock.draggable({'helper':'clone', 'appendTo': 'body', 'start':pf2})
          .addClass('dsDrag');

        let hit = $('<div class="hit">');
        let hitimage = $('<div class="hit-image">')
          .append($('<img src=' + p.img + '>'));
        let hitcontent = $('<div class="hit-content">')
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
        divholder2.append(divcolumn);
        side_panel_inner.append(buttonRow)
          .append(divholder2);

        break;
    }

    this.button_bindings();
  }

  private static slide_side_panel(main_panel, side_panel, desired_width: number = null) {
    let anim_opts = {
      step: function (now, tween) {
        main_panel.css('width', 100 - now + '%');
      }
    };
    if (desired_width === null) {
      if (side_panel.is(':hidden')) {
        desired_width = (side_panel.data('last_width') || DataBrowserFeature.SIDE_PANEL_START_WIDTH);
      } else {
        desired_width = 0;
      }
    }
    let visible = desired_width > 0;
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
  }

  private static button_bindings() {
    Jupyter.keyboard_manager.register_events($('.form-control'));
    let query = '';
    let searchHits = function () {
      query = ($('#data_query').val() as string).toLowerCase();
      for (let idx in DataBrowserFeature.datasets) {
        let d = DataBrowserFeature.datasets[idx];
        let des = d.description.toLowerCase();
        let na = d.name.toLowerCase();
        if (query == '' || des.indexOf(query) >= 0 || na.indexOf(query) >= 0) {
          $('.hit:eq('+ idx +')').removeClass('hide');
        } else {
          $('.hit:eq('+ idx +')').addClass('hide');
        }
      }
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
  }

  private static redo_panel () {
    let p = $('#data_side_panel');
    p.find('.data_side_panel_inner').html('');
    setTimeout(function() {
      DataBrowserFeature.populate_side_panel(p);
    }, 20);
  };
}
