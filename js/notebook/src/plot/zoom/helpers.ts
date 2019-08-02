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

export function disableZoomWheel(scope: any): void {
  scope.svg.on('wheel.zoom', null);
  scope.jqcontainer.off('wheel.zoom');
}

export function enableZoomWheel(scope: any, d3: any): void {
  if (!scope._defaultZoomWheelFn) {
    return;
  }

  scope.svg.on('wheel.zoom', scope._defaultZoomWheelFn);
  scope.jqcontainer
    .off('wheel.zoom')
    .on('wheel.zoom', function(event) {
      scope.svg.dispatch('wheel.zoom', scope._defaultZoomWheelFn);
    });
}

export default {
  disableZoomWheel,
  enableZoomWheel
}
