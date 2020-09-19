import { Component, ViewChild } from '@angular/core';
import { Constants } from '../../share/service/constants';
import { OtherAccountService } from './other-account.service';
import { UtilService } from '../../share/service/util.service';
import { TranslateService } from "ng2-translate/src/translate.service";
import { PermissionAction } from '../../share/service/permission.service';
import { PermissionChangeRoute } from '../../share/service/permission.service';
import { BankCodeDataService } from '../../share/service/bankcode-data.service';
import { StepWizard } from '../../share/component/step-wizard/step-wizard.component';
import { AlertMessageComponent } from '../../share/component/alert-message/alert-message.component';

@Component({
    selector: 'other-account-add-edit-confirm',
    templateUrl: './other-account-add-edit-confirm.html',
    providers: [BankCodeDataService]
})
export class OtherAccountAddEditConfirm {
    public type: string;
    public message: string;
    public msgLangStr: string;
    public language: string;
    public OTPData: any = {};
    public titlePage: string;
    isAfterFund: boolean = false;
    isRequireOtp: boolean = true;
    public editOtherAcc: boolean;
    confirmAddExtAccountData: any;
    public otherAccountStep: string;
    public stepWizard: StepWizard;
    //protected show: boolean = false;
    public isRequestOTP: boolean = false;
    public responseCodeMainService: string = '';
    public verifyOTPStyle: string = this.constants.STYLE_RIB_WEB;
    public verifyOTPAction: string = this.constants.ACTION_CODE_ADD_EXT_ACCOUNT;

    @ViewChild('alertMessage') public alertMessage: AlertMessageComponent;

    constructor(public permissionAction: PermissionAction,
        public constants: Constants,
        public otherAccountService: OtherAccountService,
        public translateService: TranslateService,
        public bankCodeDataService: BankCodeDataService,
        public permissionChangeRoute: PermissionChangeRoute,
        public utilService: UtilService) {

        this.confirmAddExtAccountData = this.otherAccountService.confirmAddExtAccountData;
        this.stepWizard = {
            input: {
                data: [{ name: '1', label: 'stepWizard.enterDetails' }, { name: '2', label: 'stepWizard.confirm' }],
                step: 1,
                style: this.constants.STYLE_RIB_WEB
            }
        };
    }

