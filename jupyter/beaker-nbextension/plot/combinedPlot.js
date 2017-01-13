define([
  'nbextensions/beaker/plot/libs/d3.min',
  'nbextensions/beaker/plot/_mocks',
  'nbextensions/beaker/plot/plotUtils',
  'nbextensions/beaker/plot/combinedPlotFormatter',
  'nbextensions/beaker/plot/bkUtils',
  'nbextensions/beaker/plot/chartExtender',
  'nbextensions/beaker/plot/libs/jquery.contextMenu.min',
  'nbextensions/beaker/plot/plot'
], function(
  d3,
  _mocks,
  plotUtils,
  combinedPlotFormatter,
  bkUtils,
  bkoChartExtender,
  contextMenu,
  plot
) {

  window.d3 = d3;

  return {
    createScope: createScope
  };

  function createScope(wrapperId) {
    var scope = {
      wrapperId: wrapperId,
      model: {
        getCellModel: function() {
          return ch1;
        }
      }
    };
    var ch1 = {};
    var childScopeNo = 1;

    var element = null;

    scope.initLayout = function() {
      var model = scope.stdmodel;
      if (model.title != null) {
        element.find("#combplotTitle").text(model.title).css("width", scope.width || scope.stdmodel.plotSize.width);
      }
    };

    scope.standardizeData = function() {
      var model = scope.model.getCellModel();
      scope.stdmodel = combinedPlotFormatter.standardizeModel(model, scope.prefs);
      model.saveAsSvg = function(){
        return scope.saveAsSvg();
      };
      model.saveAsPng = function(){
        return scope.saveAsPng();
      };
    };

    scope.prepareSavedState = function(state) {
      state.focus = scope.calcRange();
      scope.width = scope.stdmodel.plotSize.width;
    };

    scope.applySavedState = function(state) {
      scope.state = state;
      scope.width = state.width;
    };

    scope.preparePlotModels = function() {
      var models = [];
      var plots = scope.stdmodel.plots;

      // create a plot model and a saved state for each plot
      for (var i = 0; i < plots.length; i++) {

        var plotmodel = plots[i];

        plotmodel.xAxis.showGridlineLabels = scope.model.getCellModel().x_tickLabels_visible;
        plotmodel.yAxis.showGridlineLabels = scope.model.getCellModel().y_tickLabels_visible;

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
            if (scope.model.setDumpState !== undefined) {
              scope.model.setDumpState(scope.dumpState());
            }
          },
          resetShareMenuItems : function() {
          },
          getFocus : function() {
            return scope.focus;
          },
          updateFocus : function(focus) {
            scope.focus = {};
            _.extend(scope.focus, focus);
            // scope.$apply();
            this.setDumpState(scope.dumpState());
          },
          updateWidth : function(width) {
            scope.width = width;
            element.find("#combplotTitle").css("width", width);
            // scope.$apply();
          },
          updateMargin : function() {
            // if any of plots has left-positioned legend we should update left margin (with max value)
            // for all plots (to adjust vertical position)
            var plots = element.find(".plot-plotcontainer");
            var maxMargin = 0;

            plots.each(function() {
              var value = parseFloat($(this).css('margin-left'));
              maxMargin = _.max([value, maxMargin]);
            });
            plots.css("margin-left", maxMargin);
            for (var i = 0; i < scope.stdmodel.plots.length; i++) {
              scope.stdmodel.plots[i].updateLegendPosition();
            }
          },
          getWidth : function() {
            return scope.width;
          },
          onClick: function(subplotId, item, e) {
            for (var i = 0; i < scope.stdmodel.plots.length; i++) {
              var subplot = scope.stdmodel.plots[i];
              if (subplotId === subplot.plotId) {
                var params = plotUtils.getActionObject(scope.model.getCellModel().type, e, i);
                plotService.onClick(scope.model.getCellModel().update_id,
                  item.uid,
                  scope.model.getEvaluatorId(),
                  params);
              }
            }
          },
          onKey: function(key, subplotId, item, e) {
            for (var i = 0; i < scope.stdmodel.plots.length; i++) {
              var subplot = scope.stdmodel.plots[i];
              if (subplotId === subplot.plotId) {
                var actionObject = plotUtils.getActionObject(scope.model.getCellModel().type, e, i);
                plotService.onKey(scope.model.getCellModel().update_id,
                  item.uid,
                  scope.model.getEvaluatorId(),
                  { key: key, actionObject: actionObject });
              }
            }
          },
          setActionDetails: function(subplotId, item, e) {
            var actionObject;
            for (var i = 0; i < scope.stdmodel.plots.length; i++) {
              var subplot = scope.stdmodel.plots[i];
              if (subplotId === subplot.plotId) {
                actionObject = plotUtils.getActionObject(scope.model.getCellModel().type, e, i);
              }
            }
            return plotService.setActionDetails(scope.model.getCellModel().update_id,
              item.uid,
              scope.model.getEvaluatorId(),
              actionObject);
          }
        };
        models.push(pl);
      }
      scope.models = models;
    };

    scope.calcRange = function() {
      var xl = 1E100, xr = 0;
      var plots = scope.stdmodel.plots;
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

    scope.dumpState = function() {
      var ret = { };
      ret.focus = scope.focus;
      ret.width = scope.width;
      ret.subplots = [];
      for (var i = 0; i < scope.models.length; i++) {
        ret.subplots.push(scope.models[i].state);
      }
      return ret;
    };

    scope.init = function() {
      scope.canvas = element.find("canvas")[0];
      scope.canvas.style.display="none";

      scope.id = 'bko-plot-' + bkUtils.generateId(6);
      element.find('.combplot-plotcontainer').attr('id', scope.id);
      $.contextMenu({
        selector: '#' + scope.id,
        zIndex: 3,
        items: plotUtils.getSavePlotAsContextMenuItems(scope)
      });

      scope.standardizeData();
      scope.preparePlotModels();
      scope.initLayout();
      scope.calcRange();
      scope.runChildCharts();

      if (scope.model.getDumpState !== undefined) {
        var savedstate = scope.model.getDumpState();
        if (savedstate !== undefined && savedstate.subplots !== undefined) {
          for (var i = 0; i < scope.models.length; i++) {
            scope.models[i].state = savedstate.subplots[i];
          }
          scope.width = savedstate.width;
          scope.focus = savedstate.focus;
        } else if (scope.models !== undefined) {
          scope.focus = scope.calcRange();
          for (var i = 0; i < scope.models.length; i++) {
            scope.models[i].state = { };
          }
          if (scope.model.setDumpState !== undefined) {
            scope.model.setDumpState(scope.dumpState());
          }
        }
      }
    };

    if (scope.model.getDumpState !== undefined) {
      scope.getDumpState = function() {
        return scope.model.getDumpState();
      };
    }

    // scope.init();

    // if (scope.model.getDumpState !== undefined) {
    //   scope.$watch('getDumpState()', function(result) {
    //     if (result !== undefined && result.subplots === undefined && scope.models !== undefined) {
    //       for (var i = 0; i < scope.models.length; i++) {
    //         scope.models[i].state = { };
    //       }
    //       if (scope.model.setDumpState !== undefined) {
    //         scope.model.setDumpState(scope.dumpState());
    //       }
    //     }
    //   });
    // }

    scope.getCellModel = function() {
      return scope.model.getCellModel();
    };
    // scope.$watch('getCellModel()', function() {
    //   scope.init();
    // });
    // scope.$on('$destroy', function() {
    //   $.contextMenu('destroy', { selector: '#' + scope.id});
    // });

    scope.getSvgToSave = function() {
      var plots = scope.stdmodel.plots;

      var combinedSvg = $("<svg></svg>").attr('xmlns', 'http://www.w3.org/2000/svg').attr('class', 'svg-export');

      var plotTitle = element.find("#combplotTitle");

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

    scope.saveAsSvg = function() {
      var html = plotUtils.convertToXHTML(scope.getSvgToSave().outerHTML);
      var fileName = _.isEmpty(scope.stdmodel.title) ? 'combinedplot' : scope.stdmodel.title;
      plotUtils.download('data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(html))), fileName + '.svg');
    };

    scope.saveAsPng = function() {
      var svg = scope.getSvgToSave();

      scope.canvas.width = svg.getAttribute("width");
      scope.canvas.height = svg.getAttribute("height");

      var html = plotUtils.convertToXHTML(svg.outerHTML);
      var imgsrc = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(html)));
      var fileName = _.isEmpty(scope.stdmodel.title) ? 'combinedplot' : scope.stdmodel.title;
      plotUtils.drawPng(scope.canvas, imgsrc, fileName + '.png');
    };

    scope.setModelData = function(data) {
      ch1 = data;

      element = $('div#'+scope.wrapperId);

      if (scope.model.getCellModel().type === "TreeMap"){
        bkoChartExtender.extend(scope, element);
      }
    };

    scope.buildTemplate = function() {
      var tmpl = "<canvas></canvas>" +
                 "<div id='combplotTitle' class='plot-title'></div>" +
                 "<div class='combplot-plotcontainer'>" +
                 "</div>";
      $('div#'+scope.wrapperId).append(tmpl);
    };

    scope.runChildCharts = function() {
      scope.models.forEach(scope.runChildChart);
    };

    scope.runChildChart = function(model) {
      // console.log('show model', model);
      var childId = scope.wrapperId + '_child' + childScopeNo,
        currentScope = plot.createScope(childId),
        tmpl = currentScope.buildTemplate(),
        container = element.children('.combplot-plotcontainer');

      // console.log('currentScope',currentScope);

      container.append('<div id="'+childId+'"></div>');
      container.children('#'+childId).append(tmpl);

      currentScope.setModelData(model);
      currentScope.init();

      childScopeNo++;
    };

    return scope;
  }

})