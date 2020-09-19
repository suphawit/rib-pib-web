import { FormBuilder } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Constants } from '../../../../../share/service/constants';
import { OtherAccountService } from '../../../other-account.service';
import { OtherAccountAddEdit } from '../../../other-account-add-edit';
import { TranslateService } from "ng2-translate/src/translate.service";
import { UtilService } from '../../../../../share/service/util.service';
import { PermissionAction } from '../../../../../share/service/permission.service';
import { DropdownDataService } from '../../../../../share/service/dropdown.service';
import { ValidationService } from '../../../../../share/service/validation.service';
import { MasterDataService } from '../../../../../share/service/master-data.service';
import { PermissionChangeRoute } from '../../../../../share/service/permission.service';
import { FundTransferService } from '../../../../../share/service/fund-transfer.service';
import { StepWizard } from '../../../../../share/component/step-wizard/step-wizard.component';

@Component({
    selector: 'pib-add-other-account',
    templateUrl: '../../../other-account-add-edit.html',
})
export class OtherAccountAddComponent extends OtherAccountAddEdit implements OnInit, OnDestroy {
    private pageStyle: string;
    public stepWizard: StepWizard;
    private newAccountAfterFund = null;

    public get anyIDType(): string {
        return this.otherAccountFormGroup.value.anyIDType;
    }
    public get bankCode(): string {
        return this.otherAccountFormGroup.value.bankCode;
    }

    constructor(public constants: Constants,
        public otherAccountService: OtherAccountService,
        public translateService: TranslateService,
        public fb: FormBuilder,
        public myfb: FormBuilder,
        public permissionAction: PermissionAction,
        public permissionChangeRoute: PermissionChangeRoute,
        public fundTransferService: FundTransferService,
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

        this.editOtherAcc = false;
        this.titlePage = 'label.addAcc';
        this.otherAccountStep = 'label.addOtherAccountStep';
        this.pageStyle = this.constants.STYLE_PIB_WEB;
    }

    ngOnInit() {
        this.otherAccountFormGroup = this.fb.group({
            'clientUUID': '',
            'anyIDType': this.constants.ANYID_TYPE_BANK_ACCOUNT,
            'accountNo': ['', [
                ValidationService.requiredValidator,
            ]
            ],
            'accountAliasname': ['', [
                ValidationService.requiredValidator,
            ]
            ],
            'category': ['', [
                ValidationService.requiredValidator
            ]
            ],
            'email': ['', [
                ValidationService.emailValidator
            ]
            ],
            'mobile': ['', [
                ValidationService.mobileNoValidator
            ]
            ],
            'msgLang': '',
            'bankCode': ['', [
                ValidationService.requiredValidator
            ]
            ],
            'accountName': ''
        });

        this.init();
        this.setNextPage('OTHER_ACCOUNTS.add2');
        this.toggleSMSLang(this.currentLang);

        if (this.fundTransferService.newAccountAfterFund || (this.otherAccountService.isAccountAfterTransfer
            && this.otherAccountService.confirmAddExtAccountData)) {
            this.initNewAccountAfterFund();
        }

        this.getAnyIDTypeList(this.otherAccountFormGroup.value.anyIDType);
        this.otherAccountService.confirmAddExtAccountData = null;
    }

    ngAfterViewInit(): void {
        this.verifyTempExtAccData();
        this.utilService.pageLoad(20);
    }

    ngOnDestroy(): void {
        if (this.permissionChangeRoute.targetAction != 'OTHER_ACCOUNTS.add2') {
            // this.fundTransferService.newAccountAfterFund = null;
            this.otherAccountService.isAccountAfterTransfer = false;
            this.otherAccountService.confirmAddExtAccountData = null;
        }
    }

