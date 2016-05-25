package cn.bluejoe.elfinder.controller.executors;

import cn.bluejoe.elfinder.controller.executor.AbstractJsonCommandExecutor;
import cn.bluejoe.elfinder.controller.executor.CommandExecutor;
import cn.bluejoe.elfinder.controller.executor.FsItemEx;
import cn.bluejoe.elfinder.service.FsService;
import org.json.JSONObject;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

public class PasteCommandExecutor extends AbstractJsonCommandExecutor implements CommandExecutor
{
	@Override
	public void execute(FsService fsService, HttpServletRequest request, ServletContext servletContext, JSONObject json)
			throws Exception
	{
		String[] targets = request.getParameterValues("targets[]");
		String src = request.getParameter("src");
		String dst = request.getParameter("dst");
		boolean cut = "1".equals(request.getParameter("cut"));

		List<FsItemEx> added = new ArrayList<>();
		List<String> removed = new ArrayList<>();

		FsItemEx fsrc = super.findItem(fsService, src);
		FsItemEx fdst = super.findItem(fsService, dst);

		for (String target : targets)
		{
			FsItemEx ftgt = super.findItem(fsService, target);
			String name = ftgt.getName();
			FsItemEx newFile = new FsItemEx(fdst, name);
			super.createAndCopy(ftgt, newFile);
			added.add(newFile);

			if (cut)
			{
				ftgt.delete();
				removed.add(target);
			}
		}

		json.put("added", files2JsonArray(request, added));
		json.put("removed", removed);
	}
}
