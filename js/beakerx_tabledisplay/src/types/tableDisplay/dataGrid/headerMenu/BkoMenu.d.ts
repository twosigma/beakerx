import { Menu } from '@phosphor/widgets';
import { Message } from '@phosphor/messaging';
export default class BkoMenu extends Menu {
    keepOpen: boolean | undefined;
    trigger: HTMLElement;
    dispose(): void;
    triggerActiveItem(): void;
    protected onBeforeAttach(msg: Message): void;
    protected onActivateRequest(msg: Message): void;
    close(): void;
}
