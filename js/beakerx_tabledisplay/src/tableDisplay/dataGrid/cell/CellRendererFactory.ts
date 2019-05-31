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

import { BeakerXDataGrid } from "../BeakerXDataGrid";
import { ALL_TYPES } from "../dataTypes";
import HTMLCellRenderer from "./HTMLCellRenderer";
import HeaderCellRenderer from "./HeaderCellRenderer";
import DefaultCellRenderer from "./DefaultCellRenderer";
import ImageCellRenderer from "./ImageCellRenderer";

export class CellRendererFactory {
  static getRenderer(dataGrid: BeakerXDataGrid, dataType?: ALL_TYPES) {
    switch (dataType) {
      case ALL_TYPES.html:
        return new HTMLCellRenderer(dataGrid);
      case ALL_TYPES.image:
        return new ImageCellRenderer(dataGrid);
      default:
        return new DefaultCellRenderer(dataGrid);
    }
  }

  static getHeaderRenderer(dataGrid) {
    return new HeaderCellRenderer(dataGrid);
  }
}
