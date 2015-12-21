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

(function() {
  'use strict';
  var retfunc = function() {

    var TooltipsConnect = function(opts) {
      var settings = {
        color: '#CCC', //@todo: change color by theme
        width: 1,
        fill: 'none'
      };

      this.options = _.extend(settings, opts);
      this.connectorId = 'connector' + opts.id;
    };

    TooltipsConnect.prototype.draw = function(el1, el2) {
      var $el1 = $(el1);
      var $el2 = $(el2);

      if (!$el1.length || !$el2.length) {
        return;
      }

      var svg = {height: 0, width: 0, top: 0, left: 0};
      var d;
      var c;

      var el1Pos = $(el1).offset();
      var el1Height = $(el1).outerHeight();
      var el1Width = $(el1).outerWidth();

      var el2Pos = $(el2).offset();
      var el2Height = $(el2).outerHeight();

      svg.left = Math.round(el1Pos.left + el1Width);
      svg.width = Math.round(el2Pos.left - svg.left);

      var el1ControlPoint = el1Pos.top + (el1Height / 2);
      var el2ControlPoint = el2Pos.top + (el2Height / 2);

      if (el2ControlPoint <= el1ControlPoint) {
        //1st element is higher
        svg.height = Math.round(el1ControlPoint - el2ControlPoint);
        svg.top = Math.round(el2ControlPoint) - this.options.width;
        c = Math.round(svg.width * Math.min(svg.height / 300, 1));
        d = "M0," + (svg.height + this.options.width) + " C" + c + "," + (svg.height + this.options.width)
          + " " + (svg.width - c) + "," + this.options.width + " " + svg.width + "," + this.options.width;
      } else {
        //2nd element is higher
        svg.height = Math.round(el2ControlPoint - el1ControlPoint);
        svg.top = Math.round(el1ControlPoint) - this.options.width;
        c = Math.round(svg.width * Math.min(svg.height / 300, 1));
        d = "M0," + this.options.width + " C" + c + ",0 " + (svg.width - c) + ","
          + (svg.height + this.options.width) + " " + svg.width + "," + (svg.height + this.options.width);
      }

      var $connector = $('#' + this.connectorId).length ? $('#' + this.connectorId)
        : $('body').append($("<div id='" + this.connectorId + "' />")).find('#' + this.connectorId);
      var svgNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      var pathNode = document.createElementNS('http://www.w3.org/2000/svg', 'path');

      pathNode.setAttributeNS(null, "stroke", this.options.color);
      pathNode.setAttributeNS(null, "stroke-width", this.options.width);
      pathNode.setAttributeNS(null, "fill", this.options.fill);
      pathNode.setAttributeNS(null, "d", d);

      svgNode.appendChild(pathNode);
      $(svgNode).css({
        left: svg.left,
        top: svg.top,
        position: 'absolute',
        width: svg.width,
        height: svg.height + this.options.width * 2
      });

      $connector.append(svgNode);
    };

    TooltipsConnect.prototype.erase = function() {
      $('#' + this.connectorId).empty();
    };

    return TooltipsConnect;
  };
  beaker.bkoFactory('TooltipsConnect', retfunc);
})();
