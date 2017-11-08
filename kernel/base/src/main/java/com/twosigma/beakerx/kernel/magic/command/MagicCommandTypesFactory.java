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
package com.twosigma.beakerx.kernel.magic.command;

import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.magic.command.functionality.AddImportMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.AddStaticImportMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.BashMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.ClasspathAddJarMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.ClasspathAddMvnMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.ClasspathRemoveMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.ClasspathShowMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.HtmlMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.JavaScriptMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.LsMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.TimeCellModeMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.TimeItCellModeMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.TimeItLineModeMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.TimeLineModeMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.UnImportMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.item.MagicCommandType;

import java.util.ArrayList;
import java.util.List;

import static com.google.common.collect.Lists.newArrayList;
import static com.twosigma.beakerx.kernel.magic.command.MavenJarResolver.MVN_DIR;

public class MagicCommandTypesFactory {

  public static List<MagicCommandType> createDefaults(KernelFunctionality kernel) {
    List<MagicCommandType> magicCommandTypes = new ArrayList<>();
    magicCommandTypes.addAll(
            newArrayList(
                    javascript(kernel),
                    html(kernel),
                    bash(kernel),
                    lsmagic(kernel, magicCommandTypes),
                    addJar(kernel),
                    addJarByMvn(kernel),
                    removeJar(kernel),
                    showClasspath(kernel),
                    addStaticImport(kernel),
                    addImport(kernel),
                    unimport(kernel),
                    timeLine(kernel),
                    timeCell(kernel),
                    timeItLine(kernel),
                    timeItCell(kernel)));
    return magicCommandTypes;
  }

  private static MagicCommandType timeItCell(KernelFunctionality kernel) {
    return new MagicCommandType(TimeItCellModeMagicCommand.TIMEIT_CELL, "", new TimeItCellModeMagicCommand(kernel));
  }

  private static MagicCommandType timeItLine(KernelFunctionality kernel) {
    return new MagicCommandType(TimeItLineModeMagicCommand.TIMEIT_LINE, "", new TimeItLineModeMagicCommand(kernel));
  }

  private static MagicCommandType timeCell(KernelFunctionality kernel) {
    return new MagicCommandType(TimeCellModeMagicCommand.TIME_CELL, "", new TimeCellModeMagicCommand(kernel));
  }

  private static MagicCommandType timeLine(KernelFunctionality kernel) {
    return new MagicCommandType(TimeLineModeMagicCommand.TIME_LINE, "", new TimeLineModeMagicCommand(kernel));
  }

  private static MagicCommandType unimport(KernelFunctionality kernel) {
    return new MagicCommandType(UnImportMagicCommand.UNIMPORT, "<classpath>", new UnImportMagicCommand(kernel));
  }

  private static MagicCommandType addImport(KernelFunctionality kernel) {
    return new MagicCommandType(AddImportMagicCommand.IMPORT, "<classpath>", new AddImportMagicCommand(kernel));
  }

  private static MagicCommandType addStaticImport(KernelFunctionality kernel) {
    return new MagicCommandType(AddStaticImportMagicCommand.ADD_STATIC_IMPORT, "<classpath>", new AddStaticImportMagicCommand(kernel));
  }

  private static MagicCommandType showClasspath(KernelFunctionality kernel) {
    return new MagicCommandType(ClasspathShowMagicCommand.CLASSPATH_SHOW, "", new ClasspathShowMagicCommand(kernel));
  }

  private static MagicCommandType removeJar(KernelFunctionality kernel) {
    return new MagicCommandType(ClasspathRemoveMagicCommand.CLASSPATH_REMOVE, "<jar path>", new ClasspathRemoveMagicCommand(kernel));
  }

  private static MagicCommandType addJarByMvn(KernelFunctionality kernel) {
    return new MagicCommandType(ClasspathAddMvnMagicCommand.CLASSPATH_ADD_MVN, "<group name version>",
            new ClasspathAddMvnMagicCommand(new MavenJarResolver.ResolverParams(
                    kernel.getTempFolder().toString() + "/../beakerIvyCache",
                    kernel.getTempFolder().toString() + MVN_DIR), kernel));
  }

  private static MagicCommandType addJar(KernelFunctionality kernel) {
    return new MagicCommandType(ClasspathAddJarMagicCommand.CLASSPATH_ADD_JAR, "<jar path>", new ClasspathAddJarMagicCommand(kernel));
  }

  private static MagicCommandType lsmagic(KernelFunctionality kernel, List<MagicCommandType> magicCommandTypes) {
    return new MagicCommandType(LsMagicCommand.LSMAGIC, "", new LsMagicCommand(magicCommandTypes, kernel));
  }

  private static MagicCommandType bash(KernelFunctionality kernel) {
    return new MagicCommandType(BashMagicCommand.BASH, "", new BashMagicCommand(kernel));
  }

  private static MagicCommandType html(KernelFunctionality kernel) {
    return new MagicCommandType(HtmlMagicCommand.HTML, "", new HtmlMagicCommand(kernel));
  }

  private static MagicCommandType javascript(KernelFunctionality kernel) {
    return new MagicCommandType(JavaScriptMagicCommand.JAVASCRIPT, "", new JavaScriptMagicCommand(kernel));
  }
}
