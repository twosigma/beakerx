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
import { Message, MessageLoop } from "@phosphor/messaging";

import { Messages } from "../Messages";
import JVMOptionsModel from "../Models/JVMOptionsModel";
import DefaultOptionsWidget from "./JVMOptions/DefaultOptionsWidget";
import OtherOptionsWidget from "./JVMOptions/OtherOptionsWidget";
import PropertiesWidget from "./JVMOptions/PropertiesWidget";
import OptionsWidget from "./OptionsWidget";
import DOMUtils from "../Utils/DOMUtils";

export default class JVMOptionsWidget extends Panel {

  constructor() {
    super();

    this.addClass('beakerx_container');

    this.addClass('bx-jvm-options-widget');
    this.title.label = 'JVM Options';
    this.title.closable = false;

    let defaultOptionsWidget  = new DefaultOptionsWidget();
    let otherOptionsWidget = new OtherOptionsWidget();
    let propertiesWidget = new PropertiesWidget();

    this._model = this.createModel(
      defaultOptionsWidget,
      propertiesWidget,
      otherOptionsWidget
    );

    this.addWidget(defaultOptionsWidget);
    this.addWidget(propertiesWidget);
    this.addWidget(otherOptionsWidget);
  }

  public processMessage(msg: Message): void {
    switch (msg.type) {
      case Messages.TYPE_DEFAULT_JVM_OPTIONS_CHANGED:
        this._model.setDefaultOptions((msg as Messages.DefaultOptionsChangedMessage).values);
        this.sendMessageToParent(new Messages.JVMOptionsChangedMessage(this._model.options));
        break;
      case Messages.TYPE_OTHER_JVM_OPTIONS_CHANGED:
        this._model.setOtherOptions((msg as Messages.OtherOptionsChangedMessage).options);
        this.sendMessageToParent(new Messages.JVMOptionsChangedMessage(this._model.options));
        break;
      case Messages.TYPE_PROPERTIES_JVM_OPTIONS_CHANGED:
        this._model.setPropertiesOptions((msg as Messages.PropertiesOptionsChangedMessage).properties);
        this.sendMessageToParent(new Messages.JVMOptionsChangedMessage(this._model.options));
        break;
      case Messages.TYPE_JVM_OPTIONS_ERROR:
        this.sendMessageToParent(msg);
        break;
      case Messages.TYPE_SIZE_CHANGED:
        this._updateSize();
        break;
      default:
        super.processMessage(msg);
        break;
    }
  }

  get model(): JVMOptionsModel {
    return this._model;
  }

  protected onActivateRequest(): void {
    this._updateSize();
  }

  private _updateSize(): void {
    let h = 0;
    for (let w of this.widgets) {
      h += DOMUtils.getRealElementHeight(w.node);
    }

    $(this.node).height(h);
    $(this.parent.node).height(h);
    (this.parent!.parent as OptionsWidget).updateDimensions();
  }

  private _model: JVMOptionsModel;

  private createModel(defaultOptionsWidget: DefaultOptionsWidget, propertiesWidget: PropertiesWidget, otherOptionsWidget: OtherOptionsWidget) {
    return new JVMOptionsModel(
      defaultOptionsWidget,
      propertiesWidget,
      otherOptionsWidget,
    );
  }

  private sendMessageToParent(msg: Message) {
    // direct parent is stacked panel of tab panel
    MessageLoop.sendMessage(this.parent!.parent, msg);
  }

}
