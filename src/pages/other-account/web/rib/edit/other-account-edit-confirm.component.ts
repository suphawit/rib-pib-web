import { Component, OnInit, OnDestroy } from '@angular/core';
import { Constants } from '../../../../../share/service/constants';
import { OtherAccountService } from '../../../other-account.service';
import { TranslateService } from "ng2-translate/src/translate.service";
import { UtilService } from '../../../../../share/service/util.service';
import { PermissionAction } from '../../../../../share/service/permission.service';
import { OtherAccountAddEditConfirm } from '../../../other-account-add-edit-confirm';
import { BankCodeDataService } from '../../../../../share/service/bankcode-data.service';
import { PermissionChangeRoute } from '../../../../../share/service/permission.service';

@Component({
    selector: 'rib-edit-other-account-confirm',
    templateUrl: '../../../other-account-add-edit-confirm.html'
})

export class OtherAccountEditConfirm extends OtherAccountAddEditConfirm implements OnInit, OnDestroy {
    private pageStyle: string;
    public editOtherAcc: boolean = true;

    constructor(public permissionAction: PermissionAction,
        public constants: Constants,
        public otherAccountService: OtherAccountService,
        public translateService: TranslateService,
        public bankCodeDataService: BankCodeDataService,
        public permissionChangeRoute: PermissionChangeRoute,
        public utilService: UtilService) {
        super(permissionAction, constants, otherAccountService, translateService, bankCodeDataService, permissionChangeRoute, utilService);


        this.otherAccountService.setActionCode('ACT_EXTERNAL_ACCOUNT_EDIT');
        this.otherAccountService.setProcedure('editExternalAccountProcedure');

        this.pageStyle = this.constants.STYLE_RIB_WEB;
        this.editOtherAcc = true;
        this.titlePage = 'label.editAcc';
        this.otherAccountStep = 'label.editOtherAccountStep2';
    }

    ngOnInit(): void {
        if (this.otherAccountService.confirmAddExtAccountData == null) {
            this.permissionChangeRoute.changeRoute('DASHBOARD');
        }

        this.permissionChangeRoute.prevUrl = null;
        this.setMSGLang();
    }

    ngOnDestroy(): void {
        if (this.permissionChangeRoute.prevUrl !== 'OTHER_ACCOUNTS.edit1') {
            //this.otherAccountService.tempAddExtAccountData = undefined;
            this.otherAccountService.confirmAddExtAccountData = null;
        }
    }

    submitOTP() {
        let params = {
            externalAccount: {
                acctAliasName: this.confirmAddExtAccountData.acctAliasName,
                acctName: this.confirmAddExtAccountData.accountName,
                acctNo: this.confirmAddExtAccountData.account,
                anyIDType: this.confirmAddExtAccountData.anyIDType,
                bankCode: this.confirmAddExtAccountData.bankCode,
                bankName: this.confirmAddExtAccountData.bankName,
                catId: this.confirmAddExtAccountData.catId,
                email: this.confirmAddExtAccountData.email,
                exAcctId: this.confirmAddExtAccountData.exAcctId,
                isFavourite: this.confirmAddExtAccountData.isFavourite,
                mobile: this.confirmAddExtAccountData.mobile,
                msgLang: this.confirmAddExtAccountData.msgLang,
                productId: '',
                status: ''
            }
        };

        this.otherAccountService.tempEditExtAccountData = undefined;
        this.submitEditOtherAccount(params);
    }

    navigateBack(): void {
        this.permissionChangeRoute.prevUrl = 'OTHER_ACCOUNTS.edit1';
        this.permissionChangeRoute.changeRoute('OTHER_ACCOUNTS.edit1');
    }
}