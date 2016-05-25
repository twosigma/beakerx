package cn.bluejoe.elfinder.service;

import cn.bluejoe.elfinder.controller.executor.FsItemEx;

import java.io.IOException;

public interface FsService
{
	FsItem fromHash(String hash) throws IOException;

	String getHash(FsItem item) throws IOException;

	FsSecurityChecker getSecurityChecker();

	String getVolumeId(FsVolume volume);

	FsVolume[] getVolumes();

	FsServiceConfig getServiceConfig();

	/**
	 * find files by name pattern, this provides a simple recursively iteration based method
	 * lucene engines can be introduced to improve it!
	 * This searches across all volumes.
	 *
	 * @param filter The filter to apply to select files.
	 * @return A collection of files that match  the filter and gave the root as a parent.
	 */
	// TODO: bad designs: FsItemEx should not used here top level interfaces should only know FsItem instead of FsItemEx
	FsItemEx[] find(FsItemFilter filter);
}