    public requestOTPChanged(result) {
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

    public otpPass($event) {
        this.OTPData.pin = $event;
    }

    public submitOTP() {
        if (this.otherAccountService.isAccountAfterTransfer && this.isRequireOtp == false) {
            let externalAccount = {
                acctNo: this.confirmAddExtAccountData.acctNo,
                acctAliasName: this.confirmAddExtAccountData.acctAliasName,
                acctName: this.confirmAddExtAccountData.acctName,
                bankCode: this.confirmAddExtAccountData.bankCode,
                catId: this.confirmAddExtAccountData.catId,
                email: this.confirmAddExtAccountData.email,
                mobile: this.confirmAddExtAccountData.mobile,
                anyIDType: this.confirmAddExtAccountData.anyIDType,
                msgLang: this.confirmAddExtAccountData.mobile === '' ? '' : this.language
            };

            this.submitExternalAccountWithoutOTP(externalAccount);
        } else if (this.OTPData.pin != null && this.OTPData.pin != "") {
            let externalAccount = {
                acctNo: this.confirmAddExtAccountData.acctNo,
                acctAliasName: this.confirmAddExtAccountData.acctAliasName,
                acctName: this.confirmAddExtAccountData.acctName,
                bankCode: this.confirmAddExtAccountData.bankCode,
                bankName: this.confirmAddExtAccountData.bankName,
                catId: this.confirmAddExtAccountData.catId,
                email: this.confirmAddExtAccountData.email,
                mobile: this.confirmAddExtAccountData.mobile,
                anyIDType: this.confirmAddExtAccountData.anyIDType,
                msgLang: this.confirmAddExtAccountData.mobile === '' ? '' : this.language
            };

            let verifyOTP = {
                referenceNO: this.OTPData.otpRefcode,
                tokenUUID: this.OTPData.tokenOtp,
                otp: this.OTPData.pin
            };

            let params = { externalAccount, verifyOTP, language: this.language };
            this.submitAddOtherAccount(params);
        }
    }

    public submitAddOtherAccount(params) {
        let alertConfig
        this.responseCodeMainService = '';

        this.otherAccountService.setParam(params);
        this.otherAccountService.masterData().then((objResponse: any) => {
            if (objResponse.responseJSON.result.responseStatus.responseCode == this.constants.RESP_CODE_SUCCESS) {
                alertConfig = {
                    title: 'label.Success',
                    type: 'success',
                    message: 'label.addExtAccSuccess',
                    show: true,
                    option: { otherAccountNumber: this.otherAccountService.confirmAddExtAccountData.acctNo }
                };

                this.otherAccountService.alertConfig = alertConfig;
                this.otherAccountService.tempAddExtAccountData = undefined;
                this.permissionChangeRoute.changeRoute('OTHER_ACCOUNTS');
            } else {
                if (objResponse.responseJSON.result.responseStatus.responseCode === this.constants.RESP_CODE_REQ_OTP_AGAIN) {
                    this.isRequestOTP = false;
                }

                this.responseCodeMainService = objResponse.responseJSON.result.responseStatus.responseCode;
                this.OTPData.pin = '';
                this.message = objResponse.responseJSON.result.responseStatus.errorMessage;
                this.type = 'danger';
                this.alertMessage.show();                
            }
        }, function (error) {

        });
    }

    public setMSGLang() {
        if (this.confirmAddExtAccountData != null && this.confirmAddExtAccountData.mobile != null && this.confirmAddExtAccountData.msgLang != null) {
            if (this.confirmAddExtAccountData.msgLang === this.constants.CULTURE_SHORTNAME_THAI) {
                this.msgLangStr = this.translateService.instant('lbl.thai');
            } else if (this.confirmAddExtAccountData.msgLang === this.constants.CULTURE_SHORTNAME_ENGLISH) {
                this.msgLangStr = this.translateService.instant('lbl.english');
            } else {
                this.msgLangStr = this.translateService.instant('lbl.thai');
            }
        }
    }

    public navigateBack(): void {
        this.permissionChangeRoute.prevUrl = 'OTHER_ACCOUNTS.add1';
        this.permissionChangeRoute.changeRoute('OTHER_ACCOUNTS.add1');
    }

    public submitExternalAccountWithoutOTP(data) {
        this.otherAccountService.requestSubmitExternalAccountWithoutOTP(data).then((objResponse: any) => {
            let result = objResponse.responseJSON.result;
            if (result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                let alertConfig = {
                    title: 'label.Success',
                    type: 'success',
                    message: 'label.addExtAccSuccess',
                    show: true,
                    option: { otherAccountNumber: this.otherAccountService.confirmAddExtAccountData.acctNo }
                };

                this.otherAccountService.alertConfig = alertConfig;
                this.otherAccountService.isAccountAfterTransfer = false;
                this.otherAccountService.confirmAddExtAccountData = undefined;
                this.permissionChangeRoute.changeRoute('OTHER_ACCOUNTS');
            }
        }, function (error) {

        });
    }

    public submitEditOtherAccount(params): void {
        this.otherAccountService.setParam(params);
        this.otherAccountService.masterData().then((result: any) => {
            if (result.responseJSON.result.responseStatus.responseCode == this.constants.RESP_CODE_SUCCESS) {
                let alertConfig = {
                    title: 'label.Success',
                    type: 'success',
                    message: 'label.editExtAccSuccess',
                    show: true,
                    option: { otherAccountNumber: this.otherAccountService.confirmAddExtAccountData.acctNo }
                };

                this.otherAccountService.alertConfig = alertConfig;
                this.otherAccountService.tempAddExtAccountData = undefined;
                this.permissionChangeRoute.changeRoute('OTHER_ACCOUNTS');
            } else {
                this.message = result.responseJSON.result.responseStatus.errorMessage;
                this.type = 'danger';
                this.alertMessage.show();
            }
        }, function (error) {

        });
    }

    public trackByFn(index, item) {
        return index;
    }
}
