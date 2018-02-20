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

export default class SyncIndicatorWidget extends Widget {

  public readonly HTML_ELEMENT_TEMPLATE = `
<div class="form-group text-primary">
  <span id="sync_indicator">
    <span class="saving hidden"><i class="fa fa-spinner"></i></span>
    <span class="saved hidden"><i class="fa fa-check"></i></span>
  </span>
  <span>Result: java </span><span id="result"></span>
</div>
<div id="errors" style="color: red"></div>
`;

  private $savingEl;
  private $savedEl;
  private $errorsEl;
  private $resultEl;

  public get $node() {
    return $(this.node);
  }

  constructor() {
    super();
    this.addClass('bx-sync-indicator-widget');

    $(this.HTML_ELEMENT_TEMPLATE).appendTo(this.node);

    this.$savingEl = this.$node.find('#sync_indicator .saving');
    this.$savedEl = this.$node.find('#sync_indicator .saved');
    this.$errorsEl = this.$node.find('#errors');
    this.$resultEl = this.$node.find('#result');
  }

  public onSyncStart() {
    this.$savingEl.removeClass('hidden');
    this.$savedEl.addClass('hidden');
  }

  public onSyncEnd() {
    this.$savingEl.addClass('hidden');
    this.$savedEl.removeClass('hidden');
  }

  public onError(error: Error) {
    this.$errorsEl
      .empty()
      .append($('<span>', {
        text: error.message
      }));
  }

  public clearErrors() {
    this.$errorsEl.empty();
  }

  public showResult(result: string) {
    this.$resultEl
      .empty()
      .text(result);
  }
}
