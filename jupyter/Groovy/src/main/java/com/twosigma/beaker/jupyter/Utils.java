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
package com.twosigma.beaker.jupyter;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;
import java.util.UUID;

public class Utils {

  /**
   * The timezone to use when generating time stamps.
   */
  public static final TimeZone UTC = TimeZone.getTimeZone("UTC");
  public static final String DATE_FORMAT = "yyyy-MM-dd'T'HH:mmZ";

  public static String timestamp() {
    // SimpleDateFormat is not thread-safe so we need to create a new one for
    // each
    // timestamp that is generated.
    DateFormat df = new SimpleDateFormat(DATE_FORMAT);
    df.setTimeZone(UTC);
    return df.format(new Date());
  }

  public static String uuid() {
    return UUID.randomUUID().toString();
  }

}