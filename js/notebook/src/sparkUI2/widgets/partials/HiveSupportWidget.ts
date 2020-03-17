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

export class HiveSupportWidget extends Panel {

    readonly INPUT_TITLE = 'Enable Hive Support';
    readonly LABEL_TEXT = 'Enable Hive Support';

    private readonly checkboxWidget: Widget;
    private readonly labelWidget: Widget;

    constructor() {
        super();

        this.addClass('bx-spark-hive');

        this.checkboxWidget = this.createCheckbox();
        this.labelWidget = this.createLabel();

        this.addWidget(this.checkboxWidget);
        this.addWidget(this.labelWidget);
    }

    public set enabled(enabled: boolean) {
        (this.checkboxWidget.node as HTMLInputElement).checked = enabled;
    }

    private createCheckbox(): Widget {
        let el = document.createElement('input');
        el.type = 'checkbox';
        el.title = this.INPUT_TITLE;

        el.addEventListener('click', (evt: MouseEvent) => this.onEnableHiveSupportClicked(evt));

        let w = new Widget({node: el});

        w.addClass('widget-checkbox');
        w.addClass('bx-spark-enable-hive-checkbox');

        return w;
    }

    private createLabel(): Widget {
        let el = document.createElement('label');

        el.textContent = this.LABEL_TEXT;

        let w = new Widget({ node: el });

        w.addClass('widget-label');

        return w;
    }

    private onEnableHiveSupportClicked(evt: MouseEvent): void {
        MessageLoop.sendMessage(this.parent,
            new SparkUI2Message('enable-hive-support-clicked', {
                hiveEnabled: (evt.target as HTMLInputElement).checked
            })
        );
    }
}