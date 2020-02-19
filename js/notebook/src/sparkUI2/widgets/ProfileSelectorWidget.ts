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

    private readonly profileSelectWidget: ProfileSelectWidget;
    private readonly profileCreateWidget: ProfileCreateWidget;
    private readonly profileConfigurationWidget: ProfileConfigurationWidget;

    private selectedProfileName: string = '';

    private profiles: IProfileListItem[] = [{
        "name": "",
        "spark.executor.cores": "10",
        "spark.executor.memory": "8g",
        "spark.master": "local[10]",
        "properties": []
    }];

    constructor(private readonly comm: SparkUI2Comm) {
        super();

        this.profileSelectWidget = new ProfileSelectWidget(this.profiles);
        this.profileCreateWidget = new ProfileCreateWidget();
        this.profileConfigurationWidget = new ProfileConfigurationWidget();
        this.profileCreateWidget.hide();

        this.addWidget(this.profileSelectWidget);
        this.addWidget(this.profileCreateWidget);
        this.addWidget(this.profileConfigurationWidget);
    }

    public getSelectedProfileName(): string {
        return this.selectedProfileName;
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
                this.profileSelectWidget.hide();
                this.profileCreateWidget.show();
                break;
            case 'profile-remove-clicked':
                console.log('profile-remove-clicked');
                // user requested removing currently selected profile
                //
                // get selected profile name
                // request backend to remove profile with name - remove(name)
                // reload available profiles list
                break;
            case 'profile-save-clicked':
                console.log('profile-save-clicked');
                // this.profileConfigurationWidget.disable()
                this.comm.saved.connect(this._onSave, this);
                this.sendSaveProfilesMessage();

                break;
            case 'profile-selection-changed':
                console.log('profile-selection-changed');
                this.selectedProfileName = msg.payload.selectedProfile;
                // user requested loading configuration of a profile with given name
                //
                // get selected profile name
                // request backend to send configuration of a profile with given name - load(name)
                // fill form with provided configuration
                break;
            case 'profile-create-create-clicked':
                console.log(msg);
                let profileName = msg.payload.profileName.trim();
                if (profileName === '') {
                    console.log(`Profile name can't be empty.`)
                    return;
                }

                let profile = this.getProfileByName(profileName);
                if (profile !== null) {
                    console.log(`Profile name '%s' already exists`, profileName);
                    return;
                }

                profile = {
                    name: profileName,
                    "spark.master": "local[10]",
                    "spark.executor.cores": "10",
                    "spark.executor.memory": "8g",
                    "properties": [],
                };
                this.profiles.push(profile);

                this.profileSelectWidget.addProfile(profile);
                this.profileSelectWidget.selectProfile(profile.name);

                this.profileSelectWidget.show();
                this.profileCreateWidget.hide();
                break;
            case 'profile-create-cancel-clicked':
                console.log('profile-create-cancel-clicked');
                this.profileSelectWidget.show();
                this.profileCreateWidget.hide();
                break;

            default:
                super.processMessage(msg);
                break
        }
    }

    private getProfileByName(profileName: string) {
        for (let p of this.profiles) {
            if (p.name === profileName) {
                return p;
            }
        }
        return null;
    }

    private updateProfileByName(profileName: string, configuration) {
        let properties = [];

        for (let i in this.profiles) {
            if (this.profiles[i].name === profileName) {
                for (const propertyName in configuration.properties) {
                    properties.push({
                        name : propertyName,
                        value: configuration.properties[propertyName]
                    })
                }
                this.profiles[i] = {
                    "spark.executor.memory": configuration.executorMemory,
                    "spark.master": configuration.masterURL,
                    "name": profileName,
                    "spark.executor.cores": configuration.executorCores,
                    "properties": properties
                }
            }
        }
    }

    private _onSave(sender: SparkUI2Comm) {
        this.comm.saved.disconnect(this._onSave, this);
        console.log('saved');
    }

    private updateProfile() {
        let name = this.getSelectedProfileName();
        let profileConfiguration = this.profileConfigurationWidget.getConfiguration();
        console.log(this.profiles);
        console.log(profileConfiguration);
        this.updateProfileByName(name, profileConfiguration);
    }

    private sendSaveProfilesMessage() {
        this.updateProfile();
        let msg = {
            event: 'save_profiles',
            payload: this.profiles
        };
        this.comm.send(msg);
    }
    
}

