package cn.bluejoe.elfinder.impl;

import cn.bluejoe.elfinder.service.FsItem;
import cn.bluejoe.elfinder.service.FsSecurityChecker;
import cn.bluejoe.elfinder.service.FsService;

public class FsSecurityCheckForAll implements FsSecurityChecker
{
	boolean _locked = false;

	boolean _readable = true;

	boolean _writable = true;

	public boolean isLocked()
	{
		return _locked;
	}

	@Override
	public boolean isLocked(FsService fsService, FsItem fsi)
	{
		return _locked;
	}

	public boolean isReadable()
	{
		return _readable;
	}

	@Override
	public boolean isReadable(FsService fsService, FsItem fsi)
	{
		return _readable;
	}

	public boolean isWritable()
	{
		return _writable;
	}

	@Override
	public boolean isWritable(FsService fsService, FsItem fsi)
	{
		return _writable;
	}

	public void setLocked(boolean locked)
	{
		_locked = locked;
	}

	public void setReadable(boolean readable)
	{
		_readable = readable;
	}

	public void setWritable(boolean writable)
	{
		_writable = writable;
	}

}
