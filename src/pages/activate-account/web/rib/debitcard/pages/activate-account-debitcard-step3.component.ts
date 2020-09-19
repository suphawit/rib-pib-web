import { Component, OnInit } from '@angular/core';
import { ActivateAccountService } from '../../share/services/activate-account.service';

@Component({
    selector: 'activate-account-debitcard-step3',
    templateUrl: 'activate-account-debitcard-step3.html'
})
export class ActivateAccountByDebitcardStep3Component implements OnInit {
    stepCaptionData: any;
    subscribeInfoData: any;
    verifyResubmitRefcode: any;
    formHeader: any;

    constructor(public activateAccountService: ActivateAccountService){
        activateAccountService.validPage('debitcard3');
    }

    ngOnInit():void {
        this.formHeader = {
            title: 'activate.title',
            stepwizOption: {
                data: [{name: '', label: 'wiz.selectMethod'},{name: '', label: 'wiz.identify'},{name:'', label:'wiz.verRef'},{name:'', label:'wiz.termAndCond'},{name:'', label:'wiz.createUsername'}],
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
                totalStep: 5
            },
            title: 'label.acivate.step'
        };
        
        this.subscribeInfoData = {
            email: this.activateAccountService.pageCache.email,
            mobileNo: this.activateAccountService.pageCache.mobileNo
        };

        this.verifyResubmitRefcode = {
            onClicked: (value)=>{
                
                if(value === 'back'){
                    this.activateAccountService.changeRoute('debitcard2');
                } else {
                    this.verifyRefCode(value);
                }
            }
        };

    }

    verifyRefCode(data: any){
        let obj = this.activateAccountService.pageCache;
        obj.referenceCode = data.referenceCode;
        obj.subscriptionChannel = 'ATM_PIN';
        this.activateAccountService.verifyReferenceCode(obj).then((result) => {
            
            this.activateAccountService.changeRoute('debitcard4');
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