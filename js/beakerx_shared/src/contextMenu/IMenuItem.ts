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

import { CommandRegistry } from '@phosphor/commands';

export default interface IMenuItem {
  title: string,
  action?: Function,
  enableItemsFiltering?: boolean,
  id?: string,
  icon?: string,
  inputPlaceholder?: string,
  inputAction?: Function,
  isChecked?: Function|boolean,
  items?: IMenuItem[]|Function,
  keepOpen?: boolean,
  separator?: boolean,
  shortcut?: string
  submenuClass?: string,
  type?: string,
  tooltip?: string,
  updateLayout?: boolean,
  isVisible?: CommandRegistry.CommandFunc<boolean>,
  args?: object
}
