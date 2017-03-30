package com.twosigma.beaker.jupyter.comm;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.twosigma.jupyter.KernelFunctionality;
import com.twosigma.jupyter.handler.KernelHandler;
import com.twosigma.jupyter.message.Message;

public class CommKernelControlCommandList extends KernelHandler<Message> {

	private static final Logger logger = LoggerFactory.getLogger(CommKernelControlCommandList.class);

	public CommKernelControlCommandList(KernelFunctionality kernel) {
	    super(kernel);
	  }

	@Override
	public void handle(Message message) {

	}

}