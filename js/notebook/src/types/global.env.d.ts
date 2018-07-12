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

interface Map<K, V> {
  clear(): void;
  delete(key: K): boolean;
  forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void;
  get(key: K): V | undefined;
  has(key: K): boolean;
  set(key: K, value: V): this;
  readonly size: number;
}

interface Math {
  sign: (x: number) => number
}

interface MapConstructor {
  new (): Map<any, any>;
  new <K, V>(entries?: ReadonlyArray<[K, V]>): Map<K, V>;
  readonly prototype: Map<any, any>;
}

declare var Map: MapConstructor;
declare var CodeMirror: any;
declare var Proxy: ProxyConstructor;

declare interface NumberConstructor {
  isNaN: (number: number) => boolean,
  isFinite: (number: number) => boolean
}

type Proxy<T> = {
  get(): T;
  set(value: T): void;
}

interface ProxyConstructor {
  revocable<T extends object>(target: T, handler: ProxyHandler<T>): { proxy: T; revoke: () => void; };
  new <T extends object>(target: T, handler: ProxyHandler<T>): T;
}


declare interface Array<T> {
  from: (arrayLike: any[]) => any[]
}

declare interface Window {
  beakerx: any,
  chrome?: any,
  require: any
}

interface GlobalEnvironment {
  BEAKERX_MODULE_VERSION;
  __webpack_public_path__;
}
