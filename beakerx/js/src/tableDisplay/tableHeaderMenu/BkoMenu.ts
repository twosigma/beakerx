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

import { Menu } from '@phosphor/widgets'

export default class BkoMenu extends Menu {
  keepOpen: boolean|undefined;

  triggerActiveItem(): void {
    if (!this.keepOpen) {
      super.triggerActiveItem();
      return;
    }

    if (!this.isAttached) {
      return;
    }

    const item = this.activeItem;
    if (!item) {
      return;
    }

    const command = item.command, args = item.args;
    if (this.commands.isEnabled(command, args)) {
      this.commands.execute(command, args);
    }
  }
}
