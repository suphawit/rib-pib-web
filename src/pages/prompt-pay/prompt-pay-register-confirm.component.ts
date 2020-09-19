import { Constants } from '../../share/service/constants';
import { TranslateService } from "ng2-translate/src/translate.service";
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { OtpService } from '../../share/component/verify-otp/otp.service';
import { PermissionAction } from '../../share/service/permission.service';
import { PermissionChangeRoute } from '../../share/service/permission.service';
import { StepWizard } from '../../share/component/step-wizard/step-wizard.component';
import { PromptPayRegisterServiceMain } from '../../pages/prompt-pay/prompt-pay-register.service';
import { AlertMessageComponent } from '../../share/component/alert-message/alert-message.component';

@Component({
    selector: 'prompt-pay-register-confirm',
    templateUrl: 'prompt-pay-register-confirm.html'
})
export class PromptPayRegisterConfirmComponent implements OnInit, OnDestroy {
    public type: string;
    stepwizardStyle: String;
    public message: string;
    public OTPData: any = {};
    public anyIDValueName: string;
    public stepWizard: StepWizard;
    public verifyOTPStyle: string;
    public verifyOTPAction: string;
    public resultAnyIDConfirm: any;
    public verifyTransactionId: any;
    public isRequestOTP: boolean = false;
    public responseCodeMainService: string = '';
    public currentLang = this.translate.currentLang;
    public isValidatePromptPayRegisterAlert: boolean = false;

    @ViewChild('alertMessage') public alertMessage: AlertMessageComponent;

    constructor(public otpService: OtpService,
        public constants: Constants,
        public promptPayRegisterServiceMain: PromptPayRegisterServiceMain,
        public permissionAction: PermissionAction,
        public permissionChangeRoute: PermissionChangeRoute,
        public translate: TranslateService) {

        this.verifyOTPStyle = this.constants.STYLE_RIB_WEB;
        this.verifyOTPAction = this.constants.ACTION_CODE_REGISTER_ANYID;
        this.verifyTransactionId = this.promptPayRegisterServiceMain.verifyTransactionId;
    }

    ngOnInit(): void {
        if (this.promptPayRegisterServiceMain.tempRegisterAnyIDData == null) {
            this.permissionChangeRoute.changeRoute('DASHBOARD');
            return;
        }

        this.stepWizard = {
            input: {
                data: [{ name: '1', label: 'stepWizard.enterDetails' }, { name: '2', label: 'stepWizard.confirm' }, { name: '3', label: 'stepWizard.complete' }],
                step: 1,
                style: this.stepwizardStyle
            }
        }

        this.resultAnyIDConfirm = this.promptPayRegisterServiceMain.tempRegisterAnyIDData.resultAnyIDConfirm;
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
            this.message = result.errorMessage;
            this.type = 'danger';
            this.alertMessage.show();
        }
    }

    otpPass($event) {
        this.OTPData.pin = $event;
    }

    gotoPromptPayRegisterSuccess() {
        this.responseCodeMainService = '';

        if (this.OTPData.pin != null && this.OTPData.pin != "") {
            let verifyTransactionID = this.verifyTransactionId;
            let verifyOTPRequest = {
                referenceNO: this.OTPData.otpRefcode,
                tokenOTPForCAA: this.OTPData.tokenOtp,
                otp: this.OTPData.pin
            };
            let param = { verifyTransactionID, verifyOTPRequest };

            this.promptPayRegisterServiceMain.registerAnyID(param).then((objResponse: any) => {
                let result = objResponse.responseJSON.result;

                if (result.responseStatus.responseCode == this.constants.RESP_CODE_SUCCESS) {
                    this.promptPayRegisterServiceMain.tempRegisterAnyIDData = undefined;
                    this.promptPayRegisterServiceMain.confirmRegisterAnyIDData = objResponse;
                    this.permissionChangeRoute.changeRoute('KK_PRODUCT_SERVICE.REGISTER_KK_PROMPT_PAY_STEP3');
                } else {
                    if (result.responseStatus.responseCode === this.constants.RESP_CODE_REQ_OTP_AGAIN) {
                        this.isRequestOTP = false;
                    }

                    this.responseCodeMainService = result.responseStatus.responseCode;
                    this.OTPData.pin = '';
                    this.message = result.responseStatus.errorMessage;
                    this.type = 'danger';
                    this.alertMessage.show();
                }
            }, function (error) {

            });
        }
    }

    navigateToPromptPayregister(): void {
        this.permissionChangeRoute.prevUrl = 'KK_PRODUCT_SERVICE.REGISTER_KK_PROMPT_PAY';
        this.permissionChangeRoute.changeRoute('KK_PRODUCT_SERVICE.REGISTER_KK_PROMPT_PAY');
    }

    ngOnDestroy(): void {
        if(this.permissionChangeRoute.prevUrl != 'KK_PRODUCT_SERVICE.REGISTER_KK_PROMPT_PAY' ){
            this.promptPayRegisterServiceMain.tempRegisterAnyIDData = undefined;
        }
        this.permissionChangeRoute.prevUrl = null;
    }
}
