import {ModalDirective} from "ng2-bootstrap";
import {Component, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import {Constants} from "../../../../../../share/service/constants";

@Component({
    selector: 'e-donation-modal',
    templateUrl: './e-donation-modal.html',
    providers: []
})
export class EDonationModalComponent {
    result: any;

    @Input('data') data: any;
    @Input('valid') valid: any;
    @Output('onHidden') onHidden = new EventEmitter();
    @Output('onEmit') onEmit = new EventEmitter();
    @ViewChild('childModal') public childModal: ModalDirective;

    constructor(
        public Constants: Constants
    ) {
    }

    public show(): void {
        this.childModal.show();
    }

    public hide():void {
        this.childModal.hide();
    }

    public hidden():void {
        this.onHidden.emit();
    }

    public emitValue():void {
        this.onEmit.emit({data: this.data, valid: this.valid});
    }
}