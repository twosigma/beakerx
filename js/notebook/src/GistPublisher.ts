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

import * as $ from "jquery";

const CONFIG = {
  gistsUrl: 'https://api.github.com/gists',
  nbviewerBaseUrl: 'https://nbviewer.jupyter.org/'
};

export class GistPublisher {

  public static doPublish(
    personalAccessToken: string,
    notebookName: string,
    content: any,
    onErrorCb: (errorMessage: string) => void
  ) {
    const filedata = {};

    filedata[notebookName] = {
      content : JSON.stringify(content)
    };

    let gistsUrl = CONFIG.gistsUrl;
    if (personalAccessToken) {
      gistsUrl = `${gistsUrl}?oauth_token=${personalAccessToken}`;
    }

    const settings = {
      type : 'POST',
      headers : {},
      data : JSON.stringify({
        public : true,
        files : filedata
      }),
      success : (data, status) => {
        console.log("gist successfully published: " + data.id);
        window.open(CONFIG.nbviewerBaseUrl + data.id);
      }
    };

    $.ajax(gistsUrl, settings)
      .catch((jqXHR, status, err) => {
      let errorMsg = jqXHR.readyState === 0 && !err ? 'NETWORK ERROR!' : err;

      if (jqXHR.responseJSON && jqXHR.responseJSON.message) {
        errorMsg = jqXHR.responseJSON.message;
      }

      console.log(errorMsg);
      onErrorCb(errorMsg);
    });
  }

}

export default {
  GistPublisher,
}