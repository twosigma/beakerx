
const widgets = require('./widgets');


class SparkConfigurationModel extends widgets.VBoxModel {

    defaults() {
        return {
            ...super.defaults(),
            _view_name: "SparkConfigurationView",
            _model_name: "SparkConfigurationModel",
            _model_module: 'beakerx',
            _view_module: 'beakerx',
            _model_module_version: BEAKERX_MODULE_VERSION,
            _view_module_version: BEAKERX_MODULE_VERSION,
        };
    }
}

class SparkConfigurationView extends widgets.VBoxView {

}

export default {
    SparkConfigurationModel,
    SparkConfigurationView
};