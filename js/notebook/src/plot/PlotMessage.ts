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

export default class PlotMessage {
  scope: any;

  constructor(scope: any) {
    this.scope = scope;
  }

  render(title, msgs, msgid, callbacky, callbackn) {
    const message = $("<div></div>")
      .appendTo(this.scope.jqcontainer)
      .attr("id", msgid)
      .attr("class", "plot-message")
      .on('mousedown', function (e) {
        if (e.which === 3) {
          if (callbackn != null) {
            callbackn();
          }
        } else {
          if (callbacky != null) {
            callbacky();
          }
        }

        $(this).remove();
      });

    if (title != null && title != "") {
      $("<div></div>").appendTo(message)
        .attr("class", "plot-message-title")
        .text(title);
    }

    const content = $("<div></div>").appendTo(message).attr("class", "plot-message-content");

    if (typeof(msgs) === "string") {
      msgs = [ msgs ];
    }

    for (let i = 0; i < msgs.length; i++) {
      $("<div></div>").appendTo(content)
        .text(msgs[i]);
    }

    const w = message.outerWidth(), h = message.outerHeight();
    const lMargin = this.scope.layout.leftLayoutMargin;
    const bMargin = this.scope.layout.bottomLayoutMargin;

    message.css({
      "left" : (this.scope.jqcontainer.width() - lMargin) / 2 - w / 2 + lMargin,
      "top" : (this.scope.jqcontainer.height() - bMargin) / 2 - h / 2
    });
  }
}
