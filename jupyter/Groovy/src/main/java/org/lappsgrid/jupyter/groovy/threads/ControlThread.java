package org.lappsgrid.jupyter.groovy.threads;

import org.lappsgrid.jupyter.groovy.GroovyKernel;
import org.lappsgrid.jupyter.groovy.msg.Header;
import org.lappsgrid.jupyter.groovy.msg.Message;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.zeromq.ZMQ;

import static org.lappsgrid.jupyter.groovy.msg.Message.Type.SHUTDOWN_REPLY;
import static org.lappsgrid.jupyter.groovy.msg.Message.Type.SHUTDOWN_REQUEST;

import java.security.NoSuchAlgorithmException;

/**
 * @author Keith Suderman
 */
public class ControlThread extends AbstractThread {
    public ControlThread(ZMQ.Socket socket, GroovyKernel kernel) {
        super(socket, kernel);
    }

    public void run() {
        while (getRunning()) {
            Message message = readMessage();
            String type = message.getHeader().getType();
            if (type.equals(SHUTDOWN_REQUEST)) {
                logger.info("Control handler received a shutdown request");
                getKernel().shutdown();
                Message reply = new Message();
                reply.setHeader(new Header(SHUTDOWN_REPLY, message));
                reply.setParentHeader(message.getHeader());
                reply.setContent(message.getContent());
                try {
					send(reply);
				} catch (NoSuchAlgorithmException e) {
					System.out.println(e);
					logger.error(e.getMessage());
				}
            } else {
                logger.warn("Unhandled control message: {}", type);
            }

        }

        logger.info("ControlThread shutdown.");
    }

    public static final Logger logger = LoggerFactory.getLogger(ControlThread.class);
}
