package com.twosigma.beaker.groovy;

import com.twosigma.beaker.evaluator.Evaluator;
import com.twosigma.beaker.evaluator.GroovyEvaluator;
import com.twosigma.beaker.groovy.comm.GroovyCommOpenHandler;
import com.twosigma.beaker.jupyter.handler.CommOpenHandler;
import com.twosigma.jupyter.ConfigurationFile;
import com.twosigma.jupyter.KernelConfigurationFile;
import com.twosigma.jupyter.Kernel;
import java.io.IOException;
import static com.twosigma.beaker.jupyter.Utils.uuid;

public class GroovyKernel extends Kernel {

  public GroovyKernel(final String id, final Evaluator evaluator, ConfigurationFile config) {
    super(id, evaluator, config);
  }

  public CommOpenHandler getCommOpenHandler(Kernel kernel) {
    return new GroovyCommOpenHandler(kernel);
  }

  public static void main(final String[] args) throws InterruptedException, IOException {
    String id = uuid();
    GroovyKernel kernel = new GroovyKernel(id, new GroovyEvaluator(id, id), new KernelConfigurationFile(args));
    runKernel(kernel);
  }
}