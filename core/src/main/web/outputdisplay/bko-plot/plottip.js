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

(function () {
  'use strict';
  var retfunc = function (plotUtils) {

    var getTipElement = function (scope, d) {
      if (!d || !d.id) {
        return;
      }
      var tipid = "tip_" + d.id;
      return scope.jqcontainer.find("#" + tipid);
    };

    var clear = function (scope, d) {
      delete scope.tips[d.id];
      scope.jqcontainer.find("#tip_" + d.id).remove();
      if (d.isresp === true) {
        scope.jqsvg.find("#" + d.id).css("opacity", 0);
      } else {
        scope.jqsvg.find("#" + d.id).removeAttr("filter");
      }
    };

    var pinCloseIcon = function (scope, d) {
      var tip = getTipElement(scope, d);
      if (tip.has("i").length > 0)
        return;
      var closeIcon = $('<i/>', {class: 'fa fa-times'})
        .on('click', function () {
          clear(scope, d);
          scope.interactMode = "remove";
          $(this).parent('.plot-tooltip').remove();
          impl.renderTips(scope);
        });
      tip.prepend(closeIcon);
    };

    var drawLine = function (scope, d, tipdiv) {
      var svg = scope.maing;
      var diameter = 10;

      var x2 = d.cx;
      var y2 = d.cy;

      var position = tipdiv.position();

      var x1_1 = position.left;
      var y1_1 = position.top;

      var x1_2 = x1_1 + tipdiv.outerWidth();
      var y1_2 = y1_1;

      var x1_3 = x1_2;
      var y1_3 = y1_1 + tipdiv.outerHeight();

      var x1_4 = x1_1;
      var y1_4 = y1_3;

      var dist1 = Math.sqrt(Math.pow(x1_1 - x2, 2) + Math.pow(y1_1 - y2, 2));
      var dist2 = Math.sqrt(Math.pow(x1_2 - x2, 2) + Math.pow(y1_2 - y2, 2));
      var dist3 = Math.sqrt(Math.pow(x1_3 - x2, 2) + Math.pow(y1_3 - y2, 2));
      var dist4 = Math.sqrt(Math.pow(x1_4 - x2, 2) + Math.pow(y1_4 - y2, 2));

      var dist, x1, y1;

      if (dist1 <= dist2 && dist1 <= dist3 && dist1 <= dist4) {
        x1 = x1_1;
        y1 = y1_1;
        dist = dist1;
      } else if (dist2 <= dist1 && dist2 <= dist3 && dist2 <= dist4) {
        x1 = x1_2;
        y1 = y1_2;
        dist = dist2;
      } else if (dist3 <= dist1 && dist3 <= dist2 && dist3 <= dist4) {
        x1 = x1_3;
        y1 = y1_3;
        dist = dist3;
      } else {
        x1 = x1_4;
        y1 = y1_4;
        dist = dist4;
      }

      if (dist > diameter / 2) {
        var x2_ = x2 - diameter * (x2 - x1) / dist;
        var y2_ = y2 - diameter * (y2 - y1) / dist;

        svg.append("line")
          .style("stroke", "black")
          .attr("x2", x2_)
          .attr("y2", y2_)
          .attr("x1", x1)
          .attr("y1", y1)
          .attr("marker-end", "url(/beaker/#Triangle)")
        ;
      }
    };

    var impl = {

      toggleTooltip: function (scope, d) {
        if (scope.zoomed === true) {
          return;
        } // prevent dragging and toggling at the same time

        var id = d.id, nv = !scope.tips[id];
        if (nv === true) {
          impl.tooltip(scope, d, d3.mouse(scope.svg[0][0]));
        } else {
          scope.tips[id].sticking = !scope.tips[id].sticking;
          if (scope.tips[id].sticking === false) {
            impl.untooltip(scope, d);
          }
        }
        pinCloseIcon(scope, d);
      },

      tooltip: function (scope, d, mousePos) {
        if (scope.tips[d.id] != null) {
          return;
        }
        if (d.isresp === true) {
          scope.jqsvg.find("#" + d.id).css("opacity", 1);
        }
        scope.tips[d.id] = {};
        _.extend(scope.tips[d.id], d);
        var d = scope.tips[d.id];
        d.sticking = false;

        d.datax = scope.scr2dataX(mousePos[0] + 10);
        d.datay = scope.scr2dataY(mousePos[1] + 10);

        impl.renderTips(scope);
      },

      untooltip: function (scope, d) {
        if (scope.tips[d.id] == null) {
          return;
        }
        if (scope.tips[d.id].sticking === false) {
          clear(scope, d);
          impl.renderTips(scope);
        }
      },


      clearTips: function (scope, itemid) {
        _.each(scope.tips, function (value, key) {
          if (key.search("" + itemid) === 0) {
            scope.jqcontainer.find("#tip_" + key).remove();
            delete scope.tips[key];
          }
        });
      },

      renderTips: function (scope) {

        var data = scope.stdmodel.data;
        var svg = scope.maing;

        svg.selectAll("line").remove();

        _.each(scope.tips, function (d) {
          var x = scope.data2scrX(d.datax),
            y = scope.data2scrY(d.datay);
          d.scrx = x;
          d.scry = y;
          var tipid = "tip_" + d.id;
          var tipdiv = getTipElement(scope, d);

          if (tipdiv.length === 0) {
            var tiptext = data[d.idx].createTip(d.ele, d.g, scope.stdmodel);

            tipdiv = $("<div></div>").appendTo(scope.jqcontainer)
              .attr("id", tipid)
              .attr("class", "plot-tooltip")
              .css("border-color", data[d.idx].tip_color)
              .append(tiptext)
              .on('mouseup', function (e) {
                if (e.which == 3) {
                  clear(scope, d);
                  scope.interactMode = "remove";
                  $(this).remove();
                }
              });
            if (data[d.idx].tip_class) {
              tipdiv.addClass(data[d.idx].tip_class);
            }
          }
          var w = tipdiv.outerWidth(), h = tipdiv.outerHeight();
          if (plotUtils.outsideScrBox(scope, x, y, w, h)) {
            clear(scope, d);
            scope.interactMode = "remove";
            tipdiv.remove();
            return;
          }
          var drag = function (e, ui) {
            d.scrx = ui.position.left - plotUtils.fonts.tooltipWidth;
            d.scry = ui.position.top;
            d.datax = scope.scr2dataX(d.scrx);
            d.datay = scope.scr2dataY(d.scry);
            impl.renderTips(scope);
          };
          tipdiv
            .draggable({
              drag: function (e, ui) {
                drag(e, ui)
              },
              stop: function (e, ui) {
                drag(e, ui)
              }
            });

          tipdiv
            .css("left", x + plotUtils.fonts.tooltipWidth)
            .css("top", y);
          if (d.isresp === true) {
            scope.jqsvg.find("#" + d.id).attr("opacity", 1);
          } else {
            scope.jqsvg.find("#" + d.id)
              .attr("filter", "url(#svgfilter)");
          }

          if (d.sticking == true) {
            pinCloseIcon(scope, d);
          }

          drawLine(scope, d, tipdiv);
        });
      }
    };
    return impl;
  };
  beaker.bkoFactory('plotTip', ['plotUtils', retfunc]);
})();
