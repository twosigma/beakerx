package org.lappsgrid.jupyter.groovy.handler;

import java.security.NoSuchAlgorithmException;

import org.lappsgrid.jupyter.groovy.GroovyKernel;
import org.lappsgrid.jupyter.groovy.msg.Message;
import org.slf4j.Logger;
import org.zeromq.ZMQ;

/**
 * The AbstractHandler class is the base class for all the other socket handlers
 * and provides some default helper methods.
 *
 * @author Keith Suderman
 */
public abstract class AbstractHandler implements IHandler {

  protected Logger logger;
  protected GroovyKernel kernel;

  public AbstractHandler(GroovyKernel kernel) {
    this.kernel = kernel;
  }

  /**
   * Sends to the shell socket by default.
   * 
   * @throws NoSuchAlgorithmException
   */
  public void send(Message message) throws NoSuchAlgorithmException {
    kernel.send(message);
  }

  /**
   * Sends a message to the specified socket.
   * 
   * @throws NoSuchAlgorithmException
   */
  public void send(ZMQ.Socket socket, Message message) throws NoSuchAlgorithmException {
    kernel.send(socket, message);
  }

  /**
   * Sends the message to the IOPub socket.
   * 
   * @throws NoSuchAlgorithmException
   */
  public void publish(Message message) throws NoSuchAlgorithmException {
    kernel.publish(message);
  }

}