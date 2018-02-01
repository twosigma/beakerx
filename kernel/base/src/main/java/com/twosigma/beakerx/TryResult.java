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
package com.twosigma.beakerx;

import java.util.NoSuchElementException;

public interface TryResult {

  boolean isResult();

  boolean isError();

  Object result();

  String error();

  static CellResult createResult(Object value) {
    return new TryResult.CellResult(value);
  }

  static CellError createError(String value) {
    return new TryResult.CellError(value);
  }


  final class CellResult implements TryResult {

    private final Object value;

    private CellResult(Object value) {
      this.value = value;
    }

    @Override
    public boolean isResult() {
      return true;
    }

    @Override
    public boolean isError() {
      return false;
    }

    @Override
    public Object result() {
      return value;
    }

    @Override
    public String error() {
      throw new NoSuchElementException("error() on CellResult");
    }
  }

  final class CellError implements TryResult {

    private final String value;

    private CellError(String value) {
      this.value = value;
    }

    @Override
    public boolean isResult() {
      return false;
    }

    @Override
    public boolean isError() {
      return true;
    }

    @Override
    public Object result() {
      throw new NoSuchElementException("result() on CellError");
    }

    @Override
    public String error() {
      return value;
    }
  }

}
