import { ContextMenu, Menu } from '@phosphor/widgets';
import { CommandRegistry } from '@phosphor/commands';
import { IDisposable } from '@phosphor/disposable';
import MenuItem from "../shared/interfaces/contextMenuItemInterface";
import MenuInterface from '../shared/interfaces/menuInterface';
export interface addItem {
    addItem: Function;
}
export default abstract class BkoContextMenu implements MenuInterface {
    event: MouseEvent;
    protected scope: any;
    protected commands: CommandRegistry;
    protected menuItems: Menu.IItem[];
    protected inLab: boolean;
    protected disposables: IDisposable[];
    contextMenu: ContextMenu;
    constructor(scope: any);
    protected abstract buildMenu(): void;
    protected isInLab(): boolean;
    protected handleContextMenu(event: MouseEvent): void;
    open(e: MouseEvent): void;
    protected buildLabMenu(): void;
    protected buildBkoMenu(): void;
    protected createItems(items: MenuItem[], menu: addItem): void;
    protected createMenuItem(menuItem: MenuItem, menu: addItem): void;
    protected addMenuItem(menuItem: MenuItem, menu: addItem): Menu.IItem;
    protected addSeparatorItem(menuItem: MenuItem, menu: addItem): Menu.IItem;
    protected addSubmenuItem(menuItem: MenuItem, menu: addItem, subitems: MenuItem[]): Menu.IItem;
    protected addCommand(menuItem: MenuItem): void;
    protected addKeyBinding(menuItem: MenuItem): void;
    protected createSubmenu(menuItem: MenuItem, subitems: MenuItem[]): Menu;
    protected bindEvents(): void;
    destroy(): void;
    removeMenuItems(): void;
    dispose(): void;
    unbind(): void;
}
