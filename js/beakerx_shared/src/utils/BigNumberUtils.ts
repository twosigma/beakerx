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
import Big from 'big.js';

export default class BigNumberUtils {

  public static lt(n1: BigJs.BigSource, n2: BigJs.BigSource): boolean {
    if (n1 === Infinity) { return false; }
    if (n2 === -Infinity) { return false; }
    if (n2 === Infinity) { return true; }
    if (n1 === -Infinity) { return true; }

    return n1 instanceof Big ? n1.lt(n2) : Big(n1).lt(n2);
  }

  public static lte(n1: BigJs.BigSource, n2: BigJs.BigSource): boolean {
    if (n1 === -Infinity) { return true; }
    if (n2 === -Infinity) { return false; }
    if (n2 === Infinity)  { return true; }
    if (n1 === Infinity) { return false; }

    return n1 instanceof Big ? n1.lte(n2) : Big(n1).lte(n2);
  }

  public static gt(n1: BigJs.BigSource, n2: BigJs.BigSource): boolean {
    if (n1 === -Infinity) { return false; }
    if (n2 === -Infinity) { return true; }
    if (n2 === Infinity) { return false; }
    if (n1 === Infinity) { return true; }

    return n1 instanceof Big ? n1.gt(n2) : Big(n1).gt(n2);
  }

  public static gte(n1: BigJs.BigSource, n2: BigJs.BigSource): boolean {
    if (n2 === -Infinity) { return true; }
    if (n1 === Infinity) { return true; }
    if (n1 === -Infinity) { return false; }
    if (n2 === Infinity) { return false; }

    return n1 instanceof Big ? n1.gte(n2) : Big(n1).gte(n2);
  }

  public static eq(n1: BigJs.BigSource, n2: BigJs.BigSource): boolean {
    if (n1 === -Infinity && n2 === -Infinity) { return true; }
    if (n1 === Infinity && n2 === Infinity) { return true; }
    if (n1 === Infinity) { return false; }
    if (n1 === -Infinity) { return false; }
    if (n2 === Infinity) { return false; }
    if (n2 === -Infinity) { return false; }
    return n1 instanceof Big ? n1.eq(n2) : Big(n1).eq(n2);
  }

  public static plus(n1: BigJs.BigSource, n2: BigJs.BigSource): BigJs.BigSource {
    if (n1 instanceof Big) {
      return n1.plus(n2);
    }
    if (n2 instanceof Big) {
      return n2.plus(n1);
    }
    if (typeof n1 === 'string') {
      return n1 + n2; // string
    }
    if (typeof n2 === 'string') {
      return n1 + n2; // string
    }
    return n1 + n2; // number
  }

  public static minus(n1: BigJs.BigSource, n2: BigJs.BigSource): BigJs.BigSource {
    if (n1 instanceof Big) {
      return n1.minus(n2);
    }
    if (n2 instanceof Big) {
      return Big(n1).minus(n2);
    }
    if (typeof n1 === 'string') {
      return Big(n1).minus(n2);
    }
    if (typeof n2 === 'string') {
      return Big(n1).minus(n2);
    }
    return n1 - n2;
  }

  public static mult(n1: BigJs.BigSource, n2: BigJs.BigSource): BigJs.BigSource {
    if (n1 instanceof Big) {
      return n1.times(n2);
    }
    if (n2 instanceof Big) {
      return Big(n1).times(n2);
    }
    if (typeof n1 === "string") {
      return Big(n1).times(n2);
    }
    if (typeof n2 === "string") {
      return Big(n1).times(n2);
    }
    return n1 * n2;
  }

  public static div(n1: BigJs.BigSource, n2: BigJs.BigSource): BigJs.BigSource {
    if (n1 instanceof Big) {
      return n1.div(n2);
    }
    if (n2 instanceof Big) {
      return Big(n1).div(n2);

    }
    if (typeof n1 === "string") {
      return Big(n1).div(n2);
    }
    if (typeof n2 === "string") {
      return Big(n1).div(n2);
    }
    return n1 / n2;
  }

  public static max(n1: BigJs.BigSource, n2: BigJs.BigSource): BigJs.BigSource {
    return this.gt(n1, n2) ? n1 : n2;
  }

  public static min(n1: BigJs.BigSource, n2: BigJs.BigSource): BigJs.BigSource {
    return this.lt(n1, n2) ? n1 : n2;
  }

}