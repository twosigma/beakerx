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

import { GistPublisher } from "./GistPublisher";

interface GistPublisherOptions {
  accessTokenProvider: GistPublisherAccessTokenProviderInterface;
  saveWidgetsStateHandler: () => Promise<string>;
  prepareContentToPublish: (scope) => any;
}

export interface GistPublisherAccessTokenProviderInterface {
  getPersonalAccessToken(): Promise<string>;
}

declare global {
  interface Window {
    bxPublisherOptions: GistPublisherOptions;
  }
}

export class GistPublisherUtils {
  public static get accessTokenProvider(): GistPublisherAccessTokenProviderInterface {
    return window.bxPublisherOptions.accessTokenProvider;
  }

  public static get saveWidgetStateHandler(): () => Promise<string> {
    return window.bxPublisherOptions.saveWidgetsStateHandler;
  }

  public static get prepareContentToPublish(): (scope) => any {
    return window.bxPublisherOptions.prepareContentToPublish;
  }

  public static setup(options: GistPublisherOptions) {
    window.bxPublisherOptions = options;
  }

  public static publishScope(
    scope: any
  ): void {
    if (null === window.bxPublisherOptions) {
      console.log('gist publisher was not configured');
      return;
    }

    let personalAccessToken = '';
    this.accessTokenProvider
      .getPersonalAccessToken()
      .then((accessToken) => {
        personalAccessToken = accessToken;
        return this.saveWidgetStateHandler();
      })
      .then((notebook_name) => {
        GistPublisher.doPublish(
          personalAccessToken,
          notebook_name,
          this.prepareContentToPublish(scope),
          (errorMsg) => {}
        );
      });
  }
}

export default {
  GistPublisherUtils,
}
