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

import {Panel} from "@phosphor/widgets";
import {ProfilePropertiesWidget} from "./ProfilePropertiesWidget";
import {HiveSupportWidget} from "./HiveSupportWidget";
import {MasterURLWidget} from "./MasterURLWidget";
import {ExecutorCoresWidget} from "./ExecutorCoresWidget";
import {ExecutorMemoryWidget} from "./ExecutorMemoryWidget";
import {SparkUI2Message} from "../../SparkUI2Message";
import {IProfileListItem} from "../../IProfileListItem";

export class ProfileConfigurationWidget extends Panel {

    public readonly SPARK_LOCAL_MASTER_URL_PREFIX = 'local';

    private readonly propertiesWidget: ProfilePropertiesWidget;
    private readonly enableHiveSupportWidget: HiveSupportWidget;
    private readonly masterURLWidget: MasterURLWidget;
    private readonly executorCoresWidget: ExecutorCoresWidget;
    private readonly executorMemoryWidget: ExecutorMemoryWidget;

    constructor() {
        super();

        this.propertiesWidget = new ProfilePropertiesWidget();
        this.enableHiveSupportWidget = new HiveSupportWidget();
        this.masterURLWidget = new MasterURLWidget();
        this.executorCoresWidget = new ExecutorCoresWidget();
        this.executorMemoryWidget = new ExecutorMemoryWidget();

        this.addWidget(this.masterURLWidget);
        this.addWidget(this.executorCoresWidget);
        this.addWidget(this.executorMemoryWidget);
        this.addWidget(this.enableHiveSupportWidget);
        this.addWidget(this.propertiesWidget);

        this.toggleExecutorInputs();
    }

    public getConfiguration(): {
        masterURL: string;
        executorCores: string;
        executorMemory: string;
        properties: { [key: string]: string };
    } {
        return {
            masterURL: this.masterURLWidget.value,
            executorCores: this.executorCoresWidget.value,
            executorMemory: this.executorMemoryWidget.value,
            properties: this.propertiesWidget.collectProperties(),
        }
    }

    public updateConfiguration(selectedProfile: IProfileListItem) {
        this.masterURLWidget.value = selectedProfile["spark.master"];
        this.executorCoresWidget.value = selectedProfile["spark.executor.cores"];
        this.executorMemoryWidget.value = selectedProfile["spark.executor.memory"];
        this.propertiesWidget.updateProperties(selectedProfile.properties);
        let isHiveEnabled = false;
        for (let p of selectedProfile.properties) {
            if (p.name === 'spark.sql.catalogImplementation' && p.value === 'hive') {
                isHiveEnabled = true;
                break;
            }
        }
        this.enableHiveSupportWidget.enabled = isHiveEnabled;

        this.toggleExecutorInputs();
    }

    public processMessage(msg: SparkUI2Message): void {
        switch (msg.type) {
            case 'add-new-property-clicked':
                Private.MessageHandlers.onAddNewProperty(this.propertiesWidget);
                break;
            case 'remove-property-clicked':
                Private.MessageHandlers.onRemoveProperty(msg.payload.name, this.propertiesWidget, this.enableHiveSupportWidget);
                break;
            case 'enable-hive-support-clicked':
                Private.MessageHandlers.onEnableHiveSupport(msg.payload.hiveEnabled, this.propertiesWidget);
                break;
            default:
                super.processMessage(msg);
                break;
        }
    }

    private toggleExecutorInputs(): void {
        if (this.masterURLWidget.value.indexOf(this.SPARK_LOCAL_MASTER_URL_PREFIX) === 0) {
            this.executorMemoryWidget.disableInput();
            this.executorCoresWidget.disableInput();
        } else {
            this.executorMemoryWidget.enableInput();
            this.executorCoresWidget.enableInput();
        }
    }
}

namespace Private {

    export namespace MessageHandlers {

        export function onAddNewProperty(propertiesWidget: ProfilePropertiesWidget): void {
            propertiesWidget.addProperty('', '');
        }

        export function onEnableHiveSupport(hiveEnabled: boolean, propertiesWidget: ProfilePropertiesWidget): void {
            if (hiveEnabled) {
                propertiesWidget.addProperty('spark.sql.catalogImplementation', 'hive');
            } else {
                propertiesWidget.removeProperty('spark.sql.catalogImplementation');
            }
        }

        export function onRemoveProperty(propertyName: string, propertiesWidget: ProfilePropertiesWidget, enableHiveSupportWidget: HiveSupportWidget) {
            propertiesWidget.removeProperty(propertyName);

            if (propertyName !== 'spark.sql.catalogImplementation') {
                return;
            }

            enableHiveSupportWidget.enabled = false;
        }

    }
}