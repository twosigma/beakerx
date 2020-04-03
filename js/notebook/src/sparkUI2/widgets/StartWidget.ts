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
import {SparkUI2Message} from "../SparkUI2Message";
import {SpinnerWidget} from "./SpinnerWidget";

export class StartWidget extends Panel {

    readonly BUTTON_TEXT: string = 'Start';
    readonly BUTTON_TITLE: string = 'Start a session with cluster (or a local instance)';

    private buttonEl: HTMLButtonElement;
    private readonly errorWidget: Private.ErrorWidget;
    private readonly spinnerWidget: SpinnerWidget;

    constructor() {
        super();

        this.addClass('bx-spark-start')

        this.errorWidget = new Private.ErrorWidget();
        this.spinnerWidget = new SpinnerWidget();

        this.addWidget(this.createButton());
        this.addWidget(this.spinnerWidget);
        this.addWidget(this.errorWidget);
    }

    public disableButton() {
        this.buttonEl.disabled = true;
    }

    public enableButton() {
        this.buttonEl.disabled = false;
    }

    public showError(errorMessage: string) {
        this.errorWidget.setMessage(errorMessage);
        this.errorWidget.show();
    }

    public clearError() {
        this.errorWidget.setMessage('');
        this.errorWidget.hide();
    }

    public showSpinner() {
        this.spinnerWidget.show();
    }

    public hideSpinner() {
        this.spinnerWidget.hide();
    }

    private createButton(): Widget {
        let el = this.buttonEl = document.createElement('button');

        el.textContent = this.BUTTON_TEXT;
        el.title = this.BUTTON_TITLE;

        el.addEventListener('click', (evt: MouseEvent) => this.onStartClicked(evt));

        let w = new Widget({ node: el });

        w.addClass('jupyter-button');
        w.addClass('widget-button');
        w.addClass('bx-spark-connect');
        w.addClass('bx-spark-connect-start');

        return w;
    }

    private onStartClicked(evt: MouseEvent): void {
        MessageLoop.sendMessage(this.parent, new SparkUI2Message('start-clicked'));
    }
}

namespace Private {
    export class ErrorWidget extends Widget {

        constructor() {
            super();
            this.addClass('bx-spark-error');
        }

        public setMessage(message: string) {
            this.node.textContent = message;
        }

    }

}
