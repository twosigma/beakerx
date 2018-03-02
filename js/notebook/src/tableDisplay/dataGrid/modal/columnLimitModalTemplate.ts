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

export default function createModalTemplate(
  outputColumnLimit: number,
  columnNumber: number
): string {
  return `
      <div class="bko-modal column-limit-modal">
          <div class="modal-dialog" role="document">
              <div class="modal-content">
                  <div class="modal-body">
                      Too many columns, hiding those numbered ${outputColumnLimit} to ${columnNumber}. Open list of all columns to show selectively?
                  </div>
                  <div class="modal-footer">
                      <button type="button" class="btn btn-primary">OK</button>
                      <button type="button" class="btn btn-secondary">Cancel</button>
                  </div>
              </div>
          </div>
      </div>
  `;
};
