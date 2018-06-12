import MenuItem from './menuItemInterface';
export default interface ContextMenuItem extends MenuItem {
    selector: string;
    id: string;
}
