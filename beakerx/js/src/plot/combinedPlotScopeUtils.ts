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

interface PlotScopeInterface {
  calcMapping: (emitFocusUpdate: boolean) => void
  update: () => void
  layout: {
    leftLayoutMargin: number,
    rightLayoutMargin: number,
  },
}

export default class CombinedPlotScopeUtils {

  public static adjustLayoutMargin(scopes: PlotScopeInterface[]): void {
    const maximumMargins = CombinedPlotScopeUtils.getMaximumLayoutMarrgins(scopes);

    for (let scope of scopes) {
      CombinedPlotScopeUtils.adjustScopeLayoutMargin(scope, maximumMargins);
    }
  }

  private static getMaximumLayoutMarrgins(scopes: PlotScopeInterface[]): { left: number; right: number; } {
    let maxLeft = 0;
    let maxRight = 0;

    for (let scope of scopes) {
      maxLeft = Math.max(maxLeft, scope.layout.leftLayoutMargin);
      maxRight = Math.max(maxRight, scope.layout.rightLayoutMargin);
    }

    return {
      left: maxLeft,
      right: maxRight,
    };
  }

  private static adjustScopeLayoutMargin(scope: PlotScopeInterface, margins: { left: number; right: number; }) {
    const layout = scope.layout;

    if (layout.leftLayoutMargin === margins.left && layout.rightLayoutMargin === margins.right) {
      return;
    }

    layout.leftLayoutMargin = margins.left;
    layout.rightLayoutMargin = margins.right;

    scope.calcMapping(false);
    scope.update();
  }

}