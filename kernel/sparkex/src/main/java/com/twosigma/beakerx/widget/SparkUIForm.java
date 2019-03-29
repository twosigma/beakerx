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

import com.twosigma.beakerx.kernel.msg.StacktraceHtmlPrinter;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.widget.configuration.SparkConfiguration;
import org.apache.spark.SparkConf;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.twosigma.beakerx.widget.SparkUI.SPARK_EXECUTOR_CORES;
import static com.twosigma.beakerx.widget.SparkUI.SPARK_EXECUTOR_MEMORY;
import static com.twosigma.beakerx.widget.SparkUI.SPARK_MASTER;
import static com.twosigma.beakerx.widget.SparkUI.SPARK_MASTER_DEFAULT;
import static com.twosigma.beakerx.widget.SparkUiDefaults.DEFAULT_PROFILE;
import static java.util.Arrays.asList;

public class SparkUIForm extends VBox {

  static final String CONNECT = "Start";
  static final String PROFILE_DESC = "Profile";
  private static final String OK_BUTTON_DESC = "Create";
  private static final String CANCEL_BUTTON_DESC = "Cancel";
  private static final String PROFILE_NAME_PLC_HOLD = "Enter profile name...";
  private static final String NEW_PROFILE_DESC = "New profile";
  private static final String SAVE_PROFILE_TOOLTIP = "Save profile";
  private static final String NEW_PROFILE_TOOLTIP = "Create new profile";
  private static final String REMOVE_PROFILE_TOOLTIP = "Delete this profile";

  private HBox errors;
  private HBox profileManagement;
  private Dropdown profile;
  private Text newProfileName;
  private Text masterURL;
  private Text executorMemory;
  private Text executorCores;
  private HiveSupport hiveSupport;
  private SparkConfiguration advancedOption;
  private SparkEngine sparkEngine;
  private SparkUI.OnSparkButtonAction onStartAction;
  private Button connectButton;
  private Button removeButton;
  private Spinner spinner;
  private HBox spinnerPanel;
  private SparkUiDefaults sparkUiDefaults;
  private HBox profileModal;

  public SparkUIForm(SparkEngine sparkEngine, SparkUiDefaults sparkUiDefaults, SparkUI.OnSparkButtonAction onStartAction) {
    super(new ArrayList<>());
    this.sparkEngine = sparkEngine;
    this.onStartAction = onStartAction;
    this.sparkUiDefaults = sparkUiDefaults;
    createSparkView();
  }

  private void createSparkView() {
    try {
      this.profileModal = createProfileModal();
      this.profileManagement = createProfileManagement();
      this.masterURL = createMasterURL(this.sparkUiDefaults);
      this.executorMemory = createExecutorMemory(this.sparkUiDefaults);
      this.executorCores = createExecutorCores(this.sparkUiDefaults);
      this.hiveSupport = createHiveSupport();
      this.errors = new HBox(new ArrayList<>());
      this.errors.setDomClasses(asList("bx-spark-connect-error"));
      this.addConnectButton(createConnectButton(), this.errors);
      this.add(profileModal);
      this.add(profileManagement);
      this.add(masterURL);
      this.add(executorCores);
      this.add(executorMemory);
      this.add(hiveSupport);
      this.advancedOption = new SparkConfiguration(
              sparkEngine.getAdvanceSettings(this.sparkUiDefaults),
              sparkEngine.sparkVersion(),
              hiveSupport);
      this.add(advancedOption);
    } catch (Exception ex) {
      sendError(StacktraceHtmlPrinter.printRedBold(ex.getMessage()));
    }
  }

  private HiveSupport createHiveSupport() {
    HiveSupport hiveSupport = new HiveSupport("Enable Hive Support");
    hiveSupport.setDomClasses(new ArrayList<>(asList("bx-spark-hive-support")));
    return hiveSupport;
  }

