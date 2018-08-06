/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
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

export default class LegendPosition {
  scope: any;

  constructor(scope) {
    this.scope = scope;
  }

  getPosition(legendPosition, isHorizontal) {
    if (!legendPosition) {
      return this.getPosition("TOP_RIGHT", isHorizontal);
    }

    const margin = this.scope.layout.legendMargin;
    const containerWidth = this.scope.jqcontainer.outerWidth(true);
    const containerWidthWithMargin = containerWidth + margin;
    const legend = this.scope.jqlegendcontainer.find("#plotLegend");
    const legendHeight = legend.height();
    const legendHeightWithMargin = legendHeight + margin;
    const verticalCenter = this.scope.jqcontainer.height() / 2 - legendHeight / 2;
    const horizontalCenter = containerWidth / 2 - legend.width() / 2;

    if (!legendPosition.position) {
      return {
        "left": legendPosition.x,
        "top": legendPosition.y
      };
    }

    switch (legendPosition.position) {
      case "TOP":
        return {
          "left": horizontalCenter,
          "top": -legendHeightWithMargin
        };

      case "LEFT":
        return {
          "left": 0,
          "top": verticalCenter
        };

      case "BOTTOM":
        return {
          "left": horizontalCenter,
          "bottom": -legendHeightWithMargin
        };

      case "RIGHT":
        return {
          "left": containerWidthWithMargin,
          "bottom": verticalCenter
        };

      default:
        return this.getLegendPositionByLayout(legendPosition, isHorizontal);
    }
  }

  getLegendPositionByLayout(legendPosition, isHorizontal) {
    const margin = this.scope.layout.legendMargin;
    const containerWidth = this.scope.jqcontainer.outerWidth(true);
    const containerWidthWithMargin = containerWidth + margin;

    if (isHorizontal) {
      return this.getPositionForHorizontalLegend(legendPosition, containerWidth, margin);
    }

    return this.getPositionForDefaultLayout(legendPosition, containerWidthWithMargin);
  }

  getPositionForHorizontalLegend(legendPosition, containerWidth, margin) {
    const legend = this.scope.jqlegendcontainer.find("#plotLegend");
    const legendWidth = legend.outerWidth(true);
    const legendHeight = legend.height();
    const legendHeightWithMargin = legendHeight + margin;

    switch (legendPosition.position) {
      case "TOP_LEFT":
        return {
          "left": 0,
          "top": -legendHeightWithMargin
        };

      case "TOP_RIGHT":
        return {
          "left": containerWidth - legendWidth,
          "top": -legendHeightWithMargin
        };

      case "BOTTOM_LEFT":
        return {
          "left": 0,
          "bottom": -legendHeightWithMargin
        };

      case "BOTTOM_RIGHT":
        return {
          "left": containerWidth - legendWidth,
          "bottom": -legendHeightWithMargin
        };
    }
  }

  getPositionForDefaultLayout(legendPosition, containerWidthWithMargin) {
    switch(legendPosition.position){
      case "TOP_LEFT":
        return {
          "left": 0,
          "top": this.scope.layout.topLayoutMargin
        };

      case "TOP_RIGHT":
        return {
          "left": containerWidthWithMargin,
          "top": this.scope.layout.topLayoutMargin
        };

      case "BOTTOM_LEFT":
        return {
          "left": 0,
          "bottom": this.scope.layout.bottomLayoutMargin
        };

      case "BOTTOM_RIGHT":
        return {
          "left": containerWidthWithMargin,
          "bottom": this.scope.layout.bottomLayoutMargin
        };
    }
  }

  updateLegendPosition() {
    const legendContainer = this.scope.jqlegendcontainer.find("#plotLegend");
    const isHorizontal = this.scope.stdmodel.legendLayout === "HORIZONTAL";

    if (this.scope.legendResetPosition === true) {
      this.scope.legendPosition = this.getPosition(
        this.scope.stdmodel.legendPosition,
        isHorizontal
      );
      this.scope.legendResetPosition = false;
    }

    legendContainer.css(this.scope.legendPosition);

    this.updateLegendMargins(legendContainer);
    this.updateLegendDraggable(legendContainer);
  }

  updateLegendMargins(legendContainer) {
    const isHorizontal = this.scope.stdmodel.legendLayout === "HORIZONTAL";
    const margin = this.scope.layout.legendMargin;

    //increase plot margins if legend has predefined values
    switch (this.scope.stdmodel.legendPosition.position) {
      case "LEFT":
        this.scope.jqcontainer.css("margin-left", legendContainer.width() + margin);
        break;
      case "TOP":
        this.scope.jqcontainer.css("margin-top", legendContainer.height() + margin);
        break;
      case "BOTTOM":
        this.scope.jqcontainer.css("margin-bottom", legendContainer.height() + margin);
        break;
    }

    if (isHorizontal) {
      if(["TOP_LEFT", "TOP_RIGHT"].indexOf(this.scope.stdmodel.legendPosition.position) !== -1) {
        this.scope.jqcontainer.css("margin-top", legendContainer.height() + margin);
      }
      if(["BOTTOM_LEFT", "BOTTOM_RIGHT"].indexOf(this.scope.stdmodel.legendPosition.position) !== -1) {
        this.scope.jqcontainer.css("margin-bottom", legendContainer.height() + margin);
      }
    } else {
      if(["TOP_LEFT", "BOTTOM_LEFT"].indexOf(this.scope.stdmodel.legendPosition.position) !== -1) {
        this.scope.jqcontainer.css("margin-left", legendContainer.width() + margin);
      }
    }
  }

  updateLegendDraggable(legendContainer) {
    if (!legendContainer.length) {
      return;
    }

    const legenddraggable = legendContainer.find(".plot-legenddraggable");

    if (legendContainer.get(0).scrollHeight > legendContainer.get(0).clientHeight) {
      legenddraggable.addClass("hasScroll");
    } else {
      legenddraggable.removeClass("hasScroll");
    }
  }
}
