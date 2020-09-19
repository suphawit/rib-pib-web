import { Constants } from '../../share/service/constants';
import { TranslateService } from "ng2-translate/src/translate.service";
import { Component, OnInit, Input, OnChanges, ViewChild} from '@angular/core';
import { MasterDataService } from '../../share/service/master-data.service';
import { RequestToPayService } from '../../pages/request-to-pay/request-to-pay.service';
import { PromptPayRegisterServiceMain } from './prompt-pay-register.service';
import { PermissionChangeRoute } from '../../share/service/permission.service';
import { AlertMessageComponent } from '../../share/component/alert-message/alert-message.component';
@Component({
    selector: 'prompt-pay-account-list',
    templateUrl: './prompt-pay-account-list.html'
})
export class PromptPayAccountListComponent implements OnInit, OnChanges{
    currentAccount: Object = {};
    accountLists: Array<ArrayConstructor> = [];
    alertConfig: { title: string, type: string, message: string, show: boolean, option: any };
    private isShowRegisterKKPromptPayLink: boolean = false;
    @Input('options') FromDashBoardOptions: {
        isFromDashBoard: boolean, 
        DashBoardData: {
            accountList: Array<ArrayConstructor>
        }
    };
    @ViewChild('alertMessage') public alertMessage: AlertMessageComponent;
    constructor(public constants: Constants,
        public translateService: TranslateService,
        public masterDataService: MasterDataService,
        public requestToPayService: RequestToPayService,
        private promptPayRegisterServiceMain: PromptPayRegisterServiceMain,
        public permissionChangeRoute: PermissionChangeRoute) {
    }

    ngOnInit(): void {
        this.alertConfig = {
                title: '',
                type: 'danger',
                message: '',
                show: false,
                option: {}
        };
        //check if it call from dashboard page  
        this.FromDashBoardOptions = this.FromDashBoardOptions || {
            isFromDashBoard: false,
            DashBoardData:{
                accountList:[]
            }
        }
     
        if(!this.FromDashBoardOptions.isFromDashBoard){
            this.masterDataService.getAllAnyIDTypes().then((result: any) => {
                let anyIDTypes = result;
                for(let i in anyIDTypes){
                    if (anyIDTypes[i].anyIDType === this.constants.ANYID_TYPE_BANK_ACCOUNT) {
                        delete anyIDTypes[i];
                    }
                }
                this.requestToPayService.inquiryRequestToPayAnyIdMy(anyIDTypes).then((result: any) => {
                    if(result.errorMessage === undefined){
                        this.accountLists = result;
                        this.currentAccount = this.accountLists[0] || {};
                    } else if(result.responseCode == 'RIB-E-ANY019'){ 
                        this.alertConfig.message = result.errorMessage;
                        this.isShowRegisterKKPromptPayLink = true;
                    } else {
                        this.alertConfig.message = result.errorMessage;
                        this.alertMessage.show();
                    }
                });
            });
        }
       
    }

    ngOnChanges(changes: any): void{
        this.accountLists = changes.FromDashBoardOptions.currentValue.DashBoardData.accountList || [];
        this.currentAccount = this.accountLists[0] ||{};
    }

    onClickSelectAccount(account) {
        this.currentAccount = account;
    }

    isHighlighted(account, currentAccount) {
        return currentAccount != null ? account.anyIDValue === currentAccount.anyIDValue : false;
    }

    viewPromptpayAccountDetail(){
        this.promptPayRegisterServiceMain.PromptPayAccountDetail = this.currentAccount;
        this.permissionChangeRoute.changeRoute('MY_KK_PROMPTPAY.DETAIL');
    }
}

