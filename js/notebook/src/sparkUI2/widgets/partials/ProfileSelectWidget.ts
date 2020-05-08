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
import {IProfileListItem} from "../../IProfileListItem";
import {SparkUI2Message} from "../../SparkUI2Message";

export class ProfileSelectWidget extends Panel {

    readonly LABEL_TEXT = 'Profile';
    readonly LABEL_TITLE = 'Profile';
    readonly SELECT_TITLE = 'Set all properties from a named profile';
    readonly SAVE_BUTTON_TEXT = 'Save';
    readonly SAVE_BUTTON_TITLE = 'Save profile';
    readonly CREATE_BUTTON_TEXT = '';
    readonly CREATE_BUTTON_TITLE = 'Create new profile';
    readonly REMOVE_BUTTON_TEXT = '';
    readonly REMOVE_BUTTON_TITLE = 'Delete this profile';

    private selectEl: HTMLSelectElement;

    constructor(profiles: IProfileListItem[]) {
        super();
        this.addWidget(this.createLabel());
        this.addWidget(this.createSelect(profiles));
        this.addWidget(this.createSave());
        this.addWidget(this.createCreate());
        this.addWidget(this.createRemove());
    }

    public updateProfiles(profiles: IProfileListItem[]) {
        this.selectEl.textContent = '';

        for (let p of profiles) {
            this.addProfile(p);
        }
    }

    private createLabel(): Widget {
        let el = document.createElement('label');

        el.textContent = this.LABEL_TEXT;
        el.title = this.LABEL_TITLE;

        let w = new Widget({ node: el });

        w.addClass('widget-label');

        return w;
    }

    private createSelect(profiles: IProfileListItem[]): Widget {
        let el = this.selectEl = document.createElement('select');
        let options = [];
        let optionElement;

        el.title = this.SELECT_TITLE;

        el.addEventListener('change', (evt: Event) => this.onSelectionChanged(evt));

        for (let profile of profiles) {
            optionElement = document.createElement('option');
            optionElement.textContent = profile.name;
            optionElement.value = profile.name;
            optionElement.setAttribute('data-value', profile.name);
            options.push(optionElement);
        }

        el.append(...options);

        let w = new Widget({ node: el });

        w.addClass('widget-dropdown');

        return w;
    }

    private createSave(): Widget {
        let el = document.createElement('button');

        el.textContent = this.SAVE_BUTTON_TEXT;
        el.title = this.SAVE_BUTTON_TITLE;

        el.addEventListener('click', (evt: MouseEvent) => this.onSaveClicked(evt));

        let w = new Widget({node: el});

        w.addClass('jupyter-button');
        w.addClass('widget-button');
        w.addClass('bx-spark-save');

        return w;
    }

    private createCreate(): Widget {
        let el = document.createElement('button');

        el.textContent = this.CREATE_BUTTON_TEXT;
        el.title = this.CREATE_BUTTON_TITLE;

        el.addEventListener('click', (evt: MouseEvent) => this.onCreateNewClicked(evt));

        let w = new Widget({node: el});

        w.addClass('jupyter-button');
        w.addClass('widget-button');
        w.addClass('bx-button');
        w.addClass('icon-add');
        w.addClass('bx-spark-add');

        return w;
    }

    private createRemove(): Widget {
        let el = document.createElement('button');

        el.textContent = this.REMOVE_BUTTON_TEXT;
        el.title = this.REMOVE_BUTTON_TITLE;

        el.addEventListener('click', (evt: MouseEvent) => this.onRemoveClicked(evt));

        let w = new Widget({node: el});

        w.addClass('jupyter-button');
        w.addClass('widget-button');
        w.addClass('bx-button');
        w.addClass('icon-close');
        w.addClass('bx-spark-remove');

        return w;
    }

    private onSaveClicked(evt: MouseEvent): void {
        MessageLoop.sendMessage(this.parent, new SparkUI2Message('profile-save-clicked'));
    }

    private onCreateNewClicked(evt: MouseEvent): void {
        MessageLoop.sendMessage(this.parent, new SparkUI2Message('profile-create-new-clicked'));
    }

    private onRemoveClicked(evt: MouseEvent): void {
        MessageLoop.sendMessage(this.parent, new SparkUI2Message('profile-remove-clicked'));
    }

    private onSelectionChanged(evt: Event): void {
        MessageLoop.sendMessage(this.parent,
            new SparkUI2Message('profile-selection-changed', {
                selectedProfile: (evt.target as HTMLSelectElement).value
            })
        );
    }

    public addProfile(profile: IProfileListItem) {
        let optionElement = document.createElement('option');
        optionElement.textContent = profile.name;
        optionElement.value = profile.name;
        optionElement.setAttribute('data-value', profile.name);
        this.selectEl.add(optionElement);

    }

    public selectProfile(name: string) {
        (this.selectEl.querySelector(`option[value="${name}"]`) as HTMLOptionElement).selected = true;

        MessageLoop.sendMessage(this.parent,
            new SparkUI2Message('profile-selection-changed', {
                selectedProfile: this.selectEl.value
            })
        );
    }
}