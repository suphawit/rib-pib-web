import { Component, OnInit } from '@angular/core';
import { ActivateAccountService } from '../../share/services/activate-account.service';

@Component({
    selector: 'activate-account-debitcard-step2',
    templateUrl: 'activate-account-debitcard-step2.html'
})
export class ActivateAccountByDebitcardStep2Component implements OnInit {
    stepCaptionData: any;
    verifyDebitcardForm: any;
    formHeader: any;

    constructor(public activateAccountService: ActivateAccountService){
        activateAccountService.validPage('debitcard2');
    }

    ngOnInit():void {
        this.formHeader = {
            title: 'activate.title',
            stepwizOption: {
                data: [{name: '', label: 'wiz.selectMethod'},{name: '', label: 'wiz.identify'},{name:'', label:'wiz.verRef'},{name:'', label:'wiz.termAndCond'},{name:'', label:'wiz.createUsername'}],
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
                totalStep: 5
            },
            title: 'label.acivate.step'
        };

        this.verifyDebitcardForm = {
            onClicked: (value: any)=> {
                
                if(value === 'back'){
                    this.activateAccountService.changeRoute('debitcard1');
                } else {
                    this.verifyDebitCardAndATMPin(value);
                }
                
            }
        };      
    }

    verifyDebitCardAndATMPin(data){
        this.activateAccountService.verifyDebitCardAndATMPin(data).then((result) => {
            
            this.activateAccountService.changeRoute('debitcard3');
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