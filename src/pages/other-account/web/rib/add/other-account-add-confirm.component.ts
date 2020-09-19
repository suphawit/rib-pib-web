import { Component, OnInit, OnDestroy } from '@angular/core';
import { Constants } from '../../../../../share/service/constants';
import { OtherAccountService } from '../../../other-account.service';
import { TranslateService } from "ng2-translate/src/translate.service";
import { UtilService } from '../../../../../share/service/util.service';
import { PermissionAction } from '../../../../../share/service/permission.service';
import { OtherAccountAddEditConfirm } from '../../../other-account-add-edit-confirm';
import { PermissionChangeRoute } from '../../../../../share/service/permission.service';
import { BankCodeDataService } from '../../../../../share/service/bankcode-data.service';
import { FundTransferService } from '../../../../../share/service/fund-transfer.service';

@Component({
    selector: 'rib-add-other-account-confirm',
    templateUrl: '../../../other-account-add-edit-confirm.html'
})
export class OtherAccountAddConfirm extends OtherAccountAddEditConfirm implements OnInit, OnDestroy {
    private pageStyle: string;
    public editOtherAcc: boolean = false;

    constructor(public permissionAction: PermissionAction,
        public constants: Constants,
        public otherAccountService: OtherAccountService,
        public translateService: TranslateService,
        public bankCodeDataService: BankCodeDataService,
        public permissionChangeRoute: PermissionChangeRoute,
        protected fundTransferService: FundTransferService,
        public utilService: UtilService) {
        super(permissionAction, constants, otherAccountService, translateService, bankCodeDataService, permissionChangeRoute, utilService);

        this.otherAccountService.setActionCode('ACT_EXTERNAL_ACCOUNT_ADD_SUBMIT');
        this.otherAccountService.setProcedure('addExternalAccountSubmitProcedure');
        this.pageStyle = this.constants.STYLE_RIB_WEB;
        this.editOtherAcc = false;
        this.titlePage = 'label.addAcc';
        this.otherAccountStep = 'label.addOtherAccountStep2';
    }

    ngOnInit(): void {
        if (this.otherAccountService.confirmAddExtAccountData == null) {
            this.permissionChangeRoute.changeRoute('DASHBOARD');
        }

        this.isAfterFund = this.otherAccountService.isAccountAfterTransfer;
        this.isRequireOtp = this.otherAccountService.isRequireOtp;


        this.permissionChangeRoute.prevUrl = null;
        this.setMSGLang();
    }

    ngOnDestroy(): void {

        if (this.permissionChangeRoute.prevUrl !== 'OTHER_ACCOUNTS.add1') {
            this.otherAccountService.tempAddExtAccountData = undefined;
            this.otherAccountService.isAccountAfterTransfer = false;
            this.otherAccountService.isRequireOtp = true;
            this.otherAccountService.confirmAddExtAccountData = null;
            this.fundTransferService.newAccountAfterFund = null;
        }
    }

    submitOTP() {
        let externalAccount;

        if (this.isAfterFund && this.isRequireOtp == false) {
            externalAccount = {
                acctNo: this.confirmAddExtAccountData.acctNo,
                acctAliasName: this.confirmAddExtAccountData.acctAliasName,
                acctName: this.confirmAddExtAccountData.acctName,
                bankCode: this.confirmAddExtAccountData.bankCode,
                catId: this.confirmAddExtAccountData.catId,
                email: this.confirmAddExtAccountData.email,
                mobile: this.confirmAddExtAccountData.mobile,
                anyIDType: this.confirmAddExtAccountData.anyIDType,
                msgLang: this.confirmAddExtAccountData.msgLang
            };

            this.submitExternalAccountWithoutOTP(externalAccount);
        } else {
            if (this.OTPData.pin != null && this.OTPData.pin != "") {
                externalAccount = {
                    acctNo: this.confirmAddExtAccountData.acctNo,
                    acctAliasName: this.confirmAddExtAccountData.acctAliasName,
                    acctName: this.confirmAddExtAccountData.acctName,
                    bankCode: this.confirmAddExtAccountData.bankCode,
                    bankName: this.confirmAddExtAccountData.bankName,
                    catId: this.confirmAddExtAccountData.catId,
                    email: this.confirmAddExtAccountData.email,
                    mobile: this.confirmAddExtAccountData.mobile,
                    anyIDType: this.confirmAddExtAccountData.anyIDType,
                    msgLang: this.confirmAddExtAccountData.msgLang
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
    }
}