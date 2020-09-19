import { Component, Output, OnInit, EventEmitter, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { VerifyAccountFormService } from './verify-account-form.service';
import { DropdownDataService } from '../../service/dropdown.service';
import { CardInfoBean } from '../../../share/bean/card-info-bean';
import { ValidationService } from '../../../share/service/validation.service';

@Component({
  selector: 'verify-account-form',
  templateUrl: './verify-account-form.html',
  providers: [VerifyAccountFormService]
})
// Component class
export class VerifyAccountFormComponent implements OnInit {
  @Input('cardInfo') cardInfo: CardInfoBean;
  @Output('onClickSubmit') onGetVerifyAccount = new EventEmitter();

  verifyAccountForm: any;
  productData: any;
  submitted: boolean = false;

  constructor(private fb: FormBuilder, private verifyAccountFormService: VerifyAccountFormService, private dropdownDataService: DropdownDataService) {}

  onSubmit(): void {
    this.submitted = true;
    if(!this.verifyAccountForm.valid) return;

    this.verifyAccountFormService.requestVerifyAccount(this.verifyAccountForm.value).then((result: any) => {
      let tmpresult = result.responseJSON.result;
   
      this.onGetVerifyAccount.emit(tmpresult);
      
    }, function (error) {

    });
     
  }

  onChange(newValue){
      this.verifyAccountForm.patchValue({productType: newValue});
  }

  ngOnInit(): void {
    this.verifyAccountFormService.cardInfo = this.cardInfo;
    this.productData = this.dropdownDataService.productType;
    this.buildForm();
    this.verifyAccountForm.patchValue({productType: this.productData[0].value});
  }

  private buildForm(): void {
    this.verifyAccountForm = this.fb.group({
      'productType': '',
      'accountNO': ['', [
          ValidationService.requiredValidator
        ]
      ]
    });

  }

}