import { Component, OnInit } from '@angular/core';
import { ActivateAccountService } from '../../share/services/activate-account.service';
import { Constants } from '../../../../../../share/service/constants';

@Component({
    selector: 'activate-account-products-step3',
    templateUrl: 'activate-account-products-step3.html'
})
export class ActivateAccountByProductsStep3Component implements OnInit {
    stepCaptionData: any;
    subscribeInfoData: any;
    verifyResubmitRefcode: any;
    verifyOTP: any;
    formHeader: any;

    constructor(
        public activateAccountService: ActivateAccountService,
        public constants: Constants){
            activateAccountService.validPage('products3');
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
                    this.activateAccountService.changeRoute('products2');
                } else {
                    if(this.verifyOTP.data.otp === ''){
                        this.setErrorMessage('label.warningRInputOTPPin');
                    } else {
                        this.verifyRefCode(value);
                    }
                    
                }
                
            }
        };

        this.verifyOTP = {
            data: {
                otp: '',
                referenceNO: '',
                tokenOTPForCAA: ''
            },
            actionOTP: this.constants.ACTION_CODE_ACTIVATE_ACCOUNT,
            style: this.constants.STYLE_RIB_WEB,
            requestOTPChanged: (value)=>{
                
                this.verifyOTP.data.referenceNO = value.otpRefcode;
                this.verifyOTP.data.tokenOTPForCAA = value.tokenOtp;
            },
            otpPass: (value)=>{
                
                this.verifyOTP.data.otp = value;
            },
            verifyTransactionId: this.activateAccountService.pageCache.verifyTransactionId || '',
            subscriptionChannel: 'PRODUCT'
        };
    }

    verifyRefCode(data: any){
        let pageCache = this.activateAccountService.pageCache;
        let obj = this.verifyOTP.data;
        obj.idType = pageCache.idType;
        obj.idNo = pageCache.idNo;
        obj.referenceCode = data.referenceCode;
        obj.verifyTransactionId = pageCache.verifyTransactionId;
        obj.subscriptionChannel = 'PRODUCT';
        this.activateAccountService.verifyReferenceCode(obj).then((result) => {
            
            this.activateAccountService.changeRoute('products4');
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