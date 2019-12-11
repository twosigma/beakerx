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
package com.twosigma.beakerx.sql.evaluator;


import com.twosigma.beakerx.BeakerXClient;
import com.twosigma.beakerx.TryResult;
import com.twosigma.beakerx.autocomplete.AutocompleteClasspathScanner;
import com.twosigma.beakerx.autocomplete.AutocompleteResult;
import com.twosigma.beakerx.autocomplete.MagicCommandAutocompletePatterns;
import com.twosigma.beakerx.evaluator.BaseEvaluator;
import com.twosigma.beakerx.evaluator.ClasspathScanner;
import com.twosigma.beakerx.evaluator.JobDescriptor;
import com.twosigma.beakerx.evaluator.TempFolderFactory;
import com.twosigma.beakerx.evaluator.TempFolderFactoryImpl;
import com.twosigma.beakerx.jvm.classloader.DynamicClassLoaderSimple;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.jvm.threads.BeakerCellExecutor;
import com.twosigma.beakerx.jvm.threads.CellExecutor;
import com.twosigma.beakerx.kernel.Classpath;
import com.twosigma.beakerx.kernel.EvaluatorParameters;
import com.twosigma.beakerx.kernel.ExecutionOptions;
import com.twosigma.beakerx.kernel.GroupName;
import com.twosigma.beakerx.kernel.ImportPath;
import com.twosigma.beakerx.kernel.PathToJar;
import com.twosigma.beakerx.sql.ConnectionStringBean;
import com.twosigma.beakerx.sql.ConnectionStringHolder;
import com.twosigma.beakerx.sql.JDBCClient;
import com.twosigma.beakerx.sql.QueryExecutor;
import com.twosigma.beakerx.sql.ReadVariableException;
import com.twosigma.beakerx.sql.autocomplete.SQLAutocomplete;
import com.twosigma.beakerx.sql.kernel.SQLKernelParameters;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.Scanner;
import java.util.concurrent.Executors;

public class SQLEvaluator extends BaseEvaluator {

  private final static Logger logger = LoggerFactory.getLogger(SQLEvaluator.class.getName());

  Map<String, ConnectionStringHolder> namedConnectionString = new HashMap<>();
  ConnectionStringHolder defaultConnectionString;
  private AutocompleteClasspathScanner cps;
  private SQLAutocomplete sac;
  private QueryExecutor queryExecutor;
  private JDBCClient jdbcClient;
  private DynamicClassLoaderSimple loader;

  public SQLEvaluator(String id,
                      String sId,
                      EvaluatorParameters evaluatorParameters,
                      BeakerXClient beakerxClient,
                      MagicCommandAutocompletePatterns autocompletePatterns,
                      ClasspathScanner classpathScanner) {
    this(id,
            sId,
            new BeakerCellExecutor("sql"),
            new TempFolderFactoryImpl(),
            evaluatorParameters,
            beakerxClient,
            autocompletePatterns,
            classpathScanner);
  }

  public SQLEvaluator(String id,
                      String sId,
                      CellExecutor cellExecutor,
                      TempFolderFactory tempFolderFactory,
                      EvaluatorParameters evaluatorParameters,
                      BeakerXClient beakerxClient,
                      MagicCommandAutocompletePatterns autocompletePatterns,
                      ClasspathScanner classpathScanner) {
    super(id, sId, cellExecutor, tempFolderFactory, evaluatorParameters, beakerxClient, autocompletePatterns, classpathScanner);
    cps = new AutocompleteClasspathScanner();
    sac = createSqlAutocomplete(cps);
    loader = reloadClassLoader();
    executorService = Executors.newSingleThreadExecutor();
  }

  @Override
  public ClassLoader getClassLoader() {
    return loader;
  }

  @Override
  public TryResult evaluate(SimpleEvaluationObject seo, String code, ExecutionOptions executionOptions) {
    return evaluate(seo, new SQLWorkerThread(this, new JobDescriptor(code, seo, executionOptions)));
  }

  @Override
  public void exit() {
    super.exit();
    executorService.shutdown();
    killAllThreads();
  }

  @Override
  public void cancelExecution(GroupName groupName) {
    super.cancelExecution(groupName);
    queryExecutor.cancel();
  }

  @Override
  public void killAllThreads() {
    super.killAllThreads();
    queryExecutor.cancel();
  }

  @Override
  public void resetEnvironment() {
    killAllThreads();
    jdbcClient.loadDrivers(classPath.getPathsAsStrings());
    sac = createSqlAutocomplete(cps);
    loader = reloadClassLoader();
  }

  @Override
  protected void addJarToClassLoader(PathToJar pathToJar) {
    loader.addJars(Arrays.asList(pathToJar.getPath()));
  }

