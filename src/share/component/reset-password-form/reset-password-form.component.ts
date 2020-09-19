import { Component, Output, OnInit, EventEmitter, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from '../../service/validation.service';
import { ResetPasswordFormService } from './reset-password-form.service';
import { CardInfoBean } from '../../../share/bean/card-info-bean';

@Component({
  selector: 'reset-password-form',
  templateUrl: './reset-password-form.html',
  providers: [ResetPasswordFormService]
})
// Component class
export class ResetPasswordFormComponent implements OnInit {
  @Input('cardInfo') cardInfo: CardInfoBean;
  @Output('onClickSubmit') onGetResetPassword = new EventEmitter();

  resetPasswordForm: any;
  submitted: any;

  constructor(private fb: FormBuilder, private resetPasswordFormService: ResetPasswordFormService) {}

  onSubmit(): void {
    this.submitted = true;
    if(!this.resetPasswordForm.valid) return;

    this.resetPasswordFormService.requestResetPassword(this.resetPasswordForm.value).then((result: any) => {
      let tmpresult = result.responseJSON.result;
      
      this.onGetResetPassword.emit(tmpresult);
    }, function (error) {

    });
     
  }

  ngOnInit(): void {
    this.resetPasswordFormService.cardInfo = this.cardInfo;
    this.buildForm();
  }

  private buildForm(): void {
    this.resetPasswordForm = this.fb.group({
      'password': ['', [
          ValidationService.requiredValidator
        ]
      ],
      'passwordconfirm': ''
    }, {validator: ValidationService.matchingPasswords('password', 'passwordconfirm')});

  }

}