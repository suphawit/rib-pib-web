import { Component, OnInit } from '@angular/core';
import { ActivateAccountService } from '../../share/services/activate-account.service';

@Component({
    selector: 'activate-account-refcode-step3',
    templateUrl: 'activate-account-refcode-step3.html'
})
export class ActivateAccountByRefcodeStep3Component implements OnInit {
    stepCaptionData: any;
    termAndCondOption: any;
    formHeader: any;
    
    constructor(public activateAccountService: ActivateAccountService){
        activateAccountService.validPage('refcode3');
    }

    ngOnInit():void {
        this.formHeader = {
            title: 'activate.title',
            stepwizOption: {
                data: [{name: '', label: 'wiz.selectMethod'},{name: '', label: 'wiz.verRef'},{name:'', label:'wiz.termAndCond'},{name:'', label:'wiz.createUsername'}],
                style: 'rib-web',
                step: 2
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
                totalStep: 4
            },
            title: 'label.acivate.step'
        };

        this.termAndCondOption = {
            onClicked: (data: any)=> {
                // 
                if (data === 'agree') {
                    this.activateAccountService.changeRoute('refcode4');
                } else {
                    this.activateAccountService.changeRoute('refcode2');
                }
            },
            html: ''
        };

        this.activateAccountService.inquiryTermAndCondition().then((result: any)=>{
            this.termAndCondOption.html = result.data;
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