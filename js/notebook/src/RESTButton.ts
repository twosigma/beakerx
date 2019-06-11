import widgets from './widgets';
import BeakerXApi from "beakerx_shared/lib/api/BeakerXApi";

export class RESTButtonModel extends widgets.ButtonModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: "RESTButtonView",
      _model_name: "RESTButtonModel",
      _model_module: 'beakerx',
      _view_module: 'beakerx',
      _model_module_version: BEAKERX_MODULE_VERSION,
      _view_module_version: BEAKERX_MODULE_VERSION
    };
  }
}

export class RESTButtonView extends widgets.ButtonView {

  private api: BeakerXApi;
  private url: string;

  initialize(parameters) {
    super.initialize(parameters);
    this.url = this.model.get('url');
    this.setApi()
  }

  update() {
    super.update();
    this.url = this.model.get('url');
  }

  private setApi() {
    let baseUrl;

    if (this.api) {
      return;
    }

    try {
      const coreutils = require('@jupyterlab/coreutils');
      coreutils.PageConfig.getOption('pageUrl');
      baseUrl = coreutils.PageConfig.getBaseUrl();
    } catch (e) {
      baseUrl = `${window.location.origin}/`;
    }

    this.api = new BeakerXApi(baseUrl);
  }

  events(): { [e: string]: string } {
    return {'click': '_handle_REST_click'};
  }

  /**
   * Handles when the button is clicked.
   */
  _handle_REST_click(event) {
    event.preventDefault();
    let data = { url: this.url };
    this.api
      .restService(data)
      .catch((err) => { console.log(err) });
  }

}

export default {
  RESTButtonModel,
  RESTButtonView
};
