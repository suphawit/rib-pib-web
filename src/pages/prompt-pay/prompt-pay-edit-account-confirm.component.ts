import { Constants } from '../../share/service/constants';
import { OnInit, ViewChild } from '@angular/core';
import { OtpService } from '../../share/component/verify-otp/otp.service';
import { PermissionChangeRoute } from '../../share/service/permission.service';
import { PromptPayRegisterServiceMain } from '../../pages/prompt-pay/prompt-pay-register.service';
import { AlertMessageComponent } from '../../share/component/alert-message/alert-message.component';
import { MasterDataService } from '../../share/service/master-data.service';
import { AnyIDTypeBean } from '../../share/bean/anyid-type-bean';
export class PromptPayEditConfirmComponent implements OnInit {

    public message: string = '';
    public type: string = 'danger';
    public OTPData: any = {};
    public verifyOTPStyle: string;
    public verifyOTPAction: string;
    public verifyTransactionId: any;
    public isRequestOTP: boolean = false;
    public confirmEditPromptPayAccount: any;
    public anyIDTypes: any = [];

    @ViewChild('alertMessage') public alertMessage: AlertMessageComponent;

        constructor(public otpService: OtpService,
        public constants: Constants,
        public promptPayRegisterServiceMain: PromptPayRegisterServiceMain,
        public permissionChangeRoute: PermissionChangeRoute,
        public masterDataService: MasterDataService){
        }

    ngOnInit(): void {

        this.verifyOTPStyle = this.constants.STYLE_RIB_WEB;
        this.verifyOTPAction = this.constants.ACTION_CODE_AMEND_ANYID;

        this.confirmEditPromptPayAccount = this.promptPayRegisterServiceMain.EditAnyIDData;
        this.inquiryAnyIDObjectForDisplay(this.confirmEditPromptPayAccount.anyIDType);
       
        this.promptPayRegisterServiceMain.EditAnyIDData = undefined;
    }

    inquiryAnyIDObjectForDisplay(anyIDType){
        this.masterDataService.getAllAnyIDTypes().then((result: any) => {
            this.anyIDTypes = result;
            this.confirmEditPromptPayAccount.anyIDType =  this.anyIDTypes[anyIDType] || new AnyIDTypeBean();
        });     
    }

    requestOTPChanged(result) {
        this.isRequestOTP = true;
        if (typeof result.responseCode === "undefined") {
            this.OTPData.otpRefcode = result.otpRefcode;
            this.OTPData.tokenOtp = result.tokenOtp;
            this.OTPData.pin = '';

            this.message = '';
            this.alertMessage.hide();
        } else {
            this.showErrorMessage(result.errorMessage);
        }
    }

    otpPass($event) {
        this.OTPData.pin = $event;
    }
    
    showErrorMessage(message: string){
        this.message = message;
        this.alertMessage.show();
    }

    goToEditAccountCompletePage() {
        let param = {
            referenceNO: this.OTPData.otpRefcode,
            tokenOTPForCAA: this.OTPData.tokenOtp,
            otp: this.OTPData.pin,
            verifyTransactionId : this.confirmEditPromptPayAccount.verifyTransactionId
        };

        this.promptPayRegisterServiceMain.confirmPromptPayEditAccountService(param).then((objResponse: any) => {
            let result = objResponse.responseJSON.result;

            if (result.responseStatus.responseCode == this.constants.RESP_CODE_SUCCESS) {
                
                this.promptPayRegisterServiceMain.EditAnyIDData = result;
                this.permissionChangeRoute.changeRoute('MY_KK_PROMPTPAY.EDIT_COMPLETE');
            } else {
                this.showErrorMessage(result.responseStatus.errorMessage);
                this.alertMessage.show();
            }
        }, function (error) {
            
        });
    }


    backToEditAccountPage(): void {
        this.promptPayRegisterServiceMain.EditAnyIDData = this.confirmEditPromptPayAccount;
        this.permissionChangeRoute.changeRoute('MY_KK_PROMPTPAY.EDIT');
    }
}
