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
import { Panel } from "@phosphor/widgets";
import { Message } from "@phosphor/messaging";
import DefaultOptionsWidget from "./JVMOptions/DefaultOptionsWidget";
import OtherOptionsWidget from "./JVMOptions/OtherOptionsWidget";
import PropertiesWidget from "./JVMOptions/PropertiesWidget";
import SyncIndicatorWidget from "./JVMOptions/SyncIndicatorWidget";

export default class JVMOptionsWidget extends Panel {
  public readonly HTML_ELEMENT_TEMPLATE = `
<style>
  #beakerx-tree label { 
    font-weight: normal; 
  }
  .beakerx_container {
    margin: 0 16px;
  }
</style>
`;

  constructor() {
    super();

    this.addClass('beakerx_container');

    this.addWidget(new DefaultOptionsWidget());
    this.addWidget(new PropertiesWidget());
    this.addWidget(new OtherOptionsWidget());

    this.addWidget(new SyncIndicatorWidget());

  }

  onBeforeAttach(msg: Message): void {
    this.createWidgetStylesElement();
  }

  private createWidgetStylesElement(): void {
    $(this.HTML_ELEMENT_TEMPLATE)
      .insertBefore(this.node);
  }

}
