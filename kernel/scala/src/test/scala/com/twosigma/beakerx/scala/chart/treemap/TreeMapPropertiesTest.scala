/*
 * Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.twosigma.beakerx.scala.chart.treemap

import com.twosigma.beakerx.KernelTest
import com.twosigma.beakerx.chart.Color
import com.twosigma.beakerx.chart.treemap.util.{ColorProvider, IToolTipBuilder}
import com.twosigma.beakerx.chart.treemap.{Mode, ValueAccessor}
import com.twosigma.beakerx.kernel.KernelManager
import net.sf.jtreemap.swing.TreeMapNode
import org.junit.Test
import org.scalatest.Matchers._

class TreeMapPropertiesTest {
  @Test
  def settersAndGetters(): Unit = {
    val kernel = new KernelTest()
    KernelManager.register(kernel)
    val treeMap = new TreeMap()

    treeMap.colorProvider shouldBe treeMap.getColorProvider
    val testCP = new ColorProvider {
      override def getColor(value: TreeMapNode): Color = Color.BLACK
    }
    treeMap.colorProvider = testCP
    treeMap.colorProvider shouldBe testCP

    treeMap.mode shouldBe empty
    treeMap.mode = Mode.SLICE
    treeMap.mode should contain(Mode.SLICE)

    treeMap.ratio shouldBe empty
    treeMap.ratio = 1.0 / 3.0
    treeMap.ratio should contain(1.0 / 3.0)

    treeMap.root shouldBe empty
    val testRoot = new TreeMapNode("Test")
    treeMap.root = testRoot
    treeMap.root should contain(testRoot)

    treeMap.round shouldBe empty
    treeMap.round = false
    treeMap.round should contain(false)

    treeMap.sticky shouldBe empty
    treeMap.sticky = false
    treeMap.sticky should contain(false)

    treeMap.toolTipBuilder shouldBe empty
    val testBuilder = new IToolTipBuilder {
      override def getToolTip(node: TreeMapNode): String = "tooltip"
    }
    treeMap.toolTipBuilder = testBuilder
    treeMap.toolTipBuilder should contain(testBuilder)

    assume(treeMap.getValueAccessor != ValueAccessor.WEIGHT)
    treeMap.valueAccessor should contain(treeMap.getValueAccessor)
    treeMap.valueAccessor = ValueAccessor.WEIGHT
    treeMap.valueAccessor should contain(ValueAccessor.WEIGHT)
  }
}