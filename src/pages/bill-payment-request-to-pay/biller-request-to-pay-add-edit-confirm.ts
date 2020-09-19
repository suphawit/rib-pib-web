import { ViewChild } from '@angular/core';
import { TranslateService } from "ng2-translate/src/translate.service";

import { Constants } from '../../share/service/constants';
import { UtilService } from '../../share/service/util.service';
import { BillerProfileBean } from '../../share/bean/biller-profile-bean';
import { PermissionChangeRoute } from '../../share/service/permission.service';
import { StepWizard } from '../../share/component/step-wizard/step-wizard.component';
import { AlertMessageComponent } from '../../share/component/alert-message/alert-message.component';
import { BillPaymentRequestToPayService } from '../../pages/bill-payment-request-to-pay/bill-payment-request-to-pay.service';

export class BillerRequestToPayAddEditConfirm {

    public stepPageBiller: string;
    public titlePageBiller: string;
    protected verifyOTPStyle: string;
    protected verifyOTPAction: string;
    protected stepWizard: StepWizard;

    public isAdd: boolean;
    protected OTPData: any = {};
    public isRequestOTP: boolean = false;

    alertConfig: { title: string, type: string, message: string, show: boolean, option: any };
    @ViewChild('alertMessage') public alertMessage: AlertMessageComponent;

    protected responseCodeMainService: string = '';
    public confirmBillerProfile: BillerProfileBean;

    constructor(
        public constants: Constants,
        public permissionChangeRoute: PermissionChangeRoute,
        public billPaymentRequestToPayService: BillPaymentRequestToPayService,
        protected translate: TranslateService,
        public utilService: UtilService) {
    }

    protected init(): void {
        if (this.isAdd) {
            this.verifyOTPAction = this.constants.ACTION_CODE_ADD_BILLER;
        } else {
            this.verifyOTPAction = this.constants.ACTION_CODE_EDIT_BILLER;
        }
        
        this.alertConfig = {
            title: '',
            type: 'danger',
            message: '',
            show: false,
            option: {}
        };

        this.billPaymentRequestToPayService.alertConfig = undefined;

        this.confirmBillerProfile = this.billPaymentRequestToPayService.getConfirmBillerProfile();
        
    }

    public onClickBack(): void {
        if (this.isAdd) {
            this.permissionChangeRoute.targetAction = 'MANAGE_BILLER.add';
            this.permissionChangeRoute.changeRoute('MANAGE_BILLER.add');
        } else {
            this.permissionChangeRoute.changeRoute('MANAGE_BILLER.edit');
        }

        this.autoScaleHeight();
        this.utilService.scrollToTop();
    }

    public onClickSubmit(): void {
        if (this.OTPData.pin == '') {
            this.alertConfig.message = 'error.not.input.otp';
            this.alertMessage.show();
            return;
        }
        if (this.isAdd) {
            this.responseCodeMainService = '';
            if(this.billPaymentRequestToPayService.getIsFromAddNewAfterPayBill() == true){
                this.confirmAddBillerProfileDetailWithOutOTP();
            }else{
                this.confirmAddBillerProfileDetail();
            }
        } else {
            this.billPaymentRequestToPayService.confirmEditBillerProfileDetail(this.confirmBillerProfile).then((result: any) => {
                if (result.responseJSON.result.responseStatus.responseCode == this.constants.RESP_CODE_SUCCESS) {
                    this.alertConfig = {
                        title: 'label.Success',
                        type: 'success',
                        message: 'label.editBillerSuccess',
                        show: true,
                        option: {
                            billerAliasName: this.confirmBillerProfile.aliasName,
                            billerName: (this.translate.currentLang === 'en') ? this.confirmBillerProfile.billerNameEn : this.confirmBillerProfile.billerNameTh
                        }
                    }
                } else {
                    this.alertConfig.title = '';
                    this.alertConfig.message = result.responseJSON.result.responseStatus.errorMessage;
                    this.alertMessage.show();
                }
                this.billPaymentRequestToPayService.setConfirmBillerProfile(null);
                this.billPaymentRequestToPayService.alertConfig = this.alertConfig;
                this.permissionChangeRoute.changeRoute('MANAGE_BILLER');
            }, function (error) {
                
            });
        }
    }

