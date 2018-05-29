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
package com.twosigma.beakerx.kernel.magic.command.functionality;

import com.twosigma.beakerx.TryResult;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.kernel.Code;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandFunctionality;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutput;
import com.twosigma.beakerx.message.Header;
import com.twosigma.beakerx.message.Message;
import org.apache.commons.cli.CommandLine;
import org.apache.commons.cli.CommandLineParser;
import org.apache.commons.cli.Options;
import org.apache.commons.cli.ParseException;
import org.apache.commons.cli.PosixParser;
import org.apache.commons.text.StrTokenizer;

import java.lang.management.ManagementFactory;
import java.lang.management.ThreadMXBean;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.stream.IntStream;

import static com.twosigma.beakerx.kernel.PlainCode.createSimpleEvaluationObject;

public abstract class TimeMagicCommand implements MagicCommandFunctionality {

  protected KernelFunctionality kernel;

  public TimeMagicCommand(KernelFunctionality kernel) {
    this.kernel = kernel;
  }

  public MagicCommandOutput time(String codeToExecute, Message message, int executionCount, boolean showResult) {
    CompletableFuture<TimeMeasureData> compileTime = new CompletableFuture<>();

    ThreadMXBean threadMXBean = ManagementFactory.getThreadMXBean();
    long currentThreadId = Thread.currentThread().getId();

    Long startWallTime = System.nanoTime();
    Long startCpuTotalTime = threadMXBean.getCurrentThreadCpuTime();
    Long startUserTime = threadMXBean.getCurrentThreadUserTime();

    SimpleEvaluationObject simpleEvaluationObject = createSimpleEvaluationObject(codeToExecute, kernel, message, executionCount);
    if (!showResult) {
      simpleEvaluationObject.noResult();
    }

    TryResult either = kernel.executeCode(codeToExecute, simpleEvaluationObject);

    Long endWallTime = System.nanoTime();
    Long endCpuTotalTime = threadMXBean.getThreadCpuTime(currentThreadId);
    Long endUserTime = threadMXBean.getThreadUserTime(currentThreadId);

    compileTime.complete(new TimeMeasureData(endCpuTotalTime - startCpuTotalTime,
            endUserTime - startUserTime,
            endWallTime - startWallTime));
    String messageInfo = "CPU times: user %s, sys: %s, total: %s \nWall Time: %s\n";

    try {
      TimeMeasureData timeMeasuredData = compileTime.get();

      return new MagicCommandOutput(MagicCommandOutput.Status.OK,
              String.format(messageInfo,
                      format(timeMeasuredData.getCpuUserTime()),
                      format(timeMeasuredData.getCpuTotalTime() - timeMeasuredData.getCpuUserTime()),
                      format(timeMeasuredData.getCpuTotalTime()),
                      format(timeMeasuredData.getWallTime())),
              either,
              simpleEvaluationObject);

    } catch (InterruptedException | ExecutionException e) {
      return new MagicCommandOutput(MagicCommandOutput.Status.ERROR, "There occurs problem during measuring time for your statement.");
    }
  }

  private String format(Long nanoSeconds) {
    if (nanoSeconds < 1000) {
      //leave in ns
      return nanoSeconds + " ns";
    } else if (nanoSeconds >= 1000 && nanoSeconds < 1_000_000) {
      //convert to µs
      return TimeUnit.NANOSECONDS.toMicros(nanoSeconds) + " µs";
    } else if (nanoSeconds > 1_000_000 && nanoSeconds < 1_000_000_000) {
      //convert to ms
      return TimeUnit.NANOSECONDS.toMillis(nanoSeconds) + " ms";
    } else {
      //convert to s
      return TimeUnit.NANOSECONDS.toSeconds(nanoSeconds) + " s";
    }
  }

  protected MagicCommandOutput timeIt(TimeItOption timeItOption, String codeToExecute, Message message, int executionCount, boolean showResult) {
    String output = "%s ± %s per loop (mean ± std. dev. of %d run, %d loop each)";

    if (timeItOption.getNumber() < 0) {
      return new MagicCommandOutput(MagicCommandOutput.Status.ERROR, "Number of execution must be bigger then 0");
    }
    int number = timeItOption.getNumber() == 0 ? getBestNumber(codeToExecute, showResult,message) : timeItOption.getNumber();

    if (timeItOption.getRepeat() == 0) {
      return new MagicCommandOutput(MagicCommandOutput.Status.ERROR, "Repeat value must be bigger then 0");
    }

    SimpleEvaluationObject seo = createSimpleEvaluationObject(codeToExecute, kernel, message, executionCount);
    seo.noResult();

    TryResult either = kernel.executeCode(codeToExecute, seo);

    try {

      if (either.isError()) {
        return new MagicCommandOutput(MagicCommandOutput.Status.ERROR, "Please correct your statement");
      }

      List<Long> allRuns = new ArrayList<>();
      List<Long> timings = new ArrayList<>();

      CompletableFuture<Boolean> isReady = new CompletableFuture<>();

      IntStream.range(0, timeItOption.getRepeat()).forEach(repeatIter -> {
        IntStream.range(0, number).forEach(numberIter -> {
          SimpleEvaluationObject seo2 = createSimpleEvaluationObject(codeToExecute, kernel, message, executionCount);
          seo2.noResult();
          Long startOfEvaluationInNanoseconds = System.nanoTime();
          TryResult result = kernel.executeCode(codeToExecute, seo2);
          Long endOfEvaluationInNanoseconds = System.nanoTime();
          allRuns.add(endOfEvaluationInNanoseconds - startOfEvaluationInNanoseconds);
          if (repeatIter == timeItOption.getRepeat() - 1 && numberIter == number - 1) {
            isReady.complete(true);
          }
        });
      });

      if (isReady.get()) {
        allRuns.forEach(run -> timings.add(run / number));

        //calculating average
        long average = timings.stream()
                .reduce((aLong, aLong2) -> aLong + aLong2)
                .orElse(0L) / timings.size();
        double stdev = Math.pow(timings.stream().map(currentValue -> Math.pow(currentValue - average, 2))
                .reduce((aDouble, aDouble2) -> aDouble + aDouble2)
                .orElse(0.0) / timings.size(), 0.5);

        if (timeItOption.getQuietMode()) {
          output = "";
        } else {
          output = String.format(output, format(average), format((long) stdev), timeItOption.getRepeat(), number);
        }

        return new MagicCommandOutput(MagicCommandOutput.Status.OK, output);
      }
    } catch (InterruptedException | ExecutionException e) {
      return new MagicCommandOutput(MagicCommandOutput.Status.ERROR, "There occurs problem with " + e.getMessage());
    }
    return new MagicCommandOutput(MagicCommandOutput.Status.ERROR, "There occurs problem with timeIt operations");
  }

  protected TimeItOption buildTimeItOption(Code code) {
    TimeItOption timeItOption = new TimeItOption();

    try {
      StrTokenizer tokenizer = new StrTokenizer(code.asString());

      CommandLineParser parser = new PosixParser();
      CommandLine cmd = parser.parse(createForTimeIt(), tokenizer.getTokenArray());

      if (cmd.hasOption('n')) {
        timeItOption.setNumber(Integer.valueOf(cmd.getOptionValue('n')));
      }
      if (cmd.hasOption('r')) {
        timeItOption.setRepeat(Integer.valueOf(cmd.getOptionValue('r')));
      }
      if (cmd.hasOption('q')) {
        timeItOption.setQuietMode(true);
      }

    } catch (ParseException e) {
      throw new IllegalArgumentException(e.getMessage());
    } catch (NumberFormatException e) {
      throw new IllegalArgumentException("Expected value must be a number " + e.getMessage().toLowerCase());
    }

    return timeItOption;
  }

  private Options createForTimeIt() {
    Options options = new Options();
    options.addOption("n", true, "Execute the given statement <N> times in a loop");
    options.addOption("r", true, "Repeat the loop iteration <R> times and take the best result. Default: 3");
    options.addOption("q", false, "Quiet, do not print result.");

    return options;
  }

  private int getBestNumber(String codeToExecute, boolean showResult, Message message) {
    for (int value = 0; value < 10; ) {
      Double numberOfExecution = Math.pow(10, value);
      CompletableFuture<Boolean> keepLooking = new CompletableFuture<>();

      Long startTime = System.nanoTime();
      IntStream.range(0, numberOfExecution.intValue()).forEach(indexOfExecution -> {
        SimpleEvaluationObject simpleEvaluationObject = createSimpleEvaluationObject(
                codeToExecute, kernel, new Message(new Header(message.type(), message.getHeader().getSession())), 0);
        if (!showResult) {
          simpleEvaluationObject.noResult();
        }

        kernel.executeCode(codeToExecute, simpleEvaluationObject);
        if (numberOfExecution.intValue() - 1 == indexOfExecution) {
          if (TimeUnit.NANOSECONDS.toSeconds(System.nanoTime() - startTime) > 0.2) {
            keepLooking.complete(false);
          } else {
            keepLooking.complete(true);
          }
        }
      });

      try {
        if (keepLooking.get()) {
          value++;
        } else {
          return numberOfExecution.intValue();
        }
      } catch (ExecutionException | InterruptedException e) {
        throw new IllegalStateException("Cannot create best number of execution.");
      }
    }

    throw new IllegalStateException("Cannot create best number of execution.");
  }


}
