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

export class ProfileSelectorWidget extends Panel {

    private readonly profileSelectWidget: ProfileSelectWidget;
    private readonly profileCreateWidget: ProfileCreateWidget;
    private readonly profileConfigurationWidget: ProfileConfigurationWidget;

    constructor() {
        super();

        this.profileSelectWidget = new ProfileSelectWidget(this.getProfilesList());
        this.profileCreateWidget = new ProfileCreateWidget();
        this.profileConfigurationWidget = new ProfileConfigurationWidget();
        this.profileCreateWidget.hide();

        this.addWidget(this.profileSelectWidget);
        this.addWidget(this.profileCreateWidget);
        this.addWidget(this.profileConfigurationWidget);
    }

    private getProfilesList(): IProfileListItem[] {
        // TODO implement getting this from backend and probably move it somewhere else
        return [
            {
                value: ''
            },
            {
                value: 'Profile 1'
            },
            {
                value: 'Profile 2'
            }
        ];
    }

    public processMessage(msg: SparkUI2Message): void {
        switch(msg.type) {
            case 'profile-create-new-clicked':
                console.log('profile-create-new-clicked');
                // user requested creating new profile
                //
                // hide form with available profiles
                // show creation form
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
                // user requested saving currently selected profile configuration
                //
                // get selected profile name
                // collect profile configuration
                let profileConfiguration = this.profileConfigurationWidget.getConfiguration();
                console.log(profileConfiguration);
                // request backend to update profile with given name data - update(name, data)
                break;
            case 'profile-selection-changed':
                console.log('profile-selection-changed');
                // user requested loading configuration of a profile with given name
                //
                // get selected profile name
                // request backend to send configuration of a profile with given name - load(name)
                // fill form with provided configuration
                break;
            case 'profile-create-create-clicked':
                console.log('profile-create-create-clicked');
                // user requested creation of a profile with provided name
                //
                // get provided name
                // request backend to create a profile with provided name - create(name)
                // request backend to send configuration of created profile - load(name)
                // fill a form with provided configuration
                // hide creation form
                // show a form with available profiles
                this.profileSelectWidget.show();
                this.profileCreateWidget.hide();
                break;
            case 'profile-create-cancel-clicked':
                console.log('profile-create-cancel-clicked');
                // user don't want to create new profile configuration
                //
                // hide creation form
                // show a form with available profiles
                this.profileSelectWidget.show();
                this.profileCreateWidget.hide();
                break;

            default:
                super.processMessage(msg);
                break
        }
    }
    
}

