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

import createHeaderContextMenuItems from './createHeaderContextMenuItems';
import createCellContextMenuItems from './createCellContextMenuItems';
import createPublishMenuItems from "./createPublishMenuItem";
import { DataGridScope } from "../DataGridScope";
import BkoContextMenu from "beakerx_shared/lib/contextMenu/BkoContextMenu";
import BeakerXApi from "beakerx_shared/lib/api/BeakerXApi";

export default class DataGridContextMenu extends BkoContextMenu {
  constructor(scope: DataGridScope) {
    super({ ...scope, element: [scope.dataGrid.node], dataGrid: scope.dataGrid });
  }

  protected buildMenu(): void {
    this.inLab ? this.buildLabMenu() : this.buildBkoMenu();

    const menuItems = [
      ...createHeaderContextMenuItems(this.scope.dataGrid, this),
      ...createCellContextMenuItems(this.scope.dataGrid, this)
    ];

    let baseUrl;

    try {
      baseUrl = `${(Jupyter.notebook_list || Jupyter.notebook).base_url}`;
    } catch (e) {
      baseUrl = `${window.location.origin}/`;
    }

    new BeakerXApi(baseUrl)
      .loadSettings()
      .then(ret => {
        if (ret.ui_options.show_publication) {
          menuItems.push(...createPublishMenuItems(this.scope.dataGrid, this));
        }
        this.createItems(menuItems, this.contextMenu);
        this.bindEvents();
      }).catch(() => {});
  }
}
