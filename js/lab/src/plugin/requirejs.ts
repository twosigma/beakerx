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

let loader: Promise<void>;

export default class RequirejsLoader {

  public static load(): Promise<void> {

    if (loader) {
      return loader;
    }

    loader = new Promise((resolve, reject) => {

      const s = document.createElement('script');

      s.id = 'bx-requirejs';
      s.src = '//cdnjs.cloudflare.com/ajax/libs/require.js/2.3.5/require.min.js';
      s.onload = (evt) => {
        resolve();
      };

      s.onerror = (evt) => { reject(evt); };

      document.head.appendChild(s);
    });

    return loader;
  }
}
