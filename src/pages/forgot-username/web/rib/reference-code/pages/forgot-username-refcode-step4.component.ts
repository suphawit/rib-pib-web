import { Component, OnInit } from '@angular/core';
import { ForgotUsernameService } from '../../share/services/forgot-username.service';

@Component({
    selector: 'forgot-username-refcode-step4',
    templateUrl: 'forgot-username-refcode-step4.html'
})
export class ForgotUsernameByRefcodeStep4Component implements OnInit {
    stepCaptionData:any;
    formHeader:any;
    usernameForgot:string;

    constructor(public forgotUsernameService: ForgotUsernameService){
        forgotUsernameService.validPage('refcode4');
    }

    ngOnInit():void {
        this.formHeader = {
            title: 'label.forgotusername',
            stepwizOption: {
                data: [{name: '', label: 'wiz.selectMethod'},{name: '', label: 'wiz.verRef'},{name:'', label:'wiz.verOTP'},{name:'', label:'wiz.showUsername'}],
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
                step: 3,
                totalStep: 4
            },
            title: 'lbl.forgotUsernameStep'
        };

        this.usernameForgot = this.forgotUsernameService.pageCache.username;
    }

}