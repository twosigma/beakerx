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

import GistPublisher from "./GistPublisher";

export interface GistPublisherAccessTokenProviderInterface {
  getPersonalAccessToken(): Promise<string>;
}

export class GistPublisherUtils {
  private static accessTokenProvider: GistPublisherAccessTokenProviderInterface = null;
  private static saveWidgetStateHandler: () => Promise<any>;

  public static registerAccessTokenProvider(accessTokenProvider: GistPublisherAccessTokenProviderInterface) {
    this.accessTokenProvider = accessTokenProvider;
  }

  public static registerSaveWidgetStateHandler(saveHandler: () => Promise<string>) {
    this.saveWidgetStateHandler = saveHandler;
  }

  public static publishScope(
    scope: any
  ): void {
    if (null === this.accessTokenProvider) {
      console.log('access token provider was not registered');
      return;
    }

    let personalAccessToken = '';
    this.accessTokenProvider
      .getPersonalAccessToken()
      .then((accessToken) => {
        personalAccessToken = accessToken;
        return this.saveWidgetsState();
      })
      .then((notebook_name) => {
        GistPublisher.doPublish(
          personalAccessToken,
          notebook_name,
          this.prepareContent(scope),
          (errorMsg) => {}
        );
      });
  }

  private static getScopeCell(scope) {
    for(let cell of Jupyter.notebook.get_cells()) {
      if(cell.element[0].contains(scope.element[0])){
        return cell;
      }
    }
  }

  private static saveWidgetsState(): Promise<any> {
    return this.saveWidgetStateHandler();
  }

  private static prepareContent(scope) {
    const nbjson = Jupyter.notebook.toJSON();
    nbjson.cells = [this.getScopeCell(scope).toJSON()];
    return nbjson;
  }

}
export default {
  GistPublisherUtils,
}