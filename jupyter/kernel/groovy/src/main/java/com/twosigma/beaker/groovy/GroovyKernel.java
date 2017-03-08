package com.twosigma.beaker.groovy;

import com.twosigma.beaker.evaluator.Evaluator;
import com.twosigma.beaker.evaluator.GroovyEvaluator;
import com.twosigma.beaker.groovy.comm.GroovyCommOpenHandler;
import com.twosigma.beaker.jupyter.handler.CommOpenHandler;
import org.lappsgrid.jupyter.Kernel;

import java.io.File;
import java.io.IOException;

public class GroovyKernel extends Kernel {

	@Override
  public Evaluator getEvaluator(Kernel kernel) {
		return new GroovyEvaluator(kernel.getId(), kernel.getId());
	}
	
	public CommOpenHandler getCommOpenHandler(Kernel kernel){
	  return new GroovyCommOpenHandler(kernel);
	}

  public static void main(final String[] args) throws InterruptedException, IOException {
    File config = getConfig(args);
    GroovyKernel kernel = new GroovyKernel();
    runKernel(config, kernel);
  }

}