#include <jni.h>
#include <dlfcn.h>
#include "CppEvaluator.h"
#include <stdio.h>
#include <string.h>
#include <map>
#include <string>
#include <set>
#include <iostream>

std::map<std::string, void*> handles;
std::set<std::string> cells;
std::set<void *> open;

JNIEXPORT jobject JNICALL Java_com_twosigma_beaker_cpp_utils_CppEvaluator_cLoadAndRun(JNIEnv *env, jobject obj, jstring jfile, jstring jtype) {
  std::cout << "*********************************" << std::endl;
  const char* file = env->GetStringUTFChars(jfile, NULL);
  std::string fileStd = std::string(file);

  // Open all others
  for (std::set<std::string>::iterator it = cells.begin(); it != cells.end(); ++it) {
    if (it->compare(fileStd) == 0){
      continue;
    }
    std::cout << "Loading " << it->c_str() << std::endl;
    void* tmp = dlopen(it->c_str(), RTLD_LAZY | RTLD_GLOBAL);
    if (tmp == NULL){
      printf("dlopen() failed: %s\n", dlerror());
      std::cout << std::endl;
    } else {
      printf("Loaded at %p", tmp);
      std::cout << std::endl;
      open.insert(tmp);
    }
  }

  // Unload current
  if (handles.find(fileStd) != handles.end()){
    // std::cout << "Unloading before loading" << std::endl;
    printf("Unloading %p, which is file: ", handles[fileStd]);
    std::cout << fileStd << std::endl;
    dlclose(handles[fileStd]);
  }

  // Load current
  std::cout << "Loading " << fileStd << std::endl;
  void* handle = dlopen(file, RTLD_LAZY | RTLD_GLOBAL);
  if (handle == NULL){
    printf("dlopen() failed: %s\n", dlerror());
    std::cout << std::endl;
    return NULL;
  }
  printf("Loaded at %p", handle);
  std::cout << std::endl;
  handles[fileStd] = handle;
  cells.insert(fileStd);
  open.insert(handle);



  // handles[fileStd] = handle;

  // char *buf = (char*) malloc(sizeof(char) * strlen(symbol + 2));
  // buf[0] = '_';
  // strcpy(buf + 1, symbol);
  // std::cout << "Looking for symbol " << buf << std::endl;

  const char* type = env->GetStringUTFChars(jtype, NULL);
  jobject ret = NULL;

  if (strcmp(type, "int") == 0){
    typedef int (*fptr)();
    void* tmp = dlsym(handle, "beaker_main");
    if (tmp == NULL) {
      return NULL;
    }
    fptr cellMain = reinterpret_cast<fptr>(reinterpret_cast<long>(tmp)) ;
    jint result = cellMain();
    jclass returnClass = env->FindClass("java/lang/Integer");
    jmethodID returnInit = env->GetMethodID(returnClass, "<init>", "(I)V");
    ret = env->NewObject(returnClass, returnInit, result);
  }

  // Close everything
  for (std::set<void *>::iterator it = open.begin(); it != open.end(); ++it) {
    printf("Unloading %p", (*it));
    std::cout << std::endl;
    dlclose(*it);
  }
  open.clear();
  return ret;
}

int main(){
  return 0;
}

// JNIEXPORT void JNICALL Java_com_twosigma_beaker_cpp_utils_CppEvaluator_clingInit(JNIEnv *env, jobject obj, jstring jincludePath) {
//
//   const char *argv[] = {"/Users/diego/cling-yes/bin/cling", NULL};
//   interp = new cling::Interpreter(1, argv, "/Users/diego/cling-yes");
//   metaProcessor = new cling::MetaProcessor(*interp, llvm::outs());

//   // Set include path to temp directory
//   cling::Interpreter::CompilationResult compRes;
//   const char* includePath = env->GetStringUTFChars(jincludePath, NULL);
//   char* includeCmd = (char*) malloc(sizeof(char) * (strlen(".I ") + strlen(includePath) + 1));
//   sprintf(includeCmd, "%s%s", ".I ", includePath);
//   metaProcessor->process(includeCmd, compRes, NULL);
// }

// JNIEXPORT jobject JNICALL Java_com_twosigma_beaker_cpp_utils_CppEvaluator_clingRun(JNIEnv *env, jobject obj, jstring file, jstring cellId) {
//   cling::Value val;
//   jobject returnVal;

//   cling::Interpreter::CompilationResult compRes;
//   const char* code = env->GetStringUTFChars(jcode, NULL);
//   metaProcessor->process(code, compRes, &val);

//   std::string valType = val.getType().getAsString();
//   std::cout << valType << std::endl;
//   if (valType.compare("int") == 0) {
//     jclass typeClass = env->FindClass("java/lang/Integer");
//     jmethodID constructor = env->GetMethodID(typeClass, "<init>", "(I)V");
//     returnVal = env->NewObject(typeClass, constructor, val.getLL());
//     // std::cout << "[int] " << val.getLL() << std::endl;
//   } else if (valType.compare("double") == 0) {
//     jclass typeClass = env->FindClass("java/lang/Double");
//     jmethodID constructor = env->GetMethodID(typeClass, "<init>", "(D)V");
//     returnVal = env->NewObject(typeClass, constructor, val.getDouble());
//     // std::cout << "[double] " << val.getDouble() << std::endl;
//   } else if (valType.compare("float") == 0) {
//     jclass typeClass = env->FindClass("java/lang/Float");
//     jmethodID constructor = env->GetMethodID(typeClass, "<init>", "(F)V");
//     returnVal = env->NewObject(typeClass, constructor, val.getFloat());
//     // std::cout << "[float] " << val.getFloat() << std::endl;
//   } else if (valType.find("const char [") == 0) {
//     returnVal = jobject(env->NewStringUTF((char*) val.getPtr()));
//     std::string str = std::string((char*) val.getPtr());
//     // std::cout << "const char [" << str.length() << "] " << str << std::endl;
//   } else {
//     std::cout << "NULL" << std::endl;
//     returnVal = jobject(NULL);
//   }

//   // const char* str = output.c_str();
//   // jstring returnOutput = env->NewStringUTF(str);
//   // jclass returnClass = env->FindClass("com/twosigma/beaker/cpp/utils/CppEvaluator$CppReturn");
//   // jmethodID returnInit = env->GetMethodID(returnClass, "<init>", "(Lcom/twosigma/beaker/cpp/utils/CppEvaluator;Ljava/lang/Object;Ljava/lang/String;)V");
//   // return env->NewObject(returnClass, returnInit, returnVal, returnOutput);
//   return returnVal;
// }
