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
package com.twosigma.beakerx.sql.evaluator;

import com.twosigma.beakerx.NamespaceClient;
import com.twosigma.beakerx.evaluator.InternalVariable;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.sql.ReadVariableException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.SQLException;

import static com.twosigma.beakerx.evaluator.BaseEvaluator.INTERUPTED_MSG;

class SQLCodeRunner implements Runnable {

  private final static Logger logger = LoggerFactory.getLogger(SQLCodeRunner.class.getName());

  private SQLEvaluator sqlEvaluator;
  private final SimpleEvaluationObject simpleEvaluationObject;
  private final NamespaceClient namespaceClient;

  SQLCodeRunner(SQLEvaluator sqlEvaluator, SimpleEvaluationObject seo, NamespaceClient namespaceClient) {
    this.sqlEvaluator = sqlEvaluator;
    this.simpleEvaluationObject = seo;
    this.namespaceClient = namespaceClient;
  }

  @Override
  public void run() {
    try {
      Long starTime = System.nanoTime();
      InternalVariable.setValue(simpleEvaluationObject);
      simpleEvaluationObject.finished(sqlEvaluator.executeQuery(simpleEvaluationObject.getExpression(), namespaceClient, sqlEvaluator.defaultConnectionString, sqlEvaluator.namedConnectionString));
      simpleEvaluationObject.setPeriodOfEvaluationInNanoseconds(System.nanoTime() - starTime);
    } catch (SQLException e) {
      simpleEvaluationObject.error(e.toString());
    } catch (ThreadDeath e) {
      simpleEvaluationObject.error(INTERUPTED_MSG);
    } catch (ReadVariableException e) {
      simpleEvaluationObject.error(e.getMessage());
    } catch (Throwable e) {
      logger.error(e.getMessage());
      simpleEvaluationObject.error(e.toString());
    }
  }
}
