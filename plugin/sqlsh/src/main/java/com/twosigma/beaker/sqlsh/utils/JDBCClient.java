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

package com.twosigma.beaker.sqlsh.utils;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.apache.commons.dbcp2.BasicDataSource;

public class JDBCClient {

    private static Map<String, BasicDataSource> dsMap = new HashMap<>();

    public static synchronized DataSource getDataSource(String uri) throws DBConnectionException {

        try {
            BasicDataSource ds = dsMap.get(uri);
            if (ds == null) {
                ds = new BasicDataSource();
                ds.setDriver(DriverManager.getDriver(uri));
                ds.setUrl(uri);
            }
            return ds;

        } catch (SQLException e) {
            Logger.getLogger(JDBCClient.class.getName()).log(Level.SEVERE, null, e);
            throw new DBConnectionException(uri, e);
        }

    }
}
