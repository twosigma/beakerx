package cn.bluejoe.elfinder.service;

import java.io.IOException;
import java.io.InputStream;

public interface FsVolume
{
	void createFile(FsItem fsi) throws IOException;

	void createFolder(FsItem fsi) throws IOException;

	void deleteFile(FsItem fsi) throws IOException;

	void deleteFolder(FsItem fsi) throws IOException;

	boolean exists(FsItem newFile);

	FsItem fromPath(String relativePath);

	String getDimensions(FsItem fsi);

	long getLastModified(FsItem fsi);

	String getMimeType(FsItem fsi);

	String getName();

	String getName(FsItem fsi);

	FsItem getParent(FsItem fsi);

	String getPath(FsItem fsi) throws IOException;

	FsItem getRoot();

	long getSize(FsItem fsi) throws IOException;

	String getThumbnailFileName(FsItem fsi);

	boolean hasChildFolder(FsItem fsi);

	boolean isFolder(FsItem fsi);

	boolean isRoot(FsItem fsi);

	FsItem[] listChildren(FsItem fsi);

	InputStream openInputStream(FsItem fsi) throws IOException;

	void writeStream(FsItem f, InputStream is) throws IOException;

	void rename(FsItem src, FsItem dst) throws IOException;

	/**
	 * Gets the URL for the supplied item.
	 * @param f The item to get the URL for.
	 * @return An absolute URL or <code>null</code> if we should not send back a URL.
	 */
	String getURL(FsItem f);

}
