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
package com.twosigma.beakerx;

import com.twosigma.beakerx.autocomplete.MagicCommandAutocompletePatterns;
import com.twosigma.beakerx.evaluator.MagicCommandAutocompletePatternsMock;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandConfiguration;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandType;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandWhichThrowsException;
import com.twosigma.beakerx.kernel.magic.command.MavenJarResolver;
import com.twosigma.beakerx.kernel.magic.command.functionality.AddImportMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.AddStaticImportMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.AsyncMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.BashMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.ClassPathAddMvnCellMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.ClasspathAddDynamicMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.ClasspathAddJarMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.ClasspathAddMvnMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.ClasspathAddRepoMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.ClasspathResetMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.ClasspathShowMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.FileService;
import com.twosigma.beakerx.kernel.magic.command.functionality.HtmlAliasMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.HtmlMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.JSMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.JavaScriptMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.LoadMagicMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.LsMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.TimeCellModeMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.TimeItCellModeMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.TimeItLineModeMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.TimeLineModeMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.UnImportMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.kernelMagic.ClojureMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.kernelMagic.GroovyMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.kernelMagic.JavaMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.kernelMagic.KernelMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.kernelMagic.KotlinMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.kernelMagic.PythonMagicCommand;
import com.twosigma.beakerx.kernel.magic.command.functionality.kernelMagic.ScalaMagicCommand;
import org.assertj.core.util.Lists;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.twosigma.beakerx.kernel.magic.command.ClasspathAddMvnDepsMagicCommandTest.TEST_MVN_CACHE;

public class MagicCommandConfigurationMock implements MagicCommandConfiguration {

  private FileServiceMock fileService;

  public MagicCommandConfigurationMock() {
    this.fileService = new FileServiceMock();
  }

  @Override
  public List<MagicCommandType> createDefaults(KernelFunctionality kernel) {
    MavenJarResolver.ResolverParams mavenResolverParam = mavenResolverParam(kernel);

    List<MagicCommandType> magicCommandTypes = new ArrayList<>();
    magicCommandTypes.addAll(Lists.newArrayList(
            new MagicCommandType(JavaScriptMagicCommand.JAVASCRIPT, "", new JavaScriptMagicCommand()),
            new MagicCommandType(JSMagicCommand.JAVASCRIPT, "", new JSMagicCommand()),
            new MagicCommandType(HtmlMagicCommand.HTML, "", new HtmlMagicCommand()),
            new MagicCommandType(HtmlAliasMagicCommand.HTML, "", new HtmlAliasMagicCommand()),
            new MagicCommandType(BashMagicCommand.BASH, "", new BashMagicCommand()),
            new MagicCommandType(LsMagicCommand.LSMAGIC, "", new LsMagicCommand(magicCommandTypes)),
            new MagicCommandType(ClasspathAddRepoMagicCommand.CLASSPATH_CONFIG_RESOLVER, "repoName repoURL", new ClasspathAddRepoMagicCommand(kernel)),
            new MagicCommandType(ClasspathAddJarMagicCommand.CLASSPATH_ADD_JAR, "<jar path>", new ClasspathAddJarMagicCommand(kernel)),
            new MagicCommandType(ClasspathAddMvnMagicCommand.CLASSPATH_ADD_MVN, "<group name version>",
                    new ClasspathAddMvnMagicCommand(mavenResolverParam, kernel)),
            new MagicCommandType(ClassPathAddMvnCellMagicCommand.CLASSPATH_ADD_MVN_CELL, "<group name version>",
                    new ClassPathAddMvnCellMagicCommand(mavenResolverParam, kernel)),
            addClasspathReset(kernel, fileService),
            addDynamic(kernel),
            addMagicCommandWhichThrowsException(),
            new MagicCommandType(ClasspathShowMagicCommand.CLASSPATH_SHOW, "", new ClasspathShowMagicCommand(kernel)),
            new MagicCommandType(AddStaticImportMagicCommand.ADD_STATIC_IMPORT, "<classpath>", new AddStaticImportMagicCommand(kernel)),
            new MagicCommandType(AddImportMagicCommand.IMPORT, "<classpath>", new AddImportMagicCommand(kernel)),
            new MagicCommandType(UnImportMagicCommand.UNIMPORT, "<classpath>", new UnImportMagicCommand(kernel)),
            new MagicCommandType(TimeLineModeMagicCommand.TIME_LINE, "", new TimeLineModeMagicCommand(kernel)),
            new MagicCommandType(TimeCellModeMagicCommand.TIME_CELL, "", new TimeCellModeMagicCommand(kernel)),
            new MagicCommandType(TimeItLineModeMagicCommand.TIMEIT_LINE, "", new TimeItLineModeMagicCommand(kernel)),
            new MagicCommandType(TimeItCellModeMagicCommand.TIMEIT_CELL, "", new TimeItCellModeMagicCommand(kernel)),
            new MagicCommandType(LoadMagicMagicCommand.LOAD_MAGIC, "", new LoadMagicMagicCommand(kernel)),
            new MagicCommandType(KernelMagicCommand.KERNEL, "", new KernelMagicCommand(kernel)),
            new MagicCommandType(PythonMagicCommand.PYTHON, "", new PythonMagicCommand(kernel)),
            new MagicCommandType(ScalaMagicCommand.SCALA, "", new ScalaMagicCommand(kernel)),
            new MagicCommandType(KotlinMagicCommand.KOTLIN, "", new KotlinMagicCommand(kernel)),
            new MagicCommandType(JavaMagicCommand.JAVA, "", new JavaMagicCommand(kernel)),
            new MagicCommandType(GroovyMagicCommand.GROOVY, "", new GroovyMagicCommand(kernel)),
            new MagicCommandType(ClojureMagicCommand.CLOJURE, "", new ClojureMagicCommand(kernel)),
            async(kernel)
    ));
    return magicCommandTypes;
  }

