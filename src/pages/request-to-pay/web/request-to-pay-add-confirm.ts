import { Constants } from '../../../share/service/constants';
import { OnInit, OnDestroy, ViewChild } from '@angular/core';
import { PermissionChangeRoute } from '../../../share/service/permission.service';
import { RequestToPayService } from '../request-to-pay.service';
import { AnyIDTypeBean } from '../../../share/bean/anyid-type-bean';
import { AlertMessageComponent } from '../../../share/component/alert-message/alert-message.component';
import { Dateservice } from '../../../share/service/date.service';

export class RTPConfirm implements OnInit, OnDestroy{
    @ViewChild('alertMessage') public alertMessage: AlertMessageComponent;
    private createRTPObj: any;
    private model: any = {
            transferMethod: '',
            otpPin: '',
            verifyOTP: null
    };
    protected settings= { styleClass: ''};
    private verifyOTPStyle: string;
    private verifyOTPAction: string;

    private prevStep: string = 'MY_RTP.ADD';
    private nextStep: string = 'MY_RTP.ADD_COMPLETE';
    protected responseCodeMainService: string = '';
    private fromAccount = {
    //aliasName : '',
    accNo : '',
    anyIDValue : '',
    anyIDType : new AnyIDTypeBean,
    accDisplay: ''
    };
    private toAccount = {
    aliasName : '',
    accName: '',
    anyIDValue : '',
    anyIDType : new AnyIDTypeBean,
    accDisplay: ''
    };
    private isRequestOTP: boolean = false;
    type: string;
    message: string;

  constructor(public constants: Constants,
    public permissionChangeRoute: PermissionChangeRoute,
    public requestToPayService: RequestToPayService,
    public dateService: Dateservice) {
  }

    ngOnInit(){
        this.verifyOTPStyle = this.settings.styleClass;
        this.verifyOTPAction = this.constants.ACTION_CODE_CREATE_RTP; 

        let getcreateRTPObj :any = this.requestToPayService.getcreateRTPObj();
        
        this.fromAccount = {
            //aliasName : getcreateRTPObj.fromAccountAliasName,
            accNo : getcreateRTPObj.fromAccountNo,
            anyIDValue : getcreateRTPObj.fromAnyIdValue,
            anyIDType : getcreateRTPObj.fromAnyIdTypeBean,
            accDisplay: ''
        };
        this.toAccount = {
            aliasName : getcreateRTPObj.toAccountAliasName,
            accName: getcreateRTPObj.toAccountAcctName,
            anyIDValue : getcreateRTPObj.toAnyIdValue,
            anyIDType : getcreateRTPObj.toAnyIdTypeBean,
            accDisplay: ''
        };
        let accDisplayFromAcc = this.getAccountDisplay(this.fromAccount);
        let accDisplayToAcc = this.getAccountDisplay(this.toAccount);

        this.fromAccount.accDisplay = accDisplayFromAcc;
        this.toAccount.accDisplay = accDisplayToAcc;

        this.createRTPObj = {
            fromAccount: this.fromAccount,
            amount: getcreateRTPObj.amount,
            memo: getcreateRTPObj.memo,
            toAccount: this.toAccount,
            verifyTransactionId: getcreateRTPObj.verifyTransactionId,
            transactionDate: getcreateRTPObj.transactionDate
        }

        this.requestToPayService.setcreateRTPObj(null);
    
    }
    onRequestOTP(result) {
        this.isRequestOTP = true;

        if (typeof result.responseCode === "undefined") {
            this.model.verifyOTP = result;
        } else {
            this.message = result.errorMessage;
            this.type = 'danger';
            this.alertMessage.show();
        }
    }

    onOtpChanged(arg) {
        this.model.otpPin = arg;
    }

    goToPrevStep(){
        this.permissionChangeRoute.prevUrl = this.prevStep;
        this.permissionChangeRoute.changeRoute(this.prevStep);
    }

    goToNextStep(data): void {
        this.responseCodeMainService = '';
        let verifyOTP: any = {};
        let promise = null;
        let verifycompleteRTPObj: any = {};

        // if (this.model.verifyOTP != null) {
             verifyOTP = {
                // otpRefcode: this.model.verifyOTP.otpRefcode,
                // otpPin: this.model.otpPin,
                // tokenOtp: this.model.verifyOTP.tokenOtp,
                verifyTransactionId: this.createRTPObj.verifyTransactionId
            };
            verifycompleteRTPObj = {
                verifyOTP: verifyOTP,
                fromAnyIdType: this.fromAccount.anyIDType,
                toAnyIdType: this.toAccount.anyIDType
            }
             
        // }
        promise = this.requestToPayService.confirmCreateRTP(verifycompleteRTPObj);

        if (promise != null) {
            promise.then((result: any) => {
                
                if (typeof result.responseCode === 'undefined') {
                    this.requestToPayService.setcreateRTPObj(result);
                    this.permissionChangeRoute.changeRoute(this.nextStep);
                } else {
                    // if (result.responseCode === this.constants.RESP_CODE_REQ_OTP_AGAIN) {
                    //     this.isRequestOTP = false;
                    // }
                    this.responseCodeMainService = result.responseCode;
                    this.model.otpPin = '';
                    this.type = 'danger';
                    this.message = result.errorMessage;
                    this.alertMessage.show();
                }
            });
        }
    }

     public getAccountDisplay(data): string {
        let anyIDTypeDesc = '';
        if (typeof data.anyIDType.anyIDType !== "undefined") {
            anyIDTypeDesc = data.anyIDType.desc;
        }

        if (data.accName != null && data.accName != '' ) {
            return data.accName + '<br />' + anyIDTypeDesc + '<br />' + '(' + data.anyIDValue + ')' + '<br />';
        }
         return (data.accNo !== undefined)? anyIDTypeDesc + '<br />' + '(' + data.anyIDValue + ')' + '<br />' + data.accNo :  anyIDTypeDesc + '<br />' + '(' + data.anyIDValue + ')';
    }

    ngOnDestroy(): void {
        this.permissionChangeRoute.targetAction = null;
        
        if( this.permissionChangeRoute.prevUrl!==this.prevStep){
            this.requestToPayService.settmpRTPObj(null);
        }

        this.permissionChangeRoute.prevUrl = null;
    }

}