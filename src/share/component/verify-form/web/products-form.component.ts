import { FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from '../../../service/validation.service';
import { Dateservice } from '../../../service/date.service';
import { Component, Output, Input, OnInit, EventEmitter, OnChanges, OnDestroy } from '@angular/core';
import { TranslateService, LangChangeEvent } from "ng2-translate/src/translate.service";

@Component({
  selector: 'verify-products-form',
  templateUrl: './products-form.html'
})
// Component class
export class VerifyProductsFormComponent implements OnInit, OnChanges, OnDestroy {
  verifyProductsForm: any;
  submitted: boolean = false;
  dateOptions: any;
  datepicker: { show: boolean; maxDate: Date; date: Date, minDate: Date };
  cardType: any = { I: 0, P: 1 };
  selectCardType: number = 0;
  productTypeList: any = [];
  issueCountryList: any = [];
  langSubscription: any;
  descLang: string;
  countrySelected: string = '';

  @Input('country') countryData: any;
  @Input('date') dateData: any;
  @Input('product') productData: any;
  @Output() onClicked = new EventEmitter();

  constructor(public fb: FormBuilder, public dateservice: Dateservice, public translate: TranslateService) {
  }

  ngOnInit(): void {

    this.productTypeList = this.productData || [];
    this.langSubscription = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      // do something

      this.descLang = event.lang;
    });
    this.descLang = this.translate.currentLang;

    this.buildForm();
  }

  ngOnChanges(changed: any) {
    if(changed.dateData && changed.dateData.currentValue){

        this.datepicker = changed.dateData.currentValue;
    }

    if(changed.productData && changed.productData.currentValue){

        this.productTypeList = changed.productData.currentValue;
    }

    if(changed.countryData && changed.countryData.currentValue){

        this.issueCountryList = changed.countryData.currentValue;
        this.setDefaultCountryField();
        
    }
  }

  ngOnDestroy(){
      this.langSubscription.unsubscribe();
  }

  private buildForm(): void {


    this.verifyProductsForm = this.fb.group({
      // 'birthDate': ['', ValidationService.requiredValidator],
      'idType': '',
      'idNo': ['', [
        ValidationService.requiredValidator,
        Validators.minLength(1)
      ]
      ],
      'productType': '',
      'productId': ['', [
        ValidationService.requiredValidator,
        Validators.minLength(1)
      ]
      ],
      'idIssueCountryCode': ''
    });

    this.onInitForm();
  }

  onSubmit(): void {
    this.submitted = true;
    if (!this.verifyProductsForm.valid) return;

    this.onClicked.emit(this.verifyProductsForm.value);
  }

  onSelectDate(date: Date) {
    let birthDate = this.dateservice.formatDate(date, 'YYYYMMDD');
    this.verifyProductsForm.patchValue({ birthDate: birthDate });
  }

  private onInitForm() {
    this.datepicker = {
      show: false,
      maxDate: new Date(),
      date: new Date(),
      minDate: new Date('1900/01/01')
    };
    this.dateOptions = this.dateservice.getMasterDates();
    this.onSelectDate(this.datepicker.date);
    
    if(this.productTypeList.length > 0){
      this.onChangeProductType(this.productTypeList[0].value);
    }
    
  }

  onChangeCardType(valueCardType): void {
    this.selectCardType = this.cardType[valueCardType];
    this.verifyProductsForm.patchValue({ idType: valueCardType });

    this.setDefaultCountryField();
  }

  onChangeProductType(valueProductType): void {
    this.verifyProductsForm.patchValue({ productType: valueProductType });
  }

  onBack(){
    this.onClicked.emit('back');
  }

  onChangeCountry(countryCode): void{

    this.verifyProductsForm.patchValue({ idIssueCountryCode: countryCode });
  }

  private setDefaultCountryField(){
    // set default
    if(this.verifyProductsForm && this.issueCountryList.length > 0){
      let countryCode = this.selectCardType ? this.issueCountryList[0].countryCode : '';
      this.onChangeCountry(countryCode);
    }
  }
}