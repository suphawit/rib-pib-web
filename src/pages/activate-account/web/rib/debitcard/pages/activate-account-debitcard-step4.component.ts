import { Component, OnInit } from '@angular/core';
import { ActivateAccountService } from '../../share/services/activate-account.service';

@Component({
    selector: 'activate-account-debitcard-step4',
    templateUrl: 'activate-account-debitcard-step4.html'
})
export class ActivateAccountByDebitcardStep4Component implements OnInit {
    stepCaptionData: any;
    termAndCondOption: any;
    formHeader: any;

    constructor(public activateAccountService: ActivateAccountService){
        activateAccountService.validPage('debitcard4');
    }

    ngOnInit():void {
        this.formHeader = {
            title: 'activate.title',
            stepwizOption: {
                data: [{name: '', label: 'wiz.selectMethod'},{name: '', label: 'wiz.identify'},{name:'', label:'wiz.verRef'},{name:'', label:'wiz.termAndCond'},{name:'', label:'wiz.createUsername'}],
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
                totalStep: 5
            },
            title: 'label.acivate.step'
        };

        this.termAndCondOption = {
            onClicked: (data: any)=> {
                //
                if (data === 'agree') {
                    this.activateAccountService.changeRoute('debitcard5');
                } else {
                    this.activateAccountService.changeRoute('debitcard3');
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