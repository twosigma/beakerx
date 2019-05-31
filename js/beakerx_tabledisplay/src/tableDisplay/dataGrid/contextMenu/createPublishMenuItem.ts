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

import DataGridContextMenu from "./DataGridContextMenu";
import {BeakerXDataGrid} from "../BeakerXDataGrid";
import {GistPublisherUtils} from "../../../GistPublisherUtils";
import IContextMenuItem from "beakerx_shared/lib/contextMenu/IContextMenuItem";

export default function createPublishMenuItems(
  dataGrid: BeakerXDataGrid,
  contextMenu: DataGridContextMenu
): IContextMenuItem[] {
  const selector = `#${dataGrid.wrapperId} canvas`;

  return [
    {
      id: `beakerx:publish:${dataGrid.wrapperId}`,
      title: 'Publish...',
      action: () => GistPublisherUtils.publishScope(dataGrid),
      selector
    },
  ];
}
