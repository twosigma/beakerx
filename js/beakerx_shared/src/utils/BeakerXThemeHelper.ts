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

import { DataGrid } from "@phosphor/datagrid";

export default class BeakerXThemeHelper {

  public static get isDark(): boolean {
    return document.body.classList.contains('bx-dark-theme');
  }

  public static getStyle(): DataGrid.IStyle {
      return this.isDark ?
        this.getDarkStyle() :
        this.getLightStyle();
  }

  public static get DEFAULT_DATA_FONT_COLOR(): string {
    return this.isDark ? '#ffffff': '#000000';
  }

  public static get DEFAULT_HEADER_FONT_COLOR(): string {
    return this.isDark ? '#ffffff': '#515A5A';
  }

  public static get DEFAULT_HIGHLIGHT_COLOR(): string {
    return this.isDark ? '#dfdfdf': '#6ba2c7';
  }

  public static get DEFAULT_CELL_BACKGROUND(): string {
    return '';
  }

  public static get FOCUSED_CELL_BACKGROUND(): string {
    return this.isDark ? '#66bb6a' : '#c8c8c8';
  }

  public static get SELECTED_CELL_BACKGROUND(): string {
    return this.isDark ? '#2196F3' : '#B0BED9';
  }

  public static get HIGHLIGHTED_CELL_BACKGROUND_EVEN(): string {
    return this.isDark ? 'rgb(34, 34, 34)' : 'rgb(241, 241, 241)';
  }

  public  static get HIGHLIGHTED_CELL_BACKGROUND_ODD(): string {
    return this.isDark ? 'rgb(26, 26, 26)' : 'rgb(249, 249, 249)';
  }

  public  static get MIN_LIGHTNESS_VALUE(): number {
    return this.isDark ? 15 : 35;
  }

  public  static get MIN_SATURATION_VALUE(): number {
    return this.isDark ? 15 : 35;
  }

  private static getDarkStyle(): DataGrid.IStyle {
    return {
    ...DataGrid.defaultStyle,
      voidColor: '#636363',
      backgroundColor: '#212121',
      headerBackgroundColor: '#252525',
      rowBackgroundColor: i => i % 2 === 0 ? '#424242' : '',
      gridLineColor: '#626262',
      headerGridLineColor: '#626262',
    };
  }

  private static getLightStyle(): DataGrid.IStyle {
    return {
      ...DataGrid.defaultStyle,
      voidColor: '#ffffff',
      headerBackgroundColor: '#E6E6E6',
      rowBackgroundColor: i => i % 2 === 0 ? '#f9f9f9' : '',
      gridLineColor: '#D4D0D0'
    };
  }
}