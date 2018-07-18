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

import {ZoomLevel} from "./interface";

export const INITIAL_ZOOM_LEVEL: ZoomLevel = {
  minSpanX : 1E-8,
  minSpanY : 1E-8,
  maxScaleX : 1,
  maxScaleY : 1
};

export default {
  INITIAL_ZOOM_LEVEL
}
