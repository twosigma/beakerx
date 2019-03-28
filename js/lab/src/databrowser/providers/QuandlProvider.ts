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

import IDataBrowserProvider from "./IDataBrowserProvider";
import IDataBrowserProviderList, {IDataBrowserProviderListItem} from "./IDataBrowserProviderList";

import data from "./quandlData.json";

export default class QuandlProvider implements IDataBrowserProvider {

  public readonly providerName: string = "Quandl";
  public readonly labelName: string = "Quandl";
  public readonly icon: string = "https://d3rlqa3rnk4r1f.cloudfront.net/assets/images/logos/v2/quandl-word-mark-fb41d14c7a394be8118897fb977de828.svg";
  public readonly color: string = "#e25829";

  constructor() {

  }

  public getList(): IDataBrowserProviderList {
    return {
      items: data.datasets,
    };
  };

  public getDetail(name: string): IDataBrowserProviderListItem | null {
    for (const entry of data.datasets) {
      if (entry.name === name) {
        return entry;
      }
    }

    return null;
  }

  public getDataSet(): IDataBrowserProviderListItem[] {
    return data.datasets;
  }

  public getCodeSample(entry: { code: string }, language: string): string {
    if (language.includes("python")) {
      return `quandl.get("${entry.code}")`;
    }

    return 'Code not available in this kernel.'
  }
}