import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Constants } from '../../../../../share/service/constants';
import { OtherAccountService } from '../../../other-account.service';
import { OtherAccountAddEdit } from '../../../other-account-add-edit';
import { TranslateService } from "ng2-translate/src/translate.service";
import { UtilService } from '../../../../../share/service/util.service';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { PermissionAction } from '../../../../../share/service/permission.service';
import { DropdownDataService } from '../../../../../share/service/dropdown.service';
import { ValidationService } from '../../../../../share/service/validation.service';
import { MasterDataService } from '../../../../../share/service/master-data.service';
import { PermissionChangeRoute } from '../../../../../share/service/permission.service';
import { StepWizard } from '../../../../../share/component/step-wizard/step-wizard.component';

@Component({
    selector: 'rib-add-other-account',
    templateUrl: '../../../other-account-add-edit.html',
})
export class OtherAccountEdit extends OtherAccountAddEdit implements OnInit, AfterViewInit {
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

        this.editOtherAcc = true;
        this.titlePage = 'label.editAcc';
        this.otherAccountStep = 'label.editOtherAccountStep1';
        this.lang = this.translateService.currentLang;
        this.pageStyle = this.constants.STYLE_RIB_WEB;
    }

    ngAfterViewInit(): void {
        this.otherAccountService.tempEditExtAccountData = undefined;
        this.otherAccountFormGroup.get('anyIDType').disable();
        this.otherAccountFormGroup.get('accountNo').disable();
        this.otherAccountFormGroup.get('bankCode').disable();
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

    protected prepareExtConfirmScreen(): void {
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

    protected otherAccGroup(data) {
        this.otherAccountFormGroup = new FormGroup({
            accountAliasname: new FormControl({ value: data.acctAliasName, disabled: false }, ValidationService.requiredValidator),
            email: new FormControl({ value: data.email == null ? '' : data.email, disabled: false }, [ValidationService.emailValidator]),
            clientUUID: new FormControl({ value: "", disabled: false }),
            anyIDType: new FormControl({ value: data.anyIDType, disabled: false }, ValidationService.requiredValidator),
            accountNo: new FormControl({ value: data.acctNo, disabled: true }, ValidationService.requiredValidator),
            category: new FormControl({ value: data.catId, disabled: false }, ValidationService.requiredValidator),
            mobile: new FormControl({ value: data.mobile == null ? '' : data.mobile, disabled: false }, [ValidationService.mobileNoValidator]),
            msgLang: new FormControl({ value: data.msgLang == null ? '' : data.msgLang, disabled: false }),
            bankCode: new FormControl({ value: data.bankCode, disabled: false }),
            accountName: new FormControl({ value: data.acctName == null ? '' : data.acctName, disabled: false }),
            exAcctId: new FormControl({ value: data.exAcctId, disabled: false }),
            isFavourite: new FormControl({ value: data.isFavourite, disabled: false }),
            categoryName: new FormControl({ value: "", disabled: false })
        });
    }
}