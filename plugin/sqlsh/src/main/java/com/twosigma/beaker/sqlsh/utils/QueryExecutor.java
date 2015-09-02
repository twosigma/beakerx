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

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;

public class QueryExecutor
{
    JDBCClient jdbcClient = new JDBCClient();

    public String executeQuery(String script) throws SQLException
    {
        StringBuilder sb = new StringBuilder();
        Connection conn = jdbcClient.getConnection();



        for (String query : QueryParser.split(script))
        {
            sb.append(query);
            sb.append("\n");
            try (Statement statement = conn.createStatement())
            {
                ResultSet rs = statement.executeQuery(query);
                for (int i = 1; i <= rs.getMetaData().getColumnCount(); i++)
                {
                    sb.append(rs.getMetaData().getColumnName(i)).append(" ");
                }
                sb.append("\n\n");
                while (rs.next())
                {
                    for (int i = 1; i <= rs.getMetaData().getColumnCount(); i++)
                    {
                        sb.append(rs.getString(i)).append(" ");
                    }
                    sb.append("\n");
                }
                sb.append("\n\n");
            }
            catch (SQLException e)
            {
                Logger.getLogger(QueryExecutor.class.getName()).log(Level.SEVERE, null, e);
                throw e;
            }
        }
        return sb.toString();
    }

}
