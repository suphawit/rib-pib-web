import { Component, OnInit } from '@angular/core';
import { ForgotUsernameService } from '../../share/services/forgot-username.service';

@Component({
    selector: 'forgot-username-refcode-step2',
    templateUrl: 'forgot-username-refcode-step2.html'
})
export class ForgotUsernameByRefcodeStep2Component implements OnInit {
    stepCaptionData: any;
    verifyRefcodeForm: any;
    formHeader: any;

    constructor(public forgotUsernameService: ForgotUsernameService){
        forgotUsernameService.validPage('refcode2');
    }

    ngOnInit():void {
        this.formHeader = {
            title: 'label.forgotusername',
            stepwizOption: {
                data: [{name: '', label: 'wiz.selectMethod'},{name: '', label: 'wiz.verRef'},{name:'', label:'wiz.verOTP'},{name:'', label:'wiz.showUsername'}],
                style: 'rib-web',
                step: 1
            },
            alertMsgOption: {
                type: 'danger',
                message: '',
                show: false
            }
        };

        this.stepCaptionData = {
            step: {
                step: 1,
                totalStep: 4
            },
            title: 'lbl.forgotUsernameStep'
        };

        this.verifyRefcodeForm = {
            onClicked: (value: any)=> {
                
                if(value === 'back'){
                    this.forgotUsernameService.changeRoute('refcode1');
                } else {
                    this.verifyRefCode(value);
                }
                
            },
            countryList: []
        };

        this.forgotUsernameService.inquiryAllIssueCountry().then((result: any) => {
            
            this.verifyRefcodeForm.countryList = result;
        }, (error) => {
            
            this.setErrorMessage(error.errorMessage);
        });
    }

    verifyRefCode(data: any){
        data.subscriptionChannel = 'REF_CODE';
        this.forgotUsernameService.verifyReferenceCode(data).then((result) => {
            
            this.forgotUsernameService.changeRoute('refcode3');
        }, (error) => {
            
            this.setErrorMessage(error.errorMessage)
        });
    }

    private setErrorMessage(msg: string){
        this.formHeader.alertMsgOption = {
            type: 'danger',
            message: msg,
            show: (msg ? true : false)
        };
    }
}