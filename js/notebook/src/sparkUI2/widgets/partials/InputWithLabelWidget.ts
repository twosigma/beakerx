/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
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

import {Panel, Widget} from "@phosphor/widgets";

export abstract class InputWithLabelWidget extends Panel {

    private readonly labelWidget: Widget;
    private readonly inputWidget: Widget;
    private _value: string;

    protected constructor(value: string) {
        super();
        this._value = value;
        this.labelWidget = this.createLabel();
        this.inputWidget = this.createInput();

        this.addWidget(this.labelWidget);
        this.addWidget(this.inputWidget);
    }

    abstract get LABEL_TEXT(): string;
    abstract get LABEL_TITLE(): string;
    abstract get INPUT_TITLE(): string;
    abstract get INPUT_PLACEHOLDER(): string;

    public get value(): string {
        return this._value;
    }

    public set value(value) {
        this._value = value;
        (this.inputWidget.node as HTMLInputElement).value = value;
    }

    public disableInput() {
        (this.inputWidget.node as HTMLInputElement).disabled = true;
    }

    public enableInput() {
        (this.inputWidget.node as HTMLInputElement).disabled = false;
    }

    private createLabel(): Widget {
        let el = document.createElement('label');

        el.textContent = this.LABEL_TEXT;
        el.title = this.LABEL_TITLE;

        let w = new Widget({node: el});

        w.addClass('widget-label');

        return w;
    }

    private createInput(): Widget {
        let el = document.createElement('input');
        el.type = 'text';
        el.placeholder = this.INPUT_PLACEHOLDER;
        el.title = this.INPUT_TITLE;
        el.value = this._value;

        el.addEventListener('change', (evt: Event) => this.onValueChanged(evt));

        let w = new Widget({node: el});

        w.addClass('widget-text');

        return w;
    }

    private onValueChanged(evt: Event): void {
        this._value = (evt.target as HTMLInputElement).value;
    }
}