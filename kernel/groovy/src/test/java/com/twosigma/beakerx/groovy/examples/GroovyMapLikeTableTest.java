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
package com.twosigma.beakerx.groovy.examples;
import com.twosigma.beakerx.table.TableDisplay;
import com.twosigma.beakerx.message.Message;
import org.junit.Test;
import java.util.Optional;

import static com.twosigma.beakerx.MessageFactoryTest.getExecuteRequestMessage;
import static com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher.waitForIdleMessage;
import static org.assertj.core.api.Assertions.assertThat;

public class GroovyMapLikeTableTest extends GroovyExamplesSetupTest {

  @Test
  public void evaluateMap() throws Exception {
    //given
    String code = "[\"x\" : 1, \"y\" : 2]";
    runTest(code);
  }

  @Test
  public void evaluateList() throws Exception {
    //given
    String code = "" +
            "List list = new ArrayList();\n" +
            "list.add([\"x\" : 1, \"y\" : 2]);\n" +
            "list.add([\"x\" : 3, \"y\" : 4]);\n" +
            "list" ;
    runTest(code);
  }

  @Test
  public void evaluateArrayOfMap() throws Exception {
    //given
    String code = "" +
            "Map[] map = new Map[2];\n" +
            "map[0] = [\"x\" : 1, \"y\" : 2]\n" +
            "map[1] = [\"x\" : 3, \"y\" : 4]\n" +
            "map";
    runTest(code);
  }

  @Test
  public void evaluateListOfMap() throws Exception {
    //given
    String code = "" +
            "def listOfMap = []\n" +
            "1.upto(10){\n" +
            "  listOfMap += [\"test\": it]\n" +
            "}\n" +
            "listOfMap";
    runTest(code);
  }

  private void runTest(String code) throws InterruptedException {
    Message message = getExecuteRequestMessage(code);
    //when
    kernelSocketsService.handleMsg(message);
    Optional<Message> idleMessage = waitForIdleMessage(kernelSocketsService.getKernelSockets());
    //then
    assertThat(idleMessage).isPresent();
    assertMessageExists("TableDisplay widget was not found.", TableDisplay.VIEW_NAME_VALUE);
  }
}
