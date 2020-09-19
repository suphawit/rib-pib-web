import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FaqService } from '../../faq.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Constants } from '../../../../share/service/constants';
import { PermissionAction } from '../../../../share/service/permission.service';
import { TranslateService, LangChangeEvent } from "ng2-translate/src/translate.service";
import { Subscription } from "rxjs";
import { AlertMessageComponent } from '../../../../share/component/alert-message/alert-message.component';

@Component({
    selector: 'faq-selector',
    templateUrl: './faq.html',
    providers: [FaqService],
})
export class RIBWebFAQ implements OnInit, OnDestroy{
    private result: any;
    private language: any;
    private langSubscription: Subscription;

    alertConfig: {type: string,message: string, show: boolean};
    @ViewChild('alertMessage') public alertMessage:AlertMessageComponent;

    constructor(private permissionAction: PermissionAction,
        private faqService: FaqService,
        public Constants: Constants,
        private translateService: TranslateService,
        private sanitizer: DomSanitizer) {
    }

    ngOnInit(): void {
        this.language = this.translateService.currentLang;
        this.langSubscription = this.translateService.onLangChange
        .subscribe((event: LangChangeEvent) => {
            this.selectedLanguageEventHandler(event.lang);
        });

        this.getFaqService();

        this.alertConfig = {
            type: 'danger',
            message: '', 
            show: false
        };
    }

    ngOnDestroy(): void {
        this.langSubscription.unsubscribe();
    }

    selectedLanguageEventHandler(language: any): void {
        this.language = language;
        this.getFaqService();
    }

    getFaqService() {
        this.faqService.setActionCode(this.Constants.REQ_ACTION_CODE.RBAC_GET_INFORMATION_SERVICE);
        this.faqService.setLanguage(this.language);
        this.faqService.getFaq().then((objResponse: any) => {
            if(objResponse.responseJSON.result.responseStatus.responseCode === this.Constants.RESP_CODE_SUCCESS){
                this.result = '<accordion [closeOthers]="true">' + objResponse.responseJSON.result.value.data + '</accordion>';
            } else {
                this.alertConfig.message = objResponse.responseJSON.result.responseStatus.errorMessage;
                this.alertMessage.show();
            }
        }, function (error) {

        });
    }
}