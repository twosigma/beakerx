# Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
#
# Licensed under the Apache License, Version 2.0 (the "License")
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#        http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

from beakerx.utils import *
from enum import Enum

class TreeMapNode:
    def __init__(self, *args):
        self.type= 'TreeMapNode'
        self.weight = 0
        self.color = '#780004'
        self.children = None
        self.label = args[0]
        if len(args) > 1:
            self.doubleValue = args[2].value
            self.labelValue = args[2].label
            self.tooltip= args[2].label
            self.weight = args[1]
            self.label = args[0]
            self.tooltip = args[2].label
    
    def add(self, item):
        if self.children is None:
            self.children = []
        item.parent = self
        self.children.append(item)
        self.weight += item.weight
    
    def isLeaf(self):
        return self.getChildCount() == 0
    
    def getChildCount(self):
        if self.children is None:
            return 0
        else:
            return len(self.children)

class DefaultValue:
    def __init__(self, value):
        self.value = value
        self.label = str(value)


class Mode(Enum):
    SQUARIFY = "squarify" #rectangular subdivision; squareness controlled via the target ratio.
    SLICE = "slice" # horizontal subdivision.
    DICE = "dice" # vertical subdivision.
    SLICE_DIC = "slice-dic" # alternating between horizontal and vertical subdivision.

class ValueAccessor(Enum):
    VALUE = 1
    WEIGHT = 2


class ColorProvider:
    valueAccessor = ValueAccessor.VALUE
    maxValue = None
    minValue = None
    def getValue(self, node):
        if node is None:
            return 0.00
        
        if self.valueAccessor == ValueAccessor.VALUE:
            return node.doubleValue
        else:
            return node.weight
    
    def setValues(self, root):
        if root.isLeaf():
            if self.valueAccessor == ValueAccessor.VALUE:
                if root.doubleValue is None:
                    return
                value = root.doubleValue
            else:
                value = root.weight
            
            if self.maxValue is None or value >= self.maxValue:
                self.maxValue = value
            
            if self.minValue is None or value <= self.minValue:
                self.minValue = value
        else:
            if root.children is not None:
                for child in root.children:
                    self.setValues(child)


class RandomColorProvider(ColorProvider):
    cursor = 0
    mapping = dict()
    COLOURS = [
        Color(33, 87, 141), # blue
        Color(140, 29, 23), # red
        Color(150, 130, 54),# yellow
        Color(20, 30, 120), # violet
        Color(54, 100, 54), # green
        Color(0, 30, 50),   # dark
        Color(102, 102, 51),
        Color(255, 51, 153),
        Color(255, 153, 51),
        Color(204, 204, 51),
        Color(205, 102, 204),
        Color(51, 153, 255),
        Color(153, 102, 0)]
    groupByParent = False
    
    def __init__(self, colours=COLOURS):
        self.colours = colours
    
    def setGroupByParent(self, group):
        self.groupByParent = group
    
    def isGroupByParent(self):
        return self.groupByParent
    
    def getColor(self, node):
        if self.groupByParent and isinstance(node.parent, TreeMapNode):
            value = node.parent.label
        else:
            value = self.getValue(node)
        
        if self.mapping.get(value) is None:
            
            colorValue = self.colours[self.cursor]
            if isinstance(colorValue, Color):
                self.mapping[value] =  colorValue.shorthex()
            else:
                self.mapping[value] = colorValue
            
            self.cursor += 1
            if self.cursor == len(self.colours):
                self.cursor = 0
        
        return self.mapping.get(value)


class GradientColorProvider(ColorProvider):
    def __init__(self, treeMap, colorStart=Color.RED, colorEnd=Color.GREEN):
        self.valueAccessor = treeMap.chart.valueAccessor
        self.start = colorStart
        self.end = colorEnd
        
        self.setValues(treeMap.chart.graphics_list)
    
    def getColor(self, node):
        value = self.getValue(node)
        
        result =  (value - self.minValue) / (self.maxValue - self.minValue)
        color = ColorUtils.interpolateColor(self.start, self.end, result)
        return color.shorthex()