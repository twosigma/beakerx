package com.twosigma.beakerx.scala.chart.xychart.plotitem;

import org.assertj.core.api.Assertions;
import org.junit.Test;

public class TextTest {

  @Test
  public void createTextByEmptyConstructor_hasXYValuesEqualsZero() {
    //when
    Text text = new Text();
    //then
    Assertions.assertThat(text.getX()).isEqualTo(0.0);
    Assertions.assertThat(text.getY()).isEqualTo(0.0);
  }

  @Test
  public void createTextWithFourParams_hasXYTextAndAngleValues() {
    //when
    Text text = new Text(1, 2, "test", 0.5);
    //then
    Assertions.assertThat(text.getX()).isEqualTo(1);
    Assertions.assertThat(text.getY()).isEqualTo(2);
    Assertions.assertThat(text.getText()).isEqualTo("test");
    Assertions.assertThat(text.getPointerAngle()).isEqualTo(0.5);
  }
}
