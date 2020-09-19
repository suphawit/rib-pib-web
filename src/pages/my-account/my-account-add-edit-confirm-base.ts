import { MyAccountService } from '../../pages/my-account/my-account.service';
import { PermissionAction } from '../../share/service/permission.service';
import { Constants } from '../../share/service/constants';
import { PermissionChangeRoute } from '../../share/service/permission.service';
import { ViewChild } from '@angular/core';
import { AlertMessageComponent } from '../../share/component/alert-message/alert-message.component';

export class MyAccountAddEditConfirmBase {

    public style: string;
    
    public currentStepWizard: number;
    public myAccountAddEditTitle: string;

    private _myAccount: any;

    private _verifyOTPStyle: string;
    private _verifyOTPAction: string;

    private _verifyOTPObj: any;
    private _otpPass: string = '';

    public isAdd: boolean;

    public isRequestOTP: boolean = false;
    private _isRequireOTP: boolean = true;

    public responseCodeMainService : string = '';

    alertConfig: {title: string, type: string,message: string, show: boolean, option: any};
    @ViewChild('alertMessage') public alertMessage:AlertMessageComponent;

    constructor(
        public permissionChangeRoute: PermissionChangeRoute,
        public myAccountService: MyAccountService,
        public permissionAction: PermissionAction,
        public constants:Constants ) {
    }

    public init():void {
        this.setCurrentStepWizard(1);
        if(typeof this.myAccountService.newMyAccountData !== 'undefined'){
            this.myAccount = this.myAccountService.newMyAccountData;
        } else {

            this.permissionChangeRoute.changeRoute('DASHBOARD');
        }
        this.verifyOTPStyle = this.getStyle();
        this.verifyOTPAction = this.constants.ACTION_CODE_ADD_MY_ACCOUNT;
        this.alertConfig = {
            title: '',
			type: 'danger',
			message: '', 
			show: false,
            option: {}
		};
        if(this.myAccountService.isAccountAfterTransfer){
            // pass thru
            this.isRequireOTP = this.myAccountService.newMyAccountData.requireOtp;
            if (this.isRequireOTP) {
                this.isRequestOTP = false;
            } else {
                this.isRequestOTP = true;
            }

        }
    }

    onRequestOTP(result: any) {
        this.isRequestOTP = true;


        if (typeof result.responseCode === "undefined") {
            this.verifyOTPObj = result;
            
            this.alertConfig.message = '';
            this.alertMessage.hide();
        } else {
            this.alertConfig.message = result.errorMessage;
            this.alertMessage.show();
        }
    }

    onkeyupOtpPass(otpPass: any) {
        this.otpPass = otpPass;

    }

    myAccountSubmit() {

        if (this.isAdd) {
            if(typeof this.otpPass === 'undefined'){
                this.alertConfig.message = 'error.not.input.otp';
                this.alertMessage.show();
                return;
            }
            let objMyAccount: any = {
                referenceNO:        this.verifyOTPObj.otpRefcode,
                tokenOTPForCAA:     this.verifyOTPObj.tokenOtp,
                otp:                this.otpPass,
                myCustomerAccount: {
                    myAccountID:        this.myAccountService.newMyAccountData.myAccountID,
                    myAccountAliasName: this.myAccountService.newMyAccountData.myAccountAliasName,
                    myAccountNumber:    this.myAccountService.newMyAccountData.myAccountNumber,
                    myAccountstatus:    this.myAccountService.newMyAccountData.myAccountstatus,
                    accountType:        this.myAccountService.newMyAccountData.accountType,
                    accountStatus:      this.myAccountService.newMyAccountData.accountStatus,
                    productID:          this.myAccountService.newMyAccountData.productID
                }
            };
            this.addMyAccountSubmit(objMyAccount);
        } else {
            let objMyAccount: any = {
                myAccountID: this.myAccountService.newMyAccountData.myAccountID,
                myAccountAliasName: this.myAccountService.newMyAccountData.myAccountAliasName
            }
            this.editMyAccountSubmit(objMyAccount);
        }
    }

