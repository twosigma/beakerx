/// <reference types="lodash" />
import { IBeakerXDataGridState } from "../store/BeakerXDataStore";
import { IColumnPosition, IColumnState } from "../interface/IColumn";
export declare const selectColumnStates: (state: IBeakerXDataGridState) => Map<string, IColumnState>;
export declare const selectColumnStatesArray: ((state: IBeakerXDataGridState) => any) & {
    resultFunc: (res: Map<string, IColumnState>) => any;
    recomputations: () => number;
    resetRecomputations: () => number;
};
export declare const selectBodyColumnStates: ((state: IBeakerXDataGridState) => any) & {
    resultFunc: (res: any) => any;
    recomputations: () => number;
    resetRecomputations: () => number;
};
export declare const selectVisibleBodyColumns: ((state: any) => any) & {
    resultFunc: (res1: any, res2: {}, res3: string[]) => any;
    recomputations: () => number;
    resetRecomputations: () => number;
};
export declare const selectColumnStateByKey: (state: any, key: any) => any;
export declare const selectColumnState: (state: IBeakerXDataGridState, column: any) => any;
export declare const selectColumnDataTypeName: ((state: IBeakerXDataGridState, props: any, ...args: any[]) => any) & {
    resultFunc: (res: any) => any;
    recomputations: () => number;
    resetRecomputations: () => number;
};
export declare const selectColumnHorizontalAlignment: (state: IBeakerXDataGridState, column: any) => any;
export declare const selectColumnDisplayType: (state: IBeakerXDataGridState, column: any) => any;
export declare const selectColumnFilter: (state: IBeakerXDataGridState, column: any) => any;
export declare const selectColumnDataType: (state: IBeakerXDataGridState, column: any) => any;
export declare const selectColumnSortOrder: (state: IBeakerXDataGridState, column: any) => any;
export declare const selectColumnKeepTrigger: (state: IBeakerXDataGridState, column: any) => any;
export declare const selectColumnFormatForTimes: (state: IBeakerXDataGridState, column: any) => any;
export declare const selectColumnWidth: (state: IBeakerXDataGridState, column: any) => any;
export declare const selectColumnPosition: (state: IBeakerXDataGridState, column: any) => any;
export declare const selectColumnIndexByPosition: ((state: any, props: IColumnPosition, ...args: any[]) => number) & {
    resultFunc: (res1: any, res2: IColumnPosition) => number;
    recomputations: () => number;
    resetRecomputations: () => number;
};
export declare const selectOutputColumnLimit: (state: IBeakerXDataGridState) => any;
