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
import * as _ from "underscore";

import { Widget } from "@phosphor/widgets";
import { MessageLoop } from "@phosphor/messaging";

import DefaultOptionsWidgetInterface from "./DefaultOptionsWidgetInterface";
import HeapGBValidator from "../../Utils/HeapGBValidator";
import { Messages } from "../../Messages";

export default class DefaultOptionsWidget extends Widget implements DefaultOptionsWidgetInterface  {

  public readonly HEAP_GB_SELECTOR = '#heap_GB';

  public readonly HTML_ELEMENT_TEMPLATE = `
<div id="default_options">
  <div class="bx-wrapper">

    <label for="heap_GB">Heap Size</label>
    <input id="heap_GB" name="heap_size_prop" value="">
    <span>GB</span>

  </div>
</div>
`;

  public get $node(): JQuery<HTMLElement> {
    return $(this.node);
  }

  constructor() {
    super();

    $(this.HTML_ELEMENT_TEMPLATE).appendTo(this.node);

    this.$node
      .find(this.HEAP_GB_SELECTOR)
      .on('keyup', _.debounce(
        this.optionsChangedHandler.bind(this),
        1000
      ));
  }

  public setHeapGB(value): void {
    this.$node
      .find(this.HEAP_GB_SELECTOR)
      .val(value);
  }

  private optionsChangedHandler(evt): void {
    let heap_GB: string = `${$(evt.currentTarget).val()}`.trim();

    try {
      HeapGBValidator.validate(heap_GB);
      let msg = new Messages.DefaultOptionsChangedMessage({
        heap_GB: ('' === heap_GB) ? null : parseFloat(heap_GB)
      });

      MessageLoop.sendMessage(this.parent, msg);
    } catch (e) {
      MessageLoop.sendMessage(this.parent, new Messages.JVMOptionsErrorMessage(e));
    }

  }

}

