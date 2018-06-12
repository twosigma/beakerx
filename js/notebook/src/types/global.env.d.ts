interface Map<K, V> {
  clear(): void;
  delete(key: K): boolean;
  forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void;
  get(key: K): V | undefined;
  has(key: K): boolean;
  set(key: K, value: V): this;
  readonly size: number;
}

interface MapConstructor {
  new (): Map<any, any>;
  new <K, V>(entries?: ReadonlyArray<[K, V]>): Map<K, V>;
  readonly prototype: Map<any, any>;
}

declare var Map: MapConstructor;

declare interface NumberConstructor {
  isNaN: (number: number) => boolean,
  isFinite: (number: number) => boolean
}

declare interface Array<T> {
  from: (arrayLike: any[]) => any[]
}

interface GlobalEnvironment {
  BEAKERX_MODULE_VERSION;
  __webpack_public_path__;
}
