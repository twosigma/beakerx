/*
 *  Copyright 2014 - 2017 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beakerx.jvm.object;

import com.twosigma.beakerx.evaluator.InternalVariable;
import com.twosigma.beakerx.widgets.Widget;
import com.twosigma.beakerx.widgets.box.VBox;

import java.util.ArrayList;
import java.util.List;

public class CyclingOutputContainerLayoutManager extends OutputContainerLayoutManager {
  
  private volatile long  period = 5000L;
  private TimerThread timer = null;
  
  public long getPeriod() {
    return period;
  }

  public void setPeriod(long period) {
    this.period = period;
  }
  
  @Override
  public void display(OutputContainer container) {
    if(timer != null){
      try {
        timer.interrupt();
        timer.join(period);
      } catch (InterruptedException e) {
        //nothing to do
      }
    }
    
    List<WidgetHolder> tabList = new ArrayList<>();
    for (Widget w : getWidgets(container)) {
      List<Widget> list = new ArrayList<>();
      list.add(w);
      WidgetHolder item = new WidgetHolder();
      item.box = new VBox(list);
      item.dispalyed = Boolean.FALSE;
      tabList.add(item);
    }
    
    timer = new TimerThread(InternalVariable.getSimpleEvaluationObject(), tabList );
    timer.start();
  }
  
  /**
   * Needed separate {@code Thread} because in another way Jupyter can not complete {@code display} method.
   * 
   * @author konst
   *
   */
  private class TimerThread extends Thread{

    private SimpleEvaluationObject seo;
    private List<WidgetHolder> tabList;
    
    /**
     * 
     * @param seo need to be passed to get right "parent message" because it based on {@code ThreadLocal}
     * @param tabList
     */
    private TimerThread(SimpleEvaluationObject seo, List<WidgetHolder> tabList){
      this.seo = seo;
      this.tabList = tabList;
    }
    
    @Override
    public void run() {
      InternalVariable.setValue(seo);
      WidgetHolder currentBox = null;
      boolean display = true;
      while(display){
        for (WidgetHolder box : tabList) {
          if(currentBox != null){
            currentBox.box.getLayout().setDisplay("none");
          }
          currentBox = box;
          if(!currentBox.dispalyed){
            currentBox.box.display();
            currentBox.dispalyed = Boolean.TRUE;
          }else{
            currentBox.box.getLayout().setDisplay("");
          }
          try {
            Thread.sleep(period);
          } catch (InterruptedException e) {
            display = false;
            break;
          }
        }
      }
    }
    
  }
  
  private class WidgetHolder {
    private VBox box;
    private boolean dispalyed = false;
  }
  
}