import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ChangePasswordService } from '../../changePassword.service'
import { PermissionAction ,PermissionService,PermissionChangeRoute} from '../../../../share/service/permission.service';
import { Constants } from '../../../../share/service/constants';
import { MessageModalComponent } from '../../../../share/component/modal-messages.component';
import { StepWizard } from '../../../../share/component/step-wizard/step-wizard.component';
import { AlertMessageComponent } from '../../../../share/component/alert-message/alert-message.component';
import { Subscription } from "rxjs";

@Component({
    selector: 'change-password-selector',
    templateUrl: './change-password.html',
    providers: [ChangePasswordService]
})

export class RIBWebChangePassword implements OnInit, OnDestroy{
    public changePasswordStep:any;
    observer: any;
    observerSubscription: Subscription;
    stepWizard: StepWizard;
    currentStepWizard: any;
    alertConfig: {type: string,message: string, show: boolean};
     messageModalData: {title: string; body:string; size: string; config:any; action:any; };
     stepwizardStyle = this._Constants.STYLE_RIB_WEB;
     @ViewChild('messageModal') public messageModal:MessageModalComponent;
     constructor(private _PermissionAction: PermissionAction,private changePasswordService: ChangePasswordService, public _Constants: Constants,public _permissionService:PermissionService,  public permissionChangeRoute: PermissionChangeRoute, ) {
        
       
    }

    @ViewChild('alertMessage') public alertMessage:AlertMessageComponent;    

 ngOnInit(): void {
      this.messageModalData = {
      title: '', 
      body: '', 
      size: 'md',
      config:  {isShowCloseBtn: true },
      action: {}
    };
    
    this.observer = this.changePasswordService.getObserver();  
   
		this.observerSubscription = this.observer.subscribe(result => this.handleObserver(result));
    
     this.alertConfig = {
      type: 'danger',
      message: '', 
      show: false
    };


      this.stepWizard = {
      input: {
        data: [{name: '', label: 'wiz.verOTP'},{name:'', label:'wiz.creditNewPassword'}],
        step: 0,
        style: this._Constants.STYLE_RIB_WEB
      }
    };
 
  }
ngOnDestroy():void {
  this.observerSubscription.unsubscribe();
}
    
public show():void {
    this.messageModal.show();
  }

handleObserver(dataList: Array<any>){
 
  
           for (let data of dataList) {
              if(data.key === 'stepwizard'){
                    this.stepWizard.input.step = data.value;
                   
                   if( this.stepWizard.input.step  === 0){
                         this.changePasswordStep = "label.changePasswordStep1";
                   }else{
                         this.changePasswordStep = "label.changePasswordStep2";
                   }
              } else if(data.key === 'alertmessage'){
                    this.alertConfig.message = data.value;
                    
                    if(data.value === ''){
                      this.alertMessage.hide();
                    } else {
                      this.alertMessage.show();
                    }
               } else if(data.key === 'modal'){
                 
                  
                  this.messageModalData.title = data.value.title;
                  this.messageModalData.body = data.value.body;
                  this.messageModalData.action = data.value.action;
                  this.show();
                }
           }
	}


  public onModalHidden():void {
   
   
   this._permissionService.logoutSession();
   this.permissionChangeRoute.changeRoute("HOME");
  


   
  }

  
    
}
