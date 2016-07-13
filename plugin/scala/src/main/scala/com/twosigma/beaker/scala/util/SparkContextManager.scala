/*
 *  Copyright 2014-2016 TWO SIGMA OPEN SOURCE, LLC
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
 
package com.twosigma.beaker.scala.util

import java.util.concurrent.ArrayBlockingQueue
import scala.tools.nsc.Settings
import scala.tools.nsc.interpreter.Results.Error
import scala.tools.nsc.interpreter.Results.Success
import scala.tools._ 
import nsc.interpreter.{Completion, CompletionAware, IMain, 
JLineCompletion, JLineDelimiter, JList, Parsed, Results, IR} 
import Completion.{Candidates, ScalaCompleter} 

import jline.console.completer.{Completer, ArgumentCompleter} 
import java.util.ArrayList
import java.util.Map
import java.io.PrintStream
import com.twosigma.beaker.jvm.`object`.SparkProgressService
import scala.collection.JavaConversions._
import scala.util.Random

import org.apache.spark._
import org.apache.spark.rdd.RDD
import org.apache.spark.scheduler._

import com.twosigma.base.log4j.TSLogger

class SparkContextManager {
  private val random = new Random()
  private val log = TSLogger.getTSLogger()

  private var running = false
  private var error = ""
  private var sc: SparkContext = null

  private var conf = new SparkConf().setAppName("beaker")
    .setMaster("spark://localhost")
    .set("spark.cores.max", "10")
    .set("spark.executor.memory", "8g")

  def configure(configuration: java.util.Map[String, String]) = {
    if (configuration.containsKey("master")) {
      val master = configuration.get("master")
      log.debug(s"The master is $master.")
      conf.setMaster(master)
    }
    configuration.foreach {
      case ("master", _) => ()
      case (key, value) => {
        conf.set(key, value)
        log.debug(s"Setting $key = $value")
      }
    }
  }

  def start(progressService: SparkProgressService): SparkContext = {
    log.trace("Initializing SparkContext")
    error = ""

    if (!running || sc == null) {
      try {
        // assign new random port for Spark UI every time the context is (re)created
        conf.set("spark.ui.port", (random.nextInt(4080 - 4040) + 4040).toString())
        sc = new SparkContext(conf)
        sc.addSparkListener(new SparkListener() {
          override def onApplicationStart(applicationStart: SparkListenerApplicationStart) {
            //log.debug("Spark ApplicationStart: " + applicationStart.appName)
            progressService.applicationStart(applicationStart.appName)
          }
          override def onApplicationEnd(applicationEnd: SparkListenerApplicationEnd) {
            //log.debug("Spark ApplicationEnd: " + applicationEnd.time)
            progressService.applicationEnd()
          }
          override def onJobStart(jobStart: SparkListenerJobStart) {
            //log.debug("Spark JobStart: " + jobStart.jobId)
            progressService.jobStart(jobStart.jobId)
          }
          override def onJobEnd(jobEnd: SparkListenerJobEnd) {
            //log.debug("Spark JobEnd: " + jobEnd.time)
            progressService.jobEnd(jobEnd.jobId)
          }
          override def onStageSubmitted(stageSubmitted: SparkListenerStageSubmitted) {
            //log.debug(s"Spark StageSubmitted: ${stageSubmitted.stageInfo.stageId} [${stageSubmitted.stageInfo.name}] (${stageSubmitted.stageInfo.numTasks} tasks started)")
            progressService.stageStart(stageSubmitted.stageInfo.stageId, stageSubmitted.stageInfo.numTasks)
          }
          override def onStageCompleted(stageCompleted: SparkListenerStageCompleted) {
            //log.debug(s"Spark StageCompleted: ${stageCompleted.stageInfo.stageId} [${stageCompleted.stageInfo.name}]  (${stageCompleted.stageInfo.numTasks} tasks started)")
            progressService.stageEnd(stageCompleted.stageInfo.stageId, stageCompleted.stageInfo.failureReason.getOrElse(null))
          }
          override def onTaskStart(taskStart: SparkListenerTaskStart) {
            //log.debug(s"Spark TaskStart: ${taskStart.taskInfo.taskId} (Stage ${taskStart.stageId})")
            progressService.taskStart(taskStart.stageId, taskStart.taskInfo.taskId)
          }
          override def onTaskEnd(taskEnd: SparkListenerTaskEnd) {
            //log.debug(s"Spark TaskEnd: ${taskEnd.taskInfo.taskId} (Stage ${taskEnd.stageId})")
            progressService.taskEnd(taskEnd.stageId, taskEnd.taskInfo.taskId, taskEnd.taskInfo.failed)
          }
        })
      } catch {
        case e: java.net.BindException => {
          log.error(s"BindException during SparkContext initialization: ${e.getMessage}")
        }
        case e: Throwable => {
          log.error(s"Error during SparkContext initialization: ${e.getMessage}")
        }
      }
    }
    running = true
    sc
  }

  def stop = {
    try {
      if (sc != null) {
        sc.stop()
      }
      running = false
    } catch {
      case e: Throwable => {
        log.error(s"Error while stopping SparkContext: ${e.getMessage}")
      }
    }
  }

  def getContext: SparkContext = {
    sc
  }

  def getConfiguration: SparkConf = {
    conf
  }

  def isRunning: Boolean = {
    running
  }

  def cancelAllJobs() = {
    sc.cancelAllJobs()
  }

  def getError: String = {
    error
  }
}

object SparkContextManagerObj extends SparkContextManager {}
