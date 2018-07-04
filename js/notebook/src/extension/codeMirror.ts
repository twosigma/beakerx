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

export function extendHighlightModes(Jupyter: any, CodeMirror: any) {
  Jupyter.CodeCell.options_default.highlight_modes = _.extend(
    Jupyter.CodeCell.options_default.highlight_modes,
    {
      magic_groovy: { reg: ['^%%groovy'] },
      magic_java: { reg: ['^%%java'] },
      magic_scala: { reg: ['^%%scala'] },
      magic_kotlin: { reg: ['^%%kotlin'] },
      magic_clojure: { reg: ['^%%clojure'] },
      magic_sql: { reg: ['^%%sql'] }
    }
  );
}

export default {
  extendHighlightModes
};
