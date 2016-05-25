package com.twosigma.beaker.core.module.elfinder;

import cn.bluejoe.elfinder.controller.FsException;
import cn.bluejoe.elfinder.controller.executor.CommandExecutionContext;
import cn.bluejoe.elfinder.controller.executor.CommandExecutor;
import cn.bluejoe.elfinder.controller.executor.CommandExecutorFactory;
import cn.bluejoe.elfinder.service.FsServiceFactory;
import org.apache.commons.fileupload.FileItemIterator;
import org.apache.commons.fileupload.FileItemStream;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.fileupload.util.Streams;
import org.apache.commons.io.IOUtils;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class ConnectorController {
  private CommandExecutorFactory _commandExecutorFactory;
  private FsServiceFactory _fsServiceFactory;


  public void connector(HttpServletRequest request,
                        final HttpServletResponse response) throws IOException {
    try {
      request = parseMultipartContent(request);
    } catch (Exception e) {
      throw new IOException(e.getMessage());
    }

    String cmd = request.getParameter("cmd");
    CommandExecutor ce = _commandExecutorFactory.get(cmd);

    if (ce == null) {
      // This shouldn't happen as we should have a fallback command set.
      throw new FsException(String.format("unknown command: %s", cmd));
    }

    try {
      final HttpServletRequest finalRequest = request;
      ce.execute(new CommandExecutionContext() {

        @Override
        public FsServiceFactory getFsServiceFactory() {
          return _fsServiceFactory;
        }

        @Override
        public HttpServletRequest getRequest() {
          return finalRequest;
        }

        @Override
        public HttpServletResponse getResponse() {
          return response;
        }

        @Override
        public ServletContext getServletContext() {
          return null;
        }
      });
    } catch (Exception e) {
      throw new FsException("unknown error", e);
    }
  }

  public CommandExecutorFactory getCommandExecutorFactory() {
    return _commandExecutorFactory;
  }

  public FsServiceFactory getFsServiceFactory() {
    return _fsServiceFactory;
  }

  private HttpServletRequest parseMultipartContent(
    final HttpServletRequest request) throws Exception {
    if (!ServletFileUpload.isMultipartContent(request))
      return request;

    final Map<String, String> requestParams = new HashMap<String, String>();
    List<FileItemStream> listFiles = new ArrayList<FileItemStream>();

    // Parse the request
    ServletFileUpload sfu = new ServletFileUpload();
    String characterEncoding = request.getCharacterEncoding();
    if (characterEncoding == null) {
      characterEncoding = "UTF-8";
    }
    sfu.setHeaderEncoding(characterEncoding);
    FileItemIterator iter = sfu.getItemIterator(request);

    while (iter.hasNext()) {
      final FileItemStream item = iter.next();
      String name = item.getFieldName();
      InputStream stream = item.openStream();
      if (item.isFormField()) {
        requestParams.put(name,
          Streams.asString(stream, characterEncoding));
      } else {
        String fileName = item.getName();
        if (fileName != null && !"".equals(fileName.trim())) {
          ByteArrayOutputStream os = new ByteArrayOutputStream();
          IOUtils.copy(stream, os);
          final byte[] bs = os.toByteArray();
          stream.close();

          listFiles.add((FileItemStream) Proxy.newProxyInstance(this
              .getClass().getClassLoader(),
            new Class[]{FileItemStream.class},
            new InvocationHandler() {
              @Override
              public Object invoke(Object proxy,
                                   Method method, Object[] args)
                throws Throwable {
                if ("openStream".equals(method.getName())) {
                  return new ByteArrayInputStream(bs);
                }

                return method.invoke(item, args);
              }
            }));
        }
      }
    }

    request.setAttribute(FileItemStream.class.getName(), listFiles);

    // 'getParameter()' method can not be called on original request object
    // after parsing
    // so we stored the request values and provide a delegate request object

    return (HttpServletRequest) Proxy.newProxyInstance(this.getClass()
        .getClassLoader(), new Class[]{HttpServletRequest.class},
      new InvocationHandler() {
        @Override
        public Object invoke(Object arg0, Method arg1, Object[] arg2)
          throws Throwable {
          // we replace getParameter() and getParameterValues()
          // methods
          if ("getParameter".equals(arg1.getName())) {
            String paramName = (String) arg2[0];
            return requestParams.get(paramName);
          }

          if ("getParameterValues".equals(arg1.getName())) {
            String paramName = (String) arg2[0];

            // normalize name 'key[]' to 'key'
            if (paramName.endsWith("[]"))
              paramName = paramName.substring(0,
                paramName.length() - 2);

            if (requestParams.containsKey(paramName))
              return new String[]{requestParams
                .get(paramName)};

            // if contains key[1], key[2]...
            int i = 0;
            List<String> paramValues = new ArrayList<String>();
            while (true) {
              String name2 = String.format("%s[%d]",
                paramName, i++);
              if (requestParams.containsKey(name2)) {
                paramValues.add(requestParams.get(name2));
              } else {
                break;
              }
            }

            return paramValues.isEmpty() ? new String[0]
              : paramValues.toArray(new String[0]);
          }

          return arg1.invoke(request, arg2);
        }
      });
  }

  public void setCommandExecutorFactory(CommandExecutorFactory _commandExecutorFactory) {
    this._commandExecutorFactory = _commandExecutorFactory;
  }

  public void setFsServiceFactory(FsServiceFactory _fsServiceFactory) {
    this._fsServiceFactory = _fsServiceFactory;
  }
}