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

import com.twosigma.beakerx.CommMock;
import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.kernel.msg.JupyterMessages;
import com.twosigma.beakerx.message.Header;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.scala.kernel.ScalaKernelMock;
import com.twosigma.beakerx.scala.magic.command.SparkUiDefaultsImplMock;
import org.jetbrains.annotations.NotNull;
import org.junit.Before;
import org.junit.Test;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.twosigma.beakerx.widget.SparkEngineWithUIMock.APP_ID_LOCAL_1;
import static com.twosigma.beakerx.widget.SparkEngineWithUIMock.SPARK_UI_WEB_URL_1;
import static com.twosigma.beakerx.widget.SparkUI.SPARK_APP_ID;
import static com.twosigma.beakerx.widget.SparkUI.SPARK_UI_WEB_URL;
import static com.twosigma.beakerx.widget.SparkUiDefaults.CURRENT_PROFILE;
import static com.twosigma.beakerx.widget.SparkUiDefaults.SPARK_PROFILES;
import static org.assertj.core.api.Assertions.assertThat;

public class SparkUITest {

  SparkEngineWithUIMock sparkEngineWithUIMock;
  SparkUiDefaultsImplMock sparkUiDefaults;
  SingleSparkSessionMock singleSparkSessionMock;
  CommMock commMock;
  KernelTest kernel;

  @Before
  public void setUp() throws Exception {
    sparkEngineWithUIMock = new SparkEngineWithUIMock();
    sparkUiDefaults = new SparkUiDefaultsImplMock();
    singleSparkSessionMock = new SingleSparkSessionMock();
    kernel = new ScalaKernelMock();
    commMock = new CommMock("id1", JupyterMessages.COMM_MSG.getName(), kernel);
  }

  @Test
  public void testShouldLoadProfilesOnWidgetCreation() {
    //given
    //when
    new SparkUI(commMock, sparkEngineWithUIMock, sparkUiDefaults, singleSparkSessionMock, kernel);
    //then
    Message sparkUiFormOpenMessage = kernel.getPublishedMessages().get(1);
    Map state = TestWidgetUtils.getState(sparkUiFormOpenMessage);
    List profiles = (List) state.get(SPARK_PROFILES);
    assertThat(profiles).isEqualTo(new ArrayList<>());
    String currentProfile = (String) state.get(CURRENT_PROFILE);
    assertThat(currentProfile).isEqualTo("default");
  }

  @Test
  public void testShouldSaveProfiles() {
    //given
    new SparkUI(commMock, sparkEngineWithUIMock, sparkUiDefaults, singleSparkSessionMock, kernel);
    kernel.clearMessages();
    HashMap<String, Serializable> profiles = new HashMap<String, Serializable>() {
      {
        put("event", "save_profiles");
        put("payload", new ArrayList<Map<String, Serializable>>() {
          {
            add(new HashMap<String, Serializable>() {
              {
                put("spark.executor.memory", "8g");
                put("name", "new_prof_1");
                put("spark.executor.cores", "10");
                put("properties", new ArrayList<Map<String, Serializable>>() {
                  {
                    add(new HashMap<String, Serializable>() {
                      {
                        put("name", "wwww");
                        put("value", "wwwwww");
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
    };
    Message message = saveProfilesMsg(profiles);
    //when
    commMock.handleMsg(message);
    //then
    assertThat(kernel.getPublishedMessages().size()).isEqualTo(1);
    Message profilesDoneMsg = kernel.getPublishedMessages().get(0);
    Map data = TestWidgetUtils.getData(profilesDoneMsg);
    Map event = (Map) data.get("event");
    assertThat(event.get("save_profiles")).isEqualTo("done");
  }

  @Test
  public void testShouldSendDoneMessageWhenSparkContextStops() {
    new SparkUI(commMock, sparkEngineWithUIMock, sparkUiDefaults, singleSparkSessionMock, kernel);
    kernel.clearMessages();
    HashMap<String, Serializable> stop = new HashMap<String, Serializable>() {
      {
        put("event", "stop");
        put("payload", new HashMap<String, Serializable>());
      }
    };
    //when
    commMock.handleMsg(commMsg(stop));
    //then
    assertThat(kernel.getPublishedMessages().size()).isEqualTo(1);
    Message doneMsg = kernel.getPublishedMessages().get(0);
    Map data = TestWidgetUtils.getData(doneMsg);
    Map event = (Map) data.get("event");
    assertThat(event.get("stop")).isEqualTo("done");
  }

  @Test
  public void testShouldSendDoneMessageWhenSparkContextStarts() {
    //given
    new SparkUI(commMock, sparkEngineWithUIMock, sparkUiDefaults, singleSparkSessionMock, kernel);
    kernel.clearMessages();
    HashMap<String, Serializable> start = startContent();

    //when
    commMock.handleMsg(commMsg(start));
    //then
    assertThat(kernel.getPublishedMessages().size()).isEqualTo(1);
    Message doneMsg = kernel.getPublishedMessages().get(0);
    Map data = TestWidgetUtils.getData(doneMsg);
    Map event = (Map) data.get("event");
    assertThat(event.get("start")).isEqualTo("done");
    assertThat(event.get(SPARK_APP_ID)).isEqualTo(APP_ID_LOCAL_1);
    assertThat(event.get(SPARK_UI_WEB_URL)).isEqualTo(SPARK_UI_WEB_URL_1);
  }

  @Test
  public void shouldSaveCurrentProfileWhenSparkContextStarts() {
    //given
    new SparkUI(commMock, sparkEngineWithUIMock, sparkUiDefaults, singleSparkSessionMock, kernel);
    kernel.clearMessages();
    //when
    commMock.handleMsg(commMsg(startContent()));
    //then
    assertThat(sparkUiDefaults.getCurrentProfileName()).isEqualTo("profile1");
  }

  @NotNull
  public static HashMap<String, Serializable> startContent() {
    return new HashMap<String, Serializable>() {
      {
        put("event", "start");
        put("payload", new HashMap<String, Serializable>() {
          {
            put("current_profile", "profile1");
            put("spark_options", new HashMap<String, Serializable>() {
              {
                put("spark.executor.memory", "8g");
                put("name", "new_prof_1");
                put("spark.executor.cores", "10");
                put("properties", new ArrayList<Map<String, Serializable>>() {
                  {
                    add(new HashMap<String, Serializable>() {
                      {
                        put("name", "wwww");
                        put("value", "wwwwww");
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
    };
  }

  @NotNull
  public static Message commMsg(HashMap<String, Serializable> content) {
    HashMap<String, Serializable> dataContent = new HashMap<String, Serializable>() {
      {
        put("content", content);
      }
    };
    HashMap<String, Serializable> data = new HashMap<String, Serializable>() {
      {
        put("data", dataContent);
      }
    };
    Message message = new Message(new Header(JupyterMessages.COMM_MSG, "s1"));
    message.setContent(data);
    return message;
  }

  @NotNull
  private Message saveProfilesMsg(HashMap<String, Serializable> profiles) {
    HashMap<String, Serializable> dataContent = new HashMap<String, Serializable>() {
      {
        put("content", profiles);
      }
    };
    HashMap<String, Serializable> content = new HashMap<String, Serializable>() {
      {
        put("data", dataContent);
      }
    };
    Message message = new Message(new Header(JupyterMessages.COMM_OPEN, "s1"));
    message.setContent(content);
    return message;
  }
}