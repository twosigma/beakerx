/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
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

import { Message } from "@phosphor/messaging";
import IJVMOptions, {
  IDefaultJVMOptions,
  IOtherJVMOptions,
  IPropertiesJVMOptions
} from "beakerx_shared/lib/api/IJVMOptions";
import IUIOptions from "beakerx_shared/lib/api/IUIOptions";

export namespace Messages {

  export const TYPE_JVM_OPTIONS_ERROR = 'jvm-options:error';

  export class JVMOptionsErrorMessage extends Message {
    private _error: Error;

    constructor(error: Error) {
      super(TYPE_JVM_OPTIONS_ERROR);
      this._error = error;
    }

    get error(): Error {
      return this._error;
    }
  }

  export const TYPE_JVM_OPTIONS_CHANGED = 'jvm-options-changed';

  export class JVMOptionsChangedMessage extends Message {
    private _options: IJVMOptions;

    constructor(options: IJVMOptions) {
      super(TYPE_JVM_OPTIONS_CHANGED);
      this._options = options
    }

    get options(): IJVMOptions {
      return this._options;
    }
  }

  export const TYPE_DEFAULT_JVM_OPTIONS_CHANGED = 'jvm-options-changed:default';

  export class DefaultOptionsChangedMessage extends Message {
    private _values: IDefaultJVMOptions;

    constructor(values: IDefaultJVMOptions) {
      super(TYPE_DEFAULT_JVM_OPTIONS_CHANGED);
      this._values = values
    }

    get values(): IDefaultJVMOptions {
      return this._values;
    }
  }

  export const TYPE_OTHER_JVM_OPTIONS_CHANGED = 'jvm-options-changed:other';

  export class OtherOptionsChangedMessage extends Message {
    private _options: IOtherJVMOptions;

    constructor(options: IOtherJVMOptions) {
      super(TYPE_OTHER_JVM_OPTIONS_CHANGED);
      this._options = options
    }

    get options(): IOtherJVMOptions {
      return this._options;
    }
  }

  export const TYPE_PROPERTIES_JVM_OPTIONS_CHANGED = 'jvm-options-changed:properties';

  export class PropertiesOptionsChangedMessage extends Message {
    private _properties: IPropertiesJVMOptions;

    constructor(properties: IPropertiesJVMOptions) {
      super(TYPE_PROPERTIES_JVM_OPTIONS_CHANGED);
      this._properties = properties
    }

    get properties(): IPropertiesJVMOptions {
      return this._properties;
    }
  }

  export const TYPE_UI_OPTIONS_CHANGED = 'ui-options-changed';

  export class UIOptionsChangedMessage extends Message {
    private _options: IUIOptions;

    constructor(options: IUIOptions) {
      super(TYPE_UI_OPTIONS_CHANGED);
      this._options = options
    }

    get options(): IUIOptions {
      return this._options;
    }
  }

  export const TYPE_SIZE_CHANGED = 'size-changed';

  export class SizeChangedMessage extends Message {

    constructor() {
      super(TYPE_SIZE_CHANGED);
    }

  }

}
