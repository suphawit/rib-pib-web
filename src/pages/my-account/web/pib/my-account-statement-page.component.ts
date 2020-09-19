import { Component } from '@angular/core';
import { Constants } from '../../../../share/service/constants';
import { MyAccountService } from '../../../../pages/my-account/my-account.service';
import { MyAccountStatementPage } from '../../my-account-statement-page';
import { Dateservice } from '../../../../share/service/date.service';
import { TranslateService } from 'ng2-translate';

@Component({
  selector: 'my-account-statement-page',
  templateUrl: '../../my-account-statement-page.html'
})
// Component class
export class MyAccountStatementPageComponent extends MyAccountStatementPage  {
    constructor(public constants: Constants, public myAccountService: MyAccountService, public dateservice: Dateservice, public translate: TranslateService) { 
      super(constants, myAccountService, dateservice, translate);
    }

}