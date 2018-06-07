import widgets from './widgets';
import './gridView/grid-view.scss';
export declare class GridModel extends widgets.VBoxModel {
    defaults(): any;
}
export declare class GridView extends widgets.VBoxView {
    render(): void;
}
declare const _default: {
    GridViewModel: typeof GridModel;
    GridView: typeof GridView;
};
export default _default;
