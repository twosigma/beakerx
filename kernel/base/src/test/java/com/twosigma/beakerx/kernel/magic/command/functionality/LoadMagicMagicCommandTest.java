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

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.evaluator.EvaluatorTest;
import com.twosigma.beakerx.kernel.Code;
import com.twosigma.beakerx.kernel.magic.command.CodeFactory;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandResult;
import com.twosigma.beakerx.message.Message;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static com.twosigma.beakerx.kernel.handler.MagicCommandExecutor.executeMagicCommands;
import static com.twosigma.beakerx.kernel.magic.command.functionality.ClasspathAddJarMagicCommand.CLASSPATH_ADD_JAR;
import static com.twosigma.beakerx.kernel.magic.command.functionality.LoadMagicMagicCommand.LOAD_MAGIC;

public class LoadMagicMagicCommandTest {

//  private KernelTest kernel;
//  private EvaluatorTest evaluator;
//
//  @Before
//  public void setUp() throws Exception {
//    this.evaluator = new EvaluatorTest();
//    this.kernel = new KernelTest("idLoadMagicMagicCommandTest", evaluator);
//  }
//
//  @After
//  public void tearDown() throws Exception {
//    kernel.exit();
//  }
//
//
//  @Test
//  public void loadMagicCommand() throws Exception {
//    //given
//    addJarWithCustomMagicCommand();
//    //when
//    loadMagicCommandByClass();
//    //then
//    //verifyLoadedMagicCommand();
//  }
//
//  private void loadMagicCommandByClass() {
//    String allCode = LOAD_MAGIC + "   com.twosigma.beakerx.custom.magic.command.ShowEvnsCustomMagicCommand";
//
//    Code code = CodeFactory.create(allCode, new Message(), 2, kernel);
//    //when
//    MagicCommandResult result = executeMagicCommands(code, 2, kernel);
//  }
//
//  private void addJarWithCustomMagicCommand() {
//    String allCode = CLASSPATH_ADD_JAR + " " + "../demoProjects/loadMagicJarDemo/build/libs/loadMagicJarDemo.jar";
//
//    Code code = CodeFactory.create(allCode, new Message(), 1, kernel);
//    //when
//    MagicCommandResult result = executeMagicCommands(code, 1, kernel);
//  }
}