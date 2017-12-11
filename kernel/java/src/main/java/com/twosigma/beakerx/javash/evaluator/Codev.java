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
package com.twosigma.beakerx.javash.evaluator;

import com.twosigma.beakerx.kernel.ImportPath;
import org.apache.commons.lang3.StringUtils;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Codev {

  private final String pname;
  Map<Integer, Integer> lineNumbersMapping = new HashMap<>();
  LineBrakingStringBuilderWrapper javaSourceCode = new LineBrakingStringBuilderWrapper();

  private String[] lines;
  private String code;
  private JavaEvaluator javaEvaluator;
  private int index = 0;

  public Codev(String code, JavaEvaluator javaEvaluator) {
    this.code = code;
    this.lines = code.split("\n");
    this.javaEvaluator = javaEvaluator;
    this.pname = configurePackage();
    configureImports();
  }

  public CodeLine getNotBlankLine() {
    if (this.index >= lines.length) {
      throw new RuntimeException("No more line");
    }
    this.index = skipBlankLines(this.index);
    return new CodeLine(this.index, lines[this.index]);
  }

  private int skipBlankLines(int ci) {
    while (ci < lines.length - 1 && StringUtils.isBlank(lines[ci])) {
      ci++;
    }
    return ci;
  }

  public String getLastLine() {
    return lines[lines.length - 1];
  }

  public void moveToNextLine() {
    if ((index != -1) && index < (lines.length - 1)) {
      index++;
    } else {
      index = -1;
    }
  }

  public String getPname() {
    return pname;
  }

  public String getCode() {
    return code;
  }

  public boolean hasLineToProcess() {
    return this.index != -1;
  }

  public static class CodeLine {
    private int index;
    private String line;

    public CodeLine(int index, String line) {
      this.index = index;
      this.line = line;
    }

    public int getIndex() {
      return index;
    }

    public String getLine() {
      return line;
    }
  }

  private void configureImports() {
    if (hasLineToProcess()) {
      Pattern p = Pattern.compile("\\s*import(\\s+static)?\\s+((?:[a-zA-Z]\\w*)(?:\\.[a-zA-Z]\\w*)*(?:\\.\\*)?);.*");
      Codev.CodeLine codeLine = getNotBlankLine();
      Matcher m = p.matcher(codeLine.getLine());
      while (m.matches()) {
        String impstr = m.group(2);
        String staticModifier = m.group(1);
        javaSourceCode.append("import ");
        if (staticModifier != null) {
          javaSourceCode.append("static ");
        }
        javaSourceCode.append(impstr);
        javaSourceCode.append(";\n");
        lineNumbersMapping.put(javaSourceCode.getLinesCount(), codeLine.getIndex());

        moveToNextLine();
        if (!hasLineToProcess()) {
          break;
        }
        codeLine = getNotBlankLine();
        m = p.matcher(codeLine.getLine());
      }
    }
  }

  private String configurePackage() {
    String pname = javaEvaluator.getPackageId();
    Codev.CodeLine codeLine = getNotBlankLine();
    Pattern p = Pattern.compile("\\s*package\\s+((?:[a-zA-Z]\\w*)(?:\\.[a-zA-Z]\\w*)*);.*");
    Matcher m = p.matcher(codeLine.getLine());

    if (m.matches()) {
      pname = m.group(1);
      lineNumbersMapping.put(1, codeLine.getIndex());
      moveToNextLine();
    }
    javaSourceCode.append("package ");
    javaSourceCode.append(pname);
    javaSourceCode.append(";\n");

    for (ImportPath i : javaEvaluator.getImports().getImportPaths()) {
      javaSourceCode.append("import ");
      javaSourceCode.append(i.asString());
      javaSourceCode.append(";\n");
    }
    return pname;
  }

  public static class LineBrakingStringBuilderWrapper {
    private static final String LINE_BREAK = "\n";
    private StringBuilder delegate;
    private int linesCount;

    public LineBrakingStringBuilderWrapper() {
      this.delegate = new StringBuilder();
      this.linesCount = 0;
    }

    public void append(String string) {
      this.delegate.append(string);
      this.linesCount += StringUtils.countMatches(string, LINE_BREAK);
    }

    public int getLinesCount() {
      return linesCount;
    }

    @Override
    public String toString() {
      return delegate.toString();
    }
  }


}
