/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *import static org.assertj.core.api.Assertions.assertThat;
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

package com.twosigma.beakerx.groovy.inspect;

import com.twosigma.beakerx.evaluator.BaseEvaluator;
import com.twosigma.beakerx.groovy.TestGroovyEvaluator;
import com.twosigma.beakerx.groovy.kernel.GroovyKernelMock;
import com.twosigma.beakerx.inspect.InspectResult;
import com.twosigma.beakerx.kernel.KernelManager;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class GroovyInspectTest {

    private static BaseEvaluator groovyEvaluator;

    @BeforeClass
    public static void setUpClass() throws Exception {
        groovyEvaluator = TestGroovyEvaluator.groovyEvaluator();
        groovyEvaluator.getInspect().setInspectFileName("../beakerx_inspect_test.json");
    }

    @Before
    public void setUp() throws Exception {
        GroovyKernelMock kernel = new GroovyKernelMock("id", groovyEvaluator);
        KernelManager.register(kernel);
    }

    @After
    public void tearDown() throws Exception {
        KernelManager.register(null);
    }

    @AfterClass
    public static void tearDownClass() throws Exception {
        groovyEvaluator.exit();
    }

    //call inspect on code, "\0" in code defines caret position
    private InspectResult callInspectOnCaretPos(String code) {
        int carretPos = code.indexOf("\0");
        return groovyEvaluator.inspect(code.replace("\0", ""), carretPos);
    }

    @Test
    public void evaluateInspectFooWoBracketCaretAtEnd() throws Exception {
        //given
        String code = "import com.twosigma.beakerx.table.*\n" +
                "import com.twosigma.beakerx.table.format.TableDisplayStringFormat\n" +
                "\n" +
                "csv = new CsvPlotReader()\n" +
                "csv.re\0ad";
        String expected = "java.lang.String fileName\n";
        //when
        InspectResult result = callInspectOnCaretPos(code);
        //then
        assertThat(result.getFound()).isTrue();
        assertThat(result.getData().getTextplain()).isEqualTo(expected);
    }

    @Test
    public void evaluateInspectOnClassName() throws Exception {
        //given
        String code = "import com.twosigma.beakerx.table.*\n" +
                "import com.twosigma.beakerx.table.format.TableDisplayStringFormat\n" +
                "\n" +
                "csv = new CsvPlot\0Reader()";
        String expected = "com.twosigma.beakerx.fileloader.CsvPlotReader\n";
        //when
        InspectResult result = callInspectOnCaretPos(code);
        assertThat(result.getFound()).isTrue();
        assertThat(result.getData().getTextplain()).isEqualTo(expected);
    }

    @Test
    public void evaluateInspectFooWBracketCaretInBracket() throws Exception {
        //given
        String code = "import com.twosigma.beakerx.table.*\n" +
                "import com.twosigma.beakerx.table.format.TableDisplayStringFormat\n" +
                "\n" +
                "csv = new CsvPlotReader()\n" +
                "csv.read(\0)";
        String expected = "java.lang.String fileName\n";
        //when
        InspectResult result = callInspectOnCaretPos(code);
        //then
        assertThat(result.getFound()).isTrue();
        assertThat(result.getData().getTextplain()).isEqualTo(expected);
    }

    @Test
    public void evaluateInspectFooWoSimpleInitCaretInFooName() throws Exception {
        //given
        String code = "import com.twosigma.beakerx.table.*\n" +
                "import com.twosigma.beakerx.table.format.TableDisplayStringFormat\n" +
                "\n" +
                "table = new TableDisplay(new CsvPlotReader().read('../resources/data/interest-rates.csv'))\n" +
                "table.setDoubleCli\0ckAction()";
        String expected = "java.lang.String tagName\n";
        //when
        InspectResult result = callInspectOnCaretPos(code);
        //then
        assertThat(result.getFound()).isTrue();
        assertThat(result.getData().getTextplain()).isEqualTo(expected);
    }

    @Test
    public void evaluateInspectClassNameWithoutNew() throws Exception {
        //given
        String code = "import com.twosigma.beakerx.table.*\n" +
                "import com.twosigma.beakerx.table.format.TableDisplayStringFormat\n" +
                "\n" +
                "table = new TableDisplay(new CsvPlotReader().read('ar\0gs'))";
        String expected = "java.lang.String fileName\n";
        //when
        InspectResult result = callInspectOnCaretPos(code);
        //then
        assertThat(result.getFound()).isTrue();
        assertThat(result.getData().getTextplain()).isEqualTo(expected);
    }

    @Test
    public void evaluateInspectClassNameInsideConstructor() throws Exception {
        //given
        String code = "import com.twosigma.beakerx.table.*\n" +
                "import com.twosigma.beakerx.table.format.TableDisplayStringFormat\n" +
                "\n" +
                "display = new TableDisplay(new CsvPlot\0Reader().read(\"../resources/data/interest-rates.csv\"))\n" +
                "display.setStringFormatForColumn(\"test\")";
        String expected = "com.twosigma.beakerx.fileloader.CsvPlotReader\n";
        //when
        InspectResult result = callInspectOnCaretPos(code);
        assertThat(result.getFound()).isTrue();
        assertThat(result.getData().getTextplain()).isEqualTo(expected);
    }

    @Test
    public void evaluateInspectOnVariableWithDefKeyword() throws Exception {
        //given
        String code = "def display = new TableDisplay()\n" +
                "dis\0play.setDoubleClickAction()";
        String expected = "com.twosigma.beakerx.table.TableDisplay\n";
        //when
        InspectResult result = callInspectOnCaretPos(code);
        assertThat(result.getFound()).isTrue();
        assertThat(result.getData().getTextplain()).isEqualTo(expected);
    }

    @Test
    public void evaluateInspectOnMethodVarWithDefKeyword() throws Exception {
        //given
        String code = "def display = new TableDisplay()\n" +
                "display.setDoubleCli\0ckAction()";
        String expected = "java.lang.String tagName\n";
        //when
        InspectResult result = callInspectOnCaretPos(code);
        assertThat(result.getFound()).isTrue();
        assertThat(result.getData().getTextplain()).isEqualTo(expected);
    }

    @Test
    public void evaluateInspectInsideSingleQuotes() throws Exception {
        //given
        String code = "f['la\0st'] = \"Last\"";
        InspectResult result = callInspectOnCaretPos(code);
        assertThat(result.getFound()).isFalse();
    }
}

