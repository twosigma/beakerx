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

export default class BeakerXTreeWidget extends Panel {

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

}
