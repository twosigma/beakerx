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

export namespace EventHelpers {
  export function isOutsideNode(event: MouseEvent, node: HTMLElement) {
    const rect = node.getBoundingClientRect();

    return (
      event.clientY - rect.top <= 1
      || rect.bottom - event.clientY <= 1
      || event.clientX - rect.left <= 1
      || rect.right - event.clientX <= 1
    )
  }

  export function isInsideGrid(event) {
    const relatedTarget = (event.relatedTarget || event.target) as HTMLElement;

    return relatedTarget && (
      relatedTarget.classList.contains('p-DataGrid')
      || relatedTarget.closest('.p-DataGrid')
    )
  }

  export function isInsideGridNode(event: MouseEvent, gridNode: HTMLElement) {
    const relatedTarget = (event.relatedTarget || event.target) as HTMLElement;

    return relatedTarget && (
      gridNode.contains(relatedTarget)
      || relatedTarget === gridNode
      || relatedTarget.classList.contains('bko-menu')
      || relatedTarget.closest('.bko-table-menu')
    );
  }
}
