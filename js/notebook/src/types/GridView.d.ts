import widgets from './widgets';
import './gridView/grid-view.scss';
export declare class GridViewModel extends widgets.VBoxModel {
    defaults(): any;
}
export declare class GridView extends widgets.VBoxView {
    render(): void;
}
declare const _default: {
    GridViewModel: typeof GridViewModel;
    GridView: typeof GridView;
};
export default _default;
