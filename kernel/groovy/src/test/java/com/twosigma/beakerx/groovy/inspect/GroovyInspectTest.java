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
import org.junit.Ignore;
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

    @Test
    public void evaluateInspectFooWoBracketCaretAtEnd() throws Exception {
        //given
        String code = "import com.twosigma.beakerx.table.*\n" +
                "import com.twosigma.beakerx.table.format.TableDisplayStringFormat\n" +
                "\n" +
                "csv = new CsvPlotReader()";
        String codeForinspect = code + "\ncsv.read";
        String expected = "java.lang.String fileName\n";
        int caretPosition = codeForinspect.length(); // on method name
        //when
        InspectResult result = groovyEvaluator.inspect(codeForinspect, caretPosition);
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
                "csv = new CsvPlotReader()";
        String expected = "com.twosigma.beakerx.fileloader.CsvPlotReader\n";
        int caretPosition = code.length() - 5;
        //when
        InspectResult result = groovyEvaluator.inspect(code, caretPosition);
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
                "csv.read()";
        String expected = "java.lang.String fileName\n";
        int caretPosition = code.length() - 1; //in method call bracket
        //when
        InspectResult result = groovyEvaluator.inspect(code, caretPosition);
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
                "table.setDoubleClickAction()";
        String expected = "java.lang.String tagName\n";
        int caretPosition = code.length() - 5; //on method name
        //when
        InspectResult result = groovyEvaluator.inspect(code, caretPosition);
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
                "table = new TableDisplay(new CsvPlotReader().read('args'))";
        String expected = "java.lang.String fileName\n";
        int caretPosition = 155; //in read method argument
        //when
        InspectResult result = groovyEvaluator.inspect(code, caretPosition);
        //then
        assertThat(result.getFound()).isTrue();
        assertThat(result.getData().getTextplain()).isEqualTo(expected);
    }
}
