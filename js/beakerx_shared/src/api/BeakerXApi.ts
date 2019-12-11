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

import IApiSettingsResponse from "./IApiSettingsResponse";
import * as $ from "jquery";

function getCookie(name: string) {
  // from tornado docs: http://www.tornadoweb.org/en/stable/guide/security.html
  let r = document.cookie.match('\\b' + name + '=([^;]*)\\b');
  return r ? r[1] : void 0;
}

export default class BeakerXApi {

  readonly DEFAULT_SETTINGS: IApiSettingsResponse = {
    jvm_options: {
      heap_GB: null,
      other: [],
      properties: []
    },
    ui_options: {
      auto_close: true,
      improve_fonts: true,
      wide_cells: true,
      show_publication: true,
      show_catalog: false,
      auto_save: true,
      use_data_grid: true,
      auto_link_table_links: false,
    },
    version: 2
  };

  private readonly apiUrl: string;

  constructor(baseUrl: string = '/') {
    this.apiUrl = `${baseUrl}beakerx/`;
  }

  public getApiUrl(endpoint: string): string {
    return `${this.apiUrl}${endpoint}`;
  }

  public getVersion(): Promise<string> {

    return new Promise((resolve, reject) => {
      $.ajax(this.getApiUrl('version'), {
        success: (data, status) => {
          resolve(data.version);
        },
        error: (jqXHR, status, err) => {
          reject();
        }
      });
    });
  }

  public loadSettings(): Promise<IApiSettingsResponse> {
    return new Promise((resolve, reject) => {
      $.ajax(this.getApiUrl('settings'), {
        success: (data, status) => {
          resolve(this.mergeWithDefaults(data.beakerx));
        },
        error: (jqXHR, status, err) => {
          reject();
        }
      });

    });
  }

  public mergeWithDefaults(settings: IApiSettingsResponse): IApiSettingsResponse {
    let merged = this.DEFAULT_SETTINGS;

    if (settings.hasOwnProperty('version')) {
      merged.version = settings.version;
    }

    if (settings.hasOwnProperty('ui_options')) {
      merged.ui_options = {...merged.ui_options, ...settings.ui_options };
    }

    if (settings.hasOwnProperty('jvm_options')) {
      merged.jvm_options = {...merged.jvm_options, ...settings.jvm_options };
    }

    return merged;
  }

  public saveSettings(data: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {

      $.ajax(this.getApiUrl('settings'), {
        method: "POST",
        cache: false,
        contentType: "aplication/json; charset=utf-8",
        dataType: "json",
        processData: false,
        data: JSON.stringify(data),
        headers: {
          'X-XSRFToken': getCookie('_xsrf')
        },
        success: (data, status) => {
          resolve();
        },
        error: (jqXHR, status, err) => {
          reject();
        }
      });

    }) ;
  }

  public restService(data: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {

      $.ajax(this.getApiUrl('rest'), {
        method: "POST",
        cache: false,
        contentType: "aplication/json; charset=utf-8",
        dataType: "text",
        processData: false,
        data: JSON.stringify(data),
        headers: {
          'X-XSRFToken': getCookie('_xsrf')
        },
        success: (data, status) => {
          resolve();
        },
        error: (jqXHR, status, err) => {
          reject(err);
        }
      });

    }) ;
  }


}
