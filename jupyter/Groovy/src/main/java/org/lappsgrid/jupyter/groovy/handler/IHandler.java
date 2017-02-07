package org.lappsgrid.jupyter.groovy.handler;

import java.security.NoSuchAlgorithmException;

/**
 * Defines objects that can respond to Jupyter messages. There will be one
 * handler for each ZMQ.Socket.
 *
 * @author Keith Suderman
 */
public interface IHandler <T>{
  
   void handle(T message) throws NoSuchAlgorithmException;
   
}