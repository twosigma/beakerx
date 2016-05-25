package cn.bluejoe.elfinder.controller.executors;

import cn.bluejoe.elfinder.controller.executor.AbstractJsonCommandExecutor;
import cn.bluejoe.elfinder.controller.executor.CommandExecutor;
import cn.bluejoe.elfinder.controller.executor.FsItemEx;
import cn.bluejoe.elfinder.service.FsService;
import org.json.JSONObject;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

public class TreeCommandExecutor extends AbstractJsonCommandExecutor implements CommandExecutor
{
	@Override
	public void execute(FsService fsService, HttpServletRequest request, ServletContext servletContext, JSONObject json)
			throws Exception
	{
		String target = request.getParameter("target");

		Map<String, FsItemEx> files = new HashMap<String, FsItemEx>();
		FsItemEx fsi = super.findItem(fsService, target);
		super.addSubfolders(files, fsi);

		json.put("tree", files2JsonArray(request, files.values()));
	}
}
