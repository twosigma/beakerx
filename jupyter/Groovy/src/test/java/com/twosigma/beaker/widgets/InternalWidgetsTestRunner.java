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
package com.twosigma.beaker.widgets;

import com.twosigma.beaker.jupyter.GroovyKernelManager;
import com.twosigma.beaker.widgets.internal.InternalWidget;
import org.lappsgrid.jupyter.groovy.GroovyKernelTest;
import org.reflections.Reflections;

import java.util.Set;

public class InternalWidgetsTestRunner {

  public static final String PATH_TO_SCAN = "com.twosigma.beaker.widgets";

  private GroovyKernelTest groovyKernel;

  public void setUp() throws Exception {
    groovyKernel = new GroovyKernelTest();
    GroovyKernelManager.register(groovyKernel);
  }

  public void tearDown() throws Exception {
    GroovyKernelManager.register(null);
  }

  public void test(TestAction action) throws Exception {
    for (Class<? extends InternalWidget> clazz : getAllInternalWidget()) {
      setUp();
      action.run(clazz, groovyKernel);
      tearDown();
    }
  }

  private Set<Class<? extends InternalWidget>> getAllInternalWidget() {
    Reflections reflections = new Reflections(PATH_TO_SCAN);
    return reflections.getSubTypesOf(InternalWidget.class);
  }

  public interface TestAction {
    void run(Class<? extends InternalWidget> clazz, GroovyKernelTest groovyKernel) throws Exception;
  }

}
