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

  private int value;

  private static void testColorValueRange(int r, int g, int b, int a) {
    if ( a < 0 || a > 255 ||  r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
      throw new IllegalArgumentException("Color parameter outside of 0 to 255 range");
    }
  }
  
  private static void testColorValueRange(float r, float g, float b, float a) {
    if ( a < 0.0 || a > 1.0 || r < 0.0 || r > 1.0 || g < 0.0 || g > 1.0 || b < 0.0 || b > 1.0) {
      throw new IllegalArgumentException("Color parameter outside of 0.0 to 1.0 range");
    }
  }
    
  public Color(int r, int g, int b, int a) {
    value = ((a & 0xFF) << 24) |
            ((r & 0xFF) << 16) |
            ((g & 0xFF) << 8)  |
            ((b & 0xFF));
    testColorValueRange(r,g,b,a);
  }
    
  public Color(int r, int g, int b) {
    this(r, g, b, 255);
  }
  
  public Color(int rgb) {
    value = 0xff000000 | rgb;
  }
  
  public Color(int rgba, boolean hasalpha) {
    if (hasalpha) {
      value = rgba;
    } else {
      value = 0xff000000 | rgba;
    }
  }
    
  public Color(float r, float g, float b) {
    this( (int) (r*255+0.5), (int) (g*255+0.5), (int) (b*255+0.5));
    testColorValueRange(r,g,b,1.0f);
  }
    
  public Color(float r, float g, float b, float a) {
    this((int)(r*255+0.5), (int)(g*255+0.5), (int)(b*255+0.5), (int)(a*255+0.5));
  }

  public Color(java.awt.Color awtColor) {
    this(awtColor.getRed(), awtColor.getGreen(), awtColor.getBlue(), awtColor.getAlpha());
  }
    
  public int getRed() {
    return (getRGB() >> 16) & 0xFF;
  }
 
  public int getGreen() {
    return (getRGB() >> 8) & 0xFF;
  }

  public int getBlue() {
    return (getRGB()) & 0xFF;
  }  

  public int getRGB() {
    return value;
  }
  
  @Override
  public int hashCode() {
    return value;
  }
  
  @Override
  public boolean equals(Object obj) {
    return obj instanceof Color && ((Color)obj).getRGB() == this.getRGB();
  }
  
  @Override
  public String toString() {
    return getClass().getName() + "[r=" + getRed() + ",g=" + getGreen() + ",b=" + getBlue() + "]";
  }
    
  public static Color decode(String nm) throws NumberFormatException {
    Integer intval = Integer.decode(nm);
    int i = intval;
    return new Color((i >> 16) & 0xFF, (i >> 8) & 0xFF, i & 0xFF);
  }
}
