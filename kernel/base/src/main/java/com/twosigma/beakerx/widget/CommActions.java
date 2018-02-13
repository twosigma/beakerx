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
package com.twosigma.beakerx.widget;

public enum CommActions {

  DOUBLE_CLICK("DOUBLE_CLICK"),
  ONCLICK("onclick"),
  ONKEY("onkey"),
  ACTIONDETAILS("actiondetails"),
  CONTEXT_MENU_CLICK("CONTEXT_MENU_CLICK"),
  CLICK("click");

  private String action;

  CommActions(String action) {
    this.action = action;
  }

  public String getAction() {
    return action;
  }

  public static CommActions getByAction(final String input) {
    CommActions ret = null;
    if (input != null) {
      for (CommActions item : CommActions.values()) {
        if (item.getAction().equalsIgnoreCase(input.trim())) {
          ret = item;
          break;
        }
      }
    }
    return ret;
  }
}
