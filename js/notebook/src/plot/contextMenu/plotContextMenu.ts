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

import { createPublishMenuItems, createSaveAsMenuItems } from "./createMenuItems";
import BeakerXApi from "beakerx_shared/lib/api/BeakerXApi";
import BkoContextMenu from "beakerx_shared/lib/contextMenu/BkoContextMenu";

export default class PlotContextMenu extends BkoContextMenu {
  constructor(scope: any) {
    super(scope);
  }

  protected buildMenu(): void {
    this.inLab ? this.buildLabMenu() : this.buildBkoMenu();

    const menuItems = [
      ...createSaveAsMenuItems(this.scope),
    ];

    let baseUrl;

    try {
      // @ts-ignore
      baseUrl = `${(Jupyter.notebook_list || Jupyter.notebook).base_url}`;
    } catch (e) {
      baseUrl = `${window.location.origin}/`;
    }

    new BeakerXApi(baseUrl)
      .loadSettings()
      .then(ret => {
        if (ret.ui_options.show_publication) {
          menuItems.push(...createPublishMenuItems(this.scope));
        }
        this.createItems(menuItems, this.contextMenu);
        this.bindEvents();
      });
  }
}
