package cn.bluejoe.elfinder.controller.executors;

import cn.bluejoe.elfinder.controller.executor.AbstractJsonCommandExecutor;
import cn.bluejoe.elfinder.controller.executor.CommandExecutor;
import cn.bluejoe.elfinder.controller.executor.FsItemEx;
import cn.bluejoe.elfinder.service.FsService;
import org.apache.commons.io.FilenameUtils;
import org.json.JSONObject;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

public class DuplicateCommandExecutor extends AbstractJsonCommandExecutor implements CommandExecutor
{
	@Override
	public void execute(FsService fsService, HttpServletRequest request, ServletContext servletContext, JSONObject json)
			throws Exception
	{
		String[] targets = request.getParameterValues("targets[]");

		List<FsItemEx> added = new ArrayList<FsItemEx>();

		for (String target : targets)
		{
			FsItemEx fsi = super.findItem(fsService, target);
			String name = fsi.getName();
			String baseName = FilenameUtils.getBaseName(name);
			String extension = FilenameUtils.getExtension(name);

			int i = 1;
			FsItemEx newFile = null;
			baseName = baseName.replaceAll("\\(\\d+\\)$", "");

			while (true)
			{
				String newName = String.format("%s(%d)%s", baseName, i, (extension == null || extension.isEmpty() ? ""
						: "." + extension));
				newFile = new FsItemEx(fsi.getParent(), newName);
				if (!newFile.exists())
				{
					break;
				}
				i++;
			}

			createAndCopy(fsi, newFile);
			added.add(newFile);
		}

		json.put("added", files2JsonArray(request, added));
	}

}
