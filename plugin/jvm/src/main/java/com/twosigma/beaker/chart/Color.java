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

public class Color implements java.io.Serializable {
    public final static Color white     = new Color(255, 255, 255);
    public final static Color WHITE = white;
    public final static Color lightGray = new Color(192, 192, 192);
    public final static Color LIGHT_GRAY = lightGray;
    public final static Color gray      = new Color(128, 128, 128);
    public final static Color GRAY = gray;
    public final static Color darkGray  = new Color(64, 64, 64);
    public final static Color DARK_GRAY = darkGray;
    public final static Color black     = new Color(0, 0, 0);
    public final static Color BLACK = black;
    public final static Color red       = new Color(255, 0, 0);
    public final static Color RED = red;
    public final static Color pink      = new Color(255, 175, 175);
    public final static Color PINK = pink;
    public final static Color orange    = new Color(255, 200, 0);
    public final static Color ORANGE = orange;
    public final static Color yellow    = new Color(255, 255, 0);
    public final static Color YELLOW = yellow;
    public final static Color green     = new Color(0, 255, 0);
    public final static Color GREEN = green;
    public final static Color magenta   = new Color(255, 0, 255);
    public final static Color MAGENTA = magenta;
    public final static Color cyan      = new Color(0, 255, 255);
    public final static Color CYAN = cyan;
    public final static Color blue      = new Color(0, 0, 255);
    public final static Color BLUE = blue;

    int value;

    public Color(int r, int g, int b) {
      value = ((r & 0xFF) << 16) |
               ((g & 0xFF) << 8)  |
               (b & 0xFF);
    }
  
    public Color(int rgb) {
      value = 0xff000000 | rgb;
    }
  
    public int getRed() {
      return (getRGB() >> 16) & 0xFF;
    }
 
    public int getGreen() {
      return (getRGB() >> 8) & 0xFF;
    }

    public int getBlue() {
      return (getRGB() >> 0) & 0xFF;
    }  

    public int getRGB() {
      return value;
    }
  
    public int hashCode() {
      return value;
    }
  
    public boolean equals(Object obj) {
      return obj instanceof Color && ((Color)obj).getRGB() == this.getRGB();
    }
  
    public String toString() {
      return getClass().getName() + "[r=" + getRed() + ",g=" + getGreen() + ",b=" + getBlue() + "]";
    }
}