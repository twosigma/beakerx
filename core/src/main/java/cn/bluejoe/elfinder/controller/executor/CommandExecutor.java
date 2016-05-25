package cn.bluejoe.elfinder.controller.executor;

public interface CommandExecutor
{
	void execute(CommandExecutionContext commandExecutionContext) throws Exception;
}
