import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { StepWizard } from '../../../../share/component/step-wizard/step-wizard.component';
import { ForgotUsernameService } from './forgot-username.service';
import { Constants } from '../../../../share/service/constants';
import { ViewChild } from '@angular/core';
import { AlertMessageComponent } from '../../../../share/component/alert-message/alert-message.component';

@Component({
  selector: 'forgot-username',
  templateUrl: 'forgot-username.html',
  providers: [ForgotUsernameService]
})
// Component class
export class ForgotUsernameComponent implements OnInit, OnDestroy, ForgotUsername {
  observer: any;
  stepWizard: StepWizard;
  alertConfig: {type: string,message: string, show: boolean};
  @ViewChild('alertMessage') public alertMessage:AlertMessageComponent;

  constructor(@Inject(Router) public router: Router, public forgotUsernameService: ForgotUsernameService, public constants: Constants) {
  }
 
  ngOnInit(): void {
    // initialize
    this.stepWizard = {
      input: {
        data: [{name: '', label: 'wiz.verRef'},{name:'', label:'wiz.verOTP'},{name:'', label:'wiz.verDeposit'},{name:'', label:'wiz.showUsername'}],
        step: 0,
        style: this.constants.STYLE_RIB_WEB
      }
    };

    // initialize observer
    this.observer = this.forgotUsernameService.getObserver();
    this.observer.subscribe(result => this.handleObserver(result));

    this.alertConfig = {
      type: 'danger',
      message: '', 
      show: false
    }
  }

  ngOnDestroy(){
    this.observer.unsubscribe();
  }

  handleObserver(data: any){

    for(let item of data){
      if(item.key === 'stepwizard'){
        this.stepWizard.input.step = item.value;
      } else if(item.key === 'alertmessage'){
        this.alertConfig.message = item.value;
        if(item.value === ''){
          this.alertMessage.hide();
        } else {
          this.alertMessage.show();
        }
      }
    }
    
  }
}

interface ForgotUsername {
  observer: any;
  stepWizard: StepWizard;
  handleObserver: Function;
}