    addMyAccountSubmit(obj:any) : any {
        this.responseCodeMainService = '';
        this.myAccountService.invokeServices(this.constants.REQ_ACTION_CODE.MY_ACCOUNT_ADD_SUBMIT, this.constants.REQ_PROCEDURE_NAME.MY_ACCOUNT_ADD_SUBMIT, obj ).then((result:any) => {
            if (result.responseJSON.result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                let alertConfig = {
                    title: 'label.Success',
                    type: 'success',
                    message: 'label.addMyAccountSuccess', 
                    show: true,
                    option: {myAccountNumber: this.myAccountService.newMyAccountData.myAccountNumber}
                }
                this.myAccountService.alertConfig = alertConfig;
                this.resetMyAccountObject();
                this.permissionChangeRoute.targetAction = 'MY_DEPOSITS';
                this.permissionChangeRoute.changeRoute('MY_DEPOSITS');
            } else {
                if (result.responseJSON.result.responseStatus.responseCode === this.constants.RESP_CODE_REQ_OTP_AGAIN){
                    this.isRequestOTP = false;
                }
                this.responseCodeMainService = result.responseJSON.result.responseStatus.responseCode;
                this.otpPass = '';
                this.alertConfig.message = result.responseJSON.result.responseStatus.errorMessage;
                this.alertMessage.show();
            }
        }, function (error) {

        });
    }

    editMyAccountSubmit(obj: any) {
        this.myAccountService.invokeServices(this.constants.REQ_ACTION_CODE.MY_ACCOUNT_EDIT, this.constants.REQ_PROCEDURE_NAME.MY_ACCOUNT_EDIT, obj).then((result : any) => {
            if (result.responseJSON.result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                let alertConfig = {
                    title: 'label.Success',
                    type: 'success',
                    message: 'label.editMyAccountSuccess', 
                    show: true,
                    option: {myAccountNumber: this.myAccountService.newMyAccountData.myAccountNumber}
                }
                this.myAccountService.alertConfig = alertConfig;
                this.resetMyAccountObject();
                this.permissionChangeRoute.changeRoute('MY_DEPOSITS');
            } else {
                this.alertConfig.message = result.responseJSON.result.responseStatus.errorMessage;
                this.alertMessage.show();
            }
        }, function (error) {

        });
    }

    onClickBack() {
        if (this.isAdd) {
            this.permissionChangeRoute.targetAction = 'MY_DEPOSITS.ADD';
            this.permissionChangeRoute.changeRoute('MY_DEPOSITS.ADD');
        } else {
            this.permissionChangeRoute.changeRoute('MY_DEPOSITS.EDIT');
        }
    }

    onModalHidden() {
        this.myAccountService.newMyAccountData = undefined;
        this.permissionChangeRoute.changeRoute('MY_DEPOSITS');
    }

    resetMyAccountObject() {
        this.myAccountService.newMyAccountData = undefined;
    }

    get myAccount() : any {
        return this._myAccount;
    }

    set myAccount(myAccount: any) {
        this._myAccount = myAccount;
    }

    get verifyOTPAction():string {
        return this._verifyOTPAction;
    }

    set verifyOTPAction(verifyOTPAction: string) {
        this._verifyOTPAction = verifyOTPAction;
    }

    get verifyOTPStyle() : string {
        return this._verifyOTPStyle;
    }

    set verifyOTPStyle(verifyOTPStyle:string) {
        this._verifyOTPStyle = verifyOTPStyle;
    }

    get verifyOTPObj(): any {
        return this._verifyOTPObj;
    }

    set verifyOTPObj(verifyOTPObj: any) {
        this._verifyOTPObj = verifyOTPObj;
    }

    get otpPass() : string {
        return this._otpPass;
    }

    set otpPass(otpPass: string) {
        this._otpPass = otpPass;
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
    
    get isRequireOTP() : boolean {
        return this._isRequireOTP;
    }

    set isRequireOTP(flag: boolean) {
        this._isRequireOTP = flag;
    }

    public addSubmitWithoutOTP(){
      let myAccountData = this.myAccountService.newMyAccountData;
      this.myAccountService.requestAddSubmitWithoutOTP(myAccountData).then((result: any) => {
        let tmpresult = result.responseJSON.result;

        if(tmpresult.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS){
            let alertConfig = {
                title: 'label.title.addMyAccountSuccess',
                type: 'success',
                message: 'label.addMyAccountSuccess', 
                show: true,
                option: {myAccountNumber: this.myAccountService.newMyAccountData.myAccountNumber}
            };
            this.myAccountService.newMyAccountData = null;
            this.myAccountService.alertConfig = alertConfig;
            this.permissionChangeRoute.targetAction = 'MY_DEPOSITS';
            this.permissionChangeRoute.changeRoute('MY_DEPOSITS');
        }else{
            this.alertConfig.message = result.responseJSON.result.responseStatus.responseCode;
            this.alertMessage.show();
        }
      
      }, function (error) {

      });
  }
}