  public MagicCommandType async(KernelFunctionality kernel) {
    return new MagicCommandType(AsyncMagicCommand.ASYNC, "", new AsyncMagicCommand(kernel));
  }

  private static MagicCommandType addClasspathReset(KernelFunctionality kernel, FileService fileService) {
    return new MagicCommandType(ClasspathResetMagicCommand.CLASSPATH_RESET, "", new ClasspathResetMagicCommand(kernel, fileService));
  }

  private static MagicCommandType addDynamic(KernelFunctionality kernel) {
    return new MagicCommandType(ClasspathAddDynamicMagicCommand.CLASSPATH_ADD_DYNAMIC, "", new ClasspathAddDynamicMagicCommand(kernel));
  }

  private static MagicCommandType addMagicCommandWhichThrowsException() {
    return new MagicCommandType(MagicCommandWhichThrowsException.MAGIC_COMMAND_WHICH_THROWS_EXCEPTION, "", new MagicCommandWhichThrowsException());
  }


  public MavenJarResolver.ResolverParams mavenResolverParam(KernelFunctionality kernel) {
    return new MavenJarResolver.ResolverParams(
            new File(TEST_MVN_CACHE).getAbsolutePath(),
            kernel.getTempFolder().toString() + MavenJarResolver.MVN_DIR,
            true);
  }


  public FileServiceMock getFileService() {
    return fileService;
  }

  @Override
  public MagicCommandAutocompletePatterns patterns() {
    return new MagicCommandAutocompletePatternsMock();
  }

  @Override
  public ClasspathAddMvnMagicCommand getClasspathAddMvnMagicCommand(KernelFunctionality kernel) {
    Optional<MagicCommandType> first = kernel.getMagicCommandTypes().stream()
            .filter(x -> x.getCommand().equals(ClasspathAddMvnMagicCommand.CLASSPATH_ADD_MVN))
            .findFirst();
    return (ClasspathAddMvnMagicCommand) first.get().getMagicCommandFunctionality();
  }

  public ClasspathResetMagicCommand getClasspathResetMagicCommand(KernelFunctionality kernel) {
    Optional<MagicCommandType> first = kernel.getMagicCommandTypes().stream()
            .filter(x -> x.getCommand().equals(ClasspathResetMagicCommand.CLASSPATH_RESET))
            .findFirst();
    return (ClasspathResetMagicCommand) first.get().getMagicCommandFunctionality();
  }
}
