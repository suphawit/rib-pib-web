import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Constants } from '../../../../../share/service/constants';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { OtherAccountService } from '../../../other-account.service';
import { OtherAccountAddEdit } from '../../../other-account-add-edit';
import { TranslateService } from "ng2-translate/src/translate.service";
import { UtilService } from '../../../../../share/service/util.service';
import { PermissionAction } from '../../../../../share/service/permission.service';
import { ValidationService } from '../../../../../share/service/validation.service';
import { DropdownDataService } from '../../../../../share/service/dropdown.service';
import { MasterDataService } from '../../../../../share/service/master-data.service';
import { PermissionChangeRoute } from '../../../../../share/service/permission.service';
import { StepWizard } from '../../../../../share/component/step-wizard/step-wizard.component';

@Component({
    selector: 'pib-add-other-account',
    templateUrl: '../../../other-account-add-edit.html',
})
export class OtherAccountEditComponent extends OtherAccountAddEdit implements OnInit, AfterViewInit {
    private lang: any;
    public bankCode: any;
    public anyIDType: any;
    public selectItemAcc: any;
    private pageStyle: string;
    private msgLangEdit: string;
    public stepWizard: StepWizard;

    constructor(public constants: Constants,
        public otherAccountService: OtherAccountService,
        public translateService: TranslateService,
        public fb: FormBuilder,
        public permissionAction: PermissionAction,
        public permissionChangeRoute: PermissionChangeRoute,
        public dropdownDataService: DropdownDataService,
        public masterDataService: MasterDataService,
        public utilService: UtilService) {
        super(constants, otherAccountService, translateService, fb, permissionAction, permissionChangeRoute, dropdownDataService, masterDataService, utilService);

        this.stepWizard = {
            input: {
                data: [{ name: '1', label: 'stepWizard.enterDetails' }, { name: '2', label: 'stepWizard.confirm' }],
                step: 0,
                style: this.constants.STYLE_PIB_WEB
            }
        };
        this.editOtherAcc = true;
        this.titlePage = 'label.editAcc';
        this.otherAccountStep = 'label.editOtherAccountStep1';
        this.lang = this.translateService.currentLang;
        this.pageStyle = this.constants.STYLE_PIB_WEB;
    }

    ngAfterViewInit(): void {
        this.otherAccountService.tempEditExtAccountData = undefined;
        this.otherAccountFormGroup.get('anyIDType').disable();
        this.otherAccountFormGroup.get('accountNo').disable();
        this.otherAccountFormGroup.get('bankCode').disable();
        this.utilService.pageLoad(20);
    }

    ngOnInit(): void {
        if (this.otherAccountService.selectAccountDetailData !== undefined) {
            this.otherAccountService.tempEditExtAccountData = undefined;
            this.selectItemAcc = this.otherAccountService.selectAccountDetailData;
            this.otherAccountService.selectAccountDetailData = undefined;
        } else {
            this.selectItemAcc = this.otherAccountService.tempEditExtAccountData;
        }

        this.setNextPage('OTHER_ACCOUNTS.edit2');


        if (this.selectItemAcc) {
            this.anyIDType = this.selectItemAcc.anyIDType;
            this.bankCode = this.selectItemAcc.bankCode;

            this.init();
            this.getAnyIDTypeList(this.anyIDType);

            this.otherAccGroup(this.selectItemAcc);
            this.verifyORFT(this.selectItemAcc.isORFT, '');

            this.msgLangEdit = this.selectItemAcc.msgLang
            this.toggleSMSLang(this.selectItemAcc.msgLang);
            this.otherAccountFormGroup.patchValue({ msgLang: this.msgLangEdit });
        }
    }

    onSubmit(): void {
        this.submitted = true;
        this.setFormValidationByAccountType(this.anyIDType);

        if (this.otherAccountFormGroup.valid) {
            this.prepareExtConfirmScreen();
        }
    }

    protected prepareExtConfirmScreen() {
        this.selectItemAcc.catId = this.otherAccountFormGroup.value.category;
        let category = this.accCategoryList.find(x => x.catId == this.selectItemAcc.catId);
        if (category) {
            this.selectItemAcc.categoryName = category.catName;
        }

        let extAccData = {
            acctAliasName: this.otherAccountFormGroup.value.accountAliasname,
            email: this.otherAccountFormGroup.value.email,
            clientUUID: "",
            anyIDType: this.selectItemAcc.anyIDType,
            anyIDTypeLabel: this.selectItemAcc.anyIDTypeLabel,
            anyIDTypeDesc: this.selectItemAcc.anyIDTypeDesc,
            acctNo: this.selectItemAcc.acctNo,
            catId: this.selectItemAcc.catId,
            mobile: this.otherAccountFormGroup.value.mobile,
            msgLang: this.otherAccountFormGroup.value.msgLang,
            bankCode: this.selectItemAcc.bankCode,
            accountName: this.otherAccountFormGroup.value.accountName,
            acctName: this.otherAccountFormGroup.value.accountName,
            exAcctId: this.selectItemAcc.exAcctId,
            isFavourite: this.selectItemAcc.isFavourite,
            categoryName: this.selectItemAcc.categoryName,
            bankName: this.selectItemAcc.bankName,
            isORFT: this.selectItemAcc.isORFT
        };

        this.otherAccountService.confirmAddExtAccountData = extAccData;

        this.otherAccountService.tempEditExtAccountData = extAccData;
        this.permissionChangeRoute.changeRoute(this.nextPage);
    }

    protected otherAccGroup(param) {
        this.otherAccountFormGroup = new FormGroup({
            accountAliasname: new FormControl({ value: param.acctAliasName, disabled: false }, ValidationService.requiredValidator),
            email: new FormControl({ value: param.email == null ? '' : param.email, disabled: false }, [ValidationService.emailValidator]),
            clientUUID: new FormControl({ value: "", disabled: false }),
            anyIDType: new FormControl({ value: param.anyIDType, disabled: false }, ValidationService.requiredValidator),
            accountNo: new FormControl({ value: param.acctNo, disabled: true }, ValidationService.requiredValidator),
            category: new FormControl({ value: param.catId, disabled: false }, ValidationService.requiredValidator),
            mobile: new FormControl({ value: param.mobile == null ? '' : param.mobile, disabled: false }, [ValidationService.mobileNoValidator]),
            msgLang: new FormControl({ value: param.msgLang, disabled: false }),
            bankCode: new FormControl({ value: param.bankCode, disabled: false }),
            accountName: new FormControl({ value: param.acctName == null ? '' : param.acctName, disabled: false }),
            exAcctId: new FormControl({ value: param.exAcctId, disabled: false }),
            isFavourite: new FormControl({ value: param.isFavourite, disabled: false }),
            categoryName: new FormControl({ value: "", disabled: false })
        });
    }
}