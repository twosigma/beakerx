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
from beakerx.button.button_widget import RESTButton
from beakerx_base import BeakerxBox, BaseObject, Box, HBox
from traitlets import Unicode, Dict, Bool


class SparkStateProgress(BaseObject):

    def __init__(self, numberOfTasks, jobId, stageId, jobLink, stageLink, **kwargs):
        self.active = 0
        self.done = 0
        self.numberOfTasks = numberOfTasks
        self.cancelled = 0
        self.jobId = jobId
        self.stageId = stageId
        self.jobLink = jobLink
        self.stageLink = stageLink


class SparkStateProgressWidget(BeakerxBox):
    _view_name = Unicode('SparkStateProgressView').tag(sync=True)
    _model_name = Unicode('SparkStateProgressModel').tag(sync=True)
    _view_module = Unicode('beakerx').tag(sync=True)
    _model_module = Unicode('beakerx').tag(sync=True)
    _model_module_version = Unicode('*').tag(sync=True)
    _view_module_version = Unicode('*').tag(sync=True)

    state = Dict().tag(sync=True)

    def __init__(self, numberOfTasks, jobId, stageId, jobLink, stageLink, **kwargs):
        super(SparkStateProgressWidget, self).__init__(**kwargs)
        self.bar = SparkStateProgress(numberOfTasks, jobId, stageId, jobLink, stageLink, **kwargs)
        self.state = self.bar.transform()

    def init(self):
        self.bar.done = 0
        self.bar.active = 0
        self.state = self.bar.transform()
        return self

    def addActive(self):
        self.bar.active += 1
        self.state = self.bar.transform()
        return self

    def addDone(self):
        self.bar.done += 1
        self.bar.active -= 1
        self.state = self.bar.transform()
        return self

    def addCancelled(self):
        self.bar.cancelled += 1
        self.bar.active -= 1
        self.state = self.bar.transform()
        return self


class SparkFoldout(Box):
    _view_name = Unicode('SparkFoldoutView').tag(sync=True)
    _model_name = Unicode('SparkFoldoutModel').tag(sync=True)
    _view_module = Unicode('beakerx').tag(sync=True)
    _model_module = Unicode('beakerx').tag(sync=True)
    hidePreview = Bool(False).tag(sync=True)
    headerLabel = Unicode('Spark progress').tag(sync=True)


class SparkStateGroupPanel(HBox):
    _dom_classes = ["bx-spark-stageGroupPanel"]


class SparkStateProgressUiManager:
    CANCELLED_SPARK_JOBS = "cancelledSparkJobs"
    PUT_SPARK_JOBS_IN_THE_BACKGROUND = "putSparkJobsInTheBackground"

    def __init__(self, engine, spark_server):
        self.engine = engine
        self.spark_server = spark_server

    def job_link(self, job_id):
        if self.engine.get_ui_web_url() is not None:
            return self.engine.get_ui_web_url() + "/jobs/job/?id=" + str(job_id)
        else:
            return ""

    def stage_link(self, stageId):
        if self.engine.get_ui_web_url() is not None:
            return self.engine.get_ui_web_url() + "/stages/stage/?id=" + str(stageId) + "&attempt=0"
        else:
            return ""

    def create_cancelled_jobs_button(self, stageId):
        xButton = RESTButton()
        xButton.url = self.spark_server.getURL() + self.CANCELLED_SPARK_JOBS + "/" + str(stageId)
        xButton.tooltip = "interrupt spark job"
        xButton._dom_classes = ["bx-button", "icon-close"]
        return xButton

    def create_bg_jobs_button(self, stageId):
        xButton = RESTButton()
        xButton.url = self.spark_server.getURL() + self.PUT_SPARK_JOBS_IN_THE_BACKGROUND
        xButton.tooltip = "put spark job in the background, let it complete asynchronously"
        xButton._dom_classes = ["bx-button", "icon-bg"]
        return xButton
