package org.lappsgrid.jupyter.groovy.threads;

import org.lappsgrid.jupyter.groovy.GroovyKernel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.zeromq.ZMQ;

import com.twosigma.beaker.jupyter.threads.AbstractMessageReaderThread;

/**
 * @author Keith Suderman
 */
public class HeartbeatThread extends AbstractMessageReaderThread {

  public static final Logger logger = LoggerFactory.getLogger(HeartbeatThread.class);

  public HeartbeatThread(ZMQ.Socket socket, GroovyKernel kernel) {
    super(socket, kernel);
  }

  @Override
  public void run() {
    while (getRunning()) {
      byte[] buffer = getSocket().recv(0);
      getSocket().send(buffer);
    }

    logger.info("HearbeatThread shutdown.");
  }

}