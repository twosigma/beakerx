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
        });
      tip.prepend(closeIcon);
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
        d.datax = scope.scr2dataX(mousePos[0] + 2);
        d.datay = scope.scr2dataY(mousePos[1] + 2);

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
                  delete scope.tips[d.id];
                  if (d.isresp === true) {  // is interaction responsive element
                    scope.jqsvg.find("#" + d.id).css("opacity", 0);
                  } else {
                    scope.jqsvg.find("#" + d.id).removeAttr("filter");
                  }
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
            tipdiv.remove();
            return;
          }
          tipdiv
            .draggable({
              stop: function (event, ui) {
                d.scrx = ui.position.left - plotUtils.fonts.tooltipWidth;
                d.scry = ui.position.top;
                d.datax = scope.scr2dataX(d.scrx);
                d.datay = scope.scr2dataY(d.scry);
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
        });
      }
    };
    return impl;
  };
  beaker.bkoFactory('plotTip', ['plotUtils', retfunc]);
})();
