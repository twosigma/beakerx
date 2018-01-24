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

export default class OtherOptionsWidget extends Widget {


  public readonly HTML_ELEMENT_TEMPLATE = `
<fieldset>
  <div class="panel panel-default">
    <div class="panel-heading">
    
      <label>Other Command Line Options</label>
    
      <button type="button"
        id="add_option_jvm_sett"
        class="btn btn-default btn-xs"
        data-original-title="add new">
        <i class="fa fa-plus"></i>
      </button>

    </div>
    
    <div id="other_property" class="panel-body"></div>
  </div>
</fieldset>
`;

  constructor() {
    super();
    this.createContent();
  }

  private createContent() {
    $(this.HTML_ELEMENT_TEMPLATE)
      .appendTo(this.node);
  }
}
