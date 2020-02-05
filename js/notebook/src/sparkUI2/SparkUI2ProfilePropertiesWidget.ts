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
import {Message, MessageLoop} from "@phosphor/messaging";

export class SparkUI2ProfilePropertiesWidget extends Panel {

    readonly LABEL_LINK_TEXT = 'Available properties';
    readonly LABEL_LINK_URL = 'https://spark.apache.org/docs/2.4.4/configuration.html#available-properties';
    readonly ADD_BUTTON_TEXT = '';
    readonly ADD_BUTTON_TITLE = 'Add property';

    constructor() {
        super();
        this.addWidget(this.createToolbar());
    }

    private createToolbar(): Panel {
        let p = new Panel();
        p.addWidget(this.createAvailableProperties());
        p.addWidget(this.createAdd());
        return p;
    }

    private createAvailableProperties(): Widget {
        let el = document.createElement('label');
        let linkEl = document.createElement('a');

        linkEl.target = '_blank';
        linkEl.textContent = this.LABEL_LINK_TEXT;
        linkEl.href = this.LABEL_LINK_URL;

        el.append(linkEl);

        let w = new Widget({ node: el });

        w.addClass('widget-label');
        w.addClass('bx-spark-available-properties');

        return w;
    }

    private createAdd(): Widget {
        let el = document.createElement('button');

        el.textContent = this.ADD_BUTTON_TEXT;
        el.title = this.ADD_BUTTON_TITLE;

        el.addEventListener('click', (evt: MouseEvent) => this.onAddNewClicked(evt));

        let w = new Widget({ node: el });

        w.addClass('jupyter-button');
        w.addClass('widget-button');
        w.addClass('bx-button');
        w.addClass('icon-add');
        w.addClass('bx-spark-add');

        return w;
    }

    private onAddNewClicked(evt: MouseEvent): void {
        MessageLoop.sendMessage(this.parent, new Message('add-new-property-clicked'));
    }
}