package com.twosigma.beaker.jupyter.threads;

import java.security.NoSuchAlgorithmException;
import java.util.Observable;
import java.util.Observer;
import java.util.concurrent.ConcurrentLinkedQueue;

import org.lappsgrid.jupyter.groovy.GroovyKernel;
import org.lappsgrid.jupyter.groovy.handler.AbstractHandler;
import org.lappsgrid.jupyter.groovy.threads.AbstractThread;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.zeromq.ZMQ.Socket;

import com.twosigma.beaker.groovy.SimpleEvaluationObject;
import com.twosigma.beaker.groovy.SimpleEvaluationObject.EvaluationStatus;
import com.twosigma.beaker.jupyter.handler.ExecuteResultHandler;


public class ExecuteResultThread extends AbstractThread implements Observer{

  public static Logger logger = LoggerFactory.getLogger(ExecuteResultThread.class);

  protected final ConcurrentLinkedQueue<SimpleEvaluationObject> jobQueue = new ConcurrentLinkedQueue<>();
  protected AbstractHandler<SimpleEvaluationObject> handler = null;
  
  public ExecuteResultThread(Socket socket, GroovyKernel kernel) {
    super(socket, kernel);
    handler = new ExecuteResultHandler(kernel);
  }

  public void run() {
    while (getRunning()) {
      SimpleEvaluationObject job = jobQueue.poll();
      if (handler != null && job!=null) {
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

  @Override
  public synchronized void update(Observable o, Object arg) {
    SimpleEvaluationObject seo = (SimpleEvaluationObject)o;
    if(seo != null && (EvaluationStatus.FINISHED == seo.getStatus() || EvaluationStatus.ERROR == seo.getStatus())){
      jobQueue.add(seo);
    }
  }
  
}