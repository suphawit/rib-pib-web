import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ServicesService } from '../../services.service'
import { Constants } from '../../../../share/service/constants';
import { PermissionAction } from '../../../../share/service/permission.service';
import { TranslateService, LangChangeEvent } from "ng2-translate/src/translate.service";
import { Subscription } from "rxjs";
import { AlertMessageComponent } from '../../../../share/component/alert-message/alert-message.component';

@Component({
    selector: 'services-selector',
    templateUrl: 'services.html',
    providers: [ServicesService]
})

export class RIBWebServices implements OnInit, OnDestroy {
    private result: any;
    private language: any;
    private langSubScription: Subscription;

    alertConfig: {type: string,message: string, show: boolean};
    @ViewChild('alertMessage') public alertMessage:AlertMessageComponent;

    constructor(private permissionAction: PermissionAction,
        private servicesService: ServicesService,
        public constants: Constants,
        private translateService: TranslateService) {

    }

    ngOnInit(): void {
        this.language = this.translateService.currentLang;
        this.langSubScription = this.translateService.onLangChange
        .subscribe((event: LangChangeEvent) => {
            this.selectedLanguageEventHandler(event.lang);
        });

        this.getServices();

        this.alertConfig = {
            type: 'danger',
            message: '', 
            show: false
        };
    }

    ngOnDestroy(): void {
        this.langSubScription.unsubscribe();
    }

    selectedLanguageEventHandler(language: any): void {
        this.language = language;
        this.getServices();
    }

    getServices() {
        this.servicesService.setActionCode(this.constants.REQ_ACTION_CODE.RBAC_GET_INFORMATION_SERVICE);
        this.servicesService.setLanguage(this.language);
        this.servicesService.getServices().then((objResponse: any) => {

            if (objResponse.responseJSON.result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                this.result = objResponse.responseJSON.result.value.data;
                // this.childModal.hide();
                //
            } else {
                this.alertConfig.message = objResponse.responseJSON.result.responseStatus.errorMessage;
                this.alertMessage.show();
            }
        }, function (error) {

        });
    }
}