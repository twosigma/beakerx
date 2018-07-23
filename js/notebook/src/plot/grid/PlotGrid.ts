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

import GridLabels from "./GridLabels";
import GridTics from "./GridTics";
import GridLines from "./GridLines";

export default class PlotGrid {
  gridLines: GridLines;
  gridLabels: GridLabels;
  gridTics: GridTics;

  constructor(scope: any) {
    this.gridLines = new GridLines(scope);
    this.gridLabels = new GridLabels(scope);
    this.gridTics = new GridTics(scope);
  }

  render() {
    this.gridLines.render();
    this.gridLabels.render();
    this.gridTics.render();
  }

  reset() {
    this.gridLines.reset();
    this.gridLabels.reset();
    this.gridTics.reset();
  }
}
