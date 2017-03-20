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

package com.twosigma.beaker.jvm.object;

import com.twosigma.beaker.jvm.ObserverObjectTest;
import org.assertj.core.api.Assertions;
import org.junit.Before;
import org.junit.Test;

public class BeakerDashboardTest {

  private BeakerDashboard dashboard;
  private BeakerDashboard.dashRow row;

  @Before
  public void setUp() throws Exception {
    dashboard = new BeakerDashboard();
    row = dashboard.newRow();
  }

  @Test
  public void createBeakerDashboard_dashboardHasContentNotNull() throws Exception {
    //when
    BeakerDashboard beakerDashboard = new BeakerDashboard();
    //then
    Assertions.assertThat(beakerDashboard.content).isNotNull();
  }

  @Test
  public void createBeakerDashboard_dashboardHasStyleAndClassIsNull() throws Exception {
    //when
    BeakerDashboard beakerDashboard = new BeakerDashboard();
    //then
    Assertions.assertThat(beakerDashboard.getTheClass()).isNull();
    Assertions.assertThat(beakerDashboard.getTheStyle()).isNull();
  }

  @Test
  public void newRow_createNewDashRow() throws Exception {
    //when
    BeakerDashboard.dashRow row = dashboard.newRow();
    //then
    Assertions.assertThat(row).isNotNull();
  }

  @Test
  public void addRow_rowsListIsNotEmpty() throws Exception {
    //when
    dashboard.addRow(row);
    //then
    Assertions.assertThat(dashboard.getRows()).isNotEmpty();
    Assertions.assertThat(dashboard.getRows().size()).isEqualTo(1);
  }

  @Test
  public void newColumn_createNewColumnWithWidth() throws Exception {
    int width = 5;
    //when
    BeakerDashboard.dashColumn dashColumn = dashboard.newColumn(width);
    //then
    Assertions.assertThat(dashColumn).isNotNull();
    Assertions.assertThat(dashColumn.getWidth()).isEqualTo(width);
  }

  @Test
  public void clear_listRowsIsEmpty() throws Exception {
    //given
    dashboard.addRow(row);
    //when
    dashboard.clear();
    //then
    Assertions.assertThat(dashboard.getRows()).isEmpty();
  }

  @Test
  public void redraw_shouldUpdateObservers() throws Exception {
    //given
    ObserverObjectTest observer = new ObserverObjectTest();
    dashboard.addObserver(observer);
    //when
    dashboard.redraw();
    //then
    Assertions.assertThat(observer.getObjectList()).isNotEmpty();
    Assertions.assertThat(observer.getObjectList().get(0)).isEqualTo(dashboard);
  }

}
