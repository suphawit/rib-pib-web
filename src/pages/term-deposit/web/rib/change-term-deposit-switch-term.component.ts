import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { TermDepositAccountService } from './term-deposit-account.service';
import { PermissionAction } from '../../../../share/service/permission.service';
import { Constants } from '../../../../share/service/constants';
import { MyAccountService } from '../../../../pages/my-account/my-account.service';
import { TranslateService } from "ng2-translate/src/translate.service";
import { PermissionChangeRoute } from '../../../../share/service/permission.service';

@Component({
  selector: 'change-term-deposit-switch-term',
  templateUrl: './change-term-deposit-switch-term.html'
})
// Component class
export class ChangeTermDepositSwitchTermComponent implements OnInit {

  private days: any;
  private result: any;
  private months: any;
  private dep_item: any;
  private isError = false;
  private depositList: any;
  private periodArray: any;
  private deposit_item: any;
  private account_No: string;
  private account_ID: string;
  private ft_td_data: any = {};
  private fcconTdTermTypes: any;
  private SelectedDataList: any;
  private term_description: any = "";
  private selected_term_netamount: any;
  private isToggleRows: boolean = false;

  constructor(private termDepositAccountService: TermDepositAccountService,
    public permissionAction: PermissionAction,
    private constants: Constants,
    public myAccountService: MyAccountService,
    public translate: TranslateService,
    public permissionChangeRoute: PermissionChangeRoute) {
  }

  ngOnInit(): void {
    this.termDepositAccountService.updateObserver([
      { key: 'stepwizard', value: 0, step: 'label.changeTermStep1' },
      { key: 'alertmessage', value: '' }
    ]);

    // Initialize service
    this.account_No = this.myAccountService.selectAccountDetailData.myAccountNumber;
    this.account_ID = this.myAccountService.selectAccountDetailData.myAccountID;
    this.getChangeTDDetailsService();
  };

  // Initial inquiry deposit item
  private getChangeTDDetailsService() {
    if (this.account_ID != undefined) {
      let myAcctId = this.account_ID;
      let paging = { page: '1', pageSize: '50' };
      let param = { myAcctId, paging };

      this.termDepositAccountService.setActionCode(this.constants.REQ_ACTION_CODE.MY_ACCOUNT_INQUIRY_DETAIL_SWITCH_TERM_TD);
      this.termDepositAccountService.setProcedure(this.constants.REQ_PROCEDURE_NAME.MY_ACCOUNT_INQUIRY_DETAIL_SWITCH_TERM_TD);
      this.termDepositAccountService.setParam(param);
      this.termDepositAccountService.getTermDepositService().then((objResponse: any) => {
        this.result = objResponse.responseJSON.result.value;
        
        if (objResponse.responseJSON.result.responseStatus.responseCode == this.constants.RESP_CODE_SUCCESS && this.result.depositsList != 0) {
          this.isError = false;
          this.termDepositAccountService.ChangeTermResponse = this.result;
          this.termDepositAccountService.ChangeTermDepositList = this.result.depositsList;
          this.depositList = this.termDepositAccountService.ChangeTermDepositList;
          this.controlBindingDataAndService();
          this.termDepositAccountService.updateObserver([{ key: 'alertmessage', value: '' }]);
        } else {
          this.isError = true;
          this.termDepositAccountService.updateObserver([{ key: 'alertmessage', value: objResponse.responseJSON.result.responseStatus.errorMessage }]);
        }
        
      }, function (error) {

      });
    }
  }

  private controlBindingDataAndService() {
    this.getSelectedTermDescription();
    this.setInitialSelectedDepositItem();
    this.setDataList();
  }

  private getSelectedTermDescription() { //get term and integrated data
    for (let i in this.depositList) {
      this.dep_item = this.depositList[i];
      this.months = this.dep_item.termMonth;
      this.days = this.dep_item.termDay;
      this.term_description = "";

      if (this.months !== undefined && this.months !== null && this.months !== 0) {
        if (this.months === 1) {
          this.term_description = this.term_description + this.months + " " + this.translate.instant('label.months');
        } else if (this.months > 1) {
          this.term_description = this.term_description + this.months + " " + this.translate.instant('label.months');
        }
      }
      if (this.days !== undefined && this.days !== null && this.days !== 0) {
        if (this.days === 1) {
          this.term_description = this.term_description + " " + this.days + " " + this.translate.instant('label.day');
        } else if (this.days > 1) {
          this.term_description = this.term_description + " " + this.days + " " + this.translate.instant('label.day');
        }
      }

      this.depositList[i].term_description = this.term_description;
    }
  }

  toggleDisplayRows(deposit_item) {
    this.isToggleRows = !this.isToggleRows;
    if (this.isToggleRows == false) {
      //set a deposit item without toggle all row
      let accountNo = this.account_No;
      let depNo = deposit_item.depNo;
      this.SelectedDataList = { accountNo, depNo };
      this.termDepositAccountService.SelectedDataList = this.SelectedDataList;
      this.setDepositItemToService(deposit_item.depNo);
      this.setDataList();
    } else {
      // Set deposit items with toggle all row
      this.deposit_item = this.depositList;
    }
  }

  private setDepositItemToService(depNo) {
    for (var index in this.depositList) {
      if (this.depositList[index].depNo === depNo) {
        this.termDepositAccountService.SelectedDepositItem = this.depositList[index];
        this.deposit_item = [this.depositList[index]];
      }
    }
  }

  // Start set initial value
  private setInitialSelectedDepositItem() {
    if (this.depositList.length > 0) {
      let accountNo = this.account_No;
      let depNo = this.depositList[0].depNo;
      this.SelectedDataList = { accountNo, depNo };

      this.termDepositAccountService.SelectedDataList = this.SelectedDataList;
      this.setDepositItemToService(depNo);
      this.deposit_item = [this.depositList[0]];
    }
  }

  private setDataList() {
    this.SelectedDataList = this.termDepositAccountService.SelectedDataList;
    if (this.SelectedDataList != null) {

      this.getMasterDataSwitchTermService();
    } else {
      this.SelectedDataList = this.termDepositAccountService.SelectedDataList;
    }
  }
  // End set initial value

  private getMasterDataSwitchTermService() {

    let accountNo = this.SelectedDataList.accountNo;
    let depNo = this.SelectedDataList.depNo;
    let param = { accountNo, depNo };

    this.termDepositAccountService.setActionCode(this.constants.REQ_ACTION_CODE.INQUIRY_TERM_MASTER_DATA_SWITCH_TERM_TD);
    this.termDepositAccountService.setProcedure(this.constants.REQ_PROCEDURE_NAME.INQUIRY_TERM_MASTER_DATA_SWITCH_TERM_TD);
    this.termDepositAccountService.setParam(param);
    this.termDepositAccountService.getTermDepositService().then((objResponse: any) => {
      this.result = objResponse.responseJSON.result.value;
      if (objResponse.responseJSON.result.responseStatus.responseCode == this.constants.RESP_CODE_SUCCESS) {
        this.fcconTdTermTypes = this.result.fcconTdTermTypes;
        this.selected_term_netamount = this.result.netAmount;
        this.termDepositAccountService.newTermNetAmount = this.selected_term_netamount;
        this.showMasterDataSwitchTermAndService();
        this.termDepositAccountService.updateObserver([{ key: 'alertmessage', value: '' }]);
      } else {
        this.termDepositAccountService.updateObserver([{ key: 'alertmessage', value: objResponse.responseJSON.result.responseStatus.errorMessage }]);
      }

    }, function (error) {

    });
  }

  private showMasterDataSwitchTermAndService() {
    this.periodArray = [];
    let currLang = this.translate.currentLang.toUpperCase();
    if (this.fcconTdTermTypes.length > 0) {
      this.ft_td_data.term = this.fcconTdTermTypes[0].term;
      if (currLang === this.constants.CULTURE_SHORTNAME_THAI) {
        this.ft_td_data.period = this.fcconTdTermTypes[0].freqIntPayDescTha;
      } else {
        this.ft_td_data.period = this.fcconTdTermTypes[0].freqIntPayDescEng;
      }
      for (let i in this.fcconTdTermTypes) {
        if (currLang === this.constants.CULTURE_SHORTNAME_ENGLISH) {
          this.fcconTdTermTypes[i].term_description = this.fcconTdTermTypes[i].termNameEng;
        } else {
          this.fcconTdTermTypes[i].term_description = this.fcconTdTermTypes[i].termNameTha;
        }
        if (this.fcconTdTermTypes[i].term == this.ft_td_data.term) {
          if (currLang === this.constants.CULTURE_SHORTNAME_THAI) {
            this.periodArray.push(this.fcconTdTermTypes[i].freqIntPayDescTha);
          } else {
            this.periodArray.push(this.fcconTdTermTypes[i].freqIntPayDescEng);
          }
        }
      }
    }
  }

