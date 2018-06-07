import widgets from './widgets';
export declare class SparkUIModel extends widgets.VBoxModel {
    defaults(): any;
}
export declare class SparkUIView extends widgets.VBoxView {
    private sparkStats;
    private sparkAppId;
    private sparkUiWebUrl;
    private sparkMasterUrl;
    private apiCallIntervalId;
    private connectionLabelActive;
    private connectionLabelMemory;
    private connectionLabelDead;
    private connectionStatusElement;
    private masterUrlInput;
    private executorCoresInput;
    private executorMemoryInput;
    initialize(parameters: any): void;
    render(): void;
    update(): void;
    private addSparkUrls();
    private addSparUiWebUrl();
    private addMasterUrl();
    private handleLocalMasterUrl();
    private toggleExecutorConfigInputs();
    private openWebUi();
    private openExecutors();
    private updateChildren();
    private resolveChildren(view);
    private createSparkMetricsWidget();
    private connectToApi();
    private setApiCallInterval(api);
    private clearApiCallInterval();
    private updateMetrics(data);
    private addSparkMetricsWidget();
    dispose(): void;
}
declare const _default: {
    SparkUIModel: typeof SparkUIModel;
    SparkUIView: typeof SparkUIView;
};
export default _default;