  @Override
  protected void addImportToClassLoader(ImportPath anImport) {
  }

  @Override
  protected void doResetEnvironment() {
  }

  private SQLAutocomplete createSqlAutocomplete(AutocompleteClasspathScanner c) {
    return new SQLAutocomplete(c, jdbcClient, sessionId, defaultConnectionString, namedConnectionString, autocompletePatterns);
  }

  @Override
  public AutocompleteResult autocomplete(String code, int caretPosition) {
    return sac.find(code, caretPosition);
  }

  @Override
  protected void init(EvaluatorParameters evaluatorParameters) {
    configureSqlEvaluator(evaluatorParameters);
  }

  protected void configureSqlEvaluator(EvaluatorParameters kernelParameters) {
    SQLKernelParameters params = new SQLKernelParameters(kernelParameters);
    jdbcClient = createJdbcClient(params.getClassPath());
    jdbcClient.loadDrivers(classPath.getPathsAsStrings());
    queryExecutor = new QueryExecutor(jdbcClient);

    if (params.defaultDatasource().isPresent()) {
      this.defaultConnectionString = new ConnectionStringHolder(params.defaultDatasource().orElse(""), jdbcClient);
    }
    if (params.datasources().isPresent()) {
      this.namedConnectionString = new HashMap<>();
      Scanner sc = new Scanner(params.datasources().orElse(""));
      while (sc.hasNext()) {
        String line = sc.nextLine();
        int i = line.indexOf('=');
        if (i < 1 || i == line.length() - 1) {
          logger.warn("Error in datasource line, this line will be ignored: {}.", line);
          continue;
        }
        String name = line.substring(0, i).trim();
        String value = line.substring(i + 1).trim();
        if (value.startsWith("\"") && value.endsWith("\"")) {
          value = value.substring(1, value.length() - 1);
        }
        namedConnectionString.put(name, new ConnectionStringHolder(value, jdbcClient));
      }
    }

  }

  private JDBCClient createJdbcClient(Optional<Collection<String>> cp) {
    JDBCClient jdbcClient = new JDBCClient();
    if (cp.isPresent()) {
      if (cp.get() == null || cp.get().isEmpty()) {
        classPath = new Classpath();
      } else {
        for (String line : cp.get()) {
          if (!line.trim().isEmpty()) {
            classPath.add(new PathToJar(line));
          }
        }
      }
      jdbcClient.loadDrivers(classPath.getPathsAsStrings());
    }
    return jdbcClient;
  }

  public void setShellUserPassword(String namedConnection, String user, String password) {
    if (namedConnection != null && !namedConnection.isEmpty()) {
      if (this.namedConnectionString != null) {
        ConnectionStringHolder holder = this.namedConnectionString.get(namedConnection);
        if (holder != null) {
          if (password != null && !password.isEmpty()) {
            holder.setPassword(password);
          }
          if (user != null && !user.isEmpty()) {
            holder.setUser(user);
          }
          holder.setShowDialog(password == null || password.isEmpty() || user == null || user.isEmpty());
        }
      }
    } else {
      if (password != null && !password.isEmpty()) {
        defaultConnectionString.setPassword(password);
      }
      if (user != null && !user.isEmpty()) {
        defaultConnectionString.setUser(user);
      }
      defaultConnectionString.setShowDialog(password == null || password.isEmpty() || user == null || user.isEmpty());
    }
    resetEnvironment();
  }

  public List<ConnectionStringBean> getListOfConnectiononWhoNeedDialog() {
    List<ConnectionStringBean> ret = new ArrayList<>();

    if (this.defaultConnectionString.isShowDialog()) {
      ret.add(new ConnectionStringBean(null, defaultConnectionString.getConnectionString(), defaultConnectionString.getUser()));
    }

    if (this.namedConnectionString != null) {
      for (Entry<String, ConnectionStringHolder> cbh : namedConnectionString.entrySet()) {
        if (cbh.getValue().isShowDialog()) {
          ret.add(new ConnectionStringBean(cbh.getKey(), cbh.getValue().getConnectionString(), cbh.getValue().getUser()));
        }
      }
    }

    return ret;
  }

  public Object executeQuery(String expression, BeakerXClient namespaceClient, ConnectionStringHolder defaultConnectionString, Map<String, ConnectionStringHolder> namedConnectionString) throws SQLException, IOException, ReadVariableException {
    return queryExecutor.executeQuery(expression, namespaceClient, defaultConnectionString, namedConnectionString);
  }

  private DynamicClassLoaderSimple reloadClassLoader() {
    DynamicClassLoaderSimple parent = new DynamicClassLoaderSimple(ClassLoader.getSystemClassLoader());
    parent.addJars(getClasspath().getPathsAsStrings());
    parent.addDynamicDir(getOutDir());
    return parent;
  }

}