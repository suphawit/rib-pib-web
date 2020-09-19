import { ViewChild } from '@angular/core';
import { Constants } from '../../share/service/constants';
import { PermissionChangeRoute } from '../../share/service/permission.service';
import { PromptPayRegisterServiceMain } from '../../pages/prompt-pay/prompt-pay-register.service';
import { AlertMessageComponent } from '../../share/component/alert-message/alert-message.component';
import { MasterDataService } from '../../share/service/master-data.service';
import { AnyIDTypeBean } from '../../share/bean/anyid-type-bean';

export class PromptPayEditCompleteComponent {
    public message: string = '';
    public type: string = 'danger';
    public completeEditPromptPayAccount: any;
    public anyIDTypes: any;
    public responseStatusFromConfirmEditPromptPay: any;

    @ViewChild('alertMessage') public alertMessage: AlertMessageComponent;

    constructor(public constants: Constants,
        public promptPayRegisterServiceMain: PromptPayRegisterServiceMain,
        public permissionChangeRoute: PermissionChangeRoute,
        public masterDataService: MasterDataService) {
    }

    ngOnInit(): void {
        this.completeEditPromptPayAccount = this.promptPayRegisterServiceMain.EditAnyIDData.value;
        this.responseStatusFromConfirmEditPromptPay =  this.promptPayRegisterServiceMain.EditAnyIDData.responseStatus;
        
        this.inquiryAnyIDObjectForDisplay(this.completeEditPromptPayAccount.anyIDType);

        this.promptPayRegisterServiceMain.EditAnyIDData = undefined;
    }

    inquiryAnyIDObjectForDisplay(anyIDType){
        this.masterDataService.getAllAnyIDTypes().then((result: any) => {
            this.anyIDTypes = result;
            this.completeEditPromptPayAccount.anyIDType =  this.anyIDTypes[anyIDType] || new AnyIDTypeBean();
        });     
    }

    changeRoute(menuCode): void {
        this.permissionChangeRoute.changeRoute(menuCode);
    }
}
