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
import com.twosigma.beakerx.widget.Button;
import com.twosigma.beakerx.widget.SparkEngineNoUI;
import com.twosigma.beakerx.widget.SparkEngineNoUIImpl;
import com.twosigma.beakerx.widget.SparkEngineWithUI;
import com.twosigma.beakerx.widget.SparkUI;
import com.twosigma.beakerx.widget.SparkUIApi;
import com.twosigma.beakerx.widget.SparkUiDefaults;
import com.twosigma.beakerx.widget.Text;
import com.twosigma.beakerx.widget.configuration.SparkConfiguration;
import org.apache.spark.sql.SparkSession;
import org.jetbrains.annotations.NotNull;
import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.twosigma.beakerx.MessageFactorTest.commMsg;
import static org.assertj.core.api.Assertions.assertThat;

public class SparkFactoryWithUIImplTest {

  private SparkFactoryImpl sparkFactory;
  private SparkEngineNoUIFactoryMock sparkEngineNoUIFactory;
  private KernelFunctionalityMock kernel;
  private SparkUiDefaultsImplMock sparkUiDefaults;

  @Before
  public void setUp() throws Exception {
    kernel = new KernelFunctionalityMock();
    sparkEngineNoUIFactory = new SparkEngineNoUIFactoryMock();
    sparkUiDefaults = new SparkUiDefaultsImplMock();
    sparkFactory = new SparkFactoryImpl(kernel, sparkEngineNoUIFactory, new SparkUIFactoryMock(), sparkUiDefaults);
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

  public static class SparkUiDefaultsImplMock implements SparkUiDefaults {

    public boolean saved = false;
    public boolean loaded = false;

    @Override
    public void saveSparkConf(List<Map<String, Object>> sparkConf) {
      saved = true;
    }

    @Override
    public void loadDefaults() {
      loaded = true;
    }

    @Override
    public List<Map<String, Object>> getProfiles() {
      return null;
    }

    @Override
    public Map<String, Object> getProfileByName(String name) {
      return null;
    }

    @Override
    public void removeSparkConf(String profileName) {

    }

    @Override
    public void loadProfiles() {

    }

    @Override
    public void saveProfile(Map<String, Object> profile) {

    }

    @Override
    public List<String> getProfileNames() {
      return null;
    }

    @Override
    public void saveProfileName(String profileName) {

    }

    @Override
    public String getCurrentProfileName() {
      return null;
    }

    @Override
    public boolean containsKey(String key) {
      return false;
    }

    @Override
    public Object get(String key) {
      return null;
    }

    @Override
    public Map<String, String> getProperties() {
      return new HashMap<>();
    }
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
    public SparkEngineNoUI create(SparkSession.Builder sparkSessionBuilder) {
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

  class SparkUIFactoryMock implements SparkUI.SparkUIFactory {

    @Override
    public SparkUIApi create(SparkSession.Builder builder, SparkEngineWithUI sparkEngineWithUI, SparkUiDefaults sparkUiDefaults) {
      return new SparkUIApi() {
        @Override
        public List<SparkConfiguration.Configuration> getAdvancedOptions() {
          return null;
        }

        @Override
        public Text getMasterURL() {
          return null;
        }

        @Override
        public boolean getHiveSupport() {
          return false;
        }

        @Override
        public Text getExecutorMemory() {
          return null;
        }

        @Override
        public Text getExecutorCores() {
          return null;
        }

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
        public void startSpinner(Message message) {

        }

        @Override
        public void stopSpinner() {

        }

        @Override
        public void taskCancelled(int stageId, long taskId) {

        }

        @Override
        public Button getConnectButton() {
          return null;
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