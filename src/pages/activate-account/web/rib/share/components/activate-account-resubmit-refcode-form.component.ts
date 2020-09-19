import { FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from '../../../../../../share/service/validation.service';
import { Component, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'activate-account-resubmit-refcode-form',
  templateUrl: './activate-account-resubmit-refcode-form.html'
})
// Component class
export class ActivateAccountReSubmitRefcodeFormComponent implements OnInit {
  verifyReSubmitRefcodeForm: any;
  submitted: boolean = false;

  @Output() onClicked = new EventEmitter();

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    

    this.verifyReSubmitRefcodeForm = this.fb.group({
      'referenceCode': ['', 
        [
            ValidationService.requiredValidator,
            Validators.minLength(1)
        ]
      ]
    });

  }

  onSubmit(): void {
    this.submitted = true;
    if (!this.verifyReSubmitRefcodeForm.valid) return;

    this.onClicked.emit(this.verifyReSubmitRefcodeForm.value);
  }

  onBack(event: any){
    this.onClicked.emit('back');
  }

}