#include <jni.h>
#include <dlfcn.h>
#include "CppEvaluator.h"
#include <stdio.h>
#include <string.h>
#include <map>
#include <string>
#include <set>
#include <iostream>

// std::map<std::string, void*> handles;
std::set<std::string> cells;
std::set<void *> open;

// Supported return types
typedef int (*int_fptr)(); // int
typedef double (*double_fptr)(); // double
typedef std::string (*stdstr_fptr)(); // double
typedef float (*float_fptr)();
typedef bool (*bool_fptr)();

JNIEXPORT jobject JNICALL Java_com_twosigma_beaker_cpp_utils_CppEvaluator_cLoadAndRun(JNIEnv *env, jobject obj, jstring jfile, jstring jtype) {
  // std::cout << "*********************************" << std::endl;
  const char* file = env->GetStringUTFChars(jfile, NULL);
  std::string fileStd = std::string(file);
  bool exec = true;
  void* handle;

  // Open all others
  for (std::set<std::string>::iterator it = cells.begin(); it != cells.end(); ++it) {
    if (it->compare(fileStd) == 0){
      continue;
    }
    // std::cout << "Loading " << it->c_str() << std::endl;
    handle = dlopen(it->c_str(), RTLD_LAZY | RTLD_GLOBAL);
    if (handle == NULL){
      // printf("dlopen() failed: %s\n", dlerror());
      // std::cout << std::endl;
    } else {
      // printf("Loaded at %p", tmp);
      // std::cout << std::endl;
      open.insert(handle);
    }
  }

  // Unload current
  // if (handles.find(fileStd) != handles.end()){
    // printf("Unloading %p, which is file: ", handles[fileStd]);
    // std::cout << fileStd << std::endl;
    // dlclose(handles[fileStd]);
  // }

  // Load current
  // std::cout << "Loading " << fileStd << std::endl;
  handle = dlopen(file, RTLD_LAZY | RTLD_GLOBAL);
  if (handle == NULL){
    printf("dlopen() failed: %s\n", dlerror());
    std::cout << std::endl;
    return NULL;
  }
  // printf("Loaded at %p", handle);
  // std::cout << std::endl;
  // handles[fileStd] = handle;
  cells.insert(fileStd);
  open.insert(handle);

  const char* type = env->GetStringUTFChars(jtype, NULL);

  if (strcmp(type, "none") == 0){
    exec = false;
  }

  handle = dlsym(handle, "beaker_main");
  if (handle == NULL) {
    exec = false;
  }
  jobject ret = NULL;
  if(exec && strcmp(type, "int") == 0) {
    int_fptr cellMain = reinterpret_cast<int_fptr>(reinterpret_cast<long>(handle)) ;
    jint result = cellMain();
    jclass returnClass = env->FindClass("java/lang/Integer");
    jmethodID returnInit = env->GetMethodID(returnClass, "<init>", "(I)V");
    ret = env->NewObject(returnClass, returnInit, result);
  } else if(strcmp(type, "double") == 0) {
    double_fptr cellMain = reinterpret_cast<double_fptr>(reinterpret_cast<long>(handle)) ;
    jdouble result = cellMain();
    jclass returnClass = env->FindClass("java/lang/Double");
    jmethodID returnInit = env->GetMethodID(returnClass, "<init>", "(D)V");
    ret = env->NewObject(returnClass, returnInit, result);
  } else if(strcmp(type, "float") == 0) {
    float_fptr cellMain = reinterpret_cast<float_fptr>(reinterpret_cast<long>(handle)) ;
    jfloat result = cellMain();
    jclass returnClass = env->FindClass("java/lang/Float");
    jmethodID returnInit = env->GetMethodID(returnClass, "<init>", "(F)V");
    ret = env->NewObject(returnClass, returnInit, result);
  } else if(strcmp(type, "boolean") == 0) {
    bool_fptr cellMain = reinterpret_cast<bool_fptr>(reinterpret_cast<long>(handle)) ;
    jboolean result = cellMain();
    jclass returnClass = env->FindClass("java/lang/Boolean");
    jmethodID returnInit = env->GetMethodID(returnClass, "<init>", "(B)V");
    ret = env->NewObject(returnClass, returnInit, result);
  } else if(strcmp(type, "std::string") == 0) {
    stdstr_fptr cellMain = reinterpret_cast<stdstr_fptr>(reinterpret_cast<long>(handle)) ;
    std::string stdString = cellMain();
    ret = env->NewStringUTF(stdString.c_str());
  } else if(strcmp(type, "void") == 0) {
    ret = NULL;
  }

  // Close everything
  for(std::set<void *>::iterator it = open.begin(); it != open.end(); ++it) {
    // printf("Unloading %p", (*it));
    // std::cout << std::endl;
    dlclose(*it);
  }
  open.clear();
  return ret;
}

int main(){
  return 0;
}
