package cn.bluejoe.elfinder.controller;

import java.io.IOException;

public class FsException extends IOException
{

	public FsException(String message)
	{
		super(message);
	}

	public FsException(String message, Throwable e)
	{
		super(message, e);
	}

}
