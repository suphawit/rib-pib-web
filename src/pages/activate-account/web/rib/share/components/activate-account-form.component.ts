import { FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from '../../../../../../share/service/validation.service';
import { Component, Output, Input, OnInit, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'activate-account-form',
  templateUrl: './activate-account-form.html'
})
// Component class
export class ActivateAccountFormComponent implements OnInit, OnChanges {
  activateAccountForm: any;
  submitted: boolean = false;
  isShowSuggest: boolean = false;
  nameSuggestSelected: string;
  nameSuggestionList: any = [];
  suggestSelected: string;

  @Input('suggest') nameSuggestData: any;
  @Output() onClicked = new EventEmitter();

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnChanges(changed: any) {
    if(changed.nameSuggestData && changed.nameSuggestData.currentValue){
        if(changed.nameSuggestData.currentValue.length > 0){
            this.isShowSuggest = true;
            this.nameSuggestionList = changed.nameSuggestData.currentValue;
            this.activateAccountForm.get('username').disable();
            this.activateAccountForm.patchValue({ username: this.nameSuggestionList[0] });
        }
        
    }
  }

  private buildForm(): void {
    

    this.activateAccountForm = this.fb.group({
      'username': ['', 
        [
            ValidationService.requiredValidator,
            Validators.minLength(1),
            Validators.maxLength(20)
        ]
      ],
      'password': ['', 
        [
            ValidationService.requiredValidator,
            Validators.minLength(1),
            Validators.maxLength(20)
        ]
      ],
      'confirmPassword': ['', 
        [
            ValidationService.requiredValidator,
            Validators.minLength(1),
            Validators.maxLength(20)
        ]
      ]
    }, { validator: ValidationService.matchingPasswords('password', 'confirmPassword') });

  }

  onSubmit(): void {
    this.submitted = true;
    if (!this.activateAccountForm.valid) return;

    if(this.nameSuggestSelected) {
      this.activateAccountForm.value['username'] = this.nameSuggestSelected;
    }

    this.onClicked.emit(this.activateAccountForm.value);
  }

  onclickNameSuggestion(nameSuggestion: string) {
      this.nameSuggestSelected = nameSuggestion;
      this.activateAccountForm.patchValue({ username: nameSuggestion });
  }

  onBack(event: any){
    this.onClicked.emit('back');
  }

}