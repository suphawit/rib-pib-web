import { Component, OnInit, Inject } from '@angular/core';
import { Constants } from '../../../../share/service/constants';
import { TranslateService } from "ng2-translate/src/translate.service";
import { TermDepositAccountService } from './term-deposit-account.service';
import { MyAccountService } from '../../../../pages/my-account/my-account.service';
import { PermissionChangeRoute } from '../../../../share/service/permission.service';

@Component({
  selector: 'change-term-deposit-switch-term-confirm',
  templateUrl: './change-term-deposit-switch-term-confirm.html'
})
// Component class
export class ChangeTermDepositSwitchTermConfirmComponent implements OnInit {

  SelectedTermType: any;
  private SelectedDepositItem: any;
  newInterestRate: string;
  private verifyTransactionId: any;
  isShowCloseButton: boolean = false;
  currentLang: string;

  constructor(
    private termDepositAccountService: TermDepositAccountService,
    private constants: Constants,
    public myAccountService: MyAccountService,
    public translate: TranslateService,
    public permissionChangeRoute: PermissionChangeRoute) {
  }

  ngOnInit(): void {
    this.termDepositAccountService.updateObserver([
      { key: 'stepwizard', value: 1, step: 'label.changeTermStep2' },
      { key: 'alertmessage', value: '' }
    ]);

    // Initialize Data
    this.SelectedTermType = this.termDepositAccountService.SelectedSwitchTerm;
    this.currentLang = this.translate.currentLang;
    this.SelectedDepositItem = this.termDepositAccountService.SelectedDepositItem;
    this.initTermRates();
  };

  navigateToSwitchTermSuccess(): void {
    let verifyTransactionId = this.verifyTransactionId;
    let benefitAcc = this.SelectedDepositItem.benefitAcc;
    let param = { language: this.constants.CULTURE_SHORTNAME_ENGLISH, benefitAcc, verifyTransactionId }; 
    this.termDepositAccountService.setActionCode(this.constants.REQ_ACTION_CODE.SWITCH_TERM_TD);
    this.termDepositAccountService.setProcedure(this.constants.REQ_PROCEDURE_NAME.SWITCH_TERM_TD);
    this.termDepositAccountService.setParam(param);
    this.termDepositAccountService.getTermDepositService().then((objResponse: any) => {
      if (objResponse.responseJSON.result.responseStatus.responseCode == this.constants.RESP_CODE_SUCCESS) {

        // Update step wizard
        this.termDepositAccountService.updateObserver([
          { key: 'stepwizard', value: 2, step: 'label.changeTermStep3' },
          { key: 'isSuccessChangeTerm' }
        ]);

        this.isShowCloseButton = true;
      } else {
        this.termDepositAccountService.updateObserver([
          { key: 'stepwizard', value: 2, step: 'label.changeTermStep3' },
          { key: 'alertmessage', value: objResponse.responseJSON.result.responseStatus.errorMessage },
          { key: 'isFailChangeTerm' }
        ]);
      }
    }, function (error) {

    });
  }

  navigatePage(pageRoute: string): void {
    this.termDepositAccountService.updateObserver([
      { key: '' }
    ]);

    this.permissionChangeRoute.changeRoute(pageRoute);
  }

  private initTermRates(){
    let tmpTermRates = this.termDepositAccountService.termRates;
    this.newInterestRate = tmpTermRates.interestRate;
    this.verifyTransactionId = tmpTermRates.verifyTransactionId;
  }
}