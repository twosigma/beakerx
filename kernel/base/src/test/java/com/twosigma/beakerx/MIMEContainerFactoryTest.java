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
package com.twosigma.beakerx;

import com.twosigma.beakerx.jvm.object.OutputCell;
import com.twosigma.beakerx.mimetype.MIMEContainer;
import jupyter.Displayer;
import jupyter.Displayers;
import org.junit.Test;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.twosigma.beakerx.mimetype.MIMEContainer.MIME.TEXT_HTML;
import static org.assertj.core.api.Assertions.assertThat;

public class MIMEContainerFactoryTest {

  @Test
  public void integerAsTextHtml() throws Exception {
    //given
    Displayers.register(Integer.class, new Displayer<Integer>() {
      @Override
      public Map<String, String> display(Integer value) {
        return new HashMap<String, String>() {{
          put(TEXT_HTML, "<div><h1>" + value + "</h1></div>");
        }};
      }
    });
    //when
    List<MIMEContainer> result = MIMEContainerFactory.createMIMEContainers(2);
    //then
    assertThat(result.get(0)).isEqualTo(new MIMEContainer(TEXT_HTML, "<div><h1>" + 2 + "</h1></div>"));
  }

  @Test
  public void OutputCellHIDDENShouldReturnMIMEContainerHidden() throws Exception {
    //give
    //when
    List<MIMEContainer> result = MIMEContainerFactory.createMIMEContainers(OutputCell.HIDDEN);
    //then
    assertThat(result.get(0)).isEqualTo(MIMEContainer.HIDDEN);
  }
}