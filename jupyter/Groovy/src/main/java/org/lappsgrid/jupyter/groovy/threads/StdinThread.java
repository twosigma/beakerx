package org.lappsgrid.jupyter.groovy.threads;

import org.lappsgrid.jupyter.groovy.GroovyKernel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.zeromq.ZMQ;

import com.twosigma.beaker.jupyter.threads.AbstractMessageReaderThread;

/**
 * Handling messages on the STDIN thread is not implemented yet.
 *
 * @author Keith Suderman
 */
public class StdinThread extends AbstractMessageReaderThread {

  public static final Logger logger = LoggerFactory.getLogger(StdinThread.class);

  public StdinThread(ZMQ.Socket socket, GroovyKernel kernel) {
    super(socket, kernel);
  }

  @Override
  public void run() {
    while (getRunning()) {
      byte[] buffer = getSocket().recv();
      logger.info("Stdin: {}", new String(buffer));
    }

    logger.info("StdinThread shutdown.");
  }
}