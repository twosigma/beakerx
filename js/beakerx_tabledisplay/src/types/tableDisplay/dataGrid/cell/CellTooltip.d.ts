export default class CellTooltip {
    timeoutId: number;
    node: HTMLElement;
    container: HTMLElement;
    static TOOLTIP_ANIMATION_DELAY: number;
    constructor(text: string, container: HTMLElement);
    destroy(): void;
    show(x: number, y: number): void;
    hide(): void;
}
