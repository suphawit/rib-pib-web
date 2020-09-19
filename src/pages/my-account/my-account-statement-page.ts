import { OnInit } from '@angular/core';
import { Constants } from '../../share/service/constants';
import { MyAccountService } from '../../pages/my-account/my-account.service';
import { Dateservice } from '../../share/service/date.service';
import { TranslateService } from 'ng2-translate';

// Component class
export class MyAccountStatementPage implements OnInit {
    constructor(public constants: Constants, public myAccountService: MyAccountService, public dateservice: Dateservice, public translate: TranslateService) {}

    alertConfig: {type: string,message: string, show: boolean};
    accountData: any;
    statementData: {
      accountId: number;
      accountType: string;
      balance: number;
    };

    ngOnInit(){
      this.alertConfig = {
        type: 'danger',
        message: '', 
        show: false
      };

      this.statementData = {
        accountId: 0,
        accountType: '',
        balance: 0
      };

      // initial account data
      if(this.myAccountService.selectAccountDetailData !== null){
        this.accountData = this.myAccountService.selectAccountDetailData;
        this.statementData.accountId = this.accountData.myAccountID;
        this.statementData.accountType = this.accountData.accountType;
        this.statementData.balance = this.accountData.myAvailableBalance;
        
        let isoDate = new Date(this.dateservice.toISOFormat(this.accountData.lastUpdatedDate));
        this.accountData.lastUpdatedDate = this.dateservice.formatDate(isoDate, 'DD MMM YYYY HH:mm', this.translate.currentLang);
      }

      
    }
}