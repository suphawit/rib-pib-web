import { FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from '../../../service/validation.service';
import { Component, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'verify-debitcard-form',
  templateUrl: './debitcard-form.html'
})
// Component class
export class VerifyDebitcardFormComponent implements OnInit {
  verifyDebitcardForm: any;
  submitted: boolean = false;

  @Output() onClicked = new EventEmitter();

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {


    this.verifyDebitcardForm = this.fb.group({
      'atmNumber': ['', 
        [
            ValidationService.requiredValidator,
            Validators.minLength(1)
        ]
      ],
      'atmPin': ['', 
        [
            ValidationService.requiredValidator,
            Validators.minLength(1)
        ]
      ]
    });

  }

  onSubmit(): void {
    this.submitted = true;
    if (!this.verifyDebitcardForm.valid) return;

    this.onClicked.emit(this.verifyDebitcardForm.value);
  }

  onBack(){
    this.onClicked.emit('back');
  }

}