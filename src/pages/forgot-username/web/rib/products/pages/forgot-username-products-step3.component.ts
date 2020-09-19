import { Component, OnInit } from '@angular/core';
import { ForgotUsernameService } from '../../share/services/forgot-username.service';
import { Constants } from '../../../../../../share/service/constants';

@Component({
    selector: 'forgot-username-products-step3',
    templateUrl: 'forgot-username-products-step3.html'
})
export class ForgotUsernameByProductsStep3Component implements OnInit {
    stepCaptionData: any;
    verifyOTPInfo: any;
    formHeader: any;

    constructor(
        public forgotUsernameService: ForgotUsernameService, public constants: Constants){
            forgotUsernameService.validPage('products3');
    }

    ngOnInit():void {
        this.formHeader = {
            title: 'label.forgotusername',
            stepwizOption: {
                data: [{name: '', label: 'wiz.selectMethod'},{name: '', label: 'wiz.identify'},{name:'', label:'wiz.verOTP'},{name:'', label:'wiz.showUsername'}],
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
            title: 'lbl.forgotUsernameStep'
        };

        this.verifyOTPInfo = {
            subscribeInfo: {
                email: this.forgotUsernameService.pageCache.email,
                mobileNo: this.forgotUsernameService.pageCache.mobileNo
            },
            isRequestOTP: false,
            onAction: (data: any)=>{
                if(data.name === 'clicked'){
                    this.onClicked(data.value);
                } else if(data.name === 'error'){
                    this.setErrorMessage(data.value);
                }
            },
            verifyTransactionId: this.forgotUsernameService.pageCache.verifyTransactionId,
            subscriptionChannel: 'PRODUCT'
        };
    }

    onClicked(value: any){
        if(value === 'back'){
            this.forgotUsernameService.changeRoute('products2');
        } else {
            this.verifyOTP(value);
        }
        
    }

    verifyOTP(params: any){
        this.forgotUsernameService.verifyOTP(params).then((result)=>{
            this.requestUsername();
        }, (error) => {

            this.setErrorMessage(error.errorMessage);
        });
    }

    requestUsername(){
        let obj = this.forgotUsernameService.pageCache;
        obj.subscriptionChannel = 'PRODUCT';

        this.forgotUsernameService.requestUsername(obj).then((result) => {

            this.forgotUsernameService.changeRoute('products4');
        }, (error) => {

            this.setErrorMessage(error.errorMessage);
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