import { OnInit, Component, OnDestroy } from '@angular/core';
import { PrivacyPolicy } from '../../privacy-policy';
import { Constants } from '../../../../share/service/constants';
import { GetinformationService } from '../../../../share/service/getInformation.service';
import { PermissionService } from '../../../../share/service/permission.service';
import { TranslateService, LangChangeEvent } from "ng2-translate/src/translate.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'privacy-policy-selector',
    templateUrl: './privacy-policy.html'
})
export class RIBWebPrivacyPolicy extends PrivacyPolicy implements OnInit, OnDestroy  {
    private lang: any;
    private langSubscription: Subscription;

    constructor(public getinformationService: GetinformationService,
        public constants: Constants,
        public permissionService: PermissionService,
        public translateService: TranslateService) {
        super(getinformationService, constants, permissionService, translateService);
    }

    ngOnInit(): void {
        this.lang = this.translateService.currentLang;
        this.langSubscription = this.translateService.onLangChange
        .subscribe((event: LangChangeEvent) => {
            this.selectedLanguageEventHandler(event.lang);
        });

        this.getPrivacyPolicy();
    }

    ngOnDestroy(): void {
        this.langSubscription.unsubscribe();
    }

    selectedLanguageEventHandler(language: any): void {
        this.lang = language;
        this.getPrivacyPolicy();
    }
}