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

import { Dialog } from '@jupyterlab/apputils';

export default class Modal extends Dialog<any> {
  submitHandler: Function;

  constructor({ submitHandler, ...options }) {
    super(options);

    this.submitHandler = submitHandler;
  }

  protected _evtClick(event: MouseEvent): void {
    let content = this.node.getElementsByClassName('jp-Dialog-content')[0] as HTMLElement;

    if (!content.contains(event.target as HTMLElement)) {
      event.stopPropagation();
      event.preventDefault();

      return;
    }

    for (let buttonNode of this['_buttonNodes']) {
      if (buttonNode.contains(event.target as HTMLElement)) {
        this.submitHandler && this.submitHandler(event);
        break;
      }
    }
  }

  protected _evtKeydown(event: KeyboardEvent): void {
    switch (event.keyCode) {
      case 13:  // Enter.
        event.stopPropagation();
        event.preventDefault();
        this.submitHandler && this.submitHandler(event);
        break;
      default:
        super._evtKeydown(event);
    }
  }
}
