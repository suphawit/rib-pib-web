import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { LocateUsService } from '../../locate-us.service';
import { TranslateService, LangChangeEvent } from "ng2-translate/src/translate.service";
import { PermissionAction, PermissionChangeRoute } from '../../../../share/service/permission.service';
import { Subscription } from "rxjs";
import { Constants } from '../../../../share/service/constants';
import { AlertMessageComponent } from '../../../../share/component/alert-message/alert-message.component';

declare var BUILD_NUM;

@Component({
    selector: 'locateus-selector',
    templateUrl: './locate-us.html',
    providers: [LocateUsService],
})

export class RIBWebLocateUs implements OnInit, OnDestroy {
    public BUILD_NUM = BUILD_NUM;
    private result: any;
    private language: any;
    private selectedItem: string;
    private langSubscription: Subscription;

    alertConfig: {type: string,message: string, show: boolean};
    @ViewChild('alertMessage') public alertMessage:AlertMessageComponent;

    centerLat: number = 13.744670;
    centerLng: number = 100.561860;
    zoom: number = 18;
    zIndex: number = -0.1;
    latMaker: any;
    lngMaker: any;
    latMakerWindow: any;
    lngMakerWindow: any;
    detailMaker: string;
    isOpen: boolean = false;
    stringFilter: any;

    constructor(private permissionAction: PermissionAction,
        private locateUsService: LocateUsService,
        public permissionChangeRoute: PermissionChangeRoute,
        private translateService: TranslateService,
        public constants: Constants) {
        
    }

    ngOnInit(): void {
        this.language = this.translateService.currentLang;
        this.getLocateus();
        this.langSubscription = this.translateService.onLangChange
        .subscribe((event: LangChangeEvent) => {
            this.selectedLanguageEventHandler(event.lang);
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

    selectedLanguageEventHandler(language: any) {
        this.language = language;
        this.getLocateus();
    }

    getLocateus() {
        this.locateUsService.setLanguage(this.language);
        this.locateUsService.setActionCode("ACT_LOCATE_US");
        this.locateUsService.getLocateUs().then((objResponse: any) => {
            this.result = objResponse.responseJSON.result.value;
            if(objResponse.responseJSON.result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS){
                if (this.result.length > 0) {
                    this.initAutocomplete();
                }
            } else {
                this.alertConfig.message = objResponse.responseJSON.result.responseStatus.errorMessage;
                this.alertMessage.show();
            }
            
        }, function (error) {
            
        });

        this.stringFilter = {}
    }

    getActionCode() {
        this.permissionAction.getActionListByMenu("Home").then((value) => {
            
        }, function (error) {
            
        });
    }

    initAutocomplete() {
        var place = {
            detail: this.result[0].detail,
            location: this.result[0].location
        };

        this.detailMaker = place.detail;
        this.isOpen = true;
        this.updateAddressMap(place);
    }

    onSelect(item) {
        this.selectedItem = item.title;
        var place = {
            detail: item.detail,
            location: item.location
        };
        this.detailMaker = place.detail;
        this.isOpen = true;
        this.updateAddressMap(place);
    }

    updateAddressMap(place) {
        let lngLat = place.location.split(",");
        this.detailMaker = place.detail;
        this.centerLat = Number(lngLat[0]);
        this.centerLng = Number(lngLat[1]);
        this.latMaker = Number(lngLat[0]);
        this.lngMaker = Number(lngLat[1]);

        this.isOpen = true;
    }

    nevigateService() {
        this.permissionChangeRoute.changeRoute('SERVICES');
    }

    nevigateLogin() {
        this.permissionChangeRoute.changeRoute("HOME");
    }
}