package cn.bluejoe.elfinder.controller.executors;

import cn.bluejoe.elfinder.controller.executor.AbstractJsonCommandExecutor;
import cn.bluejoe.elfinder.controller.executor.CommandExecutor;
import cn.bluejoe.elfinder.controller.executor.FsItemEx;
import cn.bluejoe.elfinder.service.FsService;
import org.json.JSONObject;

import javax.imageio.ImageIO;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;

/**
 * This returns the dimensions on an image.
 */
public class DimCommandExecutor extends AbstractJsonCommandExecutor implements CommandExecutor
{
    @Override
    protected void execute(FsService fsService, HttpServletRequest request, ServletContext servletContext, JSONObject json) throws Exception
    {
        String target = request.getParameter("target");
        FsItemEx item = findItem(fsService, target);
        // If it's not an image then just return empty JSON.
        if (item.getMimeType().startsWith("image"))
        {
            InputStream inputStream = null;
            try
            {
                inputStream = item.openInputStream();
                BufferedImage image = ImageIO.read(inputStream);
                int width = image.getWidth();
                int height = image.getHeight();
                json.put("dim", String.format("%dx%d", width, height));
            }
            catch (IOException ioe)
            {
                String message = "Failed load image to get dimensions: "+ item.getPath();
                if (LOG.isDebugEnabled())
                {
                    LOG.debug(message, ioe);
                }
                else
                {
                    LOG.warn(message);
                }

            }
            finally
            {
                if (inputStream != null)
                {
                   try
                   {
                       inputStream.close();
                   }
                   catch (IOException ioe)
                   {
                       LOG.debug("Failed to close stream to: "+item.getPath(), ioe);
                   }
                }
            }

        }
        else
        {
            LOG.debug("dim command called on non-image: "+ item.getPath());
        }
    }
}
