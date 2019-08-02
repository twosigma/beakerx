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

export default class CellTooltip {
  timeoutId: NodeJS.Timeout;
  node: HTMLElement;
  container: HTMLElement;

  static TOOLTIP_ANIMATION_DELAY = 300;

  constructor(text: string, container: HTMLElement) {
    this.container = container;
    this.node = document.createElement('div');
    this.node.style.position = 'absolute';
    this.node.style.visibility = 'visible';
    this.node.classList.add('p-DataGrid-tooltip');

    if (text) {
      this.node.innerText = text;
    }
  }

  destroy(): void {
    this.container = null;
    this.node = null;
  }

  show(x: number, y: number): void {
    if (this.container.contains(this.node)) {
      return;
    }

    this.node.style.left = `${x}px`;
    this.node.style.top = `${y}px`;

    this.container.appendChild(this.node);
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => this.node.classList.add('visible'), CellTooltip.TOOLTIP_ANIMATION_DELAY) as any;
  }

  hide(): void {
    this.node.classList.remove('visible');

    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(
      () => {
        if (this.container.contains(this.node)) {
          this.container.removeChild(this.node);
        }
      },
      2 * CellTooltip.TOOLTIP_ANIMATION_DELAY
    ) as any
  }
}
