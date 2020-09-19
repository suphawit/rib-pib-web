import { ViewChild } from '@angular/core';
import { BillPaymentService } from './bill-payment.service';
import { Constants } from '../../share/service/constants';
import { PermissionChangeRoute } from '../../share/service/permission.service';
import { StepWizard } from '../../share/component/step-wizard/step-wizard.component';
import { AlertMessageComponent } from '../../share/component/alert-message/alert-message.component';

export class BillerConfirm {
    public responseOtp;
    public isAdd: boolean;
    private nextPage: string;
    private OTPData: any = {};
    public labelTitle: string;
    public confirmAddBillerData: any;
    protected stepWizard: StepWizard;
    protected verifyOTPStyle: string;
    protected verifyOTPAction: string;
    public isRequestOTP: boolean = false;
    protected responseCodeMainService: string = '';
    alertConfig: { title: string, type: string, message: string, show: boolean, option: any };

    @ViewChild('alertMessage') public alertMessage: AlertMessageComponent;

    constructor(public permissionChangeRoute: PermissionChangeRoute,
        public billPaymentService: BillPaymentService,
        public constants: Constants) {
    }

    init(): void {
        if (this.isAdd) {
            this.verifyOTPAction = this.constants.ACTION_CODE_ADD_BILLER;
        } else {
            this.verifyOTPAction = this.constants.ACTION_CODE_EDIT_BILLER;
        }

        this.verifyOTPStyle = this.constants.STYLE_RIB_WEB;
        this.alertConfig = {
            title: '',
            type: 'danger',
            message: '',
            show: false,
            option: {}
        };

        if (typeof this.billPaymentService.confirmAddBillerData !== 'undefined') {
            this.confirmAddBillerData = this.billPaymentService.confirmAddBillerData;
        } else {
            this.permissionChangeRoute.changeRoute('DASHBOARD');
        }
    }

    protected setNextPage(nextPage: string) {
        this.nextPage = nextPage;
    }

    onAddBillerSubmit(): void {
        this.responseCodeMainService = '';

        if (typeof this.OTPData.pin === 'undefined') {
            this.alertConfig.message = 'error.not.input.otp';
            this.alertMessage.show();
            return;
        }

        let objRequest = {
            params: {
                referenceNO: this.OTPData.otpRefcode,
                tokenOTPForCAA: this.OTPData.tokenOtp,
                otp: this.OTPData.pin,
                billCustomer: {
                    billerAliasName: this.billPaymentService.confirmAddBillerData.billerAliasName,
                    ref1: this.billPaymentService.confirmAddBillerData.ref1,
                    ref2: this.billPaymentService.confirmAddBillerData.ref2
                },
            }
        };

        this.billPaymentService.setActionCode(this.constants.REQ_ACTION_CODE.BILLER_ADD);
        this.billPaymentService.setProcedure(this.constants.REQ_PROCEDURE_NAME.BILLER_ADD);
        this.billPaymentService.confirmAddBiller(objRequest).then((objResponse: any) => {
            if (objResponse.responseJSON.result.responseStatus.responseCode == this.constants.RESP_CODE_SUCCESS) {


                let alertConfig = {
                    title: 'label.Success',
                    type: 'success',
                    message: 'label.addBillerSuccess',
                    show: true,
                    option: { billerAliasName: this.billPaymentService.confirmAddBillerData.billerAliasName, billerName: this.billPaymentService.confirmAddBillerData.billerName }
                };

                this.billPaymentService.alertConfig = alertConfig;
                this.billPaymentService.confirmAddBillerData = undefined;
                this.permissionChangeRoute.changeRoute('MANAGE_BILLER.LIST');
            } else {
                if (objResponse.responseJSON.result.responseStatus.responseCode === this.constants.RESP_CODE_REQ_OTP_AGAIN) {
                    this.isRequestOTP = false;
                }

                this.responseCodeMainService = objResponse.responseJSON.result.responseStatus.responseCode;
                this.OTPData.pin = '';
                this.alertConfig.message = objResponse.responseJSON.result.responseStatus.errorMessage;
                this.alertMessage.show();
            }
        }, function (error) {

        });
    }

    onEditBillerSubmit(): void {
        let objRequest = {
            params: {
                billCustomer: {
                    billerAliasName: this.billPaymentService.confirmAddBillerData.billerAliasName,
                    billerID: this.billPaymentService.confirmAddBillerData.billerID,
                    ref1: this.billPaymentService.confirmAddBillerData.ref1,
                    ref2: this.billPaymentService.confirmAddBillerData.ref2
                },
            }
        };

        this.billPaymentService.setActionCode(this.constants.REQ_ACTION_CODE.BILLER_EDIT_WITHOUT_OTP);
        this.billPaymentService.setProcedure(this.constants.REQ_PROCEDURE_NAME.BILLER_EDIT_WITHOUT_OTP);
        this.billPaymentService.confirmAddBiller(objRequest).then((objResponse: any) => {
            if (objResponse.responseJSON.result.responseStatus.responseCode == this.constants.RESP_CODE_SUCCESS) {


                let alertConfig = {
                    title: 'label.Success',
                    type: 'success',
                    message: 'label.editBillerSuccess',
                    show: true,
                    option: { billerAliasName: this.billPaymentService.confirmAddBillerData.billerAliasName, billerName: this.billPaymentService.confirmAddBillerData.billerName }
                };

                this.billPaymentService.alertConfig = alertConfig;
                this.billPaymentService.confirmAddBillerData = undefined;
                this.permissionChangeRoute.changeRoute('MANAGE_BILLER.LIST');
            } else {
                this.alertConfig.message = objResponse.responseJSON.result.responseStatus.errorMessage;
                this.alertMessage.show();
            }
        }, function (error) {

        });
    }

    protected goToNextPage(): void {

        this.permissionChangeRoute.changeRoute(this.nextPage);
    }

    requestOTPChanged(result) {
        this.isRequestOTP = true;

        if (typeof result.responseCode === "undefined") {
            this.OTPData.otpRefcode = result.otpRefcode;
            this.OTPData.tokenOtp = result.tokenOtp;
            this.OTPData.pin = '';

            this.alertConfig.message = '';
            this.alertMessage.hide();
        } else {
            this.alertConfig.message = result.errorMessage;
            this.alertMessage.show();
        }
    }

    otpPass($event) {

        this.OTPData.pin = $event;
    }

    public setIsAdd(isAdd: boolean) {
        this.isAdd = isAdd;
    }
}