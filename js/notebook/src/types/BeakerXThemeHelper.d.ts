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

import { DataGrid } from "@phosphor/datagrid";
export default class BeakerXThemeHelper {
    static readonly isDark: boolean;
    static getStyle(): DataGrid.IStyle;
    static readonly DEFAULT_DATA_FONT_COLOR: string;
    static readonly DEFAULT_HEADER_FONT_COLOR: string;
    static readonly DEFAULT_HIGHLIGHT_COLOR: string;
    static readonly DEFAULT_CELL_BACKGROUND: string;
    static readonly FOCUSED_CELL_BACKGROUND: string;
    static readonly SELECTED_CELL_BACKGROUND: string;
    static readonly HIGHLIGHTED_CELL_BACKGROUND_EVEN: string;
    static readonly HIGHLIGHTED_CELL_BACKGROUND_ODD: string;
    static readonly MIN_LIGHTNESS_VALUE: number;
    static readonly MIN_SATURATION_VALUE: number;
    private static getDarkStyle();
    private static getLightStyle();
}
