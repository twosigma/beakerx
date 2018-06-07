import { BeakerXDataGrid } from "../BeakerXDataGrid";
import { ALL_TYPES } from "../dataTypes";
import HTMLCellRenderer from "./HTMLCellRenderer";
import HeaderCellRenderer from "./HeaderCellRenderer";
import DefaultCellRenderer from "./DefaultCellRenderer";
export declare class CellRendererFactory {
    static getRenderer(dataGrid: BeakerXDataGrid, dataType?: ALL_TYPES): HTMLCellRenderer | DefaultCellRenderer;
    static getHeaderRenderer(dataGrid: any): HeaderCellRenderer;
}
