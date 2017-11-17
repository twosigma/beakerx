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
