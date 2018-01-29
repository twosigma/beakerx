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
import { Messages } from "./Messages";

export class DefaultOptionsWidget extends Widget {

  public readonly HEAP_GB_SELECTOR = '#heap_GB';

  public readonly HTML_ELEMENT_TEMPLATE = `
<fieldset id="default_options">
  <legend>JVM Options:</legend>
  <div class="form-inline form-group">

    <label class="control-label" for="heap_GB">Heap Size</label>
    <div class="input-group">
      <input id="heap_GB" name="heap_size_prop" value="" class="form-control mb-2 mr-sm-2 mb-sm-0">
      <div class="input-group-addon">GB</div>
    </div>

  </div>
</fieldset>
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

export class DefaultOptionsModel {

  constructor(private widget: DefaultOptionsWidget) {

  }

  public update(options: { heap_GB: number }) {
    this.widget.setHeapGB(options.heap_GB);
  }

  public static normaliseHeapSize(heap_GB: number): string {
    if (heap_GB % 1 === 0) {
      return `${heap_GB}g`;
    }
    return parseInt(`${heap_GB * 1024}`) + 'm';
  }
}

class HeapGBValidator {

  /**
   * @throws Error
   * @param value
   */
  public static validate(value: any): void {
    if ('' === value) {
      return;
    }
    let parsedVal = parseFloat(value);
    if (
      isNaN(parsedVal)
      || false === isFinite(value)
      || parsedVal <= 0
    ) {
      throw new Error('Heap Size must be a positive decimal number.');
    }
    return;
  }

}
