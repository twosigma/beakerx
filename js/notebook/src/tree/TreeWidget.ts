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

import { Panel, Widget } from "@phosphor/widgets";
import BannerWidget from "./BannerWidget";
import JVMOptionsWidget from "./JVMOptionsWidget";
import * as $ from "jquery";
import {Message} from "@phosphor/messaging";

export default class BeakerXTreeWidget extends Panel {

  public readonly HTML_ELEMENT_TEMPLATE = `
<style>
  #beakerx-tree { 
    width: 100%;
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
  }
</style>
`;
  constructor() {
    super();

    this.id = 'beakerx-tree';
    this.setupTitle();
    this.createWidgetContent();
  }

  private setupTitle() {
    this.title.label = 'BeakerX';
    this.title.closable = true;
  }

  private createWidgetContent() {
    this.addWidget(new BannerWidget());
    this.addWidget(new Widget({ node: document.createElement('br') }));
    this.addWidget(new JVMOptionsWidget());
  }

  onAfterAttach(msg: Message): void {
    this.createWidgetStylesElement();
  }

  private createWidgetStylesElement(): void {
    $(this.HTML_ELEMENT_TEMPLATE)
      .insertBefore(this.node);
  }

}
