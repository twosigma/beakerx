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
import {IProfileListItem} from "../IProfileListItem";
import {SparkUI2Message} from "../SparkUI2Message";
import {ProfileConfigurationWidget, ProfileCreateWidget, ProfileSelectWidget} from "./partials";
import {SparkUI2Comm} from "../SparkUI2Comm";

export class ProfileSelectorWidget extends Panel {

    private readonly comm: SparkUI2Comm;
    private readonly profileSelectWidget: ProfileSelectWidget;
    private readonly profileCreateWidget: ProfileCreateWidget;
    private readonly profileConfigurationWidget: ProfileConfigurationWidget;

    private _currentProfileName: string = '';

    private _profiles: IProfileListItem[] = [{
        "name": "",
        "spark.executor.cores": "10",
        "spark.executor.memory": "8g",
        "spark.master": "local[10]",
        "properties": []
    }];

    constructor(comm: SparkUI2Comm) {
        super();

        this.addClass('bx-spark-profile-selector');

        this.comm = comm;

        this.profileSelectWidget = new ProfileSelectWidget(this._profiles);
        this.profileCreateWidget = new ProfileCreateWidget();
        this.profileConfigurationWidget = new ProfileConfigurationWidget();
        this.profileCreateWidget.hide();

        this.addWidget(this.profileSelectWidget);
        this.addWidget(this.profileCreateWidget);
        this.addWidget(this.profileConfigurationWidget);
    }

    public set profiles(profiles: IProfileListItem[]) {
        this._profiles = profiles;
        this.profileSelectWidget.updateProfiles(profiles);
    }

    public set currentProfileName(profileName: string) {
        this._currentProfileName = profileName;
    }

    public get currentProfileName(): string {
        return this._currentProfileName;
    }

    public selectProfile(profileName: string) {
        this.profileSelectWidget.selectProfile(profileName);
    }

    public set userSparkConf(conf: {
        "name": string;
        "properties": { name: string; value: string; }[];
        "spark.executor.cores": string;
        "spark.executor.memory": string;
        "spark.master": string;
        "spark.app.name": string;
    }) {
        this.profileConfigurationWidget.updateConfiguration({...conf})
    }

    public getConfiguration(): {
        masterURL: string;
        executorCores: string;
        executorMemory: string;
        properties: { [key: string]: string };
    } {
        return this.profileConfigurationWidget.getConfiguration();
    }

    public processMessage(msg: SparkUI2Message): void {
        switch(msg.type) {
            case 'profile-create-new-clicked':
                Private.MessageHandlers.onProfileCreateNew(this.profileSelectWidget, this.profileCreateWidget);
                break;
            case 'profile-remove-clicked':
                Private.MessageHandlers.onProfileRemove(this._currentProfileName, this._profiles, this.profileSelectWidget, this.profileConfigurationWidget);
                break;
            case 'profile-save-clicked':
                Private.MessageHandlers.onProfileSave(this.comm, this._profiles, this._currentProfileName, this.profileConfigurationWidget.getConfiguration());
                break;
            case 'profile-selection-changed':
                Private.MessageHandlers.onProfileSelectionChanged(this, msg, this._profiles, this.profileConfigurationWidget);
                break;
            case 'profile-create-create-clicked':
                Private.MessageHandlers.onProfileCreateConfirmed(msg, this._profiles, this.profileSelectWidget, this.profileCreateWidget);
                break;
            case 'profile-create-cancel-clicked':
                Private.MessageHandlers.onProfileCreateCanceled(this.profileSelectWidget, this.profileCreateWidget);
                break;
            default:
                super.processMessage(msg);
                break
        }
    }
}

namespace Private {

    export namespace MessageHandlers {

        export function onProfileCreateNew(
            profileSelectWidget: ProfileSelectWidget,
            profileCreateWidget: ProfileCreateWidget
        ): void {
            profileSelectWidget.hide();
            profileCreateWidget.show();
        }

        export function onProfileRemove(
            currentProfileName: string,
            profiles: IProfileListItem[],
            profileSelectWidget: ProfileSelectWidget,
            profileConfigurationWidget: ProfileConfigurationWidget
        ): void {
            if (currentProfileName === '') {
                console.log(`You can't remove default profile`);
                return;
            }
            profiles = profiles.filter(p => p.name !== currentProfileName);
            currentProfileName = '';

            profileSelectWidget.updateProfiles(profiles);
            profileConfigurationWidget.updateConfiguration(profiles.filter(p => p.name === currentProfileName)[0]);
        }

        export function onProfileSave(comm: SparkUI2Comm, profiles: IProfileListItem[], profileName, configuration) {
            comm.saved.connect(_onSave, comm);
            Utils.updateProfileByName(profiles, profileName, configuration);
            comm.sendSaveProfilesMessage(profiles);
        }

        function _onSave() {
            this.saved.disconnect(_onSave, this);
        }

        export function onProfileSelectionChanged(
            profileSelectorWidget: ProfileSelectorWidget,
            msg: SparkUI2Message, profiles:IProfileListItem[],
            profileConfigurationWidget: ProfileConfigurationWidget
        ): void  {
            let currentProfileName = msg.payload.selectedProfile;
            profileSelectorWidget.currentProfileName = currentProfileName;
            let currentProfileConfiguration = Private.Utils.getProfileByName(profiles, currentProfileName);
            profileConfigurationWidget.updateConfiguration(currentProfileConfiguration);
        }

        export function onProfileCreateConfirmed(
            msg: SparkUI2Message,
            profiles: IProfileListItem[],
            profileSelectWidget: ProfileSelectWidget,
            profileCreateWidget: ProfileCreateWidget
        ): void {
            let profileName = msg.payload.profileName.trim();
            if (profileName === '') {
                console.log(`Profile name can't be empty.`);
                return;
            }

            let profile = Utils.getProfileByName(profiles, profileName);
            if (profile !== null) {
                console.log(`Profile name '%s' already exists`, profileName);
                return;
            }

            profile = {
                "name": profileName,
                "spark.master": "local[10]",
                "spark.executor.cores": "10",
                "spark.executor.memory": "8g",
                "properties": [],
            };

            profiles.push(profile);

            profileSelectWidget.addProfile(profile);
            profileSelectWidget.selectProfile(profile.name);

            profileSelectWidget.show();
            profileCreateWidget.hide();
        }

        export function onProfileCreateCanceled(
            profileSelectWidget: ProfileSelectWidget,
            profileCreateWidget: ProfileCreateWidget
        ): void {
            profileSelectWidget.show();
            profileCreateWidget.hide();
        }

    }

    export namespace Utils {

        export function getProfileByName(profiles:IProfileListItem[], profileName: string): IProfileListItem|null {
            for (let p of profiles) {
                if (p.name === profileName) {
                    return p;
                }
            }
            return null;
        }

        export function updateProfileByName(profiles: IProfileListItem[], profileName: string, configuration): void {
            let properties = [];

            for (let i in profiles) {
                if (profiles[i].name !== profileName) {
                    continue;
                }
                for (const propertyName in configuration.properties) {
                    properties.push({
                        name : propertyName,
                        value: configuration.properties[propertyName]
                    })
                }
                profiles[i] = {
                    "spark.executor.memory": configuration.executorMemory,
                    "spark.master": configuration.masterURL,
                    "name": profileName,
                    "spark.executor.cores": configuration.executorCores,
                    "properties": properties
                }
            }
        }
    }

}

