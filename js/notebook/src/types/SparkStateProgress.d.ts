import widgets from './widgets';
import "./shared/style/spark.scss";
export declare class SparkStateProgressModel extends widgets.VBoxModel {
    defaults(): any;
}
export declare class SparkStateProgressView extends widgets.VBoxView {
    progressBar: HTMLElement;
    progressBarDone: HTMLElement;
    progressBarActive: HTMLElement;
    progressBarWaiting: HTMLElement;
    progressLabels: HTMLElement;
    progressLabelDone: HTMLElement;
    progressLabelActive: HTMLElement;
    progressLabelWaiting: HTMLElement;
    progressLabelAll: HTMLElement;
    render(): void;
    update(): any;
    private updateLabelWidths();
    private createWidget();
    private createJobPanel();
    private createJobLink(state);
    private createStagePanel(state);
    private createStageLink(state);
    private createStageProgressBar(state);
    private createStageProgressLabels(state);
}
declare const _default: {
    SparkStateProgressModel: typeof SparkStateProgressModel;
    SparkStateProgressView: typeof SparkStateProgressView;
};
export default _default;
