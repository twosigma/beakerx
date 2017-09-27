import { Menu } from '@phosphor/widgets'

export default class BkoMenu extends Menu {
  keepOpen: boolean|undefined;

  triggerActiveItem(): void {
    if (!this.keepOpen) {
      super.triggerActiveItem();
      return;
    }

    if (!this.isAttached) {
      return;
    }

    const item = this.activeItem;
    if (!item) {
      return;
    }

    const command = item.command, args = item.args;
    if (this.commands.isEnabled(command, args)) {
      this.commands.execute(command, args);
    }
  }
}
