# Copyright 2019 TWO SIGMA OPEN SOURCE, LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#        http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

from IPython.display import display

from beakerx_magics.sparkex_widget import SparkStateProgressWidget, SparkFoldout, SparkStateGroupPanel


class SparkListener:

    def __init__(self, sparkui, manager):
        self.manager = manager
        self.sparkui = sparkui
        self.group = None
        self.bar = None
        self.jobPanel = None

    def onApplicationEnd(self, applicationEnd):
        self.sparkui.end_application()

    def onApplicationStart(self, applicationStart):
        pass

    def onStageSubmitted(self, stageSubmitted):
        self.jobPanel = SparkFoldout()
        display(self.jobPanel)
        numberOfTasks = stageSubmitted.stageInfo().numTasks()
        stageId = stageSubmitted.stageInfo().stageId()
        self.bar = SparkStateProgressWidget(numberOfTasks,
                                            stageId,
                                            stageId,
                                            self.manager.job_link(stageId),
                                            self.manager.stage_link(stageId))
        self.bar.init()
        xButton = self.manager.create_cancelled_jobs_button(stageId)
        # bgButton = self.manager.create_bg_jobs_button(stageId)
        self.group = SparkStateGroupPanel()
        self.group.children += (self.bar, xButton)
        # self.group.children += (self.bar, xButton,bgButton)
        self.jobPanel.children += (self.group,)

    def onTaskStart(self, taskStart):
        self.bar.addActive()

    def onTaskEnd(self, taskEnd):
        reason = taskEnd.reason().toString()
        if reason == "Success":
            self.bar.addDone()
        elif "Stage cancelled" in reason:
            self.bar.addCancelled()

    def onBlockManagerRemoved(self, blockManagerRemoved):
        pass

    def onBlockUpdated(self, blockUpdated):
        pass

    def onEnvironmentUpdate(self, environmentUpdate):
        pass

    def onExecutorAdded(self, executorAdded):
        pass

    def onExecutorMetricsUpdate(self, executorMetricsUpdate):
        pass

    def onExecutorRemoved(self, executorRemoved):
        pass

    def onJobEnd(self, jobEnd):
        pass

    def onJobStart(self, jobStart):
        pass

    def onOtherEvent(self, event):
        pass

    def onStageCompleted(self, stageCompleted):
        pass

    def onTaskGettingResult(self, taskGettingResult):
        pass

    def onUnpersistRDD(self, unpersistRDD):
        pass

    class Java:
        implements = ["org.apache.spark.scheduler.SparkListenerInterface"]
