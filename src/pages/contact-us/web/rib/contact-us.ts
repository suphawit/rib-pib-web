import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ContactUsService } from '../../contact-us.service';
import { PermissionService } from '../../../../share/service/permission.service';
import { TranslateService, LangChangeEvent } from "ng2-translate/src/translate.service";
import { LanguageSettingService } from '../../../../pages/main-layout/web/language-setting.service';
import { Subscription } from "rxjs";
import { Constants } from '../../../../share/service/constants';
import { AlertMessageComponent } from '../../../../share/component/alert-message/alert-message.component';

@Component({
    selector: 'page-contact-us',
    template: `
        <div class="portlet" [style.padding.px]="5">
            <div class="clearfix"></div>
            <h3 class="page-title">{{ 'lbl.contactUs' | translate }}</h3>
            <div class="row">
                <div class="col-md-12">
                    <alert-message #alertMessage [type]="alertConfig.type" [message]="alertConfig.message"></alert-message>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12" [style.padding-top.px]="10">
                    <div [innerHTML]="result"></div>
                </div>
            </div>
        </div>
    `,
    providers: [ContactUsService]
})
export class RIBWebContactUs implements OnInit,OnDestroy {
    public actionCode;
    private result: any;
    private langSubscription: Subscription;

    alertConfig: {type: string,message: string, show: boolean};
    @ViewChild('alertMessage') public alertMessage:AlertMessageComponent;

    constructor(private permissionService: PermissionService,
        private contactUsService: ContactUsService,
        public languageSettingService: LanguageSettingService,
        public translateService: TranslateService,
        public constants: Constants) {
        
    }

    ngOnInit(): void {
        this.getContactus(this.translateService.currentLang);

        this.langSubscription = this.translateService.onLangChange
        .subscribe((event: LangChangeEvent) => {
            this.selectedLanguageEventHandler(event.lang)
        });

        this.alertConfig = {
            type: 'danger',
            message: '', 
            show: false
        };
    }

    ngOnDestroy(): void {
        this.langSubscription.unsubscribe();
    }

    private getContactus(lang): void {
        this.contactUsService.setActionCode("ACT_CONTACT_US");
        this.contactUsService.getcontactUs(lang).then((objResponse: any) => {
            if(objResponse.responseJSON.result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS){
                this.result = objResponse.responseJSON.result.value.data;
            } else {
                this.alertConfig.message = objResponse.responseJSON.result.responseStatus.errorMessage;
                this.alertMessage.show();
            }
        }, function (error) {
            
        });
    }

    private selectedLanguageEventHandler(language: any) {
        this.getContactus(language);
    }
}