/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beakerx.inspect;

import org.assertj.core.api.Assertions;
import org.junit.Test;

public class CodeParsingToolTest {

    private final static String CODE_METHOD = "display = new TableDisplay()\n" +
            "display.test()\n" +
            "csv = new CSV()\n" +
            "csv.read(test)";

    private final static String CODE_CLASS_ROW_1 =
            "table = new TableDisplay(new CsvPlotReader(\"default\", new Reader(\"test\")).\n";
    private final static String CODE_CLASS_ROW_2 =
            "table.test(\"test\")";


    @Test
    public void getCaretPositionInLineTest() {
        //given
        int expected = 3;
        //when
        int result = CodeParsingTool.getCaretPositionInLine(CODE_METHOD, 32);
        //then
        Assertions.assertThat(result).isEqualTo(expected);
    }

    @Test
    public void getLineWithCursorTest() {
        //given
        String expected = "display.test()";
        //when
        String result = CodeParsingTool.getLineWithCursor(CODE_METHOD, 32);
        //then
        Assertions.assertThat(result).isEqualTo(expected);
    }

    @Test
    public void getSelectedMethodName() {
        //given
        String expected = "read";
        //when
        String result_before_foo = CodeParsingTool.getSelectedMethodName(CODE_METHOD, 62);
        String result_inside_foo  = CodeParsingTool.getSelectedMethodName(CODE_METHOD, 66);
        String result_inside_brackets = CodeParsingTool.getSelectedMethodName(CODE_METHOD, 70);
        //then
        Assertions.assertThat(result_before_foo).isNotEqualTo(expected);
        Assertions.assertThat(result_inside_foo).isEqualTo(expected);
        Assertions.assertThat(result_inside_brackets).isEqualTo(expected);
    }

    @Test
    public void  getSelectedMethodClass() {
        //given
        String expected = "TableDisplay";
        //when
        String result = CodeParsingTool.getClassName( CODE_CLASS_ROW_1 + CODE_CLASS_ROW_2, 84, "test");
        //then
        Assertions.assertThat(result).isEqualTo(expected);
    }

    @Test
    public void getInspectObjectTest() {
        //given
        String code_1 = "table.setDoubleClickAction()";
        String code_2 = "table = new TableDisplay(new CsvPlotReader().read('../resources/data/interest-rates.csv'))\"\n";
        int pos_1 = 20; //on setDoubleClickAction
        int pos_2 = 50; //on read method
        String expected_1 = "table";
        String expected_2 = "CsvPlotReader";
        //when
        String result_1 = CodeParsingTool.getInspectObject(code_1, pos_1, "setDoubleClickAction");
        String result_2 = CodeParsingTool.getInspectObject(code_2, pos_2, "read");
        //then
        Assertions.assertThat(result_1).isEqualTo(expected_1);
        Assertions.assertThat(result_2).isEqualTo(expected_2);
    }

    @Test
    public void getInspectObjectNestedTest() {
        //given
        String code = "table = new TableDisplay(new CsvPlotReader().read('../resources/data/interest-rates.csv'))";
        int pos_1 = 2;
        int pos_2 = 17;
        int pos_3 = 36;
        String expected_1 = "table";
        String expected_2 = "TableDisplay";
        String expected_3 = "CsvPlotReader";
        //when
        String result_1 = CodeParsingTool.getInspectObject(code, pos_1, null);
        String result_2 = CodeParsingTool.getInspectObject(code, pos_2, null);
        String result_3 = CodeParsingTool.getInspectObject(code, pos_3, null);
        //then
        Assertions.assertThat(result_1).isEqualTo(expected_1);
        Assertions.assertThat(result_2).isEqualTo(expected_2);
        Assertions.assertThat(result_3).isEqualTo(expected_3);

    }

    @Test
    public void getClassOfInspectObjectTest() {
        //given
        String code = "import com.twosigma.beakerx.table.*\n" +
                "import com.twosigma.beakerx.table.format.TableDisplayStringFormat\n" +
                "table = new TableDisplay(new CsvPlotReader().read('../resources/data/interest-rates.csv'))\n" +
                "table.setDoubleClickAction()\n" +
                "CsvPlotReader().read";
        String inspectObject_1 = "CsvPlotReader";
        String inspectObject_2 = "table";
        String expected_1 = "CsvPlotReader";
        String expected_2 = "TableDisplay";
        //when
        String result_1 = CodeParsingTool.getClassOfInspectObject(code, inspectObject_1);
        String result_2 = CodeParsingTool.getClassOfInspectObject(code, inspectObject_2);
        //then
        Assertions.assertThat(result_1).isEqualTo(expected_1);
        Assertions.assertThat(result_2).isEqualTo(expected_2);
    }

    @Test
    public void getClassOfInspectObjectWithDefTest() {
        //given
        String code = "def display = new TableDisplay()\n" +
                "display.setDoubleClickAction()";
        String inspectObject = "display";
        String expected = "TableDisplay";
        //when
        String result = CodeParsingTool.getClassOfInspectObject(code, inspectObject);
        //then
        Assertions.assertThat(result).isEqualTo(expected);
    }

}
