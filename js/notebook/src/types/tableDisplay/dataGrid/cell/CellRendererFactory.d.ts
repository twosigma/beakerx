import { BeakerXDataGrid } from "../BeakerXDataGrid";
import { ALL_TYPES } from "../dataTypes";
import HTMLCellRenderer from "./HTMLCellRenderer";
import HeaderCellRenderer from "./HeaderCellRenderer";
import DefaultCellRenderer from "./DefaultCellRenderer";
import ImageCellRenderer from "./ImageCellRenderer";
export declare class CellRendererFactory {
    static getRenderer(dataGrid: BeakerXDataGrid, dataType?: ALL_TYPES): HTMLCellRenderer | DefaultCellRenderer | ImageCellRenderer;
    static getHeaderRenderer(dataGrid: any): HeaderCellRenderer;
}
