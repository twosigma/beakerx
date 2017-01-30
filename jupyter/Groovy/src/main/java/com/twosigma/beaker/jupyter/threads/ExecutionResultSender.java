package com.twosigma.beaker.jupyter.threads;

import java.security.NoSuchAlgorithmException;
import java.util.Observable;
import java.util.Observer;
import java.util.concurrent.ConcurrentLinkedQueue;

import org.lappsgrid.jupyter.groovy.GroovyKernel;
import org.lappsgrid.jupyter.groovy.handler.AbstractHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.twosigma.beaker.groovy.SimpleEvaluationObject;
import com.twosigma.beaker.groovy.SimpleEvaluationObject.EvaluationStatus;
import com.twosigma.beaker.jupyter.handler.ExecuteResultHandler;

public class ExecutionResultSender implements Observer{

  public static Logger logger = LoggerFactory.getLogger(ExecutionResultSender.class);
  
  protected AbstractHandler<SimpleEvaluationObject> handler = null;
  protected final ConcurrentLinkedQueue<SimpleEvaluationObject> jobQueue = new ConcurrentLinkedQueue<>();
  protected AbstractThread workingThread = null;
  
  public ExecutionResultSender(GroovyKernel kernel) {
    handler = new ExecuteResultHandler(kernel);
  }
  
  //TODO delete
/*  public synchronized void update_OLD(Observable o, Object arg) {
    SimpleEvaluationObject seo = (SimpleEvaluationObject)o;
    if(seo != null && (EvaluationStatus.FINISHED == seo.getStatus() || EvaluationStatus.ERROR == seo.getStatus())){
      jobQueue.add(seo);
      if(workingThread == null || !workingThread.isAlive()){
        workingThread = new MyRunnable();
        workingThread.start();
      }
    }
  }*/
  
  @Override
  public synchronized void update(Observable o, Object arg) {
    SimpleEvaluationObject seo = (SimpleEvaluationObject)o;
    if(seo != null){
      jobQueue.add(seo);
      if(workingThread == null || !workingThread.isAlive()){
        workingThread = new MyRunnable();
        workingThread.start();
      }
    }
  }
  
  protected class MyRunnable extends AbstractThread {

    @Override
    public boolean getRunning() {
      return running && !jobQueue.isEmpty();
    }
    
    @Override
    public void run() {
      while (getRunning()) {
        SimpleEvaluationObject job = jobQueue.poll();
        if (handler != null && job != null) {
          try {
            handler.handle(job);
          } catch (NoSuchAlgorithmException e) {
            System.out.println(e);
            logger.error(e.getMessage());
          }
        }
      }
      logger.info("ShellThread shutdown.");
    }
  }
 
  public void exit() {
    if(workingThread != null){
      workingThread.halt();
    }
  }
  
}