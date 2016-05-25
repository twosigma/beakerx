package cn.bluejoe.elfinder.controller.executor;

import cn.bluejoe.elfinder.service.FsItem;
import cn.bluejoe.elfinder.service.FsItemFilter;
import cn.bluejoe.elfinder.service.FsService;
import cn.bluejoe.elfinder.service.FsVolume;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

/**
 * FsItemEx is a helper class of a FsItem, A FsItemEx wraps a FsItem and its
 * context including FsService, FsVolume, etc
 * 
 * @author bluejoe
 *
 */
public class FsItemEx
{
	private FsItem _f;

	private FsService _s;

	private FsVolume _v;

	public FsItemEx(FsItem fsi, FsService fsService)
	{
		_f = fsi;
		_v = fsi.getVolume();
		_s = fsService;
	}

	public FsItemEx(FsItemEx parent, String name) throws IOException
	{
		_v = parent._v;
		_s = parent._s;
		// Directories may already have a trailing slash on them so we make sure
		// we don't double up
		String path = _v.getPath(parent._f);
		if (path != null)
		{
			if (!path.endsWith("/"))
			{
				path = path + "/";
			}
			path = path + name;
		}
		else
		{
			path = name;
		}
		_f = _v.fromPath(path);
	}

	public FsItemEx createChild(String name) throws IOException
	{
		return new FsItemEx(this, name);
	}

	public void createFile() throws IOException
	{
		_v.createFile(_f);
	}

	public void createFolder() throws IOException
	{
		_v.createFolder(_f);
	}

	public void delete() throws IOException
	{
		if (_v.isFolder(_f))
		{
			_v.deleteFolder(_f);
		} else
		{
			_v.deleteFile(_f);
		}
	}

	public void deleteFile() throws IOException
	{
		_v.deleteFile(_f);
	}

	public void deleteFolder() throws IOException
	{
		_v.deleteFolder(_f);
	}

	public boolean exists()
	{
		return _v.exists(_f);
	}

	public String getHash() throws IOException
	{
		return _s.getHash(_f);
	}

	public long getLastModified()
	{
		return _v.getLastModified(_f);
	}

	public String getMimeType()
	{
		return _v.getMimeType(_f);
	}

	public String getName()
	{
		return _v.getName(_f);
	}

	public FsItemEx getParent()
	{
		return new FsItemEx(_v.getParent(_f), _s);
	}

	public String getPath() throws IOException
	{
		return _v.getPath(_f);
	}

	public long getSize() throws IOException
	{
		return _v.getSize(_f);
	}

	public String getVolumeId()
	{
		return _s.getVolumeId(_v);
	}

	public String getVolumnName()
	{
		return _v.getName();
	}

	public boolean hasChildFolder()
	{
		return _v.hasChildFolder(_f);
	}

	public boolean isFolder()
	{
		return _v.isFolder(_f);
	}

	public boolean isLocked(FsItemEx fsi) throws IOException
	{
		return _s.getSecurityChecker().isLocked(_s, _f);
	}

	public boolean isReadable(FsItemEx fsi) throws IOException
	{
		return _s.getSecurityChecker().isReadable(_s, _f);
	}

	public boolean isRoot()
	{
		return _v.isRoot(_f);
	}

	public boolean isWritable(FsItemEx fsi) throws IOException
	{
		return _s.getSecurityChecker().isWritable(_s, _f);
	}

	public List<FsItemEx> listChildren()
	{
		List<FsItemEx> list = new ArrayList<FsItemEx>();
		for (FsItem child : _v.listChildren(_f))
		{
			list.add(new FsItemEx(child, _s));
		}
		return list;
	}

	public InputStream openInputStream() throws IOException
	{
		return _v.openInputStream(_f);
	}

	public void writeStream(InputStream is) throws IOException
	{
		_v.writeStream(_f, is);
	}

	public void renameTo(FsItemEx dst) throws IOException
	{
		_v.rename(_f, dst._f);
	}

	public List<FsItemEx> listChildren(FsItemFilter filter)
	{
		List<FsItemEx> list = new ArrayList<FsItemEx>();
		for (FsItem child : _v.listChildren(_f))
		{
			FsItemEx childEx = new FsItemEx(child, _s);
			if (filter.accepts(childEx))
			{
				list.add(childEx);
			}
		}
		return list;
	}
	
	public String getURL() {
		return _v.getURL(_f);
	}

}
