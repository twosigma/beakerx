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

package com.twosigma.beaker.chart.categoryplot.plotitem;

import com.twosigma.beaker.chart.xychart.plotitem.ShapeType;
import org.assertj.core.api.Assertions;
import org.junit.Test;

import java.util.Arrays;

public class CategoryPointsTest {

    @Test
    public void createCategoryPointsByEmptyConstructor_hasSizeGreaterThanZero(){
        //when
        CategoryPoints categoryPoints = new CategoryPoints();
        //then
        Assertions.assertThat(categoryPoints.getSize()).isGreaterThan(0);
    }

    @Test
    public void setSizeWithIntegerList_hasSizesLstIsNotEmpty(){
        //when
        CategoryPoints categoryPoints = new CategoryPoints();
        categoryPoints.setSize(Arrays.asList(new Integer(1), new Integer(2)));
        //then
        Assertions.assertThat(categoryPoints.getSizes()).isNotEmpty();
    }

    @Test
    public void setShapeWithShapeTypeList_hasShapesListIsNotEmpty(){
        //when
        CategoryPoints categoryPoints = new CategoryPoints();
        categoryPoints.setShape(Arrays.asList(ShapeType.values()));
        //then
        Assertions.assertThat(categoryPoints.getShapes()).isNotEmpty();
    }

    @Test
    public void setValueWithIntegerArrayParam_hasValueIsNotEmpty(){
        //when
        CategoryPoints categoryPoints = new CategoryPoints();
        categoryPoints.setValue(new Integer[]{ new Integer(1), new Integer(2) });
        //then
        Assertions.assertThat(categoryPoints.getValue()).isNotEmpty();
    }

}
