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

class Color:
    def __init__(self, r, g, b, a=255):
        self.R = r
        self.B = b
        self.G = g
        self.A = a
        self.value = ((a & 0xFF) << 24) | ((r & 0xFF) << 16) | (
            (g & 0xFF) << 8) | (b & 0xFF)
        if self.value < 0:
            self.value = 0xFFFFFFFF + self.value + 1

    def hex(self):
        return '#%02x' % self.value

    def shorthex(self):
        return '#%06x' % (self.value & 0x00FFFFFF)


Color.white = Color(255, 255, 255)
Color.WHITE = Color.white
Color.lightGray = Color(192, 192, 192)
Color.LIGHT_GRAY = Color.lightGray
Color.gray = Color(128, 128, 128)
Color.GRAY = Color.gray
Color.darkGray = Color(64, 64, 64)
Color.DARK_GRAY = Color.darkGray
Color.black = Color(0, 0, 0)
Color.BLACK = Color.black
Color.red = Color(255, 0, 0)
Color.RED = Color.red
Color.pink = Color(255, 175, 175)
Color.PINK = Color.pink
Color.orange = Color(255, 200, 0)
Color.ORANGE = Color.orange
Color.yellow = Color(255, 255, 0)
Color.YELLOW = Color.yellow
Color.green = Color(0, 255, 0)
Color.GREEN = Color.green
Color.magenta = Color(255, 0, 255)
Color.MAGENTA = Color.magenta
Color.cyan = Color(0, 255, 255)
Color.CYAN = Color.cyan
Color.blue = Color(0, 0, 255)
Color.BLUE = Color.blue


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
