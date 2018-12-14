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
package com.twosigma.beakerx.scala.evaluator;

import com.twosigma.beakerx.scala.Comments;
import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class RemoveCommentsTest {

  @Test
  public void onlyComments() {
    //given
    String sourcecode =
            "/*\n" +
                    "val a = 1\n" +
                    "*/\n" +
                    "//comment1\n" +
                    "/* val b = 2 */\n" +
                    "// comment2\n";
    //when
    String codeWithoutComments = Comments.removeComments(sourcecode);
    assertThat(codeWithoutComments).isEmpty();
  }

  @Test
  public void codeWithComments() {
    //given
    String sourcecode =
            "/*\n" +
                    "val a = 1\n" +
                    "*/\n" +
                    "val a = 1" +
                    "//comment1\n" +
                    "/* val b = 2 */\n" +
                    "// comment2\n" +
                    "val c= 3";
    //when
    String codeWithoutComments = Comments.removeComments(sourcecode);
    assertThat(codeWithoutComments).isNotEmpty();
  }
}
