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

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.evaluator.EvaluatorTest;
import com.twosigma.beakerx.kernel.Code;
import com.twosigma.beakerx.kernel.PythonMagicManager;
import com.twosigma.beakerx.message.Message;
import org.junit.After;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;

import static com.twosigma.beakerx.kernel.magic.command.functionality.PythonMagicCommand.PYTHON;
import static org.assertj.core.api.Assertions.assertThat;

@Ignore
public class PythonMagicCommandTest {

    private KernelTest kernel;
    private EvaluatorTest evaluator;
    private static String PYTHON_CODE = "%%python" + System.lineSeparator() + "print('Test')";
    private static String PYTHON_CODE_INDENTS = "%%python" + System.lineSeparator()
            + "def foo():" + System.lineSeparator()
            + "\tprint('Test2')" + System.lineSeparator() + System.lineSeparator()
            + "foo()";

    @Before
    public void setUp() throws Exception {
        this.evaluator = new EvaluatorTest();
        this.kernel = new KernelTest("id", evaluator);
    }

    @After
    public void tearDown() throws Exception {
        kernel.exit();
    }

    @Test
    public void testPythonMagicCell() throws Exception {
        //given
        String pythonCode = PYTHON_CODE;
        Code code = CodeFactory.create(PYTHON + System.lineSeparator() + pythonCode, new Message(), kernel);
        //when
        code.execute(this.kernel, 1);
        //then
        assertThat(kernel.getPublishedMessages().get(2).getContent().get("text")).isEqualTo("Test\n");
    }

    @Test
    public void testPythonCodeWithIndents() throws Exception {
        //given
        String pythonCodeWIndents = PYTHON_CODE_INDENTS;
        Code code = CodeFactory.create(PYTHON + System.lineSeparator() + pythonCodeWIndents, new Message(), kernel);
        //when
        code.execute(this.kernel, 1);
        //then
        assertThat(kernel.getPublishedMessages().get(2).getContent().get("text")).isEqualTo("Test2\n");
    }

}