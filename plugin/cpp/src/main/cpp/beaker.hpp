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
#include <jni.h>
#include <string.h>
#include <string>
#include <iostream>
#include <vector>
#include <map>

extern JNIEnv *globEnv;
extern jobject globObj;

class Beaker {
public:
  Beaker(){

  }
  // Convert
  static jobject convert(int conv){
    jclass typeClass = globEnv->FindClass("java/lang/Integer");
    jmethodID typeInit = globEnv->GetMethodID(typeClass, "<init>", "(I)V");
    return globEnv->NewObject(typeClass, typeInit, conv);
  }
  static jobject convert(bool conv){
    jclass typeClass = globEnv->FindClass("java/lang/Boolean");
    jmethodID typeInit = globEnv->GetMethodID(typeClass, "<init>", "(Z)V");
    return globEnv->NewObject(typeClass, typeInit, conv);
  }
  static jobject convert(float conv){
    jclass typeClass = globEnv->FindClass("java/lang/Float");
    jmethodID typeInit = globEnv->GetMethodID(typeClass, "<init>", "(F)V");
    return globEnv->NewObject(typeClass, typeInit, conv);
  }
  static jobject convert(double conv){
    jclass typeClass = globEnv->FindClass("java/lang/Double");
    jmethodID typeInit = globEnv->GetMethodID(typeClass, "<init>", "(D)V");
    return globEnv->NewObject(typeClass, typeInit, conv);
  }
  static jobject convert(char* conv){
    return (jobject) globEnv->NewStringUTF(conv);
  }
  static jobject convert(std::string conv){
    return (jobject) globEnv->NewStringUTF(conv.c_str());
  }
  template <typename T>
  static jobject convert(std::vector<T> vec){
    jclass typeClass = globEnv->FindClass("java/util/Vector");
    jmethodID typeInit = globEnv->GetMethodID(typeClass, "<init>", "(I)V");
    jmethodID jadd = globEnv->GetMethodID(typeClass, "add", "(Ljava/lang/Object;)Z");
    jobject jvec = globEnv->NewObject(typeClass, typeInit, vec.size());
    for(int i = 0; i < vec.size(); i++){
      globEnv->CallBooleanMethod(jvec, jadd, convert(vec[i]));
    }
    return jvec;
  }
  template <typename T1, typename T2>
  static jobject convert(std::map<T1, T2> theMap){
    jclass typeClass = globEnv->FindClass("java/util/HashMap");
    jmethodID typeInit = globEnv->GetMethodID(typeClass, "<init>", "()V");
    jmethodID jput = globEnv->GetMethodID(typeClass, "put", "(Ljava/lang/Object;Ljava/lang/Object;)Ljava/lang/Object;");
    jobject jmap = globEnv->NewObject(typeClass, typeInit);
    for(typename std::map<T1, T2>::iterator it = theMap.begin(); it != theMap.end(); ++it){
      globEnv->CallBooleanMethod(jmap, jput, convert(it->first), convert(it->second));
    }
    return jmap;
  }

