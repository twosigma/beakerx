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
import { DefaultOptionsModel, DefaultOptionsWidget } from "./JVMOptions/DefaultOptionsWidget";
import { OtherOptionsModel, OtherOptionsWidget } from "./JVMOptions/OtherOptionsWidget";
import { PropertiesModel, PropertiesWidget } from "./JVMOptions/PropertiesWidget";
import BeakerXApi, {
  IDefaultJVMOptions, IJVMOptions, IOtherJVMOptions, IPropertiesJVMOptions
} from "./BeakerXApi";
import { Messages } from "./JVMOptions/Messages";
import JVMOptionsChangedMessage = Messages.JVMOptionsChangedMessage;

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
    this.setupWidgets();
  }

  public onBeforeAttach(msg: Message): void {
    this.createWidgetStylesElement();
  }

  public processMessage(msg: Message): void {
    switch (msg.type) {
      case Messages.TYPE_DEFAULT_JVM_OPTIONS_CHANGED:
        this._model.setDefaultOptions((msg as Messages.DefaultOptionsChangedMessage).values);
        this.sendMessageToParent(new JVMOptionsChangedMessage(this._model.options));
        break;
      case Messages.TYPE_OTHER_JVM_OPTIONS_CHANGED:
        this._model.setOtherOptions((msg as Messages.OtherOptionsChangedMessage).options);
        this.sendMessageToParent(new JVMOptionsChangedMessage(this._model.options));
        break;
      case Messages.TYPE_PROPERTIES_JVM_OPTIONS_CHANGED:
        this._model.setPropertiesOptions((msg as Messages.PropertiesOptionsChangedMessage).properties);
        this.sendMessageToParent(new JVMOptionsChangedMessage(this._model.options));
        break;
      case Messages.TYPE_JVM_OPTIONS_ERROR:
        MessageLoop.sendMessage(this.parent, msg);
        break;
      default:
        super.processMessage(msg);
        break;
    }
  }

  private _model: JVMOptionsModel;

  private createWidgetStylesElement(): void {
    $(this.HTML_ELEMENT_TEMPLATE).insertBefore(this.node);
  }

  private setupWidgets() {
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

  private createModel(defaultOptionsWidget: DefaultOptionsWidget, propertiesWidget: PropertiesWidget, otherOptionsWidget: OtherOptionsWidget) {
    return new JVMOptionsModel(
      new DefaultOptionsModel(defaultOptionsWidget),
      new PropertiesModel(propertiesWidget),
      new OtherOptionsModel(otherOptionsWidget),
    );
  }

  private sendMessageToParent(msg: Message) {
    MessageLoop.sendMessage(this.parent, msg);
  }

}

export class JVMOptionsModel {

  private _options: IJVMOptions

  constructor(
    private defaultOptionsModel: DefaultOptionsModel,
    private propertiesOptionsModel: PropertiesModel,
    private otherOptionsModel: OtherOptionsModel,
  ) {
  }

  public get options(): IJVMOptions {
    return this._options;
  }

  public update(options: IJVMOptions) {
    this._options = options;

    this.defaultOptionsModel
      .update({ heap_GB: options.heap_GB });
    this.propertiesOptionsModel
      .update(options.properties);
    this.otherOptionsModel
      .update(options.other);
  }

  public setDefaultOptions(values: IDefaultJVMOptions) {
    this._options.heap_GB = values.heap_GB;
  }

  public setOtherOptions(options: IOtherJVMOptions) {
    this._options.other = options;
  }

  public setPropertiesOptions(properties: IPropertiesJVMOptions) {
    this._options.properties = properties;
  }
}
