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
import {KEYBOARD_KEYS} from "./event/enums";
import DataGridColumn from "./column/DataGridColumn";
import * as moment from 'moment-timezone/builds/moment-timezone-with-data';

export namespace DataGridHelpers {
  const urlRegex = /((https?|ftp|file):\/\/)(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[A-Z0-9+&@#/%=~_|$])/i;
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

  export function enableNotebookEditMode() {
    try {
      Jupyter.notebook.edit_mode();
    } catch (e) {}
  }

  export function getStringSize(value: string, fontSize: Number|null|undefined) {
    let spanEl: HTMLSpanElement = document.createElement('span');
    let width: number;
    let height: number;

    spanEl.textContent = value;
    spanEl.style.fontFamily = 'Lato, Helvetica, sans-serif';
    spanEl.style.fontSize = `${fontSize || DEFAULT_DATA_FONT_SIZE}px`;
    spanEl.style.padding = '5px';
    spanEl.style.position = 'absolute';
    document.body.appendChild(spanEl);

    width = spanEl.clientWidth;
    height = spanEl.clientHeight;
    document.body.removeChild(spanEl);

    return { width, height };
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
    let delta = cursorPosition - (list.totalSize);
    if (delta > 0) {
      return null;
    }

    // Test whether the hover is just past the last section.
    let index = list.sectionCount - 1;
    if (delta >= -list.sectionSize(index)) {
      return { index, delta };
    }

    index = list.sectionIndex(cursorPosition);
    delta = cursorPosition - (list.sectionOffset(index));

    if (index >= 0) {
      return { index, delta };
    }

    return null;
  }

  export function throttle<T, U>(func: Function, limit: number, context = this): (T) => U|undefined {
    let lastFunc;
    let lastRan;

    return (...args: T[]): U|undefined => {
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

  export function debounce<A>(f:(a:A) => void, delay: number) {
    let timer: number = null;

    return (a: A) => {
      clearTimeout(timer);
      timer = setTimeout(() => f(a), delay);
    }
  }

  export function isUrl(url: string) {
    return urlRegex.test(String(url));
  }

  export function getEventKeyCode(event: KeyboardEvent) {
    if (event.which || event.charCode || event.keyCode ) {
      return event.which || event.charCode || event.keyCode;
    }

    if (event.code) {
      return KEYBOARD_KEYS[event.code];
    }

    return event.key.charAt(0) || 0;
  }

  export function sortColumnsByPositionCallback(columnA: DataGridColumn, columnB: DataGridColumn) {
    let positionA = columnA.getPosition();
    let positionB = columnB.getPosition();

    if (positionA.region === positionB.region) {
      return positionA.value - positionB.value;
    }

    return positionA.region === 'row-header' ? -1 : 1;
  }

  export function applyTimezone(timestamp, tz) {
    const time = moment(timestamp);

    if (!tz) {
      return time;
    }

    if (tz.startsWith("GMT")) {
      time.utcOffset(tz);
    } else {
      time.tz(tz);
    }

    return time;
  }

  export function formatTimestamp(timestamp, tz, format) {
    return applyTimezone(timestamp, tz).format(format);
  }
}
