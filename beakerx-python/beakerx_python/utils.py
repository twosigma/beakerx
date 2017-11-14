# Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
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

def getValue(obj, value, defaultValue=None):
    if value in obj:
        return obj[value]
    else:
        return defaultValue


def getColor(color):
    if isinstance(color, list):
        values = []
        for c in color:
            values.append(getColor(c))
        return values
    elif isinstance(color, Color):
        return color.hex()
    else:
        return color


def padYs(g, gMax):
    currentSize = len(g.y)
    maxSize = len(gMax.y)
    diff = maxSize - currentSize
    if (diff > 0):
        lastY = g.y[currentSize - 1]
        g.y = g.y + [lastY] * diff
        g.x = g.x + gMax.x[currentSize:]


class ColorUtils:
    @staticmethod
    def interpolateColor(color1, color2, fraction):
        fraction = min(fraction, 1.0)
        fraction = max(fraction, 0.0)

        red1 = color1.R
        green1 = color1.G
        blue1 = color1.B
        alpha1 = color1.A

        red2 = color2.R
        green2 = color2.G
        blue2 = color2.B
        alpha2 = color2.A

        delta_red = red2 - red1
        delta_green = green2 - green1
        delta_blue = blue2 - blue1
        delta_alpha = alpha2 - alpha1

        red = red1 + (delta_red * fraction)
        green = green1 + (delta_green * fraction)
        blue = blue1 + (delta_blue * fraction)
        alpha = alpha1 + (delta_alpha * fraction)

        red = min(red, 255.0)
        red = max(red, 0.0)
        green = min(green, 255.0)
        green = max(green, 0.0)
        blue = min(blue, 255.0)
        blue = max(blue, 0.0)
        alpha = min(alpha, 255.0)
        alpha = max(alpha, 0.0)
        return Color(round(red), round(green), round(blue), round(alpha))