  private HBox createProfileModal() {
    newProfileName = new Text();
    newProfileName.setPlaceholder(PROFILE_NAME_PLC_HOLD);
    newProfileName.setDescription(NEW_PROFILE_DESC);
    newProfileName.setDomClasses(asList("bx-spark-config"));

    Button okButton = new Button();
    okButton.setDescription(OK_BUTTON_DESC);
    okButton.registerOnClick(this::createProfileOK);
    okButton.setDomClasses(asList("bx-button", "bx-spark-save-button"));
    okButton.setTooltip(NEW_PROFILE_TOOLTIP);

    Button cancelButton = new Button();
    cancelButton.setDescription(CANCEL_BUTTON_DESC);
    cancelButton.registerOnClick(this::createProfileCancel);
    cancelButton.setDomClasses(asList("bx-button", "bx-spark-save-button"));

    HBox modal = new HBox(asList(newProfileName, okButton, cancelButton));
    modal.setDomClasses(asList("hidden"));
    return modal;
  }

  private HBox createProfileManagement() {
    Dropdown profileDropdown = new Dropdown();
    profileDropdown.setOptions(this.sparkUiDefaults.getProfileNames());
    profileDropdown.setValue(this.sparkUiDefaults.getCurrentProfileName());
    profileDropdown.setDescription(PROFILE_DESC);
    profileDropdown.register(this::loadProfile);
    profileDropdown.setDomClasses(asList("bx-spark-config", "bx-spark-profile"));
    this.profile = profileDropdown;

    Button saveButton = new Button();
    saveButton.setDescription("Save");
    saveButton.registerOnClick((content, message) -> saveProfile());
    saveButton.setDomClasses(asList("bx-button", "bx-spark-save-button"));
    saveButton.setTooltip(SAVE_PROFILE_TOOLTIP);

    Button newButton = new Button();
    newButton.registerOnClick((content, message) -> newProfile());
    newButton.setDomClasses(asList("bx-button", "icon-add"));
    newButton.setTooltip(NEW_PROFILE_TOOLTIP);

    removeButton = new Button();
    removeButton.registerOnClick((content, message) -> removeProfile());
    removeButton.setDomClasses(asList("bx-button", "icon-close"));
    removeButton.setTooltip(REMOVE_PROFILE_TOOLTIP);

    refreshElementsAvailability();

    return new HBox(Arrays.asList(profileDropdown, saveButton, newButton, removeButton));
  }

  private void loadProfile() {
    String profileName = this.profile.getValue();
    if (!this.sparkUiDefaults.getProfileNames().contains(profileName)) {
      return;
    }
    sparkUiDefaults.loadProfiles();
    Map<String, Object> profileData = sparkUiDefaults.getProfileByName(profileName);
    if (profileData.size() > 0) {
      this.masterURL.setValue(profileData.getOrDefault(SparkUI.SPARK_MASTER, SparkUI.SPARK_MASTER_DEFAULT));
      this.executorCores.setValue(profileData.getOrDefault(SparkUI.SPARK_EXECUTOR_CORES, SparkUI.SPARK_EXECUTOR_CORES_DEFAULT));
      this.executorMemory.setValue(profileData.getOrDefault(SparkUI.SPARK_EXECUTOR_MEMORY, SparkUI.SPARK_EXECUTOR_MEMORY_DEFAULT));
      Map<String, String> advancedSettings = new HashMap<>();
      ((ArrayList<Map>) profileData.getOrDefault(SparkUI.SPARK_ADVANCED_OPTIONS, SparkUI.SPARK_ADVANCED_OPTIONS_DEFAULT))
              .stream()
              .forEach(x -> {
                advancedSettings.put(x.get("name").toString(), x.get("value").toString());
              });
      this.advancedOption.setConfiguration(advancedSettings);
    }
    refreshElementsAvailability();
  }

