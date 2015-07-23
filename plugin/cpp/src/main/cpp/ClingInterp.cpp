#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <iostream>
#include <sstream>
#include <string>
#include <jni.h>
#include "cling/Interpreter/Interpreter.h"
#include "cling/Interpreter/Value.h"
#include "clang/AST/Type.h"
#include "CppEvaluator.h"

JNIEXPORT jobject JNICALL Java_com_twosigma_beaker_cpp_utils_CppEvaluator_clingInterp(JNIEnv *env, jobject obj, jstring code) {
  char *argv[] = {"/Users/diego/cling2/bin/cling", "-std=c++11", NULL};
  std::cout << "**********CONSTRUCTOR STARTED*************" << std::endl;
  cling::Interpreter interp(2, argv, "/Users/diego/cling2", true);
  cling::Value val;
  jobject ret;

  std::cout << "**********CONSTRUCTOR FINISHED*************" << std::endl;

  // std::stringstream buffer;
  // std::streambuf *old = std::cout.rdbuf(buffer.rdbuf());

  interp.process(env->GetStringUTFChars(code, NULL), &val);
  std::string valType = val.getType().getAsString();

  // std::cout.rdbuf(old);
  // std::string result = buffer.str();

  std::cout << "Type is: " << valType << std::endl;

  if (valType.compare("int") == 0) {
    jclass typeClass = env->FindClass("java/lang/Integer");
    jmethodID constructor = env->GetMethodID(typeClass, "<init>", "(I)V");
    ret = env->NewObject(typeClass, constructor, val.getLL());
    std::cout << "[int] " << val.getLL() << std::endl;
  } else if (valType.compare("double") == 0) {
    jclass typeClass = env->FindClass("java/lang/Double");
    jmethodID constructor = env->GetMethodID(typeClass, "<init>", "(D)V");
    ret = env->NewObject(typeClass, constructor, val.getDouble());
    std::cout << "[double] " << val.getDouble() << std::endl;
  } else if (valType.compare("float") == 0) {
    jclass typeClass = env->FindClass("java/lang/Float");
    jmethodID constructor = env->GetMethodID(typeClass, "<init>", "(F)V");
    ret = env->NewObject(typeClass, constructor, val.getFloat());
    std::cout << "[float] " << val.getFloat() << std::endl;
  } else if (valType.find("const char [") == 0) {
    ret = jobject(env->NewStringUTF((char*) val.getPtr()));
    std::string str = std::string((char*) val.getPtr());
    std::cout << "const char [" << str.length() << "] " << str << std::endl;
  }

  return ret;
}

int main() {
  return 0;
}