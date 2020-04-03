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

import {InputWithLabelWidget} from "./InputWithLabelWidget";

export class MasterURLWidget extends InputWithLabelWidget {

    get LABEL_TEXT(): string { return 'Master URL' };
    get LABEL_TITLE(): string { return 'Master URL' };
    get INPUT_PLACEHOLDER(): string { return '' };
    get INPUT_TITLE(): string { return '' };

    constructor(value: string = 'local[10]') {
        super(value);
    }

}
