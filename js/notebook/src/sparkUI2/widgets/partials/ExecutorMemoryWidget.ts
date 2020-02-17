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

export class ExecutorMemoryWidget extends InputWithLabelWidget {

    get LABEL_TEXT(): string { return 'Executor Memory' };
    get LABEL_TITLE(): string { return  'Executor Memory' };
    get INPUT_TITLE(): string { return  'Amount of memory to use per executor process, in MiB unless otherwise specified. (e.g. 2g, 8g).' };
    get INPUT_PLACEHOLDER(): string { return '' };

    constructor(value: string = '8g') {
        super(value);
    }

}