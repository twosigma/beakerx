import { CommandRegistry } from '@phosphor/commands';
export default interface MenuItem {
    title: string;
    action?: Function;
    enableItemsFiltering?: boolean;
    id?: string;
    icon?: string;
    inputPlaceholder?: string;
    inputAction?: Function;
    isChecked?: Function | boolean;
    items?: MenuItem[] | Function;
    keepOpen?: boolean;
    separator?: boolean;
    shortcut?: string;
    submenuClass?: string;
    type?: string;
    tooltip?: string;
    updateLayout?: boolean;
    isVisible?: CommandRegistry.CommandFunc<boolean>;
    args?: object;
}