  private void saveProfile() {
    try {
      this.clearErrors();
      HashMap sparkProfile = getCurrentConfig();
      sparkProfile.put("name", profile.getValue());
      sparkUiDefaults.saveProfile(sparkProfile);
      profile.setOptions(sparkUiDefaults.getProfileNames());
      profile.setValue(sparkProfile.get("name"));
    } catch (Exception ex) {
      sendError(StacktraceHtmlPrinter.printRedBold(ex.getMessage()));
    }
  }

  private void newProfile() {
    profileManagement.setDomClasses(asList("hidden"));
    profileModal.setDomClasses(new ArrayList<>(0));
  }

  private void createProfileOK(HashMap hashMap, Message message) {
    profileModal.setDomClasses(asList("hidden"));
    profileManagement.setDomClasses(new ArrayList<>(0));
    profile.setValue(newProfileName.getValue());
    saveProfile();
    newProfileName.setValue("");
    refreshElementsAvailability();
  }

  private void createProfileCancel(HashMap hashMap, Message message) {
    profileModal.setDomClasses(asList("hidden"));
    profileManagement.setDomClasses(new ArrayList<>(0));
  }

  private HashMap<String, Object> getCurrentConfig() {
    HashMap<String, Object> sparkConfig = new HashMap<>();
    sparkConfig.put(SparkUI.SPARK_MASTER, getMasterURL().getValue());
    sparkConfig.put(SparkUI.SPARK_EXECUTOR_CORES, getExecutorCores().getValue());
    sparkConfig.put(SparkUI.SPARK_EXECUTOR_MEMORY, getExecutorMemory().getValue());
    sparkConfig.put(SparkUI.SPARK_ADVANCED_OPTIONS, getAdvancedOptions());
    return sparkConfig;
  }


  public void saveDefaults() {
    HashMap sparkProfile = getCurrentConfig();
    sparkProfile.put("name", DEFAULT_PROFILE);
    sparkUiDefaults.saveProfile(sparkProfile);
  }

  private void removeProfile() {
    if (profile.getValue().equals(DEFAULT_PROFILE)) {
      return;
    }
    sparkUiDefaults.removeSparkConf(profile.getValue());
    profile.setOptions(sparkUiDefaults.getProfileNames());
    profile.setValue(DEFAULT_PROFILE);
    loadProfile();
  }

  private void addConnectButton(Button connect, HBox errors) {
    this.connectButton = connect;
    this.spinnerPanel = new HBox();
    add(new HBox(asList(connectButton, spinnerPanel, errors)));
  }

  public void startSpinner(Message parentMessage) {
    this.spinner = new Spinner(parentMessage, "Connecting to " + masterURL.getValue());
    spinnerPanel.add(spinner, parentMessage);
  }

  public void stopSpinner() {
    spinnerPanel.remove(spinner);
  }

  private SparkConf getSparkConf() {
    return sparkEngine.getSparkConf();
  }

  private Text createMasterURL(SparkUiDefaults defaults) {
    Text masterURL = new Text();
    masterURL.setDescription("Master URL");
    masterURL.setDomClasses(new ArrayList<>(asList("bx-spark-config", "bx-spark-master-url")));
    if (getSparkConf().contains(SPARK_MASTER)) {
      masterURL.setValue(getSparkConf().get(SPARK_MASTER));
    } else if (this.sparkEngine.getSparkEngineConf().getMaster().isPresent()) {
      masterURL.setValue(this.sparkEngine.getSparkEngineConf().getMaster().get());
    } else if (defaults.containsKey(SPARK_MASTER)) {
      masterURL.setValue(defaults.get(SPARK_MASTER));
    } else {
      masterURL.setValue(SPARK_MASTER_DEFAULT);
    }
    return masterURL;
  }

  private Button createConnectButton() {
    Button connect = new Button();
    connect.setDescription(CONNECT);
    connect.setDomClasses(new ArrayList<>(asList("bx-spark-connect")));
    connect.registerOnClick((content, message) -> onStartAction.run(message));
    return connect;
  }

