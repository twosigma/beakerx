/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
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

enum KeyboardCodes {
  BACKSPACE = 8,
  TAB = 9,
  ENTER = 13,
  SHIFT = 16,
  CTRL = 17,
  ALT = 18,
  PAUSE_BREAK = 19,
  CAPS_LOCK = 20,
  ESCAPE = 27,
  SPACE = 32,
  PAGE_UP = 33,
  PAGE_DOWN = 34,
  END = 35,
  HOME = 36,
  LEFT_ARROW = 37,
  UP_ARROW = 38,
  RIGHT_ARROW = 39,
  DOWN_ARROW = 40,
  INSERT = 45,
  DELETE = 46,
  MULTIPLY = 106,
  ADD = 107,
  SUBTRACT = 109,
  DECIMAL_POINT = 110,
  DIVIDE = 111,
  F1 = 112,
  F2 = 113,
  F3 = 114,
  F4 = 115,
  F5 = 116,
  F6 = 117,
  F7 = 118,
  F8 = 119,
  F9 = 120,
  F10 = 121,
  F11 = 122,
  F12 = 123,
  NUM_LOCK = 144,
  SCROLL_LOCK = 145,
  SEMICOLON = 186,
  EQUAL_SIGN = 187,
  COMMA = 188,
  DASH = 189,
  PERIOD = 190,
  FORWARD_SLASH = 191,
  GRAVE_ACCENT = 192,
  OPEN_BRACKET = 219,
  BACK_SLASH = 220,
  CLOSE_BRAKET = 221,
  SINGLE_QUOTE = 222
}

export default class PlotKeyboardUtils {
  public static getKeyCodeConstant(keyCode: number): string {
    return (keyCode > 46 && keyCode < 90) ?
      String.fromCharCode(keyCode).toUpperCase() :
      KeyboardCodes[keyCode];
  }
}