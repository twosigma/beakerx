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
import { Widget } from "@phosphor/widgets";

export default class DefaultOptionsWidget extends Widget {

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

  public val: string = '';

  constructor() {
    super();
    this.createContent();
  }

  private createContent() {
    $(this.HTML_ELEMENT_TEMPLATE)
      .appendTo(this.node);

    const that = this;
    $(this.node).find('#heap_GB')
      .on('change', that.optionsChangedHandler);
  }

  private optionsChangedHandler(evt) {
    this.val = `${$(evt.currentTarget).val()}`;
    console.log(this.val);
  }

}
