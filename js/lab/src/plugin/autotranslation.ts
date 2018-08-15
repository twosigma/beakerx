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

/// <reference path='../global.env.ts'/>

import {BEAKER_AUTOTRANSLATION} from "./comm";

export namespace Autotranslation {
  export const LOCK_PROXY = 'LOCK_PROXY';
  export const TABLE_FOCUSED = 'tableFocused';

  export function proxify(beakerxInstance: any, kernelInstance): Proxy<any> {
    let autotranslationComm = kernelInstance.connectToComm(BEAKER_AUTOTRANSLATION);
    autotranslationComm.open();

    const handler = {
      get(obj, prop) {
        return prop in obj ? obj[prop] : undefined;
      },

      set(obj, prop, value) {
        obj[prop] = value;

        if (prop !== LOCK_PROXY && prop !== TABLE_FOCUSED && !window.beakerx[LOCK_PROXY]) {
          autotranslationComm.send({ name: prop, value });
        }

        return true;
      }
    };

    return new Proxy<any>(beakerxInstance, handler);
  }
}
