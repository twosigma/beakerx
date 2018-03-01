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

import {SectionList} from "@phosphor/datagrid/lib/sectionlist";
import {DEFAULT_DATA_FONT_SIZE} from "./style/dataGridStyle";

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

  export function getStringWidth(value: string, fontSize: Number|null|undefined) {
    let spanEl: HTMLSpanElement = document.createElement('span');
    let width: number;

    spanEl.textContent = value;
    spanEl.style.fontFamily = 'Lato, Helvetica, sans-serif';
    spanEl.style.fontSize = `${fontSize || DEFAULT_DATA_FONT_SIZE}px`;
    spanEl.style.padding = '5px';
    spanEl.style.position = 'absolute';
    document.body.appendChild(spanEl);

    width = spanEl.clientWidth;
    document.body.removeChild(spanEl);

    return width;
  }

  export function findSectionIndex(
    list: SectionList,
    cursorPosition: number
  ): { index: number, delta: number } | null {
    // Bail early if the list is empty or the position is invalid.
    if (list.sectionCount === 0 || cursorPosition < 0) {
      return null;
    }

    // Compute the delta from the end of the list.
    let delta = cursorPosition - (list.totalSize - 1);
    if (delta > 0) {
      return null;
    }

    // Test whether the hover is just past the last section.
    let index = list.sectionCount - 1;
    if (delta >= -list.sectionSize(index)) {
      return { index, delta };
    }

    index = list.sectionIndex(cursorPosition);
    delta = cursorPosition - (list.sectionOffset(index) - 1);

    if (index >= 0) {
      return { index, delta };
    }

    return null;
  }

  export function throttle<T, U>(func: Function, limit: number): (T) => U|undefined {
    let lastFunc;
    let lastRan;

    return function(...args: T[]): U|undefined {
      const context = this;

      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();

        return;
      }

      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if ((Date.now() - lastRan) < limit) {
          return;
        }

        func.apply(context, args);
        lastRan = Date.now();
      }, limit - (Date.now() - lastRan))
    }
  }
}
