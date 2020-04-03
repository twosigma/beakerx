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

import {Message} from "@phosphor/messaging";

export type SparkUI2MessageTypes = 'start-clicked' |
    'stop-clicked' |
    'enable-hive-support-clicked' |
    'profile-create-cancel-clicked' |
    'profile-create-create-clicked' |
    'add-new-property-clicked' |
    'remove-property-clicked' |
    'profile-save-clicked' |
    'profile-create-new-clicked' |
    'profile-remove-clicked' |
    'profile-selection-changed';

export class SparkUI2Message extends Message {
    private readonly _payload: any;

    constructor(type: SparkUI2MessageTypes, payload?:any) {
        super(type);
        this._payload = payload;
    }

    get payload(): any {
        return this._payload;
    }
}
