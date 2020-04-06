import {Widget} from "@phosphor/widgets";

export class SpinnerWidget extends Widget {
    constructor() {
        super();
        this.hide();
        this.addClass('lds-spinner');
        let children = [];
        for (let i = 0; i < 12; i++) {
            children.push(document.createElement('div'));
        }
        this.node.append(...children);
    }
}