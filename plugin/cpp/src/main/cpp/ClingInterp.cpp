#include <stdlib.h>
#include <string.h>
#include <iostream>
#include <sstream>
#include <string>
#include <jni.h>
#include "cling/Interpreter/Interpreter.h"
#include "cling/Metaprocessor/MetaProcessor.h"
#include "cling/Interpreter/Transaction.h"
#include "llvm/ExecutionEngine/ExecutionEngine.h"
#include "llvm/Support/raw_ostream.h"
#include "cling/Interpreter/Value.h"
#include "clang/AST/Type.h"
#include "CppEvaluator.h"
#include <unistd.h>

cling::Interpreter* interp;
cling::MetaProcessor* metaProcessor;
cling::IncrementalParser* parser;


JNIEXPORT void JNICALL Java_com_twosigma_beaker_cpp_utils_CppEvaluator_clingInit(JNIEnv *env, jobject obj, jstring jincludePath) {
  const char *argv[] = {"/Users/diego/cling-yes/bin/cling", NULL};
  interp = new cling::Interpreter(1, argv, "/Users/diego/cling-yes");
  metaProcessor = new cling::MetaProcessor(*interp, llvm::outs());

  // Set include path to temp directory
  cling::Interpreter::CompilationResult compRes;
  const char* includePath = env->GetStringUTFChars(jincludePath, NULL);
  char* includeCmd = (char*) malloc(sizeof(char) * (strlen(".I ") + strlen(includePath) + 1));
  sprintf(includeCmd, "%s%s", ".I ", includePath);
  metaProcessor->process(includeCmd, compRes, NULL);
}

JNIEXPORT jobject JNICALL Java_com_twosigma_beaker_cpp_utils_CppEvaluator_clingInterp(JNIEnv *env, jobject obj, jstring jcode) {
  cling::Value val;
  jobject returnVal;

  cling::Interpreter::CompilationResult compRes;
  const char* code = env->GetStringUTFChars(jcode, NULL);
  metaProcessor->process(code, compRes, &val);

  std::string valType = val.getType().getAsString();
  std::cout << valType << std::endl;
  if (valType.compare("int") == 0) {
    jclass typeClass = env->FindClass("java/lang/Integer");
    jmethodID constructor = env->GetMethodID(typeClass, "<init>", "(I)V");
    returnVal = env->NewObject(typeClass, constructor, val.getLL());
    // std::cout << "[int] " << val.getLL() << std::endl;
  } else if (valType.compare("double") == 0) {
    jclass typeClass = env->FindClass("java/lang/Double");
    jmethodID constructor = env->GetMethodID(typeClass, "<init>", "(D)V");
    returnVal = env->NewObject(typeClass, constructor, val.getDouble());
    // std::cout << "[double] " << val.getDouble() << std::endl;
  } else if (valType.compare("float") == 0) {
    jclass typeClass = env->FindClass("java/lang/Float");
    jmethodID constructor = env->GetMethodID(typeClass, "<init>", "(F)V");
    returnVal = env->NewObject(typeClass, constructor, val.getFloat());
    // std::cout << "[float] " << val.getFloat() << std::endl;
  } else if (valType.find("const char [") == 0) {
    returnVal = jobject(env->NewStringUTF((char*) val.getPtr()));
    std::string str = std::string((char*) val.getPtr());
    // std::cout << "const char [" << str.length() << "] " << str << std::endl;
  } else {
    std::cout << "NULL" << std::endl;
    returnVal = jobject(NULL);
  }

  // const char* str = output.c_str();
  // jstring returnOutput = env->NewStringUTF(str);
  // jclass returnClass = env->FindClass("com/twosigma/beaker/cpp/utils/CppEvaluator$CppReturn");
  // jmethodID returnInit = env->GetMethodID(returnClass, "<init>", "(Lcom/twosigma/beaker/cpp/utils/CppEvaluator;Ljava/lang/Object;Ljava/lang/String;)V");
  // return env->NewObject(returnClass, returnInit, returnVal, returnOutput);
  return returnVal;
}

int main() {
  return 0;
}