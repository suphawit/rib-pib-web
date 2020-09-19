 import { MyAccountService } from '../../pages/my-account/my-account.service';
import { PermissionAction } from '../../share/service/permission.service';
import { Constants } from '../../share/service/constants';
import { PermissionChangeRoute } from '../../share/service/permission.service';
import { ViewChild } from '@angular/core';
import { AlertMessageComponent } from '../../share/component/alert-message/alert-message.component';
import { FundTransferService } from '../../share/service/fund-transfer.service';
import { MessageModalComponent } from '../../share/component/modal-messages.component';
import { TranslateService } from 'ng2-translate';

export class MyAccountAddEdit {
    
    public style: string;
    
    public currentStepWizard: number;
    public myAccountAddEditTitle: string;

    public isAdd: boolean;
    public isBack: boolean = true;
    
    public newAccountAfterFund: any;

    alertConfig: {type: string,message: string, show: boolean};
    submitted:boolean = false;
    @ViewChild('alertMessage') public alertMessage:AlertMessageComponent;
    @ViewChild('messageModal') public messageModal:MessageModalComponent;
    messageModalData: {title: string; body:string; size: string; config:any; action:any; };

    constructor(
        public permissionChangeRoute: PermissionChangeRoute,
        public myAccountService: MyAccountService,
        public fundTransferService: FundTransferService,
        public permissionAction: PermissionAction,
        public constants:Constants,
        public translate: TranslateService) {
    }
 
    public init(): void {
        
        this.currentStepWizard = 0;
        this.alertConfig = {
			type: 'danger',
			message: '', 
			show: false
		};
        this.myAccountService.alertConfig = undefined;

        this.messageModalData = {
            title: '',
            body: this.translate.instant('lbl.askNewAccountNumber'),
            size: 'md',
            config: { isShowCancelBtn: false },
            action: {}
        };
    }

    verifyAddMyAccount(obj: any) {
        this.myAccountService.invokeServices(this.constants.REQ_ACTION_CODE.MY_ACCOUNT_ADD, this.constants.REQ_PROCEDURE_NAME.MY_ACCOUNT_ADD, obj).then((result : any) => {
            if (result.responseJSON.result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                let data = result.responseJSON.result.value;
                this.myAccountService.newMyAccountData = data;
                if (typeof this.newAccountAfterFund !== 'undefined') {
                    this.myAccountService.newMyAccountData.txnId = typeof this.newAccountAfterFund.txnId !== 'undefined'? this.newAccountAfterFund.txnId: '';
                    this.myAccountService.newMyAccountData.refTxnId = typeof this.newAccountAfterFund.refTxnId !== 'undefined'? this.newAccountAfterFund.refTxnId: '';
                    this.fundTransferService.newAccountAfterFund.aliasName = typeof data.myAccountAliasName !== 'undefined'?data.myAccountAliasName:'';
                }

                //this.permissionChangeRoute.changeRoute('MY_DEPOSITS.ADD_CONFIRM');

                this.showToAskNewAccountNumber(data);
            } else {
                this.alertConfig.message = result.responseJSON.result.responseStatus.errorMessage;
                this.alertMessage.show();

            }
        }, function (error) {

        });

    }

    verifyEditMyAccount() {
        this.permissionChangeRoute.changeRoute('MY_DEPOSITS.EDIT_CONFIRM');
    }

    resetMyAccountObject() {
        this.myAccountService.newMyAccountData = undefined;
    }
    
    onClickBack() {
        let menuCode = 'DASHBOARD';
        if(this.style === this.constants.STYLE_PIB_WEB){
            menuCode = 'MY_DEPOSITS';
        }
        this.myAccountService.alertConfig = undefined;
        this.permissionChangeRoute.changeRoute(menuCode);
    }

    public getStyle() : string {
        return this.style;
    }

    public setStyle(style: string) {
        this.style = style;
    }

    public getCurrentStepWizard() : number {
        return this.currentStepWizard;
    }

    public setCurrentStepWizard(currentStepWizard: number) {
        this.currentStepWizard = currentStepWizard;
    }

    public getMyAccountAddEditTitle() :string {
        return this.myAccountAddEditTitle;
    }

    public setMyAccountAddEditTitle(myAccountAddEditTitle : string) {
        this.myAccountAddEditTitle = myAccountAddEditTitle;
    }

    public gotoMyAccountConfirm(){
        this.permissionChangeRoute.changeRoute('MY_DEPOSITS.ADD_CONFIRM');
    }

    private showToAskNewAccountNumber(account:any){
        if(!account.myAccountNumberOld){
            this.permissionChangeRoute.changeRoute('MY_DEPOSITS.ADD_CONFIRM');
        } else {
            this.messageModalData = {
                title: '',
                body: account.myAccountNumberOld + ' ' + this.translate.instant('lbl.askNewAccountNumber') + ' ' + account.myAccountNumber,
                size: 'md',
                config: { isShowOKBtn: true, isShowCancelBtn: false },
                action: {}
            };
            this.messageModal.show();
        }
        
    }

    public onModalHidden():void {
        this.permissionChangeRoute.changeRoute('MY_DEPOSITS.ADD_CONFIRM');
    }

    onEmit($event) {
        if($event === 'ok'){
            this.messageModal.hide();
        }
    }
}


