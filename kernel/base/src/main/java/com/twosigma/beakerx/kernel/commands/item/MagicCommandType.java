package com.twosigma.beakerx.kernel.commands.item;

import com.twosigma.beakerx.kernel.commands.MagicCommandFunctionality;

public final class MagicCommandType {
  private final String command;
  private final String parameters;
  private final MagicCommandFunctionality functionality;
  private final String suitableKernelsNames;

  public MagicCommandType(String command, String parameters,
      MagicCommandFunctionality functionality, String suitableKernelsNames) {
    this.command = command;
    this.parameters = parameters;
    this.functionality = functionality;
    this.suitableKernelsNames = suitableKernelsNames;
  }

  public String getCommand() {
    return command;
  }

  public String getParameters() {
    return parameters;
  }

  public MagicCommandFunctionality getFunctionality() {
    return functionality;
  }

  public String getSuitableKernelsNames() {
    return suitableKernelsNames;
  }
}
