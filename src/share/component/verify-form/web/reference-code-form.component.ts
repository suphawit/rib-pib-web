import { FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from '../../../service/validation.service';
import { Component, Output, OnInit, EventEmitter, Input, OnDestroy, OnChanges } from '@angular/core';
import { TranslateService, LangChangeEvent } from "ng2-translate/src/translate.service";
import { CapitalizePipe } from '../../../pipe/capitalize.pipe';
@Component({
  selector: 'verify-reference-code-form',
  templateUrl: './reference-code-form.html'
})
// Component class
export class VerifyReferenceCodeFormComponent implements OnInit, OnDestroy, OnChanges {
  verifyRefcodeForm: any;
  submitted: boolean = false;
  cardType: any = { I: 0, P: 1 };
  selectCardType: number = 0;
  issueCountryList: any = [];
  langSubscription: any;
  descLang: string;
  countrySelected: string = '';

  @Input('country') countryData: any; 
  @Output() onClicked = new EventEmitter();

  constructor(private fb: FormBuilder, public translate: TranslateService, public capitalizePipe: CapitalizePipe) {
  }

  ngOnChanges(changed: any) {
    if(changed.countryData && changed.countryData.currentValue){
        //
        this.issueCountryList = changed.countryData.currentValue;

        this.setDefaultCountryField();
    }
  }

  ngOnInit(): void {
    // this.issueCountryList = this.countryData || [];
    this.langSubscription = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      // do something

      this.descLang = this.capitalizePipe.transform(event.lang, true);
    });
    this.descLang = this.capitalizePipe.transform(this.translate.currentLang, true);

    this.buildForm();
  }

  ngOnDestroy(){
      this.langSubscription.unsubscribe();
  }

  private buildForm(): void {


    this.verifyRefcodeForm = this.fb.group({
      'idType': '',
      'idNo': ['', 
        [
            ValidationService.requiredValidator,
            Validators.minLength(1)
        ]
      ],
      'referenceCode': ['', 
        [
            ValidationService.requiredValidator,
            Validators.minLength(1)
        ]
      ],
      'idIssueCountryCode': ''
    });

  }

  onSubmit(): void {
    this.submitted = true;
    if (!this.verifyRefcodeForm.valid) return;

    this.onClicked.emit(this.verifyRefcodeForm.value);
  }

  onChangeCardType(valueCardType): void {
    this.selectCardType = this.cardType[valueCardType];
    this.verifyRefcodeForm.patchValue({ idType: valueCardType });

    this.setDefaultCountryField();
  }

  onBack(){
    this.onClicked.emit('back');
  }

  onChangeCountry(countryCode): void{
    //
    this.verifyRefcodeForm.patchValue({ idIssueCountryCode: countryCode });
  }

  private setDefaultCountryField(){
    // set default
    if(this.verifyRefcodeForm && this.issueCountryList.length > 0){
      let countryCode = this.selectCardType ? this.issueCountryList[0].countryCode : '';
      this.onChangeCountry(countryCode);
    }
  }
  
}