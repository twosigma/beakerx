/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beakerx.jvm.threads;

import com.twosigma.beakerx.evaluator.InternalVariable;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.message.Message;

import java.io.InputStream;
import java.util.Iterator;

public class BxInputStream extends InputStream implements BeakerInputHandler {

  private KernelFunctionality kernel;
  private InputRequestMessageFactory inputRequestMessageFactory;
  private Iterator<Character> characters;

  public BxInputStream(KernelFunctionality kernel, InputRequestMessageFactory inputRequestMessageFactory) {
    this.kernel = kernel;
    this.inputRequestMessageFactory = inputRequestMessageFactory;
  }

  @Override
  public int read() {
    if (characters == null) {
      characters = new CharacterIterator(input());
    }
    if (characters.hasNext()) {
      return characters.next();
    } else {
      characters = null;
      return -1;
    }
  }

  private String input() {
    Message parent = InternalVariable.getParentHeader();
    Message message = inputRequestMessageFactory.create(parent);
    return this.kernel.sendStdIn(message) + System.lineSeparator();
  }

  public static class CharacterIterator implements Iterator<Character> {

    private final String str;
    private int pos = 0;

    CharacterIterator(String str) {
      this.str = str;
    }

    public boolean hasNext() {
      return pos < str.length();
    }

    public Character next() {
      return str.charAt(pos++);
    }

    public void remove() {
      throw new UnsupportedOperationException();
    }
  }

}
