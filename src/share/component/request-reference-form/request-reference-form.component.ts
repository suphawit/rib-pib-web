import { Dateservice } from '../../service/date.service';
import { TranslateService, LangChangeEvent } from 'ng2-translate';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from '../../service/validation.service';
import { PermissionChangeRoute } from '../../service/permission.service';
import { RequestReferenceFormService } from './request-reference-form.service';
import { Component, Input, Output, OnInit, EventEmitter, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from "rxjs";
import { SubscriptionService } from '../../service/subscription.service';
import { CapitalizePipe } from '../../pipe/capitalize.pipe';

@Component({
  selector: 'request-reference-form',
  templateUrl: './request-reference-form.html'
})
// Component class
export class RequestReferenceFormComponent implements OnInit, OnDestroy, AfterViewInit {

  reqRefForm: any;
  dateOptions: any;
  selectCardType: number;
  submitted: boolean = false;
  cardType: any = { I: 0, P: 1 };
  datepicker: { show: boolean; maxDate: Date; date: Date, minDate: Date };
  private langSubscription: Subscription;

  issueCountryList: any = [];
  descLang: string;

  @Output() onGetReqRefData = new EventEmitter();
  @Input() accentColor: string;

  constructor(private fb: FormBuilder,
    private requestReferenceFormService: RequestReferenceFormService,
    private dateservice: Dateservice,
    private translate: TranslateService,
    public permissionChangeRoute: PermissionChangeRoute,
    public subscriptionService: SubscriptionService,
    public capitalizePipe: CapitalizePipe) {
  }

  ngOnInit(): void {
    this.langSubscription = this.translate.onLangChange
    .subscribe((event: LangChangeEvent) => {

      this.dateOptions = this.dateservice.getMasterDates();
    });

    this.buildForm();
    this.initIssueCountry();
  }

  ngAfterViewInit(): void {
    this.onRestoreData();
  }

  ngOnDestroy(): void {
    this.onCacheData();
    this.langSubscription.unsubscribe();
  }

  private buildForm(): void {


    this.reqRefForm = this.fb.group({
      'idType': '',
      'idNo': ['', [
        ValidationService.requiredValidator,
        Validators.minLength(1)
      ]
      ],
      'birthDay': ['', ValidationService.requiredValidator],
      'mobileNO': ['', [
        ValidationService.requiredValidator,
        Validators.minLength(1),
        ValidationService.mobileNoValidator
      ]
      ],
      'username': ['', [
        ValidationService.requiredValidator,
        Validators.minLength(1)
      ]
      ],
      'email': ['', [
        ValidationService.requiredValidator,
        ValidationService.emailValidator
      ]
      ],
      'idIssueCountryCode': ''
    });

    this.onInitForm();
  }

  onSubmit(): void {
    this.submitted = true;
    if (!this.reqRefForm.valid) return;

    this.requestReferenceFormService.requestReferenceCode(this.reqRefForm.value).then((result: any) => {
      let tmpresult = result.responseJSON.result;

      this.onGetReqRefData.emit(tmpresult);
    }, function (error) {

    });
  }

  onChangeCardType(valueCardType): void {
    this.reqRefForm.patchValue({ idType: valueCardType });
    this.setCardType(valueCardType);

    this.setDefaultCountryField();
  }

  onSelectDate(date: Date) {
    let birthDate = this.dateservice.formatDate(date, 'YYYYMMDD');
    this.reqRefForm.patchValue({ birthDay: birthDate });
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
  }

  private onCacheData() {
    if (this.permissionChangeRoute.prevUrl === 'forgot-reset-password/verify-refcode') {
      this.requestReferenceFormService.cacheData = this.reqRefForm.value;
      this.permissionChangeRoute.prevUrl = null;
    } 
  }

  private onRestoreData() {

    if (this.requestReferenceFormService.cacheData) {
      this.reqRefForm.patchValue(this.requestReferenceFormService.cacheData);
      if (this.requestReferenceFormService.cacheData.birthDay) {
        let dt = this.dateservice.parseMomentDate(this.requestReferenceFormService.cacheData.birthDay, 'YYYYMMDD');
        this.datepicker.date = new Date(dt.format('MM/DD/YYYY'));
      }
      this.setCardType(this.requestReferenceFormService.cacheData.idType);
      this.requestReferenceFormService.cacheData = null;
    }
  }

  private setCardType(cardType) {
    this.selectCardType = this.cardType[cardType];

  }

  private initIssueCountry(){
      this.subscriptionService.inquiryAllIssueCountry().then((result: any) => {
          this.issueCountryList = result.value;
      }, (result: any) => {

      });
      this.langSubscription = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
          // do something

          this.descLang = this.capitalizePipe.transform(event.lang, true);
      });
      this.descLang = this.capitalizePipe.transform(this.translate.currentLang, true);
  }

  onChangeCountry(countryCode): void{
      //
      this.reqRefForm.patchValue({ idIssueCountryCode: countryCode });
  }

  private setDefaultCountryField(){
    // set default
    if(this.reqRefForm && this.issueCountryList.length > 0){
      let countryCode = this.selectCardType ? this.issueCountryList[0].countryCode : '';
      this.onChangeCountry(countryCode);
    }
  }
}