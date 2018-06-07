import widgets from './widgets';
export declare class PlotModel extends widgets.DOMWidgetModel {
    defaults(): any;
}
export declare class PlotView extends widgets.DOMWidgetView {
    render(): void;
    getNumberOfPointsForStandardPlot(plotModel: any): any;
    truncatePointsForStandardPlot(plotModel: any): void;
    limitPoints(plotModel: any): void;
    limitPointsForStandardPlot(plotModel: any, numberOfPoints: any): void;
    handleModellUpdate(): void;
    handleUpdateData(): void;
    initStandardPlot(model: any): void;
    initCombinedPlot(model: any): void;
}
declare const _default: {
    PlotModel: typeof PlotModel;
    PlotView: typeof PlotView;
};
export default _default;
