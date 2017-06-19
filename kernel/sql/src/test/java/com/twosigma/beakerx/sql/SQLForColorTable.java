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
package com.twosigma.beakerx.sql;

public class SQLForColorTable {

  public static final String CREATE = "" +
          "drop table if exists color;" +
          "CREATE TABLE color (\n" +
          "  id int(11) NOT NULL,\n" +
          "  name varchar(45) NOT NULL,\n" +
          "  code varchar(10),\n" +
          "  PRIMARY KEY (id)\n" +
          ");\n" +
          "\n" +
          "INSERT INTO color (id, name, code) VALUES (1001,'AliceBlue','#F0F8FF');\n" +
          "INSERT INTO color (id, name, code) VALUES (1002,'AntiqueWhite','#FAEBD7');\n" +
          "INSERT INTO color (id, name, code) VALUES (1003,'Aqua','#00FFFF');";

  public static final String CREATE_AND_SELECT_ALL = "" +
          CREATE +
          "SELECT * FROM color WHERE name LIKE 'A%';";
}
