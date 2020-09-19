import { ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Constants } from '../../share/service/constants';
import { OtherAccountService } from './other-account.service';
import { UtilService } from '../../share/service/util.service';
import { TranslateService } from "ng2-translate/src/translate.service";
import { ValidationService } from '../../share/service/validation.service';
import { DropdownDataService } from '../../share/service/dropdown.service';
import { MasterDataService } from '../../share/service/master-data.service';
import { StepWizard } from '../../share/component/step-wizard/step-wizard.component';
import { PermissionAction, PermissionChangeRoute } from '../../share/service/permission.service';
import { AlertMessageComponent } from '../../share/component/alert-message/alert-message.component';

export class OtherAccountAddEdit {
  public type: string;
  public msgLang: string;
  public bankLists: any;
  public message: string;
  public nextPage: string;
  submitted: boolean = false;
  public labelLang: string;
  public titlePage: string;
  public editOtherAcc: boolean;
  public lstOfAnyIDType: any;
  public accCategoryList: any;
  public stepWizard: StepWizard;
  public isAfterFund: any = null;
  public otherAccountFormGroup: any;
  public otherAccountStep: string;
  public descriptionAnyIDLabel: string;
  public showAcctName: boolean = false;
  configAnyIDType: Object = { valueLength: Number, ValueType: Boolean };
  public notifySMSLangData: any = this.dropdownDataService.notifyLanguages;

  public get currentLang() {
    return this.translateService.currentLang.toUpperCase();
  }

  @ViewChild('alertMessage') public alertMessage: AlertMessageComponent;

  constructor(public constants: Constants,
    public otherAccountService: OtherAccountService,
    public translateService: TranslateService,
    public fb: FormBuilder,
    public permissionAction: PermissionAction,
    public permissionChangeRoute: PermissionChangeRoute,
    public dropdownDataService: DropdownDataService,
    public masterDataService: MasterDataService,
    public utilService: UtilService) {

    this.stepWizard = {
      input: {
        data: [{ name: '1', label: 'stepWizard.enterDetails' }, { name: '2', label: 'stepWizard.confirm' }],
        step: 0,
        style: this.constants.STYLE_RIB_WEB
      }
    };
  }

  public init(): void {
    this.getCatagories();
    this.getBankList();
  }

  public Onchange(param, event): void {
    this.otherAccountFormGroup.patchValue({ anyIDType: event });
    let anyIDType = this.lstOfAnyIDType[event];

    this.descriptionAnyIDLabel = anyIDType.desc;
    this.labelLang = anyIDType.label;
    this.configAnyIDType = {
      valueLength: anyIDType.valueLength == 0 ? 100 : anyIDType.valueLength,
      valueType: anyIDType.valueType == 'S' ? false : true
    };

    if (this.editOtherAcc == false) {
      this.otherAccountFormGroup.patchValue({ accountName: '' });
      this.otherAccountFormGroup.patchValue({ bankCode: '' });
      this.otherAccountFormGroup.patchValue({ accountNo: '' });

      this.otherAccountFormGroup.controls['accountNo'].setValidators(null);

      if (anyIDType.valueType == 'N') {
        this.otherAccountFormGroup.controls['accountNo'].setValidators([
          ValidationService.requiredValidator,
          ValidationService.nonStringValidator
        ]);
      } else {
        this.otherAccountFormGroup.controls['accountNo'].setValidators([
          ValidationService.requiredValidator,
        ]);
      }

      this.otherAccountFormGroup.controls['accountNo'].updateValueAndValidity();
    }
  }

  public setFormValidationByAccountType(type: string) {
    this.otherAccountFormGroup.controls['bankCode'].setValidators(null);
    this.otherAccountFormGroup.controls['bankCode'].updateValueAndValidity();
    this.otherAccountFormGroup.controls['accountName'].setValidators(null);
    this.otherAccountFormGroup.controls['accountName'].updateValueAndValidity();

    if (type === this.constants.ANYID_TYPE_BANK_ACCOUNT) {
      this.otherAccountFormGroup.controls['bankCode'].setValidators([
        ValidationService.requiredValidator
      ]);
      this.otherAccountFormGroup.controls['bankCode'].updateValueAndValidity();
      if (this.showAcctName === true) {
        this.otherAccountFormGroup.controls['accountName'].setValidators([
          ValidationService.requiredValidator
        ]);
        this.otherAccountFormGroup.controls['accountName'].updateValueAndValidity();
        this.otherAccountFormGroup.patchValue({ accountName: this.otherAccountFormGroup.value.accountName.toUpperCase() });
      }
    }
  }

  public checkAccountInfo(bankList): void {
    this.showAcctName = false;

    if (bankList != '' && this.bankLists.length != undefined) {
      let bankObj = this.bankLists.find(x => x.bankCode == bankList);
      this.otherAccountFormGroup.patchValue({ bankCode: bankList });
      this.verifyORFT(bankObj.isORFT, this.bankLists)

    } else {
      this.otherAccountFormGroup.patchValue({ bankCode: '' });
    }

    if (window != window.top) {
      let root = this;

      setTimeout(function () {
        root.utilService.pageLoad(20);
      }, 500);
    }
  }

  public verifyORFT(ORFT, bankCode): void {
    if (ORFT == 0) {
      this.showAcctName = true;
    } else {
      this.showAcctName = false;
      this.otherAccountFormGroup.patchValue({ accountName: '' });
    }
  }

  public getCatagories(): void {
    this.masterDataService.getAllCategories().then((result) => {
      this.accCategoryList = result;
      this.masterDataService.setCategoryList(this.accCategoryList);
    });
  }

  public getBankList(): void {
    this.masterDataService.getAllBanks().then((result) => {
      this.bankLists = result;
      this.masterDataService.setBankList(this.bankLists);
    });
  }

  public getAnyIDTypeList(selectedValue: string): void {
    this.masterDataService.getAllAnyIDTypes().then((result) => {
      this.lstOfAnyIDType = result;

      let anyIDType = this.lstOfAnyIDType[selectedValue];
      this.setAnyIDProperties(anyIDType);

      this.otherAccountFormGroup.controls['accountNo'].setValidators(null);
      if (anyIDType.valueType == 'N') {
        this.otherAccountFormGroup.controls['accountNo'].setValidators([
          ValidationService.requiredValidator,
          ValidationService.nonStringValidator
        ]);
      } else {
        this.otherAccountFormGroup.controls['accountNo'].setValidators([
          ValidationService.requiredValidator,
        ]);
      }

      this.otherAccountFormGroup.controls['accountNo'].updateValueAndValidity();
    });
  }

  public getAnyIDTypes(): any {
    return this.lstOfAnyIDType != null ? Object.keys(this.lstOfAnyIDType) : [];
  }

  public setAnyIDProperties(anyIDType: any) {
    this.descriptionAnyIDLabel = anyIDType.desc;
    this.labelLang = anyIDType.label;
    this.configAnyIDType = {
      valueLength: anyIDType.valueLength == 0 ? 100 : anyIDType.valueLength,
      valueType: anyIDType.valueType == 'S' ? false : true
    };
  }

  public setNextPage(nextPage: string) {
    this.nextPage = nextPage;
  }

  public toggleSMSLang(lang) {
    this.msgLang = this.notifySMSLangData.find(x => x.value == lang.toUpperCase()).display;
    this.otherAccountFormGroup.patchValue({ msgLang: lang });
  }

  public verifyTempExtAccData() {


    if (this.otherAccountService.tempAddExtAccountData != undefined) {
      let tempExtAccData = this.otherAccountService.tempAddExtAccountData;
      this.toggleSMSLang(tempExtAccData.msgLang || this.currentLang);

      if (tempExtAccData.accountName != '') {
        this.showAcctName = true;
      }

      tempExtAccData.accountName = tempExtAccData.accountName ? tempExtAccData.accountName.toUpperCase() : '';
      this.otherAccountFormGroup.patchValue(tempExtAccData);
      this.otherAccountService.tempAddExtAccountData = undefined;
    }
  }

  public addExternalAccount(objRequest) {
    this.otherAccountService.requestAddExternalAccount(objRequest).then((objResponse: any) => {
      let result = objResponse.responseJSON.result;

      if (result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
        let data = result.value;

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
          msgLang: data.msgLang,
          anyIDTypeLabel: this.currentLang == this.constants.CULTURE_SHORTNAME_ENGLISH ? data.labelEn : data.labelTh,
          anyIDTypeDesc: this.currentLang == this.constants.CULTURE_SHORTNAME_ENGLISH ? data.descriptionEN : data.descriptionTH,
          isORFT: objRequest.isORFT,
          txnId: objRequest.txnId,
          refTxnId: objRequest.refTxnId
        };



        this.otherAccountService.confirmAddExtAccountData = confirmAddExtAccountData;
        this.otherAccountService.tempAddExtAccountData = this.otherAccountFormGroup.value;
        this.otherAccountService.isAccountAfterTransfer = true;
        this.otherAccountService.isRequireOtp = data.requireOtp;


        this.permissionChangeRoute.changeRoute(this.nextPage);
      } else {
        this.message = result.responseStatus.errorMessage;
        this.type = 'danger';
        this.alertMessage.show();
      }
    }, function (error) {

    });
  }

  navigateback(): void {
    this.permissionChangeRoute.changeRoute('OTHER_ACCOUNTS');
  }
}
