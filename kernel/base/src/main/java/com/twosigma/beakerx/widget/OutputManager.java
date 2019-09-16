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

import com.twosigma.beakerx.Display;
import com.twosigma.beakerx.mimetype.MIMEContainer;

import java.util.List;

public final class OutputManager {

  private static OutputManager instance = new OutputManager(
          WidgetDisplayMethodManager.getInstance(),
          MIMEDisplayMethodManager.getInstance());

  private WidgetDisplayMethodManager widgetDisplayMethodManager;
  private MIMEDisplayMethodManager mimeDisplayMethodManager;
  private Output output;
  private Output stderr;
  private Output stdout;
  private Widget.WidgetDisplayMethodStrategy widgetDisplayMethodStrategy = new WidgetDisplayMethodStrategy();
  private Display.MIMEContainerDisplayMethodStrategy mimeContainerDisplayMethodStrategy = new MIMEContainerDisplayMethodStrategy();

  private OutputManager(WidgetDisplayMethodManager widgetDisplayMethodManager, MIMEDisplayMethodManager mimeDisplayMethodManager) {
    this.widgetDisplayMethodManager = widgetDisplayMethodManager;
    this.mimeDisplayMethodManager = mimeDisplayMethodManager;
  }

  public static Output setOutput(Output out) {
    instance.output = out;
    defineWidgetDisplayMethod();
    return instance.output;
  }

  public static Output setStandardError(Output out) {
    instance.stderr = out;
    return instance.stderr;
  }

  public static Output setStandardOutput(Output out) {
    instance.stdout = out;
    defineWidgetDisplayMethod();
    return instance.stdout;
  }

  public static void clearStderr() {
    if (instance.stderr != null) {
      instance.stderr.clearOutput();
    }
  }

  public static void clearStdout() {
    if (instance.stdout != null) {
      instance.stdout.clearOutput();
    }
  }

  public static void clearOutput() {
    if (instance.output != null) {
      instance.output.clearOutput();
    }
  }

  public static void clear() {
    clearOutput();
    clearStdout();
    clearStderr();
  }

  public static boolean sendStdout(String s) {
    if (instance.output != null || instance.stdout != null) {
      if (instance.output != null) {
        instance.output.sendStdout(s);
      }
      if (instance.stdout != null) {
        instance.stdout.sendStdout(s);
      }
      return true;
    }
    return false;
  }

  public static boolean sendStderr(String s) {
    if (instance.output != null || instance.stderr != null) {
      if (instance.output != null) {
        instance.output.sendStderr(s);
      }
      if (instance.stderr != null) {
        instance.stderr.sendStderr(s);
      }
      return true;
    }
    return false;
  }

  private static void defineWidgetDisplayMethod() {
    Output outputWidget = getOutput();
    if (outputWidget == null) {
      instance.widgetDisplayMethodManager.setDefaultDisplayMethod();
      instance.mimeDisplayMethodManager.setDefaultDisplayMethod();
    } else {
      instance.widgetDisplayMethodManager.defineDisplayMethod(instance.widgetDisplayMethodStrategy);
      instance.mimeDisplayMethodManager.defineDisplayMethod(instance.mimeContainerDisplayMethodStrategy);
    }
  }

  private static Output getOutput() {
    if (instance.output != null) {
      return instance.output;
    }
    if (instance.stdout != null) {
      return instance.stdout;
    }
    return null;
  }

  static class WidgetDisplayMethodStrategy implements Widget.WidgetDisplayMethodStrategy {
    @Override
    public void display(Widget widget) {
      getOutput().display(widget);
    }
  }

  static class MIMEContainerDisplayMethodStrategy implements Display.MIMEContainerDisplayMethodStrategy {
    @Override
    public void display(List<MIMEContainer> mimeContainers) {
      getOutput().display(mimeContainers);
    }
  }
}
