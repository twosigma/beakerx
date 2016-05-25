package cn.bluejoe.elfinder.service;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

/**
 * a factory which creates FsServices
 * 
 * @author bluejoe
 *
 */
public interface FsServiceFactory
{
	/**
	 * sometimes a FsService should be constructed dynamically according to current web request.
	 * e.g users may own separated file spaces in a net disk service platform,
	 * in this case, getFileService() get user principal from current request and offers him/her different file view.
	 * 
	 * @param request The current HttpServletRequest.
	 * @param servletContext The servlet context.
	 * @return The {@link FsService} for the current request.
	 */
	FsService getFileService(HttpServletRequest request, ServletContext servletContext);

}
