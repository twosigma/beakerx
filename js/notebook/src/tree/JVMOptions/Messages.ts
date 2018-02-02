import { Message } from "@phosphor/messaging";
import {
  IDefaultJVMOptions, IOtherJVMOptions, IPropertiesJVMOptions, IUIOptions
} from "../BeakerXApi";

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

}
