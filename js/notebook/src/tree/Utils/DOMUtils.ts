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

import * as $ from "jquery";

export default class DOMUtils {

  public static getRealElementHeight(el: HTMLElement): number {
    let copyEl = $(el).clone()
      .attr("id", null)
      .css({
        visibility:"hidden",
        display:"block",
        position:"absolute"
      });
    let fakeEl = $('<div>', { id: 'beakerx-tree-widget' });
    fakeEl.appendTo($('body'));
    copyEl.appendTo(fakeEl);
    let h = copyEl.outerHeight();
    copyEl.remove();
    fakeEl.remove();
    return h;
  }
}
