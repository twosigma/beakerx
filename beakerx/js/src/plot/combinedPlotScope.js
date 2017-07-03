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
  'underscore',
  'jquery',
  'jquery-ui',
  'jquery-ui/ui/widgets/resizable',
  'd3',
  './plotUtils',
  './combinedPlotFormatter',
  './../shared/bkUtils',
  './chartExtender',
  'jquery-contextmenu',
  './plotScope'
], function(
  _,
  $,
  jqui,
  resizable,
  d3,
  plotUtils,
  combinedPlotFormatter,
  bkUtils,
  bkoChartExtender,
  contextMenu,
  PlotScope
) {
  
  function CombinedPlotScope(wrapperId) {
    this.wrapperId = wrapperId;
    this.id = null;
    this.childScopeNo = 1;
    this.scopes = [];
    this.saveAsMenuContainer = null;

    this.model = {
      model: {},
      getCellModel: function() {
        return this.model;
      }
    };
  }

  CombinedPlotScope.prototype.initLayout = function() {
    var self = this;
    var model = self.stdmodel;
    if (model.title != null) {
      self.element.find("#combplotTitle").text(model.title).css("width", self.width || self.stdmodel.plotSize.width);
    }
  };

  CombinedPlotScope.prototype.standardizeData = function() {
    var self = this;
    var model = self.model.getCellModel();
    self.stdmodel = combinedPlotFormatter.standardizeModel(model, self.prefs);
    model.saveAsSvg = function(){
      return self.saveAsSvg();
    };
    model.saveAsPng = function(){
      return self.saveAsPng();
    };
  };

  CombinedPlotScope.prototype.prepareSavedState = function(state) {
    var self = this;
    state.focus = self.calcRange();
    self.width = self.stdmodel.plotSize.width;
  };

  CombinedPlotScope.prototype.applySavedState = function(state) {
    this.state = state;
    this.width = state.width;
  };

  CombinedPlotScope.prototype.preparePlotModels = function() {
    var self = this;
    var models = [];
    var plots = self.stdmodel.plots;

    // create a plot model and a saved state for each plot
    for (var i = 0; i < plots.length; i++) {

      var plotmodel = plots[i];

      plotmodel.xAxis.showGridlineLabels = self.model.getCellModel().x_tickLabels_visible;
      plotmodel.yAxis.showGridlineLabels = self.model.getCellModel().y_tickLabels_visible;

      plotmodel.plotIndex = i;
      var pl = {
        model : plotmodel,
        state : { },
        disableContextMenu: true,
        getCellModel : function() {
          return this.model;
        },
        getDumpState: function() {
          return this.state;
        },
        setDumpState: function(s) {
          this.state = s;
          if (self.model.setDumpState !== undefined) {
            self.model.setDumpState(self.dumpState());
          }
        },
        resetShareMenuItems : function() {
        },
        getFocus : function() {
          return self.focus;
        },
        updateFocus : function(focus) {
          self.focus = {};
          _.extend(self.focus, focus);
          // self.$apply();
          this.setDumpState(self.dumpState());

          self.updateModels('focus');
        },
        getSaveAsMenuContainer: function() {
          return self.saveAsMenuContainer;
        },
        updateWidth : function(width) {
          self.width = width;
          self.element.find("#combplotTitle").css("width", width);

          self.updateModels('width');
        },
        updateMargin : function() {
          // if any of plots has left-positioned legend we should update left margin (with max value)
          // for all plots (to adjust vertical position)
          var plots = self.element.find(".plot-plotcontainer");
          var maxMargin = 0;

          plots.each(function() {
            var value = parseFloat($(this).css('margin-left'));
            maxMargin = _.max([value, maxMargin]);
          });
          plots.css("margin-left", maxMargin);
          for (var i = 0; i < self.stdmodel.plots.length; i++) {
            self.stdmodel.plots[i].updateLegendPosition();
          }
        },
        getWidth : function() {
          return self.width;
        },
        onClick: function(subplotId, item, e) {
          for (var i = 0; i < self.stdmodel.plots.length; i++) {
            var subplot = self.stdmodel.plots[i];
            if (subplotId === subplot.plotId) {
              var params = plotUtils.getActionObject(self.model.getCellModel().type, e, i);
              plotService.onClick(self.model.getCellModel().update_id,
                item.uid,
                self.model.getEvaluatorId(),
                params);
            }
          }
        },
        onKey: function(key, subplotId, item, e) {
          for (var i = 0; i < self.stdmodel.plots.length; i++) {
            var subplot = self.stdmodel.plots[i];
            if (subplotId === subplot.plotId) {
              var actionObject = plotUtils.getActionObject(self.model.getCellModel().type, e, i);
              plotService.onKey(self.model.getCellModel().update_id,
                item.uid,
                self.model.getEvaluatorId(),
                { key: key, actionObject: actionObject });
            }
          }
        },
        setActionDetails: function(subplotId, item, e) {
          var actionObject;
          for (var i = 0; i < self.stdmodel.plots.length; i++) {
            var subplot = self.stdmodel.plots[i];
            if (subplotId === subplot.plotId) {
              actionObject = plotUtils.getActionObject(self.model.getCellModel().type, e, i);
            }
          }
          return plotService.setActionDetails(self.model.getCellModel().update_id,
            item.uid,
            self.model.getEvaluatorId(),
            actionObject);
        }
      };
      models.push(pl);
    }
    self.models = models;
  };

  CombinedPlotScope.prototype.calcRange = function() {
    var self = this;
    var xl = 1E100, xr = 0;
    var plots = self.stdmodel.plots;
    for (var i = 0; i < plots.length; i++) {
      var plotmodel = plots[i]; // models are already standardized at this point
      var ret = plotUtils.getDefaultFocus(plotmodel);
      xl = Math.min(xl, ret.defaultFocus.xl);
      xr = Math.max(xr, ret.defaultFocus.xr);
    }
    return {
      "xl" : xl,
      "xr" : xr
    };
  };

  CombinedPlotScope.prototype.dumpState = function() {
    var self = this;
    var ret = { };
    ret.focus = self.focus;
    ret.width = self.width;
    ret.subplots = [];
    for (var i = 0; i < self.models.length; i++) {
      ret.subplots.push(self.models[i].state);
    }
    return ret;
  };

  CombinedPlotScope.prototype.init = function() {
    var self = this;
    self.canvas = self.element.find("canvas")[0];
    self.canvas.style.display="none";

    self.id = 'bko-plot-' + bkUtils.generateId(6);
    self.element.find('.combplot-plotcontainer').attr('id', self.id);
    self.saveAsMenuContainer = $('#' + self.id);
    $.contextMenu({
      selector: '#' + self.id,
      zIndex: 3,
      items: plotUtils.getSavePlotAsContextMenuItems(self),
      trigger: 'none'
    });

    self.standardizeData();
    self.preparePlotModels();
    self.initLayout();
    self.calcRange();
    self.runChildCharts();

    if (self.model.getDumpState !== undefined) {
      var savedstate = self.model.getDumpState();
      if (savedstate !== undefined && savedstate.subplots !== undefined) {
        for (var i = 0; i < self.models.length; i++) {
          self.models[i].state = savedstate.subplots[i];
        }
        self.width = savedstate.width;
        self.focus = savedstate.focus;
      } else if (self.models !== undefined) {
        self.focus = self.calcRange();
        for (var i = 0; i < self.models.length; i++) {
          self.models[i].state = { };
        }
        if (self.model.setDumpState !== undefined) {
          self.model.setDumpState(self.dumpState());
        }
      }
    }
  };

  // if (self.model.getDumpState !== undefined) {
  //   self.getDumpState = function() {
  //     return self.model.getDumpState();
  //   };
  // }
  // self.init();
  // if (self.model.getDumpState !== undefined) {
  //   self.$watch('getDumpState()', function(result) {
  //     if (result !== undefined && result.subplots === undefined && self.models !== undefined) {
  //       for (var i = 0; i < self.models.length; i++) {
  //         self.models[i].state = { };
  //       }
  //       if (self.model.setDumpState !== undefined) {
  //         self.model.setDumpState(self.dumpState());
  //       }
  //     }
  //   });
  // }
  // self.$watch('getCellModel()', function() {
  //   self.init();
  // });
  // self.$on('$destroy', function() {
  //   $.contextMenu('destroy', { selector: '#' + self.id});
  // });

  CombinedPlotScope.prototype.getCellModel = function() {
    return this.model.getCellModel();
  };

  CombinedPlotScope.prototype.getSvgToSave = function() {
    var self = this;
    var plots = self.stdmodel.plots;

    var combinedSvg = $("<svg></svg>").attr('xmlns', 'http://www.w3.org/2000/svg').attr('class', 'svg-export');

    var plotTitle = self.element.find("#combplotTitle");

    plotUtils.addTitleToSvg(combinedSvg[0], plotTitle, {
      width: plotTitle.width(),
      height: plotUtils.getActualCss(plotTitle, "outerHeight")
    });

    var combinedSvgHeight = plotUtils.getActualCss(plotTitle, "outerHeight",  true);
    var combinedSvgWidth = 0;
    for (var i = 0; i < plots.length; i++) {
      var svg = plots[i].getSvgToSave();
      plotUtils.translateChildren(svg, 0, combinedSvgHeight);
      combinedSvgHeight += parseInt(svg.getAttribute("height"));
      combinedSvgWidth = Math.max(parseInt(svg.getAttribute("width")), combinedSvgWidth);
      combinedSvg.append(svg.children);
    }
    combinedSvg.attr("width", combinedSvgWidth);
    combinedSvg.attr("height", combinedSvgHeight);
    return combinedSvg[0];
  };

  CombinedPlotScope.prototype.saveAsSvg = function() {
    var self = this;
    var html = plotUtils.convertToXHTML(self.getSvgToSave().outerHTML);
    var fileName = _.isEmpty(self.stdmodel.title) ? 'combinedplot' : self.stdmodel.title;
    plotUtils.download('data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(html))), fileName + '.svg');
  };

  CombinedPlotScope.prototype.saveAsPng = function() {
    var self = this;
    var svg = self.getSvgToSave();

    self.canvas.width = svg.getAttribute("width");
    self.canvas.height = svg.getAttribute("height");

    var html = plotUtils.convertToXHTML(svg.outerHTML);
    var imgsrc = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(html)));
    var fileName = _.isEmpty(self.stdmodel.title) ? 'combinedplot' : self.stdmodel.title;
    plotUtils.drawPng(self.canvas, imgsrc, fileName + '.png');
  };

  CombinedPlotScope.prototype.updateModels = function(updateType) {
    var self = this;

    this.scopes.forEach(function(scope) {
      if (updateType === 'focus') {
        scope.onModelFucusUpdate(self.focus);
      } else if (updateType === 'width') {
        scope.watchModelGetWidth(self.width);
      }
    });
  };

  CombinedPlotScope.prototype.setModelData = function(data) {
    var self = this;

    // TODO quick hack -> standardize all input data
    if (data.getCellModel) {
      self.model = data;
    } else {
      self.model.model = data;
    }

    if (self.model.getCellModel().type === "TreeMap"){
      bkoChartExtender.extend(self, self.element);
    }
  };

  CombinedPlotScope.prototype.setWidgetView = function(plotDisplayView) {
    this.plotDisplayView = plotDisplayView;
  };

  CombinedPlotScope.prototype.setElement = function(el) {
    this.element = el;
  };

  CombinedPlotScope.prototype.buildTemplate = function() {
    var tmpl = "<div id='"+this.wrapperId+"'>" +
               "<canvas></canvas>" +
               "<div id='combplotTitle' class='plot-title'></div>" +
               "<div class='combplot-plotcontainer'>" +
               "</div>" +
               "</div>";
    return tmpl;
  };

  CombinedPlotScope.prototype.runChildCharts = function() {
    var self = this;
    self.models.forEach(self.runChildChart.bind(this));
  };

  CombinedPlotScope.prototype.runChildChart = function(model) {
    var self = this;

    var childId = self.wrapperId + '_child' + self.childScopeNo;
    var currentScope = new PlotScope(childId);

    this.scopes.push(currentScope);

    var tmpl = currentScope.buildTemplate();
    var tmplElement = $(tmpl);
    var container = self.element.children('.combplot-plotcontainer');

    tmplElement.appendTo(container);

    currentScope.setModelData(model);
    currentScope.setElement(tmplElement.children('.dtcontainer'));
    currentScope.init();

    self.childScopeNo++;
  };

  // --------

  return CombinedPlotScope;
  
});