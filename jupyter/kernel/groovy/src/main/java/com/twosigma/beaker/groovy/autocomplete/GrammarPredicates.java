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

package com.twosigma.beaker.groovy.autocomplete;

import org.antlr.v4.runtime.Token;
import org.antlr.v4.runtime.TokenStream;

public class GrammarPredicates {

  public static boolean isClassName(TokenStream _input) {
    try {
      int i=1;
      Token token = _input.LT(i);
      while (token!=null && i < _input.size() && _input.LT(i+1).getType() == GroovyParser.DOT) {
        i = i + 2;
        token = _input.LT(i);
      }
      if(token==null)
        return false;
      // TODO here
      return Character.isUpperCase(Character.codePointAt(token.getText(), 0));
    } catch(Exception e) {
      e.printStackTrace();
    }
    
    return false;
  }

}