  private Text createExecutorMemory(SparkUiDefaults defaults) {
    Text memory = new Text();
    memory.setDescription("Executor Memory");
    memory.setDomClasses(new ArrayList<>(asList("bx-spark-config", "bx-spark-executor-memory")));
    if (getSparkConf().contains(SPARK_EXECUTOR_MEMORY)) {
      memory.setValue(getSparkConf().get(SPARK_EXECUTOR_MEMORY));
    } else if (this.sparkEngine.getSparkEngineConf().getExecutorMemory().isPresent()) {
      memory.setValue(this.sparkEngine.getSparkEngineConf().getExecutorMemory().get());
    } else if (defaults.containsKey(SPARK_EXECUTOR_MEMORY)) {
      memory.setValue(defaults.get(SPARK_EXECUTOR_MEMORY));
    } else {
      memory.setValue(SparkUI.SPARK_EXECUTOR_MEMORY_DEFAULT);
    }
    return memory;
  }

  private Text createExecutorCores(SparkUiDefaults defaults) {
    Text cores = new Text();
    cores.setDescription("Executor Cores");
    cores.setDomClasses(new ArrayList<>(asList("bx-spark-config", "bx-spark-executor-cores")));
    if (getSparkConf().contains(SPARK_EXECUTOR_CORES)) {
      cores.setValue(getSparkConf().get(SPARK_EXECUTOR_CORES));
    } else if (this.sparkEngine.getSparkEngineConf().getExecutorCores().isPresent()) {
      cores.setValue(this.sparkEngine.getSparkEngineConf().getExecutorCores().get());
    } else if (defaults.containsKey(SPARK_EXECUTOR_CORES)) {
      cores.setValue(defaults.get(SPARK_EXECUTOR_CORES));
    } else {
      cores.setValue(SparkUI.SPARK_EXECUTOR_CORES_DEFAULT);
    }
    return cores;
  }

  public Text getMasterURL() {
    return this.masterURL;
  }

  public Checkbox getHiveSupport() {
    return this.hiveSupport;
  }

  public Text getExecutorMemory() {
    return executorMemory;
  }

  public Text getExecutorCores() {
    return executorCores;
  }

  public List<SparkConfiguration.Configuration> getAdvancedOptions() {
    return this.advancedOption.getConfiguration();
  }

  public void sendError(String message) {
    clearErrors();
    BxHTML label = new BxHTML();
    label.setValue(message);
    this.errors.add(label);
  }

  public void clearErrors() {
    errors.removeAllChildren();
  }

  public Button getConnectButton() {
    return connectButton;
  }

  public String getProfileName() {
    return profile.getValue();
  }


  public void setAllToDisabled() {
    this.profileManagement.getChildren().stream().map(x -> (ValueWidget) x).forEach(x -> x.setDisabled(true));
    this.advancedOption.setDisabledToAll();
    this.connectButton.setDisabled(true);
    this.masterURL.setDisabled(true);
    this.executorMemory.setDisabled(true);
    this.executorCores.setDisabled(true);
    this.hiveSupport.setDisabled(true);
  }

  public void setAllToEnabled() {
    this.profileManagement.getChildren().stream().map(x -> (ValueWidget) x).forEach(x -> x.setDisabled(false));
    this.advancedOption.setEnabledToAll();
    this.connectButton.setDisabled(false);
    this.connectButton.setDomClasses(new ArrayList<>(asList("bx-spark-connect")));
    this.masterURL.setDisabled(false);
    this.executorMemory.setDisabled(false);
    this.executorCores.setDisabled(false);
    this.hiveSupport.setDisabled(false);
    refreshElementsAvailability();
  }

  public void refreshElementsAvailability() {
    removeButton.setDisabled(this.profile.getValue().equals(DEFAULT_PROFILE));
  }
}
