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

import consts from "../consts";

export enum ALL_TYPES {
  'string',
  'integer',
  'formatted integer',
  'double',
  'double with precision',
  'exponential 5' = 6,
  'exponential 15',
  'datetime',
  'boolean',
  'html'
}

export enum TYPES_MAP {
  'int64' = ALL_TYPES.string,
  'time' = ALL_TYPES.datetime,
  'integer' = ALL_TYPES['formatted integer']
}

export enum ALIGNMENTS_BY_TYPE {
  'datetime' = 'C',
  'integer' = 'R',
  'double' = 'R'
}

const DEFAULT_DOUBLE_WITH_PRECISION_TYPE = '4.3';
const DEFAULT_ALIGNMENT = 'L';

export const getTypeByName = (typeName: string): number => {
  if (TYPES_MAP[typeName]) {
    return TYPES_MAP[typeName];
  }

  return ALL_TYPES[typeName] || 0;
};

export function getDisplayType(typeName: string, stringFormatForType?: any, stringFormatForColumn?: any) {
  const type: number = getTypeByName(typeName);

  if (type === ALL_TYPES.datetime) {
    return ALL_TYPES.datetime;
  }

  if (type === ALL_TYPES.integer) {
    return ALL_TYPES['formatted integer'];
  }

  if (type === ALL_TYPES.double) {
    if (stringFormatForType && stringFormatForType.double || stringFormatForColumn) {
      return ALL_TYPES.double;
    }

    return DEFAULT_DOUBLE_WITH_PRECISION_TYPE;
  }

  return ALL_TYPES.string;
}

export function isDoubleWithPrecision(type: string|number) {
  let parts = type.toString().split(".");

  return parts.length > 1 && parts[0] === '4';
}

export function getDoublePrecisionByType(type: string|number): string {
  return type.toString().split(".")[1];
}

export function getAllowedTypesByType(type) {
  if (!type) {
    return consts.scopeData.allTypes;
  }

  if (type === 'string') {
    return consts.scopeData.allStringTypes;
  }

  if (type === 'double') {
    return consts.scopeData.allDoubleTypes;
  }

  if (type === 'integer' || type === 'int64') {
    return consts.scopeData.allIntTypes;
  }

  if (type === 'time' || type === 'datetime') {
    return consts.scopeData.allTimeTypes;
  }

  if (type === 'boolean') {
    return consts.scopeData.allBoolTypes;
  }

  return consts.scopeData.allStringTypes;
}
