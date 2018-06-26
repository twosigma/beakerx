export declare namespace EventHelpers {
    function isOutsideNode(event: MouseEvent, node: HTMLElement): boolean;
    function isInsideGrid(event: any): boolean | Element;
    function isInsideGridNode(event: MouseEvent, gridNode: HTMLElement): boolean | Element;
}
