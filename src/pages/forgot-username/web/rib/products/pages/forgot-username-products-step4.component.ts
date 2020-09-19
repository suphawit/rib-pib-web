import { Component, OnInit } from '@angular/core';
import { ForgotUsernameService } from '../../share/services/forgot-username.service';

@Component({
    selector: 'forgot-username-products-step4',
    templateUrl: 'forgot-username-products-step4.html'
})
export class ForgotUsernameByProductsStep4Component implements OnInit {
    stepCaptionData: any;
    formHeader: any;
    usernameForgot:string;

    constructor(
        public forgotUsernameService: ForgotUsernameService){
            forgotUsernameService.validPage('products4');
    }

    ngOnInit():void {
        this.formHeader = {
            title: 'label.forgotusername',
            stepwizOption: {
                data: [{name: '', label: 'wiz.selectMethod'},{name: '', label: 'wiz.identify'},{name:'', label:'wiz.verOTP'},{name:'', label:'wiz.showUsername'}],
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