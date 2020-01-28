import {BoxLayout, BoxPanel, Widget} from "@phosphor/widgets";
import {SparkUI2View} from "./SparkUI2";
import './shared/style/spark2.scss';
import widgets from "./widgets";

export class SparkUI2Widget extends BoxPanel {

    private startEl: SparkUI2StartWidget;
    // private profileSelectorEl: HTMLDivElement;
    // private profileConfigurationEl: HTMLDivElement;

    constructor(private view: SparkUI2View) {
        super();
        this.addClass('bx-spark2-widget');

        this.create();

        window.onresize = () => { this.update(); };
    }

    protected onChildAdded(msg: Widget.ChildMessage): void {
        this.update();
    }

    protected onChildRemoved(msg: Widget.ChildMessage): void {
        this.update();
    }

    private create() {
        this.startEl = new SparkUI2StartWidget();
        // this.profileSelectorEl = SparkUI2WidgetBuilder.createProfileSelectorEl();
        // this.profileConfigurationEl = SparkUI2WidgetBuilder.createProfileConfigurationEl();

        this.direction = 'top-to-bottom';
        this.spacing = 0;
        this.addClass('jupyter-widgets');
        this.addClass('widget-container');
        this.addClass('widget-box');
        this.addClass('widget-vbox');

        BoxLayout.setStretch(this.startEl, 1);

        this.addWidget(this.startEl);
        // this.node.appendChild(this.startEl);
        // this.node.appendChild(this.profileSelectorEl);
        // this.node.appendChild(this.profileConfigurationEl);
    }
}

class SparkUI2StartWidget extends BoxPanel {

    constructor() {
        super();
        this.direction = 'left-to-right';
        this.id = widgets.uuid();
        this.spacing = 0;
        this.addClass('jupyter-widgets');
        this.addClass('widget-container');
        this.addClass('widget-box');
        this.addClass('widget-hbox');

        let b = SparkUI2StartWidget.createButtonWidget();

        BoxLayout.setStretch(b, 1);

        this.addWidget(b);
    }

    private static createButtonWidget(): Widget {
        let buttonEl = document.createElement('button');

        buttonEl.textContent = "Start";
        buttonEl.title = 'Start a session with cluster (or a local instance)';
        // buttonEl.classList.add('jupyter-button', 'widget-button', 'bx-spark-connect');

        // buttonEl.addEventListener('click', SparkUI2WidgetBuilder.onStartClicked);

        let w = new Widget({ node: buttonEl });
        // w.title = 'Start a session with cluster (or a local instance)';
        w.addClass('jupyter-widgets');
        w.addClass('jupyter-button');
        w.addClass('widget-button');
        w.addClass('bx-spark-connect');

        w.update();

        return w;
    }
}

class SparkUI2WidgetBuilder {

    static createStartEl(): HTMLDivElement {
        //todo add container for connection error information etc
        let el = document.createElement('div');
        let buttonEl = document.createElement('button');

        buttonEl.textContent = "Start";
        buttonEl.classList.add('jupyter-button', 'widget-button', 'bx-spark-connect');
        buttonEl.title = 'Start a session with cluster (or a local instance)';

        buttonEl.addEventListener('click', SparkUI2WidgetBuilder.onStartClicked);

        el.classList.add('widget-box', 'widget-hbox');
        el.append(buttonEl);

        return el;
    }

    static createProfileSelectorEl(): HTMLDivElement {
        let containerEl: HTMLDivElement = document.createElement('div');
        let dropdownContainerEl: HTMLDivElement = document.createElement('div');
        let labelEl = document.createElement('label');
        let selectEl = document.createElement('select');
        let optionEl = document.createElement('option');
        let saveEl = document.createElement('button');
        let createProfileEl = document.createElement('button');
        let deleteProfileEl = document.createElement('button');

        containerEl.classList.add('widget-box', 'widget-hbox');
        dropdownContainerEl.classList.add('widget-dropdown');

        labelEl.textContent = 'Profile';
        labelEl.title = 'Profile';
        labelEl.classList.add('widget-label');

        optionEl.value = '';
        optionEl.setAttribute('data-value', '');
        //todo populate options

        saveEl.textContent = 'Save';
        saveEl.title = 'Save profile';
        saveEl.classList.add('jupyter-button', 'widget-button', 'bx-spark-save-button');

        createProfileEl.textContent = '';
        createProfileEl.title = 'Create new profile';
        createProfileEl.classList.add('jupyter-button', 'widget-button', 'bx-button', 'icon-add');

        deleteProfileEl.textContent = '';
        deleteProfileEl.title = 'Delete this profile';
        deleteProfileEl.disabled = true;
        deleteProfileEl.classList.add('jupyter-button', 'widget-button', 'bx-button', 'icon-close');

        selectEl.appendChild(optionEl);
        dropdownContainerEl.appendChild(selectEl);
        containerEl.appendChild(labelEl);
        containerEl.appendChild(dropdownContainerEl);
        containerEl.appendChild(saveEl);
        containerEl.appendChild(createProfileEl);
        containerEl.appendChild(deleteProfileEl);

        return containerEl;
    }

