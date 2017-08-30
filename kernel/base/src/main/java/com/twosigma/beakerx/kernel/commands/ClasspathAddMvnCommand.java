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
import org.apache.ivy.plugins.resolver.IBiblioResolver;

import java.io.File;

import static com.google.common.base.Preconditions.checkNotNull;
import static org.apache.ivy.core.LogOptions.LOG_QUIET;

public class ClasspathAddMvnCommand {

  private String pathToCache;
  private String pathToTempRepo;

  public ClasspathAddMvnCommand(String pathToCache, String pathToTempRepo) {
    this.pathToCache = checkNotNull(pathToCache);
    this.pathToTempRepo = checkNotNull(pathToTempRepo);
  }

  public AddMvnCommandResult retrieve(String groupId, String artifactId, String version) {
    try {
      IBiblioResolver br = createBiblioResolver();
      IvySettings ivySettings = createIvyInstance(this.pathToCache, br);

      Ivy ivy = Ivy.newInstance(ivySettings);
      ResolveOptions resolveOptions = createResolveOptions();
      ModuleDescriptor moduleDescriptor = getModuleDescriptor(groupId, artifactId, version, ivy, resolveOptions);


      String absolutePath = new File(this.pathToTempRepo).getAbsolutePath();
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

  private IBiblioResolver createBiblioResolver() {
    IBiblioResolver br = new IBiblioResolver();
    br.setM2compatible(true);
    br.setUsepoms(true);
    br.setName("central");
    return br;
  }

  private IvySettings createIvyInstance(String pathToCache, IBiblioResolver br) {
    IvySettings ivySettings = new IvySettings();
    ivySettings.setDefaultCache(new File(pathToCache));
    ivySettings.addResolver(br);
    ivySettings.setDefaultResolver(br.getName());
    return ivySettings;
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
}