  detectTermChange(term) {
    this.periodArray = [];
    for (var index in this.fcconTdTermTypes) {
      if (this.fcconTdTermTypes[index].term == term) {
        if (this.translate.currentLang.toUpperCase() === this.constants.CULTURE_SHORTNAME_THAI) {
          this.periodArray.push(this.fcconTdTermTypes[index].freqIntPayDescTha);
        } else {
          this.periodArray.push(this.fcconTdTermTypes[index].freqIntPayDescEng);
        }
      }
    }
    if (this.periodArray.length > 0) {
        this.ft_td_data.period = this.periodArray[0];
    }
  }

  navigateToSwitchTermConfirm() {
    if (this.fcconTdTermTypes != undefined) {
      for (var index in this.fcconTdTermTypes) {

        if (this.fcconTdTermTypes[index].term == this.ft_td_data.term &&
          (this.fcconTdTermTypes[index].freqIntPayDescTha === this.ft_td_data.period ||
            this.fcconTdTermTypes[index].freqIntPayDescEng === this.ft_td_data.period)) {

          let selected_term_type = this.fcconTdTermTypes[index];
          this.termDepositAccountService.SelectedSwitchTerm = selected_term_type;
        }
      }
      this.showChangeTDConfirmService().then((result: any)=>{
        this.termDepositAccountService.termRates = result;
        this.permissionChangeRoute.changeRoute('MY_ACCOUNTS.CHANGETERM_TD_CONFIRM');
      });
      
    }
  }

  getTermName(termData: any): string{
    let desc = termData.productTypeDescription;
    return (this.translate.currentLang.toUpperCase() === this.constants.CULTURE_SHORTNAME_ENGLISH) ? desc + ' - ' + termData.termNameEng : desc + ' - ' + termData.termNameTha;
  }

  private showChangeTDConfirmService() {
    let promise = new Promise((resolve, reject) => {
      let accountNo =  this.myAccountService.selectAccountDetailData.myAccountNumber;
      let depNo = this.termDepositAccountService.SelectedDepositItem.depNo;
      let netAmount = this.termDepositAccountService.newTermNetAmount;
      let fcconTdTermType = this.termDepositAccountService.SelectedSwitchTerm;
      delete fcconTdTermType["term_description"];
      // fix for new TD structure
      fcconTdTermType.benefitAcc = this.termDepositAccountService.SelectedDepositItem.benefitAcc;
      let param = { accountNo, depNo, netAmount, fcconTdTermType, language: this.constants.CULTURE_SHORTNAME_ENGLISH };

      this.termDepositAccountService.setActionCode(this.constants.REQ_ACTION_CODE.GET_RATES_BY_CIF_TYPE_SWITCH_TERM_TD);
      this.termDepositAccountService.setProcedure(this.constants.REQ_PROCEDURE_NAME.GET_RATES_BY_CIF_TYPE_SWITCH_TERM_TD);
      this.termDepositAccountService.setParam(param);
      this.termDepositAccountService.getTermDepositService().then((objResponse: any) => {
        this.result = objResponse.responseJSON.result.value;

        if (objResponse.responseJSON.result.responseStatus.responseCode == this.constants.RESP_CODE_SUCCESS) {
          this.termDepositAccountService.termRates = this.result;
          resolve(this.result);
        } else {
          this.termDepositAccountService.updateObserver([
            { key: 'alertmessage', value: objResponse.responseJSON.result.responseStatus.errorMessage },
          ]);
        }
      }, function (error) {

      });
    });

    return promise;
  }
}

@Pipe({ name: 'Unique' })
export class filterDuplicate implements PipeTransform {
  private arrTerm = [];
  private uniqueArrTerm = [];

  public transform(arr: Array<any>): Array<any> {
    for (let i in arr) {
      let term = arr[i].term;
      this.arrTerm.push(term);
    }
    for (let i = 0; i < this.arrTerm.length; i++) {
      let current = this.arrTerm[i];
      if (this.uniqueArrTerm.indexOf(current) < 0) this.uniqueArrTerm.push(current);
    }
    return this.uniqueArrTerm;
  }
}