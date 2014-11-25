package com.twosigma.beaker.scala.util;

import java.util.concurrent.ArrayBlockingQueue;
import scala.tools.nsc.interpreter.IMain;
import scala.tools.nsc.Settings;
import scala.tools.nsc.interpreter.Results.Error;
import scala.tools.nsc.interpreter.Results.Success;

import com.twosigma.beaker.jvm.`object`.SimpleEvaluationObject;

case class ResetState(val state: String);

class ScalaEvaluatorGlue(val cl: ClassLoader, var cp: String) {
  val settings = {
    val s = new Settings();
    s.bootclasspath.value = cp;
    s.embeddedDefaults(cl);
    s;
  }
  private val baos = new java.io.ByteArrayOutputStream();
  
  var interpreter = {
    var i = new IMain(settings, new java.io.PrintWriter(baos));
    i.setContextClassLoader();
    i;
  }
  
  private def getOut: Any = {
    val lvo = interpreter.valueOfTerm(interpreter.mostRecentVar);
    lvo match {
      case None => baos.toString();
      case Some(ResetState("reset")) => baos.toString();
      case Some(value) => value;
    }
  }
  
  def addImport(name : String): Boolean = {
      try {
      interpreter.interpret("import "+name) match {
        case Success => true;
        case _ => false;
      }
    } catch {
      case ex: Throwable => false;
    }
  }
  
  def evaluate(out: SimpleEvaluationObject, code: String) {
    out.started();
    try {
      interpreter.interpret(code) match {
        case Success => out.finished(getOut.asInstanceOf[java.lang.Object]);
        case _ => out.error("ERROR");
      }
    } catch {
      case ex: Throwable => out.error(ex);
    }
  }
  
}