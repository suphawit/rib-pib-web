import { Component, OnInit, OnDestroy } from '@angular/core';
import { Constants } from '../../../../../share/service/constants';
import { OtherAccountService } from '../../../other-account.service';
import { TranslateService } from "ng2-translate/src/translate.service";
import { UtilService } from '../../../../../share/service/util.service';
import { PermissionAction } from '../../../../../share/service/permission.service';
import { OtherAccountAddEditConfirm } from '../../../other-account-add-edit-confirm';
import { PermissionChangeRoute } from '../../../../../share/service/permission.service';
import { FundTransferService } from '../../../../../share/service/fund-transfer.service';
import { BankCodeDataService } from '../../../../../share/service/bankcode-data.service';
import { StepWizard } from '../../../../../share/component/step-wizard/step-wizard.component';

@Component({
    selector: 'pib-add-other-account-confirm',
    templateUrl: '../../../other-account-add-edit-confirm.html',
})

export class OtherAccountAddConfirmComponent extends OtherAccountAddEditConfirm implements OnInit, OnDestroy {
    private pageStyle: string;
    public stepWizard: StepWizard;

    constructor(public permissionAction: PermissionAction,
        public constants: Constants,
        public otherAccountService: OtherAccountService,
        public translateService: TranslateService,
        public bankCodeDataService: BankCodeDataService,
        public permissionChangeRoute: PermissionChangeRoute,
        public fundTransferService: FundTransferService,
        public utilService: UtilService) {
        super(permissionAction, constants, otherAccountService, translateService, bankCodeDataService, permissionChangeRoute, utilService);

        this.stepWizard = {
            input: {
                data: [{ name: '1', label: 'stepWizard.enterDetails' }, { name: '2', label: 'stepWizard.confirm' }],
                step: 1,
                style: this.constants.STYLE_PIB_WEB
            }
        };

        this.otherAccountService.setActionCode('ACT_EXTERNAL_ACCOUNT_ADD_SUBMIT');
        this.otherAccountService.setProcedure('addExternalAccountSubmitProcedure');
        this.pageStyle = this.constants.STYLE_PIB_WEB;
        this.editOtherAcc = false;
        this.titlePage = 'label.addAcc';
        this.otherAccountStep = 'label.addOtherAccountStep2';
    }

    ngOnInit(): void {
        this.isAfterFund = this.otherAccountService.isAccountAfterTransfer;
        this.isRequireOtp = this.otherAccountService.isRequireOtp;
        
        this.permissionChangeRoute.prevUrl = null;
        this.setMSGLang();
        this.utilService.scrollToTop();
    }

    ngOnDestroy(): void {
        if (this.permissionChangeRoute.prevUrl !== 'OTHER_ACCOUNTS.add1') {
            this.otherAccountService.tempAddExtAccountData = undefined;
            //this.fundTransferService.newAccountAfterFund = null;
            this.otherAccountService.isAccountAfterTransfer = false;
            this.otherAccountService.isRequireOtp = true;
            this.otherAccountService.confirmAddExtAccountData = null;
        }
    }

    submitOTP() {
        let externalAccount;

        if (this.otherAccountService.isAccountAfterTransfer && this.isRequireOtp == false) {
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