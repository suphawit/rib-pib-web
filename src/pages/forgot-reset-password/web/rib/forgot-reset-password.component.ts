import { Component, OnInit, Inject, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StepWizard } from '../../../../share/component/step-wizard/step-wizard.component';
import { ForgotResetPasswordService } from './forgot-reset-password.service';
import { Constants } from '../../../../share/service/constants';
import { MessageModalComponent } from '../../../../share/component/modal-messages.component';
import { PermissionChangeRoute } from '../../../../share/service/permission.service';
import { AlertMessageComponent } from '../../../../share/component/alert-message/alert-message.component';
import { Subscription } from "rxjs";

@Component({
  selector: 'forgot-reset-password',
  templateUrl: 'forgot-reset-password.html',
  providers: [ForgotResetPasswordService]
})
// Component class
export class ForgotResetPasswordComponent implements OnInit, OnDestroy, ForgotResetPassword {
  referenceCodeOption: string;
  stepWizard: StepWizard;
  alertConfig: {type: string,message: string, show: boolean};
  messageModalData: {title: string; body:string; size: string; config:any; action:any; };

  observer: any;
  observerSubscription: Subscription;
  @ViewChild('messageModal') public messageModal:MessageModalComponent;
  @ViewChild('alertMessage') public alertMessage:AlertMessageComponent;

  constructor(
    @Inject(Router) public router: Router, 
    public forgotResetPasswordService: ForgotResetPasswordService, 
    public constants: Constants, 
    public permissionChangeRoute: PermissionChangeRoute) {
  }
 
  ngOnInit(): void {
    // initialize
    this.referenceCodeOption = 'donot';
    this.stepWizard = {
      input: {
        data: [{name: '', label: 'wiz.verRef'},{name:'', label:'wiz.verOTP'},{name:'', label:'wiz.resetPwd'}],
        step: 0,
        style: this.constants.STYLE_RIB_WEB
      }
    };

    // initialize observer
    this.observer = this.forgotResetPasswordService.getObserver();
    this.observerSubscription = this.observer.subscribe(result => this.handleObserver(result));

    this.alertConfig = {
      type: 'danger',
      message: '', 
      show: false
    };

    this.messageModalData = {
      title: '', 
      body: '', 
      size: 'md',
      config: {isShowCloseBtn: true},
      action: {}
    };

  }

  ngOnDestroy(){
    this.observerSubscription.unsubscribe();
  }

  onChange(data: any): void {
    if(data === 'have'){
      this.permissionChangeRoute.targetAction = 'forgot-reset-password/verify-refcode';
      this.permissionChangeRoute.prevUrl = 'forgot-reset-password/verify-refcode';
      this.router.navigate(['forgot-reset-password/verify-refcode']);
    }
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
        
      } else if(item.key === 'radiobutton'){
        this.referenceCodeOption = item.value;
      } else if(item.key === 'modal'){
        this.messageModalData.title = item.value.title;
        this.messageModalData.body = item.value.body;
        this.messageModalData.action = item.value.action;

        this.show();
      }
    }
    
  }

  public show():void {
    this.messageModal.show();
  }

  public onModalHidden():void {
    if(this.messageModalData.action.name === 'route'){
      this.router.navigate(this.messageModalData.action.value);
    }
  }
}

interface ForgotResetPassword {
  observer: any;
  referenceCodeOption: string;
  stepWizard: StepWizard;
  onChange: Function;
  handleObserver: Function;
  messageModalData: {title: string; body:string; size: string; config: any; action:any; };
  alertConfig: {type: string; message: string; show: boolean;};
  onModalHidden: Function;
}