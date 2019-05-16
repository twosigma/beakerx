export declare enum HIGHLIGHTER_STYLE {
    SINGLE_COLUMN = "SINGLE_COLUMN",
    FULL_ROW = "FULL_ROW"
}
export declare enum HIGHLIGHTER_TYPE {
    heatmap = "HeatmapHighlighter",
    uniqueEntries = "UniqueEntriesHighlighter",
    threeColorHeatmap = "ThreeColorHeatmapHighlighter",
    value = "ValueHighlighter",
    sort = "SortHighlighter"
}
export default interface IHihglighterState {
    colName: string;
    maxColor: string | null;
    maxVal: number | null;
    minColor: string | null;
    minVal: number | null;
    midColor: string | null;
    midVal: number | null;
    style: HIGHLIGHTER_STYLE;
    type: HIGHLIGHTER_TYPE;
    colors: string[] | null;
}
