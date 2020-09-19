import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Constants } from '../../../../../../share/service/constants';

@Component({
    selector: 'activate-account-term-and-cond',
    templateUrl: 'activate-account-term-and-cond.html'
})
export class ActivateAccountTermAndCondComponent implements OnInit {
    constructor(public constants: Constants) {}

    @Input('html') htmlData: string;
    @Output() onClicked = new EventEmitter();
    @Output() onError = new EventEmitter();

    termAndCondData: any;

    ngOnInit(){
        this.termAndCondData = {
            termAction: 'rib_term_and_con',
            responseService: (event: any)=> {
                // if (event.responseCode == this.constants.RESP_CODE_SUCCESS) {
                // } else {
                //     //this.onError.emit(event);
                // }
            },
            isAgreed: false
        };
    }

    onSubmit(){
        if(this.termAndCondData.isAgreed){
            this.onClicked.emit('agree');
        }
    }

    onBack(){
        this.onClicked.emit('back');
    }

}