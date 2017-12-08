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
package com.twosigma.beakerx.kernel.magic.command.functionality;

import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandExecutionParam;
import com.twosigma.beakerx.kernel.magic.command.MavenJarResolver;
import com.twosigma.beakerx.kernel.magic.command.MavenJarResolver.AddMvnCommandResult;
import com.twosigma.beakerx.kernel.magic.command.PomFactory;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutcomeItem;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutput;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.widgets.strings.Label;
import com.twosigma.beakerx.widgets.strings.StringWidget;

import java.math.BigDecimal;
import java.util.Collection;
import java.util.Timer;
import java.util.TimerTask;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static com.twosigma.beakerx.kernel.magic.command.functionality.MagicCommandUtils.splitPath;

public class ClasspathAddMvnMagicCommand extends ClasspathMagicCommand {

  public static final String ADD = "add";
  public static final String MVN = "mvn";
  public static final String CLASSPATH_ADD_MVN = CLASSPATH + " " + ADD + " " + MVN;
  public static final String ADD_MVN_FORMAT_ERROR_MESSAGE = "Wrong command format, should be " + CLASSPATH_ADD_MVN + " group name version or " + CLASSPATH_ADD_MVN + " group:name:version";

  private MavenJarResolver.ResolverParams commandParams;
  private PomFactory pomFactory;

  public ClasspathAddMvnMagicCommand(MavenJarResolver.ResolverParams commandParams, KernelFunctionality kernel) {
    super(kernel);
    this.commandParams = commandParams;
    this.pomFactory = new PomFactory();
  }

  @Override
  public String getMagicCommandName() {
    return CLASSPATH_ADD_MVN;
  }

  @Override
  public boolean matchCommand(String command) {
    String[] commandParts = MagicCommandUtils.splitPath(command);
    return commandParts.length > 3 && commandParts[0].equals(CLASSPATH) && commandParts[1].equals(ADD) && commandParts[2].equals(MVN);
  }

  @Override
  public MagicCommandOutcomeItem execute(MagicCommandExecutionParam param) {
    String command = param.getCommand();
    String[] split = splitPath(command);
    if (split.length != 6 && split.length != 4) {
      return new MagicCommandOutput(MagicCommandOutput.Status.ERROR, ADD_MVN_FORMAT_ERROR_MESSAGE);
    }

    commandParams.setRepos(kernel.getRepos().get());
    MavenJarResolver classpathAddMvnCommand = new MavenJarResolver(commandParams, pomFactory);
    MvnLoggerWidget progress = new MvnLoggerWidget(param.getCode().getMessage());
    AddMvnCommandResult result;
    if (split.length == 4) {
      String[] valuesFromGradlePattern = split[3].split(":");
      if (valuesFromGradlePattern.length != 3) {
        return new MagicCommandOutput(MagicCommandOutput.Status.ERROR, ADD_MVN_FORMAT_ERROR_MESSAGE);
      }
      result = retrieve(valuesFromGradlePattern[0], valuesFromGradlePattern[1], valuesFromGradlePattern[2], classpathAddMvnCommand, progress);
    } else {
      result = retrieve(split[3], split[4], split[5], classpathAddMvnCommand, progress);
    }

    if (result.isJarRetrieved()) {
      Collection<String> newAddedJars = addJars(classpathAddMvnCommand.getPathToMavenRepo() + "/*");
      if (newAddedJars.isEmpty()) {
        return new MagicCommandOutput(MagicCommandOutput.Status.OK);
      }
      String textMessage = "Added jar" + (newAddedJars.size() > 1 ? "s: " : ": ") + newAddedJars + "\n";
      return new MagicCommandOutput(MagicCommandOutput.Status.OK, textMessage);
    }
    return new MagicCommandOutput(MagicCommandOutput.Status.ERROR, result.getErrorMessage());
  }

  private AddMvnCommandResult retrieve(String groupId, String artifactId, String version, MavenJarResolver classpathAddMvnCommand, MvnLoggerWidget progress) {
    return classpathAddMvnCommand.retrieve(groupId, artifactId, version, progress);
  }

  public class MvnLoggerWidget {

    //20 jars, 100MB downloaded at 100MB/s

    private StringWidget widget;
    private Timer timer;
    private volatile int jarNumbers = 0;
    private volatile int size;
    private volatile String speed;
    private volatile String currentLine;

    public MvnLoggerWidget(Message parentMessage) {
      this.widget = new Label(parentMessage);
      this.timer = new Timer();
      this.timer.scheduleAtFixedRate(new TimerTask() {
        @Override
        public void run() {
          if (jarNumbers > 0) {
            String status = String.format("%d jars, %dKB downloaded at %s", jarNumbers, size, speed);
            widget.setValue(status);
          }
        }
      }, 0, 250);
    }

    public void sendLog(String line) {
      if (line != null && !line.trim().isEmpty() && line.matches("Downloaded.+")) {
        this.currentLine = line;
        if (line.matches(".+jar.+")) {
          this.jarNumbers++;
          String[] info = split(line);
          if (info.length == 5) {
            this.size += calculateJarSize(info);
            this.speed = calculateSpeed(info);
          }
        }
      }
    }

    private String calculateSpeed(String[] info) {
      return info[3] + info[4];
    }

    private String[] split(String line) {
      Pattern pattern = Pattern.compile("\\((.*?)\\)");
      Matcher matcher = pattern.matcher(line);
      if (matcher.find()) {
        String infoWithBrackets = matcher.group();
        return infoWithBrackets.replace("(", "").
                replace(")", "").
                split(" ");

      }
      return new String[0];
    }

    private int calculateJarSize(String[] info) {
      String unit = info[1];
      if (unit.toLowerCase().equals("kb")) {
        return Integer.parseInt(info[0]);
      } else if (unit.toLowerCase().equals("mb")) {
        return new BigDecimal(info[0]).multiply(new BigDecimal("1000")).intValue();
      } else {
        return 0;
      }
    }

    public void display() {
      this.widget.display();
    }

    public void close() {
      this.timer.cancel();
      this.widget.close();
    }
  }

}
