import { Constants } from '../../share/service/constants';
import { Component, OnInit} from '@angular/core';
import { PromptPayRegisterServiceMain } from './prompt-pay-register.service';
import { PermissionChangeRoute } from '../../share/service/permission.service';
import { RequestToPayService } from '../../pages/request-to-pay/request-to-pay.service';
import { qrGeneratorService } from '../../pages/qr-generator/qr-generator.service';
import { TranslateService } from "ng2-translate/src/translate.service";

@Component({
    selector: 'prompt-pay-account-detail',
    templateUrl: './prompt-pay-account-detail.html'
})
// Component class
export class PromptPayAccountDetailComponent implements OnInit {
    private selectAccount: Object = {};
    alertConfig: { title: string, type: string, message: string, show: boolean, option: any };

    constructor(protected constants: Constants,
        protected promptPayRegisterServiceMain: PromptPayRegisterServiceMain,
        protected permissionChangeRoute: PermissionChangeRoute,
        protected requestToPayService: RequestToPayService,
        protected qrGeneratorService: qrGeneratorService,
        protected translateService: TranslateService) {
    }

    ngOnInit(): void {
        this.alertConfig = {
            title: '',
            type: 'danger',
            message: '',
            show: false,
            option: {}
        };
        if(this.promptPayRegisterServiceMain.PromptPayAccountDetail != undefined){
            this.selectAccount = this.promptPayRegisterServiceMain.PromptPayAccountDetail;
        }
        
    }
    OnMenuClick($event){
        this.permissionChangeRoute.prevUrl = '/prompt-pay-detail';
        if($event === this.constants.PORTLETS_MENU_DATA.CREATERTP){
            this.requestToPayService.setcreateRTPObj(this.selectAccount);
            this.permissionChangeRoute.changeRoute('MY_RTP.ADD');
        }else if($event === this.constants.PORTLETS_MENU_DATA.QRGEN){
            this.qrGeneratorService.setQRCodeData(this.selectAccount)
            this.permissionChangeRoute.changeRoute('QR_GENERATOR');
        }else if($event === this.constants.PORTLETS_MENU_DATA.EDIT){
            this.permissionChangeRoute.changeRoute('MY_KK_PROMPTPAY.EDIT');
        }
    }
}

