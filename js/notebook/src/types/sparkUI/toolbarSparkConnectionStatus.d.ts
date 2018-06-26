import { SparkUIView } from "../SparkUI";
export declare class ToolbarSparkConnectionStatus {
    private sparkUIView;
    private toolbarSparkStats;
    private toolbarStatusContainer;
    constructor(sparkUIView: SparkUIView);
    bindToolbarSparkEvents(): void;
    destroy(): void;
    clear(): void;
    propagateToolbarWidget(): void;
    append(): void;
    private handleToolbarSparkClick(event);
    private appendToolbarSparkStats();
}