  // Unconvert
  static int unconvert(jobject obj, int &ref){
    jclass typeClass = globEnv->FindClass("java/lang/Integer");
    jmethodID getValue = globEnv->GetMethodID(typeClass, "intValue", "()I");
    jint jret = globEnv->CallIntMethod(obj, getValue);
    ref = (int) jret;
    return 1;
  }
  static int unconvert(jobject obj, bool &ref){
    jclass typeClass = globEnv->FindClass("java/lang/Boolean");
    jmethodID getValue = globEnv->GetMethodID(typeClass, "floatValue", "()Z");
    jint jret = globEnv->CallBooleanMethod(obj, getValue);
    ref = (bool) jret;
    return 1;
  }
  static int unconvert(jobject obj, float &ref){
    jclass typeClass = globEnv->FindClass("java/lang/Float");
    jmethodID getValue = globEnv->GetMethodID(typeClass, "floatValue", "()F");
    jint jret = globEnv->CallFloatMethod(obj, getValue);
    ref = (float) jret;
    return 1;
  }
  static int unconvert(jobject obj, double &ref){
    jclass typeClass = globEnv->FindClass("java/lang/Double");
    jmethodID getValue = globEnv->GetMethodID(typeClass, "doubleValue", "()D");
    jdouble jret = globEnv->CallDoubleMethod(obj, getValue);
    ref = (double) jret;
    return 1;
  }
  static int unconvert(jobject obj, std::string &ref){
    jstring jstr = (jstring) obj;
    const char* str = globEnv->GetStringUTFChars(jstr, NULL);
    ref = std::string(str);
    return 1;
  }
  static int unconvert(jobject obj, char* ref){
    jstring jstr = (jstring) obj;
    const char* str = globEnv->GetStringUTFChars(jstr, NULL);
    ref = strdup(str);
    return 1;
  }
  // Javascript arrays become java arraylists
  template <typename T>
  static int unconvert(jobject obj, std::vector<T> &ref){
    ref = std::vector<T>();
    // Get array list size
    jclass typeClass = globEnv->FindClass("java/util/ArrayList");
    jmethodID getLength = globEnv->GetMethodID(typeClass, "size", "()I");
    jmethodID get = globEnv->GetMethodID(typeClass, "get", "(I)Ljava/lang/Object;");
    jint length = globEnv->CallIntMethod(obj, getLength);
    // Iterate array, push each into ref
    for (jint i = 0; i < length; ++i){
      jobject jElement = globEnv->CallObjectMethod(obj, get, i);
      T element;
      unconvert(jElement, element);
      ref.push_back(element);
    }
    return 1;
  }
  // Javascript arrays become java arraylists
  template <typename T1, typename T2>
  static int unconvert(jobject jmap, std::map<T1, T2> &ref){
    ref = std::map<T1, T2>();
    // Get array list size
    jclass mapClass = globEnv->FindClass("java/util/HashMap");
    jclass setClass = globEnv->FindClass("java/util/Set");
    jclass iteratorClass = globEnv->FindClass("java/util/Iterator");
    jclass mapEntryClass = globEnv->FindClass("java/util/Map$Entry");
    jmethodID getEntrySet = globEnv->GetMethodID(mapClass, "entrySet", "()Ljava/util/Set;");
    jmethodID getIterator = globEnv->GetMethodID(setClass, "iterator", "()Ljava/util/Iterator;");
    jmethodID hasNext = globEnv->GetMethodID(iteratorClass, "hasNext", "()Z");
    jmethodID next = globEnv->GetMethodID(iteratorClass, "next", "()Ljava/lang/Object;");
    jmethodID getKey = globEnv->GetMethodID(mapEntryClass, "getKey", "()Ljava/lang/Object;");
    jmethodID getValue = globEnv->GetMethodID(mapEntryClass, "getValue", "()Ljava/lang/Object;");
    
    jobject entrySet = globEnv->CallObjectMethod(jmap, getEntrySet);
    jobject iterator = globEnv->CallObjectMethod(entrySet, getIterator);
    while(globEnv->CallBooleanMethod(iterator, hasNext)) {
      jobject jentry = globEnv->CallObjectMethod(iterator, next);
      jobject jkey = globEnv->CallObjectMethod(jentry, getKey);
      jobject jvalue = globEnv->CallObjectMethod(jentry, getValue);
      T1 key;
      T2 value;
      unconvert(jkey, key);
      unconvert(jvalue, value);
      ref[key] = value;
    }
    return 1;
  }

  // Beaker object
  template <typename T>
  static int get(std::string name, T &ret) {
    jstring jname = globEnv->NewStringUTF(name.c_str());
    jclass beakerClass = globEnv->FindClass("com/twosigma/beaker/cpp/utils/CppKernel");
    jmethodID javaBeakerGet = globEnv->GetStaticMethodID(beakerClass, "beakerGet", "(Ljava/lang/String;)Ljava/lang/Object;");
    jobject obj = globEnv->CallStaticObjectMethod(beakerClass, javaBeakerGet, jname);
    unconvert(obj, ret);
    return 1;
  }

  template <typename T>
  static int set(std::string name, T val){
    jstring jname = globEnv->NewStringUTF(name.c_str());
    jobject jval = convert(val);
    jclass beakerClass = globEnv->FindClass("com/twosigma/beaker/cpp/utils/CppKernel");
    jmethodID javaBeakerSet = globEnv->GetStaticMethodID(beakerClass, "beakerSet", "(Ljava/lang/String;Ljava/lang/Object;)I");
    jint ret = globEnv->CallStaticIntMethod(beakerClass, javaBeakerSet, jname, jval);
    return (int) ret;
  }
};

Beaker beaker;