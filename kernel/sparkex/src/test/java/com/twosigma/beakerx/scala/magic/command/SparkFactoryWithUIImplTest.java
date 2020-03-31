package com.twosigma.beakerx.scala.magic.command;

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

import com.twosigma.beakerx.TryResult;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.kernel.Code;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandExecutionParam;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.widget.SparkEngineNoUI;
import com.twosigma.beakerx.widget.SparkEngineNoUIImpl;
import com.twosigma.beakerx.widget.SparkEngineWithUI;
import com.twosigma.beakerx.widget.SparkEngineWithUIMock;
import com.twosigma.beakerx.widget.SparkSessionBuilder;
import com.twosigma.beakerx.widget.SparkSessionBuilderFactory;
import com.twosigma.beakerx.widget.SparkUIApi;
import com.twosigma.beakerx.widget.SparkUIFactory;
import com.twosigma.beakerx.widget.SparkUiDefaults;
import org.apache.spark.sql.SparkSession;
import org.jetbrains.annotations.NotNull;
import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.Collections;

import static com.twosigma.beakerx.MessageFactorTest.commMsg;
import static org.assertj.core.api.Assertions.assertThat;

public class SparkFactoryWithUIImplTest {

  private SparkFactoryImpl sparkFactory;
  private SparkEngineNoUIFactoryMock sparkEngineNoUIFactory;
  private KernelFunctionalityMock kernel;
  private SparkUiDefaultsImplMock sparkUiDefaults;
  private SparkSessionBuilderFactoryMock sparkSessionBuilderFactoryMock;

  @Before
  public void setUp() throws Exception {
    kernel = new KernelFunctionalityMock();
    sparkEngineNoUIFactory = new SparkEngineNoUIFactoryMock();
    sparkUiDefaults = new SparkUiDefaultsImplMock();
    sparkSessionBuilderFactoryMock = new SparkSessionBuilderFactoryMock();
    sparkFactory = new SparkFactoryImpl(
            kernel,
            sparkEngineNoUIFactory,
            (sparkSessionBuilder, ssfb, ssl) -> new SparkEngineWithUIMock(),
            new SparkUIFactoryMock(),
            sparkUiDefaults,
            sparkSessionBuilderFactoryMock,
            new SparkListenerServiceMock());
    KernelManager.register(kernel);
  }

  @Test
  public void createSparkWithNoUI() {
    //given
    sparkEngineNoUIFactory.goodConfiguration();
    //when
    sparkFactory.createSpark(sparkUIParam(), Collections.emptyList());
    //then
    assertThat(sparkUiDefaults.loaded).isTrue();
  }


  @NotNull
  private MagicCommandExecutionParam sparkUIParam() {
    String command = "%%spark";
    String codeBlock = "";
    String allCode = command + "\n" + codeBlock;
    Code code = Code.createCode(allCode, new ArrayList<>(), new ArrayList<>(), commMsg());
    return new MagicCommandExecutionParam(command, codeBlock, 1, code, true);
  }

  class SparkEngineNoUIFactoryMock implements SparkEngineNoUIImpl.SparkEngineNoUIFactory {

    private boolean configuration;

    @Override
    public SparkEngineNoUI create(SparkSessionBuilder sparkSessionBuilder, SparkSessionBuilderFactory sparkSessionBuilderFactory) {
      return new SparkEngineNoUIEmptyMock() {
        @Override
        public TryResult configure(KernelFunctionality kernel, Message parentMessage) {
          if (configuration) {
            return TryResult.createResult(true);
          }
          return TryResult.createError("false");
        }
      };
    }

    public void goodConfiguration() {
      this.configuration = true;
    }

    public void wrongConfiguration() {
      this.configuration = false;
    }
  }

  class SparkUIFactoryMock implements SparkUIFactory {

    @Override
    public SparkUIApi create(SparkSessionBuilder builder, SparkEngineWithUI sparkEngineWithUI, SparkUiDefaults sparkUiDefaults) {
      return new SparkUIApi() {

        @Override
        public void startStage(int stageId, int numTasks) {

        }

        @Override
        public void endStage(int stageId) {

        }

        @Override
        public void taskStart(int stageId, long taskId) {

        }

        @Override
        public void taskEnd(int stageId, long taskId) {

        }

        @Override
        public void applicationEnd() {

        }

        @Override
        public void cancelAllJobs() {

        }

        @Override
        public void taskCancelled(int stageId, long taskId) {

        }

        @Override
        public void afterDisplay(Message message) {

        }
      };
    }
  }

  class KernelFunctionalityMock extends KernelFunctionalityEmptyMock {

    TryResult.CellResult result = TryResult.createResult(new SparkSession.Builder());

    @Override
    public TryResult executeCode(String code, SimpleEvaluationObject seo) {
      return result;
    }
  }
}