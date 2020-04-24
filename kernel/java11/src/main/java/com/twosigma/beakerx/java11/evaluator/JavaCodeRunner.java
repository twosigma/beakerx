/*
 *  Copyright 2020 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beakerx.java11.evaluator;

import com.twosigma.beakerx.TryResult;
import com.twosigma.beakerx.evaluator.JobDescriptor;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import jdk.jshell.Diag;
import jdk.jshell.Snippet;
import jdk.jshell.SnippetEvent;
import jdk.jshell.SourceCodeAnalysis.CompletionInfo;
import org.apache.commons.lang3.StringUtils;
import org.jetbrains.annotations.Nullable;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.concurrent.Callable;

import static com.twosigma.beakerx.evaluator.BaseEvaluator.INTERUPTED_MSG;
import static com.twosigma.beakerx.util.Preconditions.checkNotNull;
import static java.util.stream.Collectors.toList;

class JavaCodeRunner implements Callable<TryResult> {

  private final SimpleEvaluationObject theOutput;
  private JobDescriptor j;
  private JavaEvaluator javaEvaluator;

  public JavaCodeRunner(JavaEvaluator javaEvaluator, SimpleEvaluationObject out, JobDescriptor j) {
    this.javaEvaluator = javaEvaluator;
    this.theOutput = checkNotNull(out);
    this.j = j;
  }

  @Override
  public TryResult call() throws Exception {
    TryResult either;
    try {
      theOutput.setOutputHandler();
      either = runCode(j);
    } catch (Throwable e) {
      if ((e instanceof InterruptedException) || (e instanceof ThreadDeath)) {
        either = TryResult.createError(INTERUPTED_MSG);
      } else {
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw);
        e.printStackTrace(pw);
        either = TryResult.createError(sw.toString());
      }
    } finally {
      theOutput.clrOutputHandler();
    }
    return either;
  }


  private TryResult runCode(JobDescriptor j) {
    j.outputObject.started();
    String code = j.codeToBeExecuted;
    try {
      CompletionInfo info = analyze(code);
      List<SnippetEvent> snippetsList = new ArrayList<>();
      while (isComplete(info)) {
        snippetsList = javaEvaluator.getJshell().eval(info.source());
        SnippetEvent snippetEvent = snippetsList.get(0);
        if (!snippetEvent.status().equals(Snippet.Status.VALID)) {
          String message = createErrorMessage(snippetEvent.snippet());
          return TryResult.createError(message);
        }
        info = analyze(info.remaining());
      }
      return TryResult.createResult(getResult(snippetsList.get(0)));
    } catch (Exception e) {
      return TryResult.createError(e.getMessage());
    }
  }

  @Nullable
  private Object getResult(SnippetEvent snippet) {
    String uuid = snippet.value();
    if (uuid == null) {
      return null;
    }
    return javaEvaluator.getExecutionControl().getObject(uuid);
  }

  private String createErrorMessage(Snippet sn) {
    List<Diag> diagnostics = javaEvaluator.getJshell().diagnostics(sn).collect(toList());
    String source = sn.source();
    List<String> message = new ArrayList<>();
    for (Diag d : diagnostics) {
      message.add(d.getMessage(Locale.ENGLISH));
    }
    return source + System.lineSeparator() + StringUtils.join(message, System.lineSeparator());
  }


  private boolean isComplete(CompletionInfo info) {
    return info.completeness().isComplete();
  }

  private CompletionInfo analyze(String code) {
    return javaEvaluator.getJshell().sourceCodeAnalysis().analyzeCompletion(code);
  }

}
