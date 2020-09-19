import { Component, OnInit } from '@angular/core';
import { ActivateAccountService } from '../../share/services/activate-account.service';

@Component({
    selector: 'activate-account-refcode-step2',
    templateUrl: 'activate-account-refcode-step2.html'
})
export class ActivateAccountByRefcodeStep2Component implements OnInit {
    stepCaptionData: any;
    verifyRefcodeForm: any;
    formHeader: any;

    constructor(public activateAccountService: ActivateAccountService){
        activateAccountService.validPage('refcode2');
    }

    ngOnInit():void {
        this.formHeader = {
            title: 'activate.title',
            stepwizOption: {
                data: [{name: '', label: 'wiz.selectMethod'},{name: '', label: 'wiz.verRef'},{name:'', label:'wiz.termAndCond'},{name:'', label:'wiz.createUsername'}],
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
            title: 'label.acivate.step'
        };

        this.verifyRefcodeForm = {
            onClicked: (value: any)=> {
                
                if(value === 'back'){
                    this.activateAccountService.changeRoute('refcode1');
                } else {
                    this.verifyRefCode(value);
                }
                
            },
            countryList: []
        };

        this.activateAccountService.inquiryAllIssueCountry().then((result: any) => {
            
            this.verifyRefcodeForm.countryList = result;
        }, (error) => {
            
            this.setErrorMessage(error.errorMessage);
        });
    }

    verifyRefCode(data: any){
        data.subscriptionChannel = 'REF_CODE';
        this.activateAccountService.verifyReferenceCode(data).then((result) => {
            
            this.activateAccountService.changeRoute('refcode3');
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