import widgets from './widgets';
export declare class TabModel extends widgets.TabModel {
    defaults(): any;
}
export declare class TabView extends widgets.TabView {
    render(): void;
    _onTabChanged(tabBar: any, tabs: any): void;
    _triggerSelectEventForChildren(currentIndex: any): void;
}
declare const _default: {
    TabModel: typeof TabModel;
    TabView: typeof TabView;
};
export default _default;
