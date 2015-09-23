/*
 *  Copyright 2015 TWO SIGMA OPEN SOURCE, LLC
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
#include "CppKernel.h"
#include "beaker.hpp"
#include <string.h>
#include <jni.h>
#include <dlfcn.h>

JNIEXPORT jboolean JNICALL Java_com_twosigma_beaker_cpp_utils_CppKernel_cLoad(JNIEnv *env, jobject obj, jstring jfile) {
  const char* file = env->GetStringUTFChars(jfile, NULL);
  void* handle = dlopen(file, RTLD_LAZY | RTLD_GLOBAL);
  if (handle == NULL){
    return false;
  } else {
    return true;
  }
}

JNIEXPORT jobject JNICALL Java_com_twosigma_beaker_cpp_utils_CppKernel_cLoadAndRun(JNIEnv *env, jobject obj, jstring jfile, jstring jtype) {
  const char* file = env->GetStringUTFChars(jfile, NULL);
  void* handle;

  handle = dlopen(file, RTLD_LAZY | RTLD_GLOBAL);
  if (handle == NULL){
    return env->NewStringUTF(dlerror());
  }

  const char* type = env->GetStringUTFChars(jtype, NULL);

  handle = dlsym(handle, "call_beaker_main");
  if (handle == NULL) {
    return env->NewStringUTF(dlerror());
  }

  jobject ret = NULL;
  if (strcmp(type, "void") == 0){
    void (*mainCaller)(JNIEnv *,jobject) = reinterpret_cast<void (*)(JNIEnv *,jobject)>(reinterpret_cast<long>(handle));
    mainCaller(env,obj);
  } else {
    jobject (*mainCaller)(JNIEnv *,jobject) = reinterpret_cast<jobject (*)(JNIEnv *,jobject)>(reinterpret_cast<long>(handle));
    ret = mainCaller(env,obj);
  }

  return ret;
}

int main(){
  return 0;
}
