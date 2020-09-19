import { Component, OnInit } from '@angular/core';
import { ForgotUsernameService } from '../../share/services/forgot-username.service';

@Component({
    selector: 'forgot-username-debitcard-step3',
    templateUrl: 'forgot-username-debitcard-step3.html'
})
export class ForgotUsernameByDebitcardStep3Component implements OnInit {
    stepCaptionData: any;
    formHeader: any;
    usernameForgot:string;

    constructor(public forgotUsernameService: ForgotUsernameService){
        forgotUsernameService.validPage('debitcard3');
    }

    ngOnInit():void {
        this.formHeader = {
            title: 'label.forgotusername',
            stepwizOption: {
                data: [{name: '', label: 'wiz.selectMethod'},{name: '', label: 'wiz.identify'},{name:'', label:'wiz.showUsername'}],
                style: 'rib-web',
                step: 3
            },
            alertMsgOption: {
                type: 'danger',
                message: '',
                show: false
            }
        };

        this.stepCaptionData = {
            step: {
                step: 2,
                totalStep: 3
            },
            title: 'lbl.forgotUsernameStep'
        };
     
        this.usernameForgot = this.forgotUsernameService.pageCache.username;
    }
}