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

import IContextMenuItem from "beakerx_shared/lib/contextMenu/IContextMenuItem";

export function createSaveAsMenuItems(scope: any): IContextMenuItem[] {
  const selector = `#${scope.id}`;

  return [
    {
      id: `beakerx:saveAsSvg:${scope.id}`,
      title: 'Save as SVG',
      action: () => scope.saveAsSvg(),
      selector
    },
    {
      id: `beakerx:saveAsPng:${scope.id}`,
      title: 'Save as PNG',
      action: () => scope.saveAsPng(),
      selector
    },
    {
      id: `beakerx:saveAsHighDpiPng:${scope.id}`,
      title: 'Save as PNG at high DPI...',
      items: [2,3,4,5].map((scale) => ({
        id: `beakerx:saveAsHighDpiPng:${scope.id}:${scale}`,
        title: scale + 'x',
        action: () => scope.saveAsPng(scale)
      })),
      selector
    },
  ];
}

export function createPublishMenuItems(scope: any): IContextMenuItem[] {
  const selector = `#${scope.id}`;

  return [
    {
      id: `beakerx:publish:${scope.id}`,
      title: 'Publish...',
      action: () => scope.publish(),
      selector
    },
  ];
}
