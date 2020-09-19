import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Constants } from '../../../../share/service/constants';
import { TermDepositAccountService } from './term-deposit-account.service';
import { MyAccountService } from '../../../../pages/my-account/my-account.service';
import { StepWizard } from '../../../../share/component/step-wizard/step-wizard.component';
import { AlertMessageComponent } from '../../../../share/component/alert-message/alert-message.component';
import { Subscription } from "rxjs";

@Component({
  selector: 'change-term-deposit-base',
  templateUrl: './change-term-deposit-base.html'
})
// Component class
export class ChangeTermDepositBaseComponent implements OnInit, OnDestroy {

  private observer: any;
  private stepWizard: StepWizard;
  private changeTermStep: string;
  private selectedCurrentAccount: any;
  private isFailChangeTerm: boolean = false;
  private isSuccessChangeTerm: boolean = false;
  private alertConfig: { type: string, message: string, show: boolean };
  private subscrition: Subscription;

  @ViewChild('alertMessage') public alertMessage: AlertMessageComponent;

  constructor(private termDepositAccountService: TermDepositAccountService,
    public myAccountService: MyAccountService,
    private constants: Constants) {
  }

  ngOnInit(): void {
    this.stepWizard = {
      input: {
        data: [{ name: '', label: 'stepWizard.enterDetails' }, { name: '', label: 'stepWizard.confirm' }, { name: '', label: 'stepWizard.complete' }],
        step: 0,
        style: this.constants.STYLE_RIB_WEB
      }
    };

    this.alertConfig = { type: 'danger', message: '', show: false };

    // Initialize observer
    this.observer = this.termDepositAccountService.getObserver();
    this.subscrition = this.observer.subscribe(result => this.handleObserver(result));
    this.isSuccessChangeTerm = false;
    this.isFailChangeTerm = false;
    this.selectedCurrentAccount = this.myAccountService.selectAccountDetailData;
  }

  ngOnDestroy(){
    this.subscrition.unsubscribe();
  }

  private handleObserver(dataList: any) {   
    dataList.forEach(item => {
      if (item.key === 'stepwizard') {
        this.stepWizard.input.step = item.value;
        this.changeTermStep = item.step;
      } else if (item.key === 'alertmessage') {
        
        this.alertConfig.message = item.value || '';
        if (this.alertConfig.message !== '') {
          this.alertMessage.show();
        } else {
          this.alertMessage.hide();
        }
      } else if (item.key === 'isSuccessChangeTerm') {
        this.isSuccessChangeTerm = true;
      } else if (item.key === 'isFailChangeTerm') {
        this.isFailChangeTerm = true;
      } else {
        //delete temp data
        this.isSuccessChangeTerm = false;
        this.isFailChangeTerm = false;
      }
    });
  }
}