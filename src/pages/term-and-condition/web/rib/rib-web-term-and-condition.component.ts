import { Component, ViewChild, OnInit } from '@angular/core';
import { Constants } from '../../../../share/service/constants';
import { LanguageSettingService } from '../../../main-layout/web/language-setting.service';
import { AlertMessageComponent } from '../../../../share/component/alert-message/alert-message.component';

@Component({
    selector: 'rib-web-term-and-condition',
    template: `
        <div class="portlet" [style.padding.px]="5">
            <div class="clearfix"></div>
            <h3 class="page-title">{{ label | translate }}</h3>
            <div class="row">
                <div class="col-md-12">
                    <alert-message #alertMessage [type]="alertConfig.type" [message]="alertConfig.message"></alert-message>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <terms-and-conditions (responseService)="responseServiceChecked($event)" [termAction]= "termAction" ></terms-and-conditions>
                </div>
            </div>
        </div>
    `,
})

export class RIBWebTermAndCondition implements OnInit {
    termAction: String = 'rib_term_and_con';
    label: string = 'label.termAndCondition';

    alertConfig: {type: string,message: string, show: boolean};
    @ViewChild('alertMessage') public alertMessage:AlertMessageComponent;

    constructor(private constants: Constants,
        private languageSettingService: LanguageSettingService) {
    }

    ngOnInit(): void {
        this.alertConfig = {
            type: 'danger',
            message: '', 
            show: false
        };
    }

    responseServiceChecked(response) {
        if (response.responseCode === this.constants.RESP_CODE_SUCCESS) {
        } else {
            this.alertConfig.message = response.errorMessage;
            this.alertMessage.show();
        }
    }
}