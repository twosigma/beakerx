package cn.bluejoe.elfinder.controller.executors;

import cn.bluejoe.elfinder.controller.ErrorException;
import cn.bluejoe.elfinder.controller.executor.AbstractJsonCommandExecutor;
import cn.bluejoe.elfinder.controller.executor.CommandExecutor;
import cn.bluejoe.elfinder.service.FsService;
import org.json.JSONObject;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

/**
 * This is a command that should be executed when a matching command can't be found.
 */
public class MissingCommandExecutor extends AbstractJsonCommandExecutor implements CommandExecutor
{
    @Override
    protected void execute(FsService fsService, HttpServletRequest request, ServletContext servletContext, JSONObject json) throws Exception
    {
        String cmd = request.getParameter("cmd");
        throw new ErrorException("errUnknownCmd", cmd);
   }
}
