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

export namespace DataGridHelpers {
  const htmlCharactersReplacementMap = {
    '"': '&quot;',
    '&': '&amp;',
    '\'': '&#39;',
    '/': '&#47;',
    '<': '&lt;',
    '>': '&gt;'
  };

  export function escapeHTML(text: any): any {
    if (typeof text === 'string') {
      return text.replace(
        /[\'&'\/<>]/g,
        (a) => htmlCharactersReplacementMap[a]
      );
    }

    return text;
  }

  export function truncateString(text, limit = 1000): string {
    if (text && text.length > limit) {
      text = text.substring(0, limit);
      text += '...';
    }

    return text;
  }

  export function disableKeyboardManager() {
    try {
      Jupyter.keyboard_manager.enabled = false;
    } catch (e) {}
  }

  export function enableKeyboardManager() {
    try {
      Jupyter.keyboard_manager.enabled = true;
    } catch (e) {}
  }

  export function getStringWidth(value: string) {
    let spanEl: HTMLSpanElement = document.createElement('span');
    let width: number;

    spanEl.textContent = value;
    spanEl.style.fontFamily = 'Lato, Helvetica, sans-serif';
    spanEl.style.fontSize = '13px';
    spanEl.style.padding = '5px';
    spanEl.style.position = 'absolute';
    document.body.appendChild(spanEl);

    width = spanEl.clientWidth;
    document.body.removeChild(spanEl);

    return width;
  }
}
