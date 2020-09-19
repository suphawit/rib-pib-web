import { Component, Inject, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OtpService } from '../../../../share/component/verify-otp/otp.service';
import { Constants } from '../../../../share/service/constants';
import { ChangePasswordService } from '../../changePassword.service'
import { FormBuilder} from '@angular/forms';
import { ValidationService } from '../../../../share/service/validation.service';
import { MessageModalComponent } from '../../../../share/component/modal-messages.component';
import { PermissionService,PermissionChangeRoute } from '../../../../share/service/permission.service';

@Component({
  selector: 'change-password-new',
  templateUrl: './change-password-new.html'
})

export class RIBWebChangePasswordNew implements OnInit {
     public myForm: any;
     public responseOtp;
     public isRequestOtp;
       public changePasswordStep:any;
      messageModalData: {title: string; body:string; size: string; config:any; action:any; };
      @ViewChild('messageModal') public messageModal:MessageModalComponent;
      submitted: boolean = false;
      constructor(
          @Inject(Router) public router: Router, 
          private _changePasswordService: ChangePasswordService, 
          private _otpService: OtpService,
          private _permissionService: PermissionService,
          public permissionChangeRoute: PermissionChangeRoute,
          public _constants: Constants,private fb: FormBuilder) {
         
      }
 
      onSubmit(): void {
          this.submitted = true;
          if(!this.myForm.valid) return;
              this._changePasswordService.getServices(this.myForm.value).then((result: any) => {
              let tmpresult = result.responseJSON.result;
              if(tmpresult.responseStatus.responseCode === this._constants.RESP_CODE_SUCCESS){
                      
                        this._changePasswordService.updateObserver([
                          { key: 'modal', value: this.messageModalData }
                          ]);
                          this.show();
              }else{
                      this._changePasswordService.updateObserver([{ key: 'alertmessage', value: tmpresult.responseStatus.errorMessage }]);
                      
              }
            
            }, function (error) {
              
            });
       }

        ngOnInit(): void {
       
           if((this._changePasswordService.setStepWindow === false) && ( this.permissionChangeRoute.prevUrl === "/change-password/verify-otp")) {
                this.permissionChangeRoute.changeRoute('DASHBOARD');
            }

            this.buildForm();
              this._changePasswordService.updateObserver([
                { key: 'stepwizard', value: 1 },
                { key: 'alertmessage', value: '' },
            
            ]);
          
            this.messageModalData = {
              title: 'label.Success', 
              body: 'label.changePasswordSuccess', 
              size: 'md',
              config: {isShowCloseBtn: true },
              action: {}
            };
       }

      
        private buildForm(): void {
            this.myForm = this.fb.group({
            
              'currentpassword': ['', [
                  ValidationService.requiredValidator
              
                ]
              ],
              
              'newpassword': ['', [
                  ValidationService.requiredValidator
              
                ]
              ],
            'confirmpassword': ['', [
                  ValidationService.requiredValidator,
                
              
                ]
              ]
            },{validator: ValidationService.matchingPasswords('newpassword', 'confirmpassword')});
        }

    
    
    public show():void {
        this.messageModal.show();
    }


    onRequestOTP($event) {
        this.responseOtp = $event;
        this.isRequestOtp = true;
      
    }

   
}

