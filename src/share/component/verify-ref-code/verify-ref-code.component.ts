import { Component, Output, Input,EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { VerifyRefCodeService } from './verify-ref-code.service';

import { Constants } from '../../service/constants';

import { CardInfoBean } from '../../bean/card-info-bean';

import { ValidationService } from '../../service/validation.service';
import { SubscriptionService } from '../../service/subscription.service';
import { TranslateService, LangChangeEvent } from "ng2-translate/src/translate.service";
import { CapitalizePipe } from '../../pipe/capitalize.pipe';

@Component({
  selector: 'verify-ref-code',
  templateUrl: './verify-ref-code.html',
  providers: [VerifyRefCodeService]
})

export class VerifyRefCodeComponent implements OnInit, OnDestroy {

    @Input('screen-name') screenName: string;

    @Output('onClickSubmit') clickSubmit = new EventEmitter();
    @Output('onClickBack') clickBack = new EventEmitter();

    public verifyRefCodeForm: any;

    private cardInfoBean: CardInfoBean;

    // Constant variable wait for solution to use center Constant
    
    private actionType: string;

    public showBackButton: boolean = false;

    submitted:boolean = false;

    issueCountryList: any = [];
    descLang: string;
    langSubscription: any;
    
    constructor(
        private fb: FormBuilder,
        private _verifyRefCodeService: VerifyRefCodeService,
        private _constants: Constants,
        public subscriptionService: SubscriptionService,
        public translate: TranslateService, 
        public capitalizePipe: CapitalizePipe) {
        
    }

    onSubmit() {
        this.submitted = true;
        if(!this.verifyRefCodeForm.valid) return;


        this.cardInfoBean = new CardInfoBean(this.verifyRefCodeForm.value.cardType.trim(), this.verifyRefCodeForm.value.cardId.trim(), this.verifyRefCodeForm.value.refCode.trim(), this.verifyRefCodeForm.value.idIssueCountryCode.trim());
        this._verifyRefCodeService.setActionCode('ACT_VERIFY_REF_CODE');
        let obj: any = {
            params: {
                customerType:   this._constants.CUSTOMER_TYPE,
                idType:         this.verifyRefCodeForm.value.cardType.trim(),
                idNo:           this.verifyRefCodeForm.value.cardId.trim(),
                subscriptionChannel: 'REF_CODE',
                referenceCode:  this.verifyRefCodeForm.value.refCode.trim(),
                actionType:     this.actionType,
                idIssueCountryCode: this.verifyRefCodeForm.value.idIssueCountryCode.trim()
            },
        };
        

        
        this._verifyRefCodeService.verifyRefCode(obj).then((result) => {
            // if (result['responseJSON']['result']['responseStatus']['responseCode'] === this._constants.RESP_CODE_SUCCESS) {
            //

                let returnObj: any = {
                    resultObj: result['responseJSON']['result'],
                    cardInfoBean: this.cardInfoBean
                };
                this.clickSubmit.emit(returnObj);
            // }
        }, function (error) {

        });
    }

    onClickBack() {
        this.clickBack.emit();
    }

    public ngOnInit() {

        this.buildForm();
        if (this.screenName == 'account-activate') {
            this.showBackButton = false;
            this.actionType = this._constants.ACTION_TYPE_ACTIVATE_ACCOUNT;
        } else if (this.screenName == 'forgot-password') {
            this.showBackButton = true;
            this.actionType = this._constants.ACTION_TYPE_FORGOT_PASSWORD;
        } else if (this.screenName == 'forgot-username') {
            this.showBackButton = false;
            this.actionType = this._constants.ACTION_TYPE_FORGOT_USERNAME;
        }

        this.initIssueCountry();
    }

    private buildForm(): void {
        this.verifyRefCodeForm = this.fb.group({
            'cardType': '',
            'cardId':['', [
                ValidationService.requiredValidator,
                Validators.minLength(1)
                ]
            ],
            'refCode':['', [
                ValidationService.requiredValidator,
                Validators.minLength(1)
                ]
            ],
            'idIssueCountryCode': ''
        });
    }

    onChangeCardType(valueCardType) {

        this.verifyRefCodeForm.patchValue({cardType: valueCardType});
        this.setDefaultCountryField();
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

    ngOnDestroy(){
        this.langSubscription.unsubscribe();
    }

    onChangeCountry(countryCode): void{
        //
        this.verifyRefCodeForm.patchValue({ idIssueCountryCode: countryCode });
    }

    private setDefaultCountryField(){
        // set default
        if(this.verifyRefCodeForm && this.issueCountryList.length > 0){
          let countryCode = this.verifyRefCodeForm.value.cardType == 'P' ? this.issueCountryList[0].countryCode : '';
          this.onChangeCountry(countryCode);
        }
      }

}
export interface IVerifyRefCodeComponent{
    inputVerifyRefCodeComponent: InputVerifyRefCodeComponent;
    onClickSubmitVerifyRefCode: Function;
}
export interface InputVerifyRefCodeComponent {
    screenName: string;
}