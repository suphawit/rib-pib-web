import { Constants } from '../../../service/constants';
import { AccountBean } from '../../../bean/account-bean';
import { AccountService } from '../../../service/account.service';
import { TranslateService } from "ng2-translate/src/translate.service";
import { FundTransferService } from '../../../service/fund-transfer.service';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { BillPaymentService } from '../../../../pages/bill-payment/bill-payment.service';

require("!style-loader!css-loader!sass-loader!./from-account-list.scss");

@Component({
  selector: 'from-account-list',
  templateUrl: './from-account-list.html'
})

export class FromAccountList implements OnInit {
  private accounts: any = [];

  @Input() settings: any;
  @Input() currentAccount: AccountBean;
  @Output() accountChanged = new EventEmitter();

  constructor(public accountService: AccountService,
    public fundTransferService: FundTransferService,
    public billPaymentService: BillPaymentService,
    public translate: TranslateService,
    public constants: Constants) {
  }

  ngOnInit(): void {


    this.accountService.getMyAccounts().then((result: any) => {
      this.accounts = result;

      let hasAccount = this.accounts.length > 0;
      if(result.errorMessage != undefined){
        this.fundTransferService.updateObserver([{ key: 'alertmessage', value: result.errorMessage }]);
        this.billPaymentService.updateObserver([{ key: 'alertmessage', value: result.errorMessage}]);
      }else{
        if (['TRANSFER', 'SCHEDULE','REQUEST_TO_PAY'].indexOf(this.settings.module) != -1) {
          this.fundTransferService.updateObserver([{ key: 'HAS_ACCOUNT', value: hasAccount }]);
        } else if (['BILLPAYMENT', 'BILL_SCHEDULE','BILL_REQUEST_TO_PAY'].indexOf(this.settings.module) != -1) {
          this.billPaymentService.updateObserver([{ key: 'HAS_ACCOUNT', value: hasAccount }]);
        }
      }
    });
  }

  onSelectChanged(accountObj: AccountBean) {
    this.getAccount(accountObj);
  }

  private getAccount(accountObj: AccountBean) {
    this.currentAccount = accountObj;
    this.accountChanged.emit(accountObj);
  }

  isHighlighted(account, currentAccount) {
    return currentAccount != null ? account.accNo === currentAccount.accNo : false;
  }
}