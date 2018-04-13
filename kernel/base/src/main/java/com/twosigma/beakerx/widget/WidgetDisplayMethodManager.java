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
package com.twosigma.beakerx.widget;

public class WidgetDisplayMethodManager {

  private static WidgetDisplayMethodManager instance = new WidgetDisplayMethodManager();

  private Widget.WidgetDisplayMethodStrategy defaultWidgetDisplayMethodStrategy = new DefaultWidgetDisplayMethodStrategy();
  private Widget.WidgetDisplayMethodStrategy displayWidgetMethodStrategy = defaultWidgetDisplayMethodStrategy;

  private WidgetDisplayMethodManager() {
  }

  public static WidgetDisplayMethodManager getInstance() {
    return instance;
  }

  public void display(Widget widget) {
    this.displayWidgetMethodStrategy.display(widget);
  }

  public void setDefaultDisplayMethod() {
    this.displayWidgetMethodStrategy = defaultWidgetDisplayMethodStrategy;
  }

  public void defineDisplayMethod(Widget.WidgetDisplayMethodStrategy displayWidgetMethodStrategy) {
    this.displayWidgetMethodStrategy = displayWidgetMethodStrategy;
  }

  static class DefaultWidgetDisplayMethodStrategy implements Widget.WidgetDisplayMethodStrategy {
    @Override
    public void display(Widget widget) {
      widget.beforeDisplay();
      widget.sendDisplay();
    }
  }

}