    requestOTPChanged($event) {
        this.isRequestOTP = true;

        if (typeof $event.responseCode === "undefined") {
            this.OTPData.otpRefcode = $event.otpRefcode;
            this.OTPData.tokenOtp = $event.tokenOtp;
            this.OTPData.pin = '';

            this.alertConfig.message = '';
            this.alertMessage.hide();
        } else {
            this.alertConfig.message = $event.errorMessage;
            this.alertMessage.show();
        }
    }

    otpPass($event) {
        
        this.OTPData.pin = $event;
    }

    public setIsAdd(isAdd: boolean) {
        this.isAdd = isAdd;
    }

    private autoScaleHeight(): void {
        if (window != window.top) {
            let root = this;
            root.utilService.setPageHeight(700);

            setTimeout(function () {
                root.utilService.pageLoad();
            }, 500);
        }
    }

    confirmAddBillerProfileDetail(){
        this.billPaymentRequestToPayService.confirmAddBillerProfileDetail(this.confirmBillerProfile, this.OTPData).then((result: any) => {
            if (result.responseJSON.result.responseStatus.responseCode == this.constants.RESP_CODE_SUCCESS) {
                this.alertConfig = {
                    title: 'label.Success',
                    type: 'success',
                    message: 'label.addBillerSuccess',
                    show: true,
                    option: {
                        billerAliasName: this.confirmBillerProfile.aliasName,
                        billerName: (this.translate.currentLang === 'en') ? this.confirmBillerProfile.billerNameEn : this.confirmBillerProfile.billerNameTh
                    }
                }
                this.billPaymentRequestToPayService.setConfirmBillerProfile(null);
                this.billPaymentRequestToPayService.alertConfig = this.alertConfig;
                this.permissionChangeRoute.changeRoute('MANAGE_BILLER');
            } else {
                if (result.responseJSON.result.responseStatus.responseCode === this.constants.RESP_CODE_REQ_OTP_AGAIN) {
                    this.isRequestOTP = false;
                }
                this.OTPData.pin = '';
                this.responseCodeMainService = result.responseJSON.result.responseStatus.responseCode;
                this.alertConfig.title = '';
                this.alertConfig.message = result.responseJSON.result.responseStatus.errorMessage;
                this.alertMessage.show();
            }

        }, function (error) {
            
        });
    }

    confirmAddBillerProfileDetailWithOutOTP(){
        this.billPaymentRequestToPayService.confirmAddBillerProfileDetailWithOutOTP(this.confirmBillerProfile, this.OTPData).then((result: any) => {
            if (result.responseJSON.result.responseStatus.responseCode == this.constants.RESP_CODE_SUCCESS) {
                this.alertConfig = {
                    title: 'label.Success',
                    type: 'success',
                    message: 'label.addBillerSuccess',
                    show: true,
                    option: {
                        billerAliasName: this.confirmBillerProfile.aliasName,
                        billerName: (this.translate.currentLang === 'en') ? this.confirmBillerProfile.billerNameEn : this.confirmBillerProfile.billerNameTh
                    }
                }
                this.billPaymentRequestToPayService.setConfirmBillerProfile(null);
                this.billPaymentRequestToPayService.alertConfig = this.alertConfig;
                this.permissionChangeRoute.changeRoute('MANAGE_BILLER');
            } else {
                if (result.responseJSON.result.responseStatus.responseCode === this.constants.RESP_CODE_REQ_OTP_AGAIN) {
                    this.isRequestOTP = false;
                }
                this.OTPData.pin = '';
                this.responseCodeMainService = result.responseJSON.result.responseStatus.responseCode;
                this.alertConfig.title = '';
                this.alertConfig.message = result.responseJSON.result.responseStatus.errorMessage;
                this.alertMessage.show();
            }

        }, function (error) {
            
        });
    }

    isEDonationCategory(id: string): boolean {
        return id === this.constants.E_DONATION_CATEGORY_ID;
    }
}