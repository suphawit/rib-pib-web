import { Component, Output, Input, OnInit, EventEmitter, OnChanges } from '@angular/core';
import { Constants } from '../../../../../../share/service/constants';

@Component({
    selector: 'forgot-username-verify-otp-info',
    templateUrl: 'forgot-username-verify-otp-info.html'
})
export class ForgotUsernameVerifyOTPInfoComponent implements OnInit, OnChanges {
    verifyOTP: any;

    // @Input('subscribeInfo') subscribeInfoData: any;
    @Input('isRequestOTP') isRequestOTP: any;
    @Input('verifyTransactionId') verifyTransactionId: string;
    @Input('subscriptionChannel') subscriptionChannel: string;
    @Output() onAction = new EventEmitter();

    constructor(public constants: Constants){
    }

    ngOnInit():void {
        this.verifyOTP = {
            data: {
                otpRefcode: '',
                otpPin: '',
                tokenOtp: ''
            },
            isRequestOTP: false,
            style: this.constants.STYLE_RIB_WEB,
            actionOTP: this.constants.ACTION_CODE_FORGOT_USERNAME,
            responseCodeMainService: '',
            requestOTPChanged: (data: any)=>{
                this.verifyOTP.isRequestOTP = true;

                if (typeof data.responseCode === "undefined") {
                    this.onAction.emit({
                        name: 'error',
                        value: ''
                    });
                    this.verifyOTP.data = data;
                } else {
                    this.onAction.emit({
                        name: 'error',
                        value: data.errorMessage
                    });
                }
            },
            otpPass: (data: any)=>{
                this.verifyOTP.data.otpPin = data;
            },
            verifyTransactionId: this.verifyTransactionId || '',
            subscriptionChannel: this.subscriptionChannel
        };
    }

    ngOnChanges(changed: any) {
        if(changed.isRequestOTP && changed.isRequestOTP.currentValue){
            this.verifyOTP.isRequestOTP = changed.isRequestOTP.currentValue;
        }

    }

    onBack(){
        this.onAction.emit({
            name: 'clicked',
            value: 'back'
        });
    }

    onSubmit(){
        var objData = this.verifyOTP.data;
        objData['verifyTransactionId'] = this.verifyTransactionId;
        objData['subscriptionChannel'] = this.subscriptionChannel;

        this.onAction.emit({
            name: 'clicked',
            value: objData
        });
    }

}