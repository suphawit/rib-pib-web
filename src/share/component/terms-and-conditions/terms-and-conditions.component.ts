import { Constants } from '../../service/constants';
import { ResponseStatusBean } from '../../bean/response-status-bean';
import { TermsAndConditionsService } from './terms-and-conditions.service';
import { PermissionAction } from '../../../share/service/permission.service';
import { Component, Input, Output, EventEmitter, OnInit, NgZone, OnDestroy } from '@angular/core';
import { TranslateService, LangChangeEvent } from "ng2-translate/src/translate.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'terms-and-conditions',
    templateUrl: './terms-and-conditions.html',
    providers: [TermsAndConditionsService]
})
// Component class
export class TermsAndConditionsComponent implements OnInit, OnDestroy{
    data: any = '';
    private langSubscription: Subscription;

    @Input('Style') Style: string;
    @Input('termAction') termAction: string;
    @Output('responseService') responseService = new EventEmitter();

    constructor(public permissionAction: PermissionAction,
        public termsAndConditionsService: TermsAndConditionsService,
        public constants: Constants,
        public translateService: TranslateService,
        private zone: NgZone
    ) {
    }

    ngOnInit(): void {
        this.init();
        this.langSubscription =  this.translateService.onLangChange
        .subscribe((event: LangChangeEvent) => {
            this.selectedLanguageEventHandler(event.lang)
        });
    }

    ngOnDestroy(): void {
        this.langSubscription.unsubscribe();
    }

    private init(): void {
        this.zone.run(() => {
            this.getTermsAndConditionsService();
        });
    }

    getTermsAndConditionsService() {
        this.termsAndConditionsService.setActionCode(this.constants.REQ_ACTION_CODE.RBAC_GET_INFORMATION_SERVICE);
        this.termsAndConditionsService.setTermAction(this.termAction);
        let responseService = this.responseService;

        this.termsAndConditionsService.getTermsAndConditionsService().then((objResponse: any) => {
            let result = objResponse.responseJSON.result;
            let responseStatus = new ResponseStatusBean(result.responseStatus.responseCode, result.responseStatus.responseMessage, result.responseStatus.errorMessage);

            if (responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                this.data = result.value.data;

            }

            responseService.emit(new ResponseStatusBean(responseStatus.responseCode, responseStatus.responseMessage, responseStatus.errorMessage));
        }, function (error) {
            responseService.emit('error');
        });
    }

    selectedLanguageEventHandler(language: any): void {
        this.getTermsAndConditionsService();
    }
}
