import { DataStore } from "@phosphor/datastore";
import IDataModelState from "../interface/IDataGridModelState";
import { IColumnsState, IColumnState } from "../interface/IColumn";
export interface IBeakerXDataGridState {
    model: IDataModelState;
    columns: IColumnsState;
}
export declare type BeakerXDataStore = DataStore<IBeakerXDataGridState>;
export default function createStore(initialState: IDataModelState): DataStore<{
    model: IDataModelState;
    columns: Map<string, IColumnState>;
}>;
export declare function createInitialColumnsState(initialState: IDataModelState): IColumnsState;
