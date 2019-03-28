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

import {Message} from "@phosphor/messaging";

export const TYPE_DATABROWSER_SEARCH = 'beakerx:databrowser-search';
export const TYPE_DATABROWSER_HIDE_SEARCH = 'beakerx:databrowser-hide-search';
export const TYPE_DATABROWSER_SHOW_SEARCH = 'beakerx:databrowser-show-search';

export class SearchMessage extends Message {
  private _query: string;

  constructor(query: string) {
    super(TYPE_DATABROWSER_SEARCH);
    this._query = query;
  }

  get query(): string {
    return this._query;
  }
}
