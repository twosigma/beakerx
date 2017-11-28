package com.twosigma.beakerx.kernel.magic.command.functionality;

import static com.twosigma.beakerx.kernel.magic.command.functionality.MagicCommandUtils.splitPath;

import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandExecutionParam;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandFunctionality;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutcomeItem;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutcomeItem.Status;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutput;

public class ClasspathAddRepoMagicCommand implements MagicCommandFunctionality {

  public static final String CLASSPATH_PREFIX = "%classpath";
  public static final String CONFIG = "config";
  public static final String RESOLVER = "resolver";
  public static final String CLASSPATH_CONFIG_RESOLVER = CLASSPATH_PREFIX + " " + CONFIG + " " + RESOLVER;

  private KernelFunctionality kernel;

  public ClasspathAddRepoMagicCommand(KernelFunctionality kernel) {
    this.kernel = kernel;
  }

  @Override
  public MagicCommandOutcomeItem execute(MagicCommandExecutionParam param) {
    String command = param.getCommand();
    String[] split = splitPath(command);
    if (split.length != 5) {
      return new MagicCommandOutput(MagicCommandOutput.Status.ERROR, WRONG_FORMAT_MSG + CLASSPATH_CONFIG_RESOLVER);
    }

    String repoName = split[3];
    String urlName = split[4];

    String result = kernel.addRepo(repoName, urlName);
    if (result.isEmpty()) {
      return new MagicCommandOutput(Status.OK);
    } else {
      return new MagicCommandOutput(Status.OK, "Added new repo " + result);
    }
  }

  @Override
  public String getMagicCommandName() {
    return CLASSPATH_CONFIG_RESOLVER;
  }

  @Override
  public boolean matchCommand(String command) {
    String[] commandParts = MagicCommandUtils.splitPath(command);
    return commandParts.length > 2 && commandParts[0].equals(CLASSPATH_PREFIX) &&
      commandParts[1].equals(CONFIG) && commandParts[2].equals(RESOLVER);
  }
}
