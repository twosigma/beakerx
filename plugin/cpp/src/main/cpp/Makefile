all: jniCRun.jnilib

jniCRun.jnilib: CRun.cpp CppEvaluator.h
	clang++ -m64 -shared -fPIC --std=c++11 -I"/System/Library/Frameworks/JavaVM.framework/Headers" \
 -o libCRun.jnilib CRun.cpp
