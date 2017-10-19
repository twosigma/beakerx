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
package com.twosigma.beakerx.kernel.commands.type;

import com.twosigma.beakerx.kernel.commands.MagicCommandFunctionality;

public interface Command {
  String JAVASCRIPT = "%%javascript";
  String HTML = "%%html";
  String BASH = "%%bash";
  String LSMAGIC = "%lsmagic";
  String CLASSPATH = "%classpath";
  String CLASSPATH_ADD_JAR = CLASSPATH + " add jar";
  String CLASSPATH_REMOVE = CLASSPATH + " remove";
  String CLASSPATH_SHOW = CLASSPATH;
  String CLASSPATH_ADD_MVN = CLASSPATH + " add mvn";
  String ADD_MVN_FORMAT_ERROR_MESSAGE = "Wrong command format, should be " + CLASSPATH_ADD_MVN + " group name version";
  String IMPORT = "%import";
  String ADD_STATIC_IMPORT = IMPORT + " static";
  String UNIMPORT = "%unimport";
  String DEFAULT_DATASOURCE = "%defaultDatasource";
  String TIME_LINE = "%time";
  String TIME_CELL = "%" + TIME_LINE;
  String TIMEIT_LINE = "%timeit ";
  String TIMEIT_CELL = "%" + TIMEIT_LINE;
  String DATASOURCES = "%datasources";
  String USAGE_ERROR_MSG = "UsageError: %s is a cell magic, but the cell body is empty.";
  String WRONG_FORMAT_MSG = "Wrong format. ";

  MagicCommandFunctionality build();
}
