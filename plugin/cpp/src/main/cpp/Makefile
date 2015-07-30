all: libClingInterp.jnilib Makefile

libClingInterp.jnilib: ClingInterp.cpp CppEvaluator.h
	clang++ --std=c++11 -o libClingInterp.jnilib -L/usr/lib -L/Users/diego/cling-yes/lib \
	-m64  \
	ClingInterp.cpp \
	-I"/System/Library/Frameworks/JavaVM.framework/Headers" -I/Users/diego/cling-yes/include \
	-lclingUserInterface -lclingMetaProcessor -lclingInterpreter -lclingUtils \
	-lclangFrontend -lclangSerialization -lclangDriver -lclangCodeGen -lclangParse -lclangSema \
	-lclangEdit -lclangAnalysis -lclangAST -lclangLex -lclangBasic -lLLVMObjCARCOpts \
	-lLLVMInstrumentation -lLLVMipo -lLLVMVectorize -lLLVMOption -lLLVMX86Disassembler \
	-lLLVMX86AsmParser -lLLVMX86CodeGen -lLLVMSelectionDAG -lLLVMAsmPrinter -lLLVMCodeGen \
	-lLLVMScalarOpts -lLLVMProfileData -lLLVMInstCombine -lLLVMX86Desc -lLLVMMCDisassembler \
	-lLLVMX86Info -lLLVMX86AsmPrinter -lLLVMX86Utils -lLLVMOrcJIT -lLLVMTransformUtils -lLLVMipa \
	-lLLVMMCJIT -lLLVMTarget -lLLVMAnalysis -lLLVMRuntimeDyld -lLLVMExecutionEngine -lLLVMObject \
	-lLLVMMCParser -lLLVMBitReader -lLLVMMC -lLLVMBitWriter -lLLVMCore -lLLVMSupport -lz -lpthread \
	-ledit -lcurses -lm  -D__STDC_CONSTANT_MACROS -D__STDC_LIMIT_MACROS
