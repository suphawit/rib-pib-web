import { Component, OnInit } from '@angular/core';
import { ForgotUsernameService } from '../../share/services/forgot-username.service';

@Component({
    selector: 'forgot-username-debitcard-step2',
    templateUrl: 'forgot-username-debitcard-step2.html'
})
export class ForgotUsernameByDebitcardStep2Component implements OnInit {
    stepCaptionData: any;
    verifyDebitcardForm: any;
    formHeader: any;

    constructor(public forgotUsernameService: ForgotUsernameService){
        forgotUsernameService.validPage('debitcard2');
    }

    ngOnInit():void {
        this.formHeader = {
            title: 'label.forgotusername',
            stepwizOption: {
                data: [{name: '', label: 'wiz.selectMethod'},{name: '', label: 'wiz.identify'},{name:'', label:'wiz.showUsername'}],
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
                totalStep: 3
            },
            title: 'lbl.forgotUsernameStep'
        };

        this.verifyDebitcardForm = {
            onClicked: (value: any)=> {

                if(value === 'back'){
                    this.forgotUsernameService.changeRoute('debitcard1');
                } else {
                    this.verifyDebitCardAndATMPin(value);
                }
                
            }
        };      
    }

    verifyDebitCardAndATMPin(data){
        this.forgotUsernameService.verifyDebitCardAndATMPin(data).then((result) => {

            this.requestUsername();
        }, (error) => {

            this.setErrorMessage(error.errorMessage)
        });
    }

    requestUsername(){
        let obj = this.forgotUsernameService.pageCache;
        obj.subscriptionChannel = 'ATM_PIN';
        this.forgotUsernameService.requestUsername(obj).then((result) => {

            this.forgotUsernameService.changeRoute('debitcard3');
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