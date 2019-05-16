import { TextRenderer } from "@phosphor/datagrid";
export declare const LEFT: TextRenderer.HorizontalAlignment;
export declare const RIGHT: TextRenderer.HorizontalAlignment;
export declare const CENTER: TextRenderer.HorizontalAlignment;
export declare const DEFAULT_ALIGNMENT: "left";
export declare const ALIGNMENTS_BY_TYPE: {
    'datetime': "center";
    'time': "center";
    'integer': "right";
    'int64': "right";
    'double': "right";
};
export declare const ALIGNMENTS_BY_CHAR: {
    'C': "center";
    'R': "right";
    'L': "left";
};
export declare const getAlignmentByType: (type: number) => import("@phosphor/widgets/lib/layout").Layout.HorizontalAlignment;
export declare const getAlignmentByChar: (char: string) => import("@phosphor/widgets/lib/layout").Layout.HorizontalAlignment;