    static createProfileConfigurationEl(): HTMLDivElement {
        let containerEl: HTMLDivElement = document.createElement('div');
        let masterUrlEl = SparkUI2WidgetBuilder.createMasterUrlEl();
        let executorCoresEl = SparkUI2WidgetBuilder.createExecutorCoresEl();
        let executorMemoryEl = SparkUI2WidgetBuilder.createExecutorMemoryEl();
        let hiveSupportEl = SparkUI2WidgetBuilder.createHiveSupportEl();
        let additionalPropertiesEl = SparkUI2WidgetBuilder.createAdditionalPropertiesEl();

        containerEl.appendChild(masterUrlEl);
        containerEl.appendChild(executorCoresEl);
        containerEl.appendChild(executorMemoryEl);
        containerEl.appendChild(hiveSupportEl);
        containerEl.appendChild(additionalPropertiesEl);

        return containerEl;
    }

    private static createMasterUrlEl(): HTMLDivElement {
        let el = document.createElement("div");
        let urlLabelEl = document.createElement("label");
        let urlInputEl = document.createElement("input");

        urlLabelEl.textContent = "Master URL";
        urlInputEl.setAttribute('type', "text");
        urlInputEl.value = "local[100]";

        el.classList.add('widget-box', 'widget-hbox', 'widget-text');
        urlLabelEl.classList.add('widget-label');

        el.appendChild(urlLabelEl);
        el.appendChild(urlInputEl);

        return el;
    }

    private static createExecutorCoresEl(): HTMLDivElement {
        let el = document.createElement("div");
        let coresLabelEl = document.createElement("label");
        let coresInputEl = document.createElement("input");

        coresLabelEl.textContent = "Executor Cores";
        coresInputEl.setAttribute('type', "text");
        coresInputEl.value = "10";
        coresInputEl.disabled = true;

        coresInputEl.title = "The number of cores to use on each executor";

        el.classList.add('widget-box', 'widget-hbox', 'widget-text');
        coresLabelEl.classList.add('widget-label');

        el.appendChild(coresLabelEl);
        el.appendChild(coresInputEl);

        return el;
    }

    private static createExecutorMemoryEl(): HTMLDivElement {
        let el = document.createElement("div");
        let memoryLabelEl = document.createElement("label");
        let memoryInputEl = document.createElement("input");

        memoryLabelEl.textContent = "Executor Memory";
        memoryInputEl.setAttribute('type', "text");
        memoryInputEl.value = "8g";
        memoryInputEl.disabled = true;
        memoryInputEl.title = "Amount of memory to use per executor process, in MiB unless otherwise specified. (e.g. 2g, 8g).";

        el.classList.add('widget-box', 'widget-hbox', 'widget-text');
        memoryLabelEl.classList.add('widget-label');

        el.appendChild(memoryLabelEl);
        el.appendChild(memoryInputEl);

        return el;
    }

    private static createHiveSupportEl(): HTMLDivElement {
        let el = document.createElement("div");
        let hiveInputEl = document.createElement("input");
        let hiveLabelEl = document.createElement("label");

        hiveInputEl.setAttribute('type', 'checkbox');
        hiveInputEl.title = "Enable Hive Support";
        hiveLabelEl.textContent = "Enable Hive Support";

        el.classList.add('widget-box', 'widget-hbox', 'bx-spark-hive');
        hiveLabelEl.classList.add('widget-label-basic');

        hiveLabelEl.prepend(hiveInputEl, " ");
        el.appendChild(hiveLabelEl);

        hiveInputEl.addEventListener('change', SparkUI2WidgetBuilder.onHiveSupportChanged);

        return el;
    }

    private static createAdditionalPropertiesEl(): HTMLDivElement {
        let el = document.createElement('div');
        let labelEl = document.createElement('label');
        let availableEl = document.createElement('a');
        let propertyAddEl = document.createElement('button');

        el.classList.add('widget-box', 'widget-hbox')
        labelEl.textContent = "";
        labelEl.classList.add('widget-label');

        availableEl.textContent = 'Available properties';
        availableEl.href = "https://spark.apache.org/docs/2.4.4/configuration.html#available-properties";
        availableEl.target = "_blank";

        propertyAddEl.textContent = '';
        propertyAddEl.title = 'Add property';
        propertyAddEl.classList.add('jupyter-button', 'widget-button', 'bx-button', 'icon-add');

        labelEl.append(availableEl);
        el.appendChild(labelEl);
        el.appendChild(propertyAddEl);

        return el;
    }

    private static onHiveSupportChanged(evt): void {
        console.log('hive support changed', evt.target.checked);
    }

    private static onStartClicked(evt: MouseEvent): void {
        console.log('clicked');
        //todo
    }
}