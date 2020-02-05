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
import {SparkUI2ProfilePropertiesWidget} from "./SparkUI2ProfilePropertiesWidget";

export class SparkUI2ProfileConfigurationWidget extends Panel {
    readonly MASTER_URL_LABEL_TEXT = 'Master URL';
    readonly MASTER_URL_LABEL_TITLE = 'Master URL';
    readonly MASTER_URL_INPUT_PLACEHOLDER = '';
    readonly EXECUTOR_CORES_LABEL_TEXT = 'Executor Cores';
    readonly EXECUTOR_CORES_LABEL_TITLE = 'Executor Cores';
    readonly EXECUTOR_CORES_INPUT_TITLE = 'The number of cores to use on each executor';
    readonly EXECUTOR_CORES_INPUT_PLACEHOLDER = '';
    readonly EXECUTOR_MEMORY_LABEL_TEXT = 'Executor Memory';
    readonly EXECUTOR_MEMORY_LABEL_TITLE = 'Executor Memory';
    readonly EXECUTOR_MEMORY_INPUT_TITLE = 'Amount of memory to use per executor process, in MiB unless otherwise specified. (e.g. 2g, 8g).';
    readonly EXECUTOR_MEMORY_INPUT_PLACEHOLDER = '';
    readonly ENABLE_HIVE_SUPPORT_INPUT_TITLE = 'Enable Hive Support';
    readonly ENABLE_HIVE_SUPPORT_LABEL_TEXT = 'Enable Hive Support';

    constructor() {
        super();

        this.addWidget(this.createMasterUrl());
        this.addWidget(this.createExecutorCores());
        this.addWidget(this.createExecutorMemory());
        this.addWidget(this.createEnableHiveSupport());
        this.addWidget(this.createProperties());
    }

    private createMasterUrl(): Panel {
        let p = new Panel();

        p.addWidget(this.createMasterUrlLabel());
        p.addWidget(this.createMasterUrlInput());

        return p;
    }

    private createMasterUrlLabel(): Widget {
        let el = document.createElement('label');

        el.textContent = this.MASTER_URL_LABEL_TEXT;
        el.title = this.MASTER_URL_LABEL_TITLE;

        let w = new Widget({node: el});

        w.addClass('widget-label');

        return w;
    }

    private createMasterUrlInput(): Widget {
        let el = document.createElement('input');
        el.type = 'text';
        el.placeholder = this.MASTER_URL_INPUT_PLACEHOLDER;

        let w = new Widget({node: el});

        w.addClass('widget-text');

        return w;
    }

    private createExecutorCores(): Panel {
        let p = new Panel();

        p.addWidget(this.createExecutorCoresLabel());
        p.addWidget(this.createExecutorCoresInput());

        return p;
    }

    private createExecutorCoresLabel(): Widget {
        let el = document.createElement('label');

        el.textContent = this.EXECUTOR_CORES_LABEL_TEXT;
        el.title = this.EXECUTOR_CORES_LABEL_TITLE;

        let w = new Widget({node: el});

        w.addClass('widget-label');

        return w;
    }

    private createExecutorCoresInput(): Widget {
        let el = document.createElement('input');
        el.type = 'text';
        el.placeholder = this.EXECUTOR_CORES_INPUT_PLACEHOLDER;
        el.title = this.EXECUTOR_CORES_INPUT_TITLE;

        let w = new Widget({node: el});

        w.addClass('widget-text');

        return w;
    }

    private createExecutorMemory(): Panel {
        let p = new Panel();

        p.addWidget(this.createExecutorMemoryLabel());
        p.addWidget(this.createExecutorMemoryInput());

        return p;
    }

    private createExecutorMemoryLabel(): Widget {
        let el = document.createElement('label');

        el.textContent = this.EXECUTOR_MEMORY_LABEL_TEXT;
        el.title = this.EXECUTOR_MEMORY_LABEL_TITLE;

        let w = new Widget({node: el});

        w.addClass('widget-label');

        return w;
    }

    private createExecutorMemoryInput(): Widget {
        let el = document.createElement('input');
        el.type = 'text';
        el.placeholder = this.EXECUTOR_MEMORY_INPUT_PLACEHOLDER;
        el.title = this.EXECUTOR_MEMORY_INPUT_TITLE;

        let w = new Widget({node: el});

        w.addClass('widget-text');

        return w;
    }

    private createEnableHiveSupport(): Panel {
        let p = new Panel();

        this.addWidget(this.createEnableHiveSupportCheckbox());
        this.addWidget(this.createEnableHiveSupportLabel());

        return p;
    }

    private createEnableHiveSupportCheckbox(): Widget {
        let el = document.createElement('input');
        el.type = 'checkbox';
        el.title = this.ENABLE_HIVE_SUPPORT_INPUT_TITLE;

        let w = new Widget({node: el});

        w.addClass('widget-checkbox');

        return w;
    }

    private createEnableHiveSupportLabel(): Widget {
        let el = document.createElement('label');
        el.textContent = this.ENABLE_HIVE_SUPPORT_LABEL_TEXT;

        let w = new Widget({node: el});

        w.addClass('widget-label');

        return w;
    }

    private createProperties(): Panel {
        return new SparkUI2ProfilePropertiesWidget();
    }

}