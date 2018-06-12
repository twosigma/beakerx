export declare enum RENDERER_TYPE {
    DataBars = "DataBars",
}
export default interface IRenderer {
    type: RENDERER_TYPE;
    includeText: boolean;
    percent?: number;
    direction?: 'RIGHT' | 'LEFT';
}
