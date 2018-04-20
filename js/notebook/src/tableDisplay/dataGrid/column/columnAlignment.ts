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

import { ALL_TYPES } from "../dataTypes";
import { TextRenderer } from "@phosphor/datagrid";

export const LEFT: TextRenderer.HorizontalAlignment = 'left';
export const RIGHT: TextRenderer.HorizontalAlignment = 'right';
export const CENTER: TextRenderer.HorizontalAlignment = 'center';

export const DEFAULT_ALIGNMENT = LEFT;

export const ALIGNMENTS_BY_TYPE = {
  'datetime': CENTER,
  'time': CENTER,
  'integer': RIGHT,
  'int64': RIGHT,
  'double': RIGHT
};

export const ALIGNMENTS_BY_CHAR = {
  'C': CENTER,
  'R': RIGHT,
  'L': LEFT
};

export const getAlignmentByType =
  (type: number): TextRenderer.HorizontalAlignment =>
    ALIGNMENTS_BY_TYPE[ALL_TYPES[type]] || DEFAULT_ALIGNMENT;

export const getAlignmentByChar =
  (char: string): TextRenderer.HorizontalAlignment =>
    ALIGNMENTS_BY_CHAR[char] || DEFAULT_ALIGNMENT;
