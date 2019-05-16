import BkoContextMenu from '../../../contextMenu/BkoContextMenu';
import { DataGridScope } from "../DataGridScope";
export default class DataGridContextMenu extends BkoContextMenu {
    constructor(scope: DataGridScope);
    protected buildMenu(): void;
}
