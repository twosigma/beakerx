package cn.bluejoe.elfinder.controller.executor;

public interface CommandExecutorFactory
{
	CommandExecutor get(String commandName);
}