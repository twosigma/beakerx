package com.twosigma.beaker.sqlsh.utils;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

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
public class JDBCClient
{
    Connection conn = null;
    public Connection getConnection() throws SQLException
    {
        if(conn == null || conn.isClosed())
        {
            Properties connectionProps = new Properties();
            connectionProps.put("user", "root");
            connectionProps.put("password", "root");

            conn = DriverManager.getConnection(
                    "jdbc:" + "mysql" + "://"
                            + "localhost"
                            + ":" + "3306" + "/" + "test",
                    connectionProps);
            System.out.println("Connected to database");
        }
        return conn;
    }

    public void closeConnection() throws SQLException
    {
        if(conn != null && !conn.isClosed())
        {
            conn.close();
        }
    }
}
