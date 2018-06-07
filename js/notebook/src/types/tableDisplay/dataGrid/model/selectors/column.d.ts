import { IColumnPosition } from "../../interface/IColumn";
import IHihglighterState from "../../interface/IHighlighterState";
export declare const DEFAULT_INDEX_COLUMN_NAME = "index";
export declare const selectColumnNames: ((state: any) => string[]) & {
    resultFunc: (res: string[]) => string[];
    recomputations: () => number;
    resetRecomputations: () => number;
};
export declare const selectBodyColumnNames: ((state: any) => string[]) & {
    resultFunc: (res1: string[], res2: boolean) => string[];
    recomputations: () => number;
    resetRecomputations: () => number;
};
export declare const selectColumnIndexByName: ((state: any, props: any, ...args: any[]) => number) & {
    resultFunc: (res1: string[], res2: any) => number;
    recomputations: () => number;
    resetRecomputations: () => number;
};
export declare const selectIndexColumnNames: ((state: any) => string[]) & {
    resultFunc: (res1: string[], res2: boolean) => string[];
    recomputations: () => number;
    resetRecomputations: () => number;
};
export declare const selectColumnsFrozenNames: ((state: any) => string[]) & {
    resultFunc: (res1: {}, res2: string[]) => string[];
    recomputations: () => number;
    resetRecomputations: () => number;
};
export declare const selectColumnsFrozenCount: (state: any) => number;
export declare const selectIsColumnFrozen: ((state: any, props: any, ...args: any[]) => boolean) & {
    resultFunc: (res1: string[], res2: any) => boolean;
    recomputations: () => number;
    resetRecomputations: () => number;
};
export declare const selectColumnVisible: ((state: any, props: any, ...args: any[]) => boolean) & {
    resultFunc: (res1: {}, res2: string[], res3: any) => boolean;
    recomputations: () => number;
    resetRecomputations: () => number;
};
export declare const selectInitialColumnAlignment: ((state: any, props: any, ...args: any[]) => "left" | "right" | "center") & {
    resultFunc: (res1: any, res2: any, res3: "left" | "right" | "center") => "left" | "right" | "center";
    recomputations: () => number;
    resetRecomputations: () => number;
};
export declare const selectVisibleColumnsFrozenCount: ((state: any) => number) & {
    resultFunc: (res1: string[], res2: {}) => number;
    recomputations: () => number;
    resetRecomputations: () => number;
};
export declare const selectColumnDataTypeByName: ((state: any, props: any, ...args: any[]) => any) & {
    resultFunc: (res1: string[], res2: string[], res3: any) => any;
    recomputations: () => number;
    resetRecomputations: () => number;
};
export declare const selectInitialColumnPositions: ((state: any) => IColumnPosition[]) & {
    resultFunc: (res1: string[], res2: string[], res3: {}, res4: boolean, res5: string[]) => IColumnPosition[];
    recomputations: () => number;
    resetRecomputations: () => number;
};
export declare const selectRenderer: ((state: any, props: any, ...args: any[]) => any) & {
    resultFunc: (res1: any, res2: any) => any;
    recomputations: () => number;
    resetRecomputations: () => number;
};
export declare const selectColumnHighlighters: ((state: any, props: any, ...args: any[]) => IHihglighterState[]) & {
    resultFunc: (res1: IHihglighterState[], res2: any, res3: any) => IHihglighterState[];
    recomputations: () => number;
    resetRecomputations: () => number;
};
