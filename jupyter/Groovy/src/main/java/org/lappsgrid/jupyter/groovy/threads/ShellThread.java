package org.lappsgrid.jupyter.groovy.threads;

import java.security.NoSuchAlgorithmException;

import org.lappsgrid.jupyter.groovy.GroovyKernel;
import org.lappsgrid.jupyter.groovy.handler.IHandler;
import org.lappsgrid.jupyter.groovy.msg.Message;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.zeromq.ZMQ;

/**
 * @author Keith Suderman
 */
public class ShellThread extends AbstractThread {

  public static Logger logger = LoggerFactory.getLogger(ShellThread.class);

  public ShellThread(ZMQ.Socket socket, GroovyKernel kernel) {
    super(socket, kernel);
  }

  @Override
  public void run() {
    while (getRunning()) {
      Message message = readMessage();
      logger.info("Processing message = " + message.type());
      IHandler<Message> handler = getKernel().getHandler(message.type());
      if (handler != null) {
        try {
          handler.handle(message);
        } catch (NoSuchAlgorithmException e) {
          System.out.println(e);
          logger.error(e.getMessage());
        }
      } else {
        logger.warn("Unhandled message type: {}", message.type());
      }
    }
    logger.info("ShellThread shutdown.");
  }
}