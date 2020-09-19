import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivateAccountService } from '../../share/services/activate-account.service';
import { MessageModalComponent } from '../../../../../../share/component/modal-messages.component';

@Component({
    selector: 'activate-account-refcode-step4',
    templateUrl: 'activate-account-refcode-step4.html'
})
export class ActivateAccountByRefcodeStep4Component implements OnInit {
    activateAccountForm: any;
    stepCaptionData: any;
    messageModalData: any;
    formHeader: any;

    constructor(public activateAccountService: ActivateAccountService){
            activateAccountService.validPage('refcode4');
    }

    @ViewChild('messageModal') public messageModal: MessageModalComponent;

    ngOnInit():void {
        this.formHeader = {
            title: 'activate.title',
            stepwizOption: {
                data: [{name: '', label: 'wiz.selectMethod'},{name: '', label: 'wiz.verRef'},{name:'', label:'wiz.termAndCond'},{name:'', label:'wiz.createUsername'}],
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
                    this.activateAccountService.changeRoute('refcode3');
                } else {
                    this.requestActivateAccount(value);
                }
                
            }
        };
    }

    onModalHidden() {
        this.activateAccountService.changeRoute('HOME');
    }

    requestActivateAccount(data: any){
        data.subscriptionChannel = 'REF_CODE';
        this.activateAccountService.requestActivateAccount(data).then((result: any) => {

            this.messageModal.show();
        }, (error: any) => {

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