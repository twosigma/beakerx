package cn.bluejoe.elfinder.service;

import java.io.IOException;

public interface FsSecurityChecker
{

	boolean isLocked(FsService fsService, FsItem fsi) throws IOException;

	boolean isReadable(FsService fsService, FsItem fsi) throws IOException;

	boolean isWritable(FsService fsService, FsItem fsi) throws IOException;

}