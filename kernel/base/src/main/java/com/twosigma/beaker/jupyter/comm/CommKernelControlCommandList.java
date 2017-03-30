package com.twosigma.beaker.jupyter.comm;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.twosigma.jupyter.KernelFunctionality;
import com.twosigma.jupyter.message.Message;

public class CommKernelControlCommandList extends CommBaseHandler<Boolean> {

	private static final Logger logger = LoggerFactory.getLogger(CommKernelControlCommandList.class);

  public static final String GET_KERNEL_CONTROL_COMMAND_LIST = "get_kernel_control_command_list";
  public static final String KERNEL_CONTROL_RESPONSE = "kernel_control_response";
	
	public CommKernelControlCommandList(KernelFunctionality kernel) {
	    super(kernel);
	  }

	  @Override
	  public void handle(Message message)  {
	    logger.info("Handing comm message content");
	    Boolean value = getValueFromData(message, getHandlerCommand());
	    if(value != null && value.booleanValue()){
	      HashMap<String, Serializable> data = new HashMap<>();
        data.put(KERNEL_CONTROL_RESPONSE, getCommKernelControlCommandList());
        publish(createReplyMessage(message, data));
	    }
	  }
	  
	  protected String[] getCommKernelControlCommandList(){
	    List<String> ret = new ArrayList<>();
	    ret.add(GET_KERNEL_CONTROL_COMMAND_LIST);
	    ret.add(CommKernelControlGetDefaultShellHandler.GET_DEFAULT_SHELL);
	    ret.add(CommKernelControlInterrupt.KERNEL_INTERRUPT);
	    ret.add(CommKernelControlSetShellHandler.CLASSPATH);
	    ret.add(CommKernelControlSetShellHandler.IMPORTS);
	    return ret.toArray(new String[ret.size()]);
	  }

    @Override
    public String getHandlerCommand() {
      return GET_KERNEL_CONTROL_COMMAND_LIST;
    }
    
}