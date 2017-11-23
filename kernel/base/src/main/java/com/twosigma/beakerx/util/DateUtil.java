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
package com.twosigma.beakerx.util;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Calendar;
import java.util.Date;

public final class DateUtil {

  public static long dateToLong(Object datelike) {
    if (datelike instanceof Date) {
      Date date = (Date) datelike;
      return date.getTime();
    } else if (datelike instanceof Calendar) {
      Calendar calendar = (Calendar) datelike;
      return calendar.getTimeInMillis();
    } else if (datelike instanceof Instant) {
      Instant instant = (Instant) datelike;
      return instant.toEpochMilli();
    } else if (datelike instanceof LocalDateTime) {
      LocalDateTime date = (LocalDateTime) datelike;
      return date.atZone(ZoneId.of("UTC")).toInstant().toEpochMilli();
    } else if (datelike instanceof LocalDate) {
      LocalDate date = (LocalDate) datelike;
      return date.atStartOfDay(ZoneId.of("UTC")).toInstant().toEpochMilli();
    } else {
      throw new IllegalArgumentException("Illegal argument " + datelike
      	  + ". Expected a Number, Date, Instant, LocalDateTime, or LocalDate");
    }
  }

}
