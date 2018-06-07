import '../../../global.env';
import ColumnManager from "../column/ColumnManager";
import { BeakerXDataGrid } from "../BeakerXDataGrid";
import { BeakerXDataStore } from "../store/BeakerXDataStore";
export default class ColumnLimitModal {
    store: BeakerXDataStore;
    columnManager: ColumnManager;
    container: HTMLElement;
    modalId: string;
    constructor(dataGrid: BeakerXDataGrid, container: HTMLElement);
    shouldOpenModal(): boolean;
    init(): void;
    bindEvents(modal: any): void;
}
