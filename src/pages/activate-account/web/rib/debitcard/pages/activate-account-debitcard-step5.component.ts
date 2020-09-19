import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivateAccountService } from '../../share/services/activate-account.service';
import { MessageModalComponent } from '../../../../../../share/component/modal-messages.component';

@Component({
    selector: 'activate-account-debitcard-step5',
    templateUrl: 'activate-account-debitcard-step5.html'
})
export class ActivateAccountByDebitcardStep5Component implements OnInit {
    stepCaptionData: any;
    messageModalData: any;
    activateAccountForm: any;
    formHeader: any;

    constructor(public activateAccountService: ActivateAccountService){
        activateAccountService.validPage('debitcard5');
    }

    @ViewChild('messageModal') public messageModal: MessageModalComponent;

    ngOnInit():void {
        this.formHeader = {
            title: 'activate.title',
            stepwizOption: {
                data: [{name: '', label: 'wiz.selectMethod'},{name: '', label: 'wiz.identify'},{name:'', label:'wiz.verRef'},{name:'', label:'wiz.termAndCond'},{name:'', label:'wiz.createUsername'}],
                style: 'rib-web',
                step: 4
            },
            alertMsgOption: {
                type: 'danger',
                message: '',
                show: false
            }
        };

        this.stepCaptionData = {
            step: {
                step: 4,
                totalStep: 5
            },
            title: 'label.acivate.step'
        };

        this.messageModalData = {
            title: 'label.Success',
            body: 'label.activation.successMsg',
            size: 'md',
            config: { isShowCloseBtn: true },
            action: {}
        };

        this.activateAccountForm = {
            suggest: [],
            onClicked: (value: any)=> {

                if(value === 'back'){
                    this.activateAccountService.changeRoute('debitcard4');
                } else {
                    this.requestActivateAccount(value);
                }
                
            }
        };
    }

    onModalHidden() {
        this.activateAccountService.changeRoute("HOME");
    }

    requestActivateAccount(data: any){
        data.subscriptionChannel = 'ATM_PIN';
        this.activateAccountService.requestActivateAccount(data).then((result: any) => {

            this.messageModal.show();
        }, (error) => {

            if (error.suggest && error.suggest.length > 0) {
                this.activateAccountForm.suggest = error.suggest;
                this.setErrorMessage('');
            } else {
                this.setErrorMessage(error.errorMessage);
            }

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