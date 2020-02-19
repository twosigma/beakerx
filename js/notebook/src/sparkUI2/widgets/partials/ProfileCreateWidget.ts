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
import {MessageLoop} from "@phosphor/messaging";
import {SparkUI2Message} from "../../SparkUI2Message";

export class ProfileCreateWidget extends Panel {

    readonly LABEL_TEXT = 'New profile';
    readonly LABEL_TITLE = 'New profile';
    readonly INPUT_PLACEHOLDER = 'Enter profile name...';
    readonly CREATE_BUTTON_TEXT = 'Create';
    readonly CREATE_BUTTON_TITLE = 'Create new profile';
    readonly CANCEL_BUTTON_TEXT = 'Cancel';
    readonly CANCEL_BUTTON_TITLE = 'Cancel';

    private input: HTMLInputElement;

    constructor() {
        super();
        this.addWidget(this.createLabel());
        this.addWidget(this.createInput());
        this.addWidget(this.createCreateConfirm());
        this.addWidget(this.createCancel());
    }

    private createLabel(): Widget {
        let el = document.createElement('label');

        el.textContent = this.LABEL_TEXT;
        el.title = this.LABEL_TITLE;

        let w = new Widget({ node: el });

        w.addClass('widget-label');

        return w;
    }

    private createInput(): Widget {
        let el = this.input = document.createElement('input');
        el.type = 'text';
        el.placeholder = this.INPUT_PLACEHOLDER;

        let w = new Widget({ node: el });

        w.addClass('widget-text');

        return w;
    }

    private createCreateConfirm(): Widget {
        let el = document.createElement('button');

        el.textContent = this.CREATE_BUTTON_TEXT;
        el.title = this.CREATE_BUTTON_TITLE;

        el.addEventListener('click', (evt: MouseEvent) => this.onCreateCreateClicked(evt));

        let w = new Widget({ node: el });

        w.addClass('jupyter-button');
        w.addClass('widget-button');
        w.addClass('bx-spark-create');

        return w;
    }

    private createCancel(): Widget {
        let el = document.createElement('button');

        el.textContent = this.CANCEL_BUTTON_TEXT;
        el.title = this.CANCEL_BUTTON_TITLE;

        el.addEventListener('click', (evt: MouseEvent) => this.onCreateCancelClicked(evt));

        let w = new Widget({ node: el });

        w.addClass('jupyter-button');
        w.addClass('widget-button');
        w.addClass('bx-spark-cancel');

        return w;
    }

    private onCreateCreateClicked(ev: MouseEvent): void {
        MessageLoop.sendMessage(this.parent,
            new SparkUI2Message('profile-create-create-clicked', {
                profileName: this.input.value
            })
        );

        this.input.value = '';
    }

    private onCreateCancelClicked(ev: MouseEvent): void {
        MessageLoop.sendMessage(this.parent,
            new SparkUI2Message('profile-create-cancel-clicked', {

            })
        );

        this.input.value = '';
    }

}