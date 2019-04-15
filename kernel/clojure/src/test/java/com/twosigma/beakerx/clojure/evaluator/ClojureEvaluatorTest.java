package com.twosigma.beakerx.clojure.evaluator;

import com.twosigma.beakerx.evaluator.BaseEvaluator;
import com.twosigma.beakerx.evaluator.ClasspathScannerMock;
import com.twosigma.beakerx.evaluator.EvaluatorBaseTest;
import com.twosigma.beakerx.evaluator.EvaluatorTest;
import com.twosigma.beakerx.evaluator.MagicCommandAutocompletePatternsMock;
import com.twosigma.beakerx.evaluator.TempFolderFactory;
import org.junit.AfterClass;
import org.junit.BeforeClass;

import static com.twosigma.beakerx.evaluator.EvaluatorTest.KERNEL_PARAMETERS;
import static com.twosigma.beakerx.evaluator.EvaluatorTest.getTestTempFolderFactory;
import static com.twosigma.beakerx.evaluator.TestBeakerCellExecutor.cellExecutor;

public class ClojureEvaluatorTest extends EvaluatorBaseTest {

  private static BaseEvaluator evaluator;

  @BeforeClass
  public static void setUpClass() throws Exception {
    evaluator = new ClojureEvaluator("id",
            "sid",
            cellExecutor(),
            getTestTempFolderFactory(),
            KERNEL_PARAMETERS,
            new EvaluatorTest.BeakexClientTestImpl(),
            new MagicCommandAutocompletePatternsMock(),
            new ClasspathScannerMock());
  }

  @AfterClass
  public static void tearDown() throws Exception {
    evaluator.exit();
  }

  @Override
  protected BaseEvaluator createNewEvaluator() {
    return new ClojureEvaluator("id",
            "sid",
            cellExecutor(),
            getTestTempFolderFactory(),
            KERNEL_PARAMETERS,
            new EvaluatorTest.BeakexClientTestImpl(),
            new MagicCommandAutocompletePatternsMock(),
            new ClasspathScannerMock());
  }

  @Override
  protected BaseEvaluator createNewEvaluator(TempFolderFactory tempFolderFactory) {
    return new ClojureEvaluator("id",
            "sid",
            cellExecutor(),
            tempFolderFactory,
            KERNEL_PARAMETERS,
            new EvaluatorTest.BeakexClientTestImpl(),
            new MagicCommandAutocompletePatternsMock(),
            new ClasspathScannerMock());
  }

  @Override
  public BaseEvaluator evaluator() {
    return evaluator;
  }

  @Override
  protected String codeForDivide16By2() {
    return "(/ 16 2)";
  }

  @Override
  protected String codeForDivisionByZero() {
    return "(/ 1 0)";
  }

  @Override
  protected String codeForHello() {
    return "\"Hello\"";
  }

  @Override
  protected String codeForPrintln() {
    return "(println \"Will print\")";
  }
}