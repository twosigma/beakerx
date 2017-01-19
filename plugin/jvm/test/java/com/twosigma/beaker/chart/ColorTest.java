/*
 *  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
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

package com.twosigma.beaker.chart;

import org.assertj.core.api.Assertions;
import org.junit.Test;

public class ColorTest {

    @Test
    public void createColorWithIntRGBParams_ColorHasRGBValues() throws IllegalArgumentException{
        //when
        Color color = new Color(100, 150, 200);
        //then
        Assertions.assertThat(color.getRed()).isEqualTo(100);
        Assertions.assertThat(color.getGreen()).isEqualTo(150);
        Assertions.assertThat(color.getBlue()).isEqualTo(200);
    }

    @Test
    public void createColorWithFloatRGBParams_ColorHasRGBValues() throws IllegalArgumentException{
        //when
        Color color = new Color(0.1f, 0.2f, 0.3f);
        //then
        Assertions.assertThat(color.getRed()).isEqualTo(26);
        Assertions.assertThat(color.getGreen()).isEqualTo(51);
        Assertions.assertThat(color.getBlue()).isEqualTo(77);
    }

    @Test(expected = IllegalArgumentException.class)
    public void createColorWithIllegalIntRGBParams_ThrowIllegalArgumentException() throws IllegalArgumentException{
        new Color(300, 150, 200);
    }

    @Test(expected = IllegalArgumentException.class)
    public void createColorWithIllegalFloatRGBParams_ThrowIllegalArgumentException() throws IllegalArgumentException{
        new Color(100.1f, 0.2f, 0.3f);
    }


}
