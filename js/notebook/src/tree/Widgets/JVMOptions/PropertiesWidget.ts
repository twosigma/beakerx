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
import { MessageLoop, Message } from "@phosphor/messaging";

import { Messages } from "../../Messages";
import {IPropertiesJVMOptions} from "beakerx_shared/lib/api/IJVMOptions";

export default class PropertiesWidget extends Widget {

  public readonly ADD_BUTTON_SELECTOR: string = '#add_property_jvm_sett';
  public readonly PROPERTIES_PANEL_SELECTOR: string = '#properties_property';

  public readonly HTML_ELEMENT_TEMPLATE = `
<fieldset>
  <div class="bx-panel">
    <div class="bx-panel-heading">

      Properties

      <button type="button"
        id="add_property_jvm_sett"
        class="bx-btn">
        <i class="fa fa-plus"></i>
      </button>
       
    </div>
    
    <div id="properties_property" class="bx-panel-body"></div>
  </div>
</fieldset>
`;

  private _elements: JQuery<HTMLElement>[] = [];

  public get $node(): JQuery<HTMLElement> {
    return $(this.node);
  }

  constructor() {
    super();

    $(this.HTML_ELEMENT_TEMPLATE).appendTo(this.node);

    this.$node
      .find(this.ADD_BUTTON_SELECTOR)
      .on('click', this.addPropertyButtonClickedHandler.bind(this));
  }

  public onLoad(properties: IPropertiesJVMOptions) {
    this.clear();
    for (let property in properties) {
      this.addPropertyElement(properties[property].name, properties[property].value);
    }
  }

  public processMessage(msg: Message): void {
    switch (msg.type) {
      case Private.TYPE_ELEMENT_ADDED:
        this.onElementAdded(msg as Private.ElementAddedMessage);
        break;
      case Private.TYPE_ELEMENT_REMOVED:
        this.onElementRemoved(msg as Private.ElementRemovedMessage);
        break;
      default:
        super.processMessage(msg);
    }
  }

  private clear() {
    this._elements = [];
    this.$node.find(this.PROPERTIES_PANEL_SELECTOR).empty();
    MessageLoop.sendMessage(this.parent, new Messages.SizeChangedMessage());
  }

  private addPropertyButtonClickedHandler(evt) {
    this.addPropertyElement();
  }

  private addPropertyElement(name: string = '', value: string = '') {
    let element = this.createFormRowElement()
      .append(this.createInputElement('name', name))
      .append(this.createInputElement('value', value))
      .append(this.createRemoveButtonElement());

    this._elements.push(element);

    element.appendTo(this.$node.find(this.PROPERTIES_PANEL_SELECTOR));

    MessageLoop.sendMessage(this, new Private.ElementAddedMessage(element));
    MessageLoop.sendMessage(this.parent, new Messages.SizeChangedMessage());
  }

  private onElementAdded(msg: Private.ElementAddedMessage): void {
    let addedElement = msg.element;
    addedElement.find('button')
      .on('click', {
        el: addedElement
      }, this.removePropertyButtonClickedHandler.bind(this));

    this.propertiesChanged();

    addedElement.find('input')
      .on('keyup', _.debounce(
        this.inputChangedHandler.bind(this),
        1000
      ));
  }

  private onElementRemoved(msg: Private.ElementRemovedMessage): void {
    this.propertiesChanged();
  }

  private inputChangedHandler(evt): void {
    this.propertiesChanged();
  }

  private removePropertyButtonClickedHandler(evt) {
    let elementToRemove = evt.data.el;
    elementToRemove.remove();

    this._elements = this._elements.filter((el) => {
      return el !== elementToRemove;
    });

    MessageLoop.sendMessage(this, new Private.ElementRemovedMessage(elementToRemove));
    MessageLoop.sendMessage(this.parent, new Messages.SizeChangedMessage());
  }

  private propertiesChanged() {
    let msg = new Messages.PropertiesOptionsChangedMessage(this.collectProperties());
    MessageLoop.sendMessage(this.parent, msg);
  }

  private collectProperties(): IPropertiesJVMOptions {
    let properties = [];
    for (const row of this._elements) {
      let inputs = row.find('input[placeholder]');
      let name = inputs.eq(0).val();
      let value = inputs.eq(1).val();
      if ('' === name) {
        continue;
      }
      properties.push({ name: name, value: value });
    }
    return properties;
  }

  private createFormRowElement(): JQuery<HTMLElement> {
    return $('<div>', {
      class: 'bx-form-row'
    });
  }

  private createInputElement(placeholder: string, val: string = ''): JQuery<HTMLElement> {
    return $('<input>', {
      class: 'bx-input-text',
      type: 'text',
      placeholder: placeholder,
    }).val(val)
      .data('val', val);
  }

  private createRemoveButtonElement(): JQuery<HTMLElement> {
    return $('<button>', {
      'type': 'button',
      'class': 'bx-btn'
    }).append(
      $('<i>', { class: 'fa fa-times'})
    );
  }

}

namespace Private {

  export const TYPE_ELEMENT_ADDED = 'element-added';

  export class ElementAddedMessage extends Message {
    constructor(element: JQuery<HTMLElement>) {
      super(TYPE_ELEMENT_ADDED);
      this._element = element;
    }

    public get element(): JQuery<HTMLElement> {
      return this._element;
    }

    private _element: JQuery<HTMLElement>;
  }

  export const TYPE_ELEMENT_REMOVED = 'element-removed';

  export class ElementRemovedMessage extends Message {
    constructor(element: JQuery<HTMLElement>) {
      super(TYPE_ELEMENT_REMOVED);
      this._element = element;
    }

    public get element(): JQuery<HTMLElement> {
      return this._element;
    }

    private _element: JQuery<HTMLElement>;
  }

}
