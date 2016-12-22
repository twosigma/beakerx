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

package com.twosigma.beaker.scala.utils

import scala.tools._
import java.util.ArrayList
import java.util.Map
import java.io.PrintStream
import java.io.File
import java.io.BufferedReader
import java.io.FileReader

import com.twosigma.beaker.jvm.`object`.SimpleEvaluationObject
import com.twosigma.beaker.jvm.`object`.SparkProgressService

import scala.collection.JavaConversions._
import scala.collection.JavaConverters._
import scala.collection.mutable.ListBuffer
import scala.util.Random
import org.apache.spark._
import org.apache.spark.rdd.RDD
import org.apache.spark.scheduler._
import org.apache.spark.sql.SQLContext
import org.apache.log4j._
import com.google.common.io.Files
import com.twosigma.beaker.scala.util.{BeakerScalaEvaluator, ScalaEvaluator}
//import com.twosigma.vats.publicapi.pack.PackInfo
import org.slf4j.{Logger, LoggerFactory}

object BeakerSparkContextManager {
  private val log: Logger = LoggerFactory.getLogger(getClass)

  private val random = new Random()


  private var running = false
  private var error = ""
  private var sc: SparkContext = null
  private var sqlContext: SQLContext = null

  private var cookIdLogFolder: File = null
  //private val universeHash = PackInfo.load().getUniverseHash

  private var conf = new SparkConf().setAppName("beaker")
    .setMaster("cook://codete@localhost:12321")
    .set("spark.executor.memory", "8g")
    .set("spark.cook.cores.per.job.max", "5")
    .set("spark.driver.memory", "20G")
    .set("spark.cores.max", "100")
    .set("spark.repl.class.uri", BeakerScalaEvaluator.classURI)
    .set("spark.scheduler.minRegisteredResourcesRatio", "0.0")
    
  private var configuration = new BeakerSparkConfiguration
  configuration.setSparkConf(conf.getAll.toMap.asJava)

  def configure(c: BeakerSparkConfiguration): BeakerSparkConfiguration = {
    c.getSparkConf.foreach {
      case (key, value) => {
        conf.set(key, value)
        log.debug(s"Setting $key = $value")
      }
    }
    c.setSparkConf(conf.getAll.toMap.asJava)
    configuration = c
    configuration
  }

  def start(progressService: SparkProgressService): SparkContext = {
    log.trace("Initializing SparkContext")
    error = ""

    if (!running || sc == null) {
      try {
        var self = this
        // create temp folder where the Cook job UUIDs are logged
        // (Cook creates a separate log-file per job that only stores a single UUID)
        cookIdLogFolder = Files.createTempDir()
        conf.set("spark.cook.executoruuid.log", s"${cookIdLogFolder.getAbsolutePath}/beakercookjobid.log")

        // assign new random port for Spark UI every time the context is (re)created
        conf.set("spark.ui.port", (random.nextInt(4080 - 4040) + 4040).toString)
        log.debug("Spark Port Number: " + conf.get("spark.ui.port"))
        configuration.updateSparkConfProperty("spark.ui.port", conf.get("spark.ui.port"))
        val useOverrides = System.getProperties.get("twosigma.spark.overrides")
        if (useOverrides != null) {
            // Use any spark variables from the Java environment as overrides
            for ((k, v) <- System.getProperties if k.startsWith("spark.")) {
                conf.set(k, v)
            }
        }
        sc = new SparkContext(conf)
        sqlContext = new SQLContext(sc)
        running = true
        sc.addSparkListener(new SparkListener() {
          override def onApplicationStart(applicationStart: SparkListenerApplicationStart) {
            progressService.applicationStart(applicationStart.appName)
          }
          override def onApplicationEnd(applicationEnd: SparkListenerApplicationEnd) {
            progressService.applicationEnd()
          }
          override def onJobStart(jobStart: SparkListenerJobStart) {
            progressService.jobStart(jobStart.jobId, self.getCookJobIds)
          }
          override def onJobEnd(jobEnd: SparkListenerJobEnd) {
            progressService.jobEnd(jobEnd.jobId, self.getCookJobIds)
          }
          override def onStageSubmitted(stageSubmitted: SparkListenerStageSubmitted) {
            progressService.stageStart(stageSubmitted.stageInfo.stageId, stageSubmitted.stageInfo.numTasks)
          }
          override def onStageCompleted(stageCompleted: SparkListenerStageCompleted) {
            progressService.stageEnd(stageCompleted.stageInfo.stageId, stageCompleted.stageInfo.failureReason.getOrElse(null))
          }
          override def onTaskStart(taskStart: SparkListenerTaskStart) {
            progressService.taskStart(taskStart.stageId, taskStart.taskInfo.taskId)
          }
          override def onTaskEnd(taskEnd: SparkListenerTaskEnd) {
            progressService.taskEnd(taskEnd.stageId, taskEnd.taskInfo.taskId, taskEnd.taskInfo.failed)
          }
        })
      } catch {
        case e: java.net.BindException => {
          log.error(s"BindException during SparkContext initialization: ${e.getMessage}", e)
          error = s"BindException during SparkContext initialization: ${e.getMessage}"
        }
        case e: Throwable => {
          log.error(s"Error during SparkContext initialization: ${e.getMessage}", e)
          error = s"Error during SparkContext initialization: ${e.getMessage}"
        }
      }
    }
    sc
  }

  def stop = {
    try {
      if (sc != null) {
        sc.stop()
      }
      running = false
      if (cookIdLogFolder != null) {
        cookIdLogFolder.delete()
        cookIdLogFolder = null
      }
    } catch {
      case e: Throwable => {
        log.error(s"Error while stopping SparkContext: ${e.getMessage}", e)
        error = s"Error while stopping SparkContext: ${e.getMessage}"
      }
    }
  }

  def getSparkContext: SparkContext = {
    sc
  }

  def getSqlContext: SQLContext = {
    sqlContext
  }

  def getConfiguration: BeakerSparkConfiguration = {
    configuration
  }

  def getSparkConf: SparkConf = {
    conf
  }

  def isRunning: Boolean = {
    running
  }

  def cancelAllJobs() = {
    if (sc != null)
      sc.cancelAllJobs()
  }

  def getError: String = {
    error
  }

  def getCookJobIds: java.util.List[String] = {
    val buffer = ListBuffer.empty[String]
    if (cookIdLogFolder == null || !cookIdLogFolder.exists || !cookIdLogFolder.isDirectory)
      return buffer.toList.asJava
    
    cookIdLogFolder.listFiles.filter(f => f.isFile && f.getName.startsWith("beakercookjobid.log")).foreach {
      case f:File => {
        var brTest = new BufferedReader(new FileReader(f))
        buffer += brTest.readLine
      }
    }
    buffer.toList.asJava
  }
}
