import { Constants } from '../../../share/service/constants';
import { RequestToPayService } from '../request-to-pay.service';
import { TranslateService } from "ng2-translate/src/translate.service";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MasterDataService } from '../../../share/service/master-data.service';
@Component({
  selector: 'rtp-from-account-list',
  templateUrl: './request-to-pay-from-account.html'
})

export class RTPFromAccountList{
  @Input() settings: any;
  @Input() currentAccount: string;
  @Input() accounts: any = []; 
  @Output() accountChanged = new EventEmitter();

  constructor(public requestToPayService: RequestToPayService,
    public translate: TranslateService,
    public constants: Constants,
    public masterDataService: MasterDataService) {
  }

  onSelectChanged(accountObj: any) {
    this.getAccount(accountObj);
  }

  private getAccount(accountObj: any) {
    this.currentAccount = accountObj;
    this.accountChanged.emit(accountObj);
  }

  isHighlighted(account, currentAccount) {
    return currentAccount != null ? account.anyIDValue === currentAccount.anyIDValue : false;
  }
}