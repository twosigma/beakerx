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

import PlotFocus from "../zoom/PlotFocus";
import PlotRange from "../range/PlotRange";
import GridLabels from "./GridLabels";
import GridTics from "./GridTics";
import GridLines from "./GridLines";

const plotUtils = require('../plotUtils');

export default class PlotGrid {
  scope: any;
  plotFocus: PlotFocus;
  plotRange: PlotRange;
  gridLines: GridLines;
  gridLabels: GridLabels;
  gridTics: GridTics;

  constructor(scope: any) {
    this.scope = scope;
    this.plotFocus = scope.plotFocus;
    this.plotRange = scope.plotRange;
    this.gridLines = new GridLines(scope);
    this.gridLabels = new GridLabels(scope);
    this.gridTics = new GridTics(scope);
  }

  render() {
    this.gridLines.render();

    plotUtils.plotGridlines(this.scope);

    this.gridLabels.render();
    this.gridTics.render();
  }
}
