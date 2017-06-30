/*
 *  Copyright 2014-2017 TWO SIGMA OPEN SOURCE, LLC
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

package com.twosigma.beakerx.scala.evaluator;

import com.twosigma.beakerx.autocomplete.AutocompleteResult
import com.twosigma.beakerx.jvm.`object`.SimpleEvaluationObject

import scala.tools.jline_embedded.console.completer.Completer
import scala.tools.nsc.Settings
import scala.tools.nsc.interpreter.Completion.Candidates
import scala.tools.nsc.interpreter.Results.{Error, Incomplete, Success}
import scala.tools.nsc.interpreter.{Completion, IMain, JList, PresentationCompilerCompleter}

case class ResetState(val state: String);

class ScalaEvaluatorGlue(val cl: ClassLoader, var cp: String, val replClassdir: String) {
  val settings = {
    val s = new Settings();
    s.processArguments(List("-Yrepl-class-based",
        "-Yrepl-outdir", replClassdir), true)
    s.bootclasspath.value = cp;
    s.classpath.value = cp;
    s.usejavacp.value = true;
    s.termConflict.value = "package";
    s.embeddedDefaults(cl);
    s;
  }
  private val baos = new java.io.ByteArrayOutputStream();

  private def scalaToJline(completion: Completion): Completer =
    (_buf: String, cursor: Int, candidates: JList[CharSequence]) => {
      val buf = if (_buf == null) "" else _buf
      val Candidates(newCursor, newCandidates) = completion.complete(buf, cursor)
      newCandidates foreach (candidates add _)
      newCursor
    }
  
  var interpreter = {
    var i = new IMain(settings, new java.io.PrintWriter(baos));
    i.setContextClassLoader();
    i;
  }
  
  val completer = scalaToJline(new PresentationCompilerCompleter(interpreter))

  private def getOut: Any = {
    try {
      interpreter.lastRequest.lineRep.call("$result")
    } catch {
      case e: Exception =>
        val lvo = interpreter.valueOfTerm(interpreter.mostRecentVar)
        lvo match {
          case None => baos.toString();
          case Some(ResetState("reset")) => baos.toString();
          case Some(value) => value;
        }
    }
  }
  
  def addImport(name : String): Boolean = {
    baos.reset();
      try {
      interpreter.interpret("import "+name) match {
        case Success => true;
        case _ => false;
      }
    } catch {
      case ex: Throwable => false;
    }
  }
  
  def evaluate2(code: String): String = {
    baos.reset();
    try {
      interpreter.interpret(code) match {
        case Success => "";
        case Incomplete => "input is incomplete"
        case Error => baos.toString();
      }
    } catch {
      case ex: Throwable => ex.toString();
    }
  }
  
  def evaluate(out: SimpleEvaluationObject, code: String) {
    baos.reset();
    out.setOutputHandler();
    out.started();
    try {
      interpreter.interpret(code) match {
        case Success => out.finished(getOut.asInstanceOf[java.lang.Object]);
        case Incomplete => out.error("input is incomplete")
        case Error => out.error(baos.toString());
      }
    } catch {
      case ex: Throwable => out.error(ex);
    }
    out.clrOutputHandler();
  }

  def autocomplete(buf: String, len : Integer): AutocompleteResult = {
    val maybes = new java.util.ArrayList[CharSequence];
    val offset = completer.complete(buf,  len, maybes);
    // There must be a better way to do this
    import scala.collection.JavaConverters._
    new AutocompleteResult(maybes.asScala.map(_.toString).asJava, offset)
  }
}
