/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
package com.twosigma.beakerx.kernel.commands;

import org.apache.ivy.Ivy;
import org.apache.ivy.core.module.descriptor.DefaultDependencyDescriptor;
import org.apache.ivy.core.module.descriptor.DefaultModuleDescriptor;
import org.apache.ivy.core.module.descriptor.ModuleDescriptor;
import org.apache.ivy.core.module.id.ModuleRevisionId;
import org.apache.ivy.core.report.ResolveReport;
import org.apache.ivy.core.resolve.ResolveOptions;
import org.apache.ivy.core.retrieve.RetrieveOptions;
import org.apache.ivy.core.settings.IvySettings;

import java.io.File;
import java.net.URL;

import static com.google.common.base.Preconditions.checkNotNull;
import static org.apache.ivy.core.LogOptions.LOG_QUIET;

public class MavenJarResolver {

  public static final String MVN_DIR = File.separator + "mvnJars";
  public static final String IVYSETTINGSBEAKERX_XML = "ivysettingsbeakerx.xml";
  private final String pathToMavenRepo;
  private ResolverParams commandParams;

  public MavenJarResolver(final ResolverParams commandParams) {
    this.commandParams = checkNotNull(commandParams);
    this.pathToMavenRepo = getMvnDir(commandParams.getPathToMavenRepo());
  }

  public AddMvnCommandResult retrieve(String groupId, String artifactId, String version) {
    try {
      IvySettings ivySettings = createIvyInstance(this.commandParams.getPathToCache());
      Ivy ivy = Ivy.newInstance(ivySettings);
      ResolveOptions resolveOptions = createResolveOptions();
      ModuleDescriptor moduleDescriptor = getModuleDescriptor(groupId, artifactId, version, ivy, resolveOptions);

      String absolutePath = new File(this.getPathToMavenRepo()).getAbsolutePath();
      ivy.retrieve(
              moduleDescriptor.getModuleRevisionId(),
              absolutePath + "/[artifact](-[classifier]).[ext]",
              new RetrieveOptions().setConfs(new String[]{"default"})
      );
      return AddMvnCommandResult.SUCCESS;
    } catch (Exception e) {
      return AddMvnCommandResult.error(e.getMessage());
    }
  }

  private ModuleDescriptor getModuleDescriptor(String groupId, String artifactId, String version, Ivy ivy, ResolveOptions ro) {
    DefaultModuleDescriptor md = DefaultModuleDescriptor.newDefaultInstance(
            ModuleRevisionId.newInstance(
                    groupId,
                    artifactId + "-envelope",
                    version
            )
    );
    ModuleRevisionId ri = ModuleRevisionId.newInstance(
            groupId,
            artifactId,
            version
    );
    DefaultDependencyDescriptor dd = new DefaultDependencyDescriptor(md, ri, false, false, true);
    dd.addDependencyConfiguration("default", "default");
    md.addDependency(dd);
    ResolveReport rr = getResolveReport(ivy, ro, md);
    return rr.getModuleDescriptor();
  }

  private ResolveReport getResolveReport(Ivy ivy, ResolveOptions ro, DefaultModuleDescriptor md) {
    ResolveReport rr = null;
    try {
      rr = ivy.resolve(md, ro);
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
    if (rr.hasError()) {
      throw new RuntimeException(rr.getAllProblemMessages().toString());
    }
    return rr;
  }

  private ResolveOptions createResolveOptions() {
    ResolveOptions ro = new ResolveOptions();
    ro.setLog(LOG_QUIET);
    ro.setTransitive(true);
    ro.setDownload(true);
    return ro;
  }

  private IvySettings createIvyInstance(String pathToCache) {
    IvySettings ivySettings = new IvySettings();
    URL resource = getClass().getClassLoader().getResource(IVYSETTINGSBEAKERX_XML);
    try {
      ivySettings.load(resource);
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
    ivySettings.setDefaultCache(new File(pathToCache));
    return ivySettings;
  }

  public String getPathToMavenRepo() {
    return pathToMavenRepo;
  }

  public static class AddMvnCommandResult {

    public static final AddMvnCommandResult SUCCESS = new AddMvnCommandResult(true, "");

    private boolean jarRetrieved;
    private String errorMessage;

    private AddMvnCommandResult(boolean retrieved, String errorMessage) {
      this.jarRetrieved = retrieved;
      this.errorMessage = errorMessage;
    }

    public boolean isJarRetrieved() {
      return jarRetrieved;
    }

    public String getErrorMessage() {
      return errorMessage;
    }

    public static AddMvnCommandResult success() {
      return SUCCESS;
    }

    public static AddMvnCommandResult error(String msg) {
      return new AddMvnCommandResult(false, msg);
    }
  }

  public static class ResolverParams {
    private String pathToCache;
    private String pathToMavenRepo;

    public ResolverParams(String pathToCache, String pathToMavenRepo) {
      this.pathToCache = checkNotNull(pathToCache);
      this.pathToMavenRepo = checkNotNull(pathToMavenRepo);
    }

    public String getPathToCache() {
      return pathToCache;
    }

    public String getPathToMavenRepo() {
      return pathToMavenRepo;
    }
  }

  private String getMvnDir(String pathToMavenRepo) {
    File theDir = new File(pathToMavenRepo);
    if (!theDir.exists()) {
      try {
        theDir.mkdir();
      } catch (Exception e) {
        throw new RuntimeException(e);
      }
    }
    return pathToMavenRepo;
  }
}