    private initNewAccountAfterFund() {
        // this.permissionChangeRoute.targetAction = 'OTHER_ACCOUNTS.add2';

        if (this.otherAccountService.confirmAddExtAccountData) {
            this.newAccountAfterFund = {
                accountAliasname: this.otherAccountService.confirmAddExtAccountData.acctAliasName,
                accountNo: this.otherAccountService.confirmAddExtAccountData.acctNo,
                accountName: this.otherAccountService.confirmAddExtAccountData.accountName,
                anyIDType: this.otherAccountService.confirmAddExtAccountData.anyIDType,
                bankCode: this.otherAccountService.confirmAddExtAccountData.bankCode,
                category: this.otherAccountService.confirmAddExtAccountData.catId,
                email: this.otherAccountService.confirmAddExtAccountData.email,
                mobile: this.otherAccountService.confirmAddExtAccountData.mobile,
                isORFT: this.otherAccountService.confirmAddExtAccountData.isORFT,
                txnId: this.otherAccountService.confirmAddExtAccountData.txnId,
                refTxnId: this.otherAccountService.confirmAddExtAccountData.refTxnId
            };

            this.toggleSMSLang(this.otherAccountService.confirmAddExtAccountData.msgLang || this.currentLang);
        } else {
            this.newAccountAfterFund = {
                accountAliasname: this.fundTransferService.newAccountAfterFund.aliasName,
                accountNo: this.fundTransferService.newAccountAfterFund.accNo,
                accountName: this.fundTransferService.newAccountAfterFund.accName,
                anyIDType: this.fundTransferService.newAccountAfterFund.anyIDType.anyIDType,
                bankCode: this.fundTransferService.newAccountAfterFund.bank.bankCode,
                email: this.fundTransferService.newAccountAfterFund.email || '',
                mobile: this.fundTransferService.newAccountAfterFund.mobileNo || '',
                isORFT: this.fundTransferService.newAccountAfterFund.bank.isORFT,
                txnId: this.fundTransferService.newAccountAfterFund.txnId,
                refTxnId: this.fundTransferService.newAccountAfterFund.refTxnId
            };

            this.toggleSMSLang(this.fundTransferService.newAccountAfterFund.notifyLang || this.currentLang);
        }

        let formValue = {
            accountAliasname: this.newAccountAfterFund.accountAliasname || '',
            anyIDType: this.newAccountAfterFund.anyIDType,
            bankCode: this.newAccountAfterFund.bankCode || '',
            accountNo: this.newAccountAfterFund.accountNo,
            accountName: this.newAccountAfterFund.accountName,
            category: this.newAccountAfterFund.category || '',
            email: this.newAccountAfterFund.email || '',
            mobile: this.newAccountAfterFund.mobile || '',
            isORFT: this.newAccountAfterFund.isORFT
        };

        this.verifyORFT(this.newAccountAfterFund.isORFT, '');
        this.otherAccountFormGroup.patchValue(formValue);
        this.otherAccountFormGroup.get('accountNo').disable();
        this.otherAccountFormGroup.get('bankCode').disable();

        this.isAfterFund = true;
        this.fundTransferService.newAccountAfterFund = null;
    }

    protected onSubmit(): void {
        this.submitted = true;
        this.permissionChangeRoute.targetAction = 'OTHER_ACCOUNTS.add2';

        if (this.newAccountAfterFund) {
            if (!this.otherAccountFormGroup.valid) return;

            let externalAccount = {
                accountAliasname: this.otherAccountFormGroup.value.accountAliasname,
                mobile: this.otherAccountFormGroup.value.mobile,
                email: this.otherAccountFormGroup.value.email,
                accountNo: this.newAccountAfterFund.accountNo,
                accountName: this.newAccountAfterFund.accountName,
                anyIDType: this.newAccountAfterFund.anyIDType,
                bankCode: this.newAccountAfterFund.bankCode,
                msgLang: this.otherAccountFormGroup.value.msgLang,
                category: this.otherAccountFormGroup.value.category,
                isORFT: this.newAccountAfterFund.isORFT,
                txnId: this.newAccountAfterFund.txnId,
                refTxnId: this.newAccountAfterFund.refTxnId
            };

            this.addExternalAccount(externalAccount);
        } else {
            this.setFormValidationByAccountType(this.otherAccountFormGroup.value.anyIDType);

            if (this.otherAccountFormGroup.valid) {
                this.prepareAddEditExtConfirmScreen();
            }
        }
    }

    public prepareAddEditExtConfirmScreen(): void {
        let addExtAccData = this.otherAccountFormGroup.value;

        this.otherAccountService.setParam(addExtAccData);
        this.otherAccountService.setActionCode('ACT_EXTERNAL_ACCOUNT_ADD');
        this.otherAccountService.setProcedure('addExternalAccountProcedure');
        this.otherAccountService.masterData().then((objResponse: any) => {
            if (objResponse.responseJSON.result.responseStatus.responseCode == this.constants.RESP_CODE_SUCCESS) {
                let data = objResponse.responseJSON.result.value;
                let confirmAddExtAccountData = {
                    bankCode: data.bankCode,
                    bankName: data.bankName,
                    acctNo: data.acctNo,
                    acctName: data.acctName,
                    acctAliasName: data.acctAliasName,
                    catId: data.catId,
                    categoryName: data.categoryName,
                    mobile: data.mobile,
                    email: data.email,
                    anyIDType: data.anyIDType,
                    msgLang: this.otherAccountFormGroup.value.mobile === '' ? null : this.otherAccountFormGroup.value.msgLang,
                    anyIDTypeLabel: this.currentLang == this.constants.CULTURE_SHORTNAME_ENGLISH ? data.labelEn : data.labelTh,
                    anyIDTypeDesc: this.currentLang == this.constants.CULTURE_SHORTNAME_ENGLISH ? data.descriptionEN : data.descriptionTH
                }

                this.otherAccountService.confirmAddExtAccountData = confirmAddExtAccountData;
                this.otherAccountService.tempAddExtAccountData = this.otherAccountFormGroup.value;
                this.otherAccountService.isAccountAfterTransfer = false;
                this.permissionChangeRoute.changeRoute('OTHER_ACCOUNTS.add2');
            } else {
                this.message = objResponse.responseJSON.result.responseStatus.errorMessage;
                this.type = 'danger';
                this.alertMessage.show();
                this.utilService.scrollToTop();
            }
        }, function (error) {
            
        });
    }
}