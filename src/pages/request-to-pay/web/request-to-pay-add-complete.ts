import { Constants } from '../../../share/service/constants';
import { OnInit, OnDestroy } from '@angular/core';
import { PermissionChangeRoute, PermissionService } from '../../../share/service/permission.service';
import { RequestToPayService } from '../request-to-pay.service';
import { AnyIDTypeBean } from '../../../share/bean/anyid-type-bean';

export class RTPComplete implements OnInit, OnDestroy {

    menuCode: any;
    authorized: any;
    private createRTPObj: any;
    settings: any = [];
    private fromAccount = {
    //aliasName : '',
    accNo : '',
    anyIDValue : '',
    anyIDType : new AnyIDTypeBean,
    accDisplay: ''
    };
    private toAccount = {
    aliasName : '',
    accName: '',
    anyIDValue : '',
    anyIDType : new AnyIDTypeBean,
    accDisplay: ''
    };
    type: string;
    message: string;
    constructor(
        public constants: Constants,
        public permissionChangeRoute: PermissionChangeRoute,
        public permissionService: PermissionService,
        public requestToPayService: RequestToPayService
    ) { }

    ngOnInit(): void {
        this.authorized = {
            newCreateRTP: this.permissionService.getActionCode().CREATE_RTP
        };
        this.menuCode = {
            dashboard: this.settings.styleClass == this.constants.STYLE_RIB_WEB ? "DASHBOARD" : "MY_DEPOSITS",
            createRTP: 'MY_RTP.ADD'
        }

        let getcreateRTPObjSuccess :any = this.requestToPayService.getcreateRTPObj();
        this.fromAccount = {
           // aliasName : getcreateRTPObjSuccess.fromAccountAliasName,
            accNo : getcreateRTPObjSuccess.fromAccountNo,
            anyIDValue : getcreateRTPObjSuccess.fromAnyIdValue,
            anyIDType : getcreateRTPObjSuccess.fromAnyIdTypeBean,
            accDisplay: ''
        };
        this.toAccount = {
            aliasName : getcreateRTPObjSuccess.toAccountAliasName,
            accName: getcreateRTPObjSuccess.toAccountAcctName,
            anyIDValue : getcreateRTPObjSuccess.toAnyIdValue,
            anyIDType : getcreateRTPObjSuccess.toAnyIdTypeBean,
            accDisplay: ''
        };
        let accDisplayFromAcc = this.getAccountDisplay(this.fromAccount);
        let accDisplayToAcc = this.getAccountDisplay(this.toAccount);

        this.fromAccount.accDisplay = accDisplayFromAcc;
        this.toAccount.accDisplay = accDisplayToAcc;

        this.createRTPObj = {
            fromAccount: this.fromAccount,
            amount: getcreateRTPObjSuccess.amount,
            memo: getcreateRTPObjSuccess.memo,
            toAccount: this.toAccount,
            transactionDate: getcreateRTPObjSuccess.transactionDate,
            rtpRefNo: getcreateRTPObjSuccess.rtpRefNo
        }
    }

    ngOnDestroy(): void {
        this.requestToPayService.setcreateRTPObj(null);
    }



    addToAccount(createRTPObj) {
        // let destAccount = transferObj.destAccount;
        // destAccount.email = transferObj.notifyEmail;
        // destAccount.mobileNo = transferObj.notifyMobileNo;
        // destAccount.notifyLang = transferObj.notifyLang;
        // this.fundTransferService.newAccountAfterFund = destAccount;
        
        // if (transferObj.addAccountType === 'OTHER_ACCOUNT') {
        //     this.permissionChangeRoute.changeRoute('OTHER_ACCOUNTS.add1');
        // } else {
        //     this.permissionChangeRoute.changeRoute('ADD_MY_ACCOUNT');
        // }
    }

    public getAccountDisplay(data): string {
        let anyIDTypeDesc = '';
        if (typeof data.anyIDType.anyIDType !== "undefined") {
            anyIDTypeDesc = data.anyIDType.desc;
        }

        if (data.accName != null && data.accName != '' ) {
            return data.accName + '<br />' + anyIDTypeDesc + '<br />' + '(' + data.anyIDValue + ')' + '<br />';
        }
          return (data.accNo !== undefined)? anyIDTypeDesc + '<br />' + '(' + data.anyIDValue + ')' + '<br />' + data.accNo :  anyIDTypeDesc + '<br />' + '(' + data.anyIDValue + ')';
    }

    navigateTo(menuCode): void {
        this.permissionChangeRoute.changeRoute(menuCode);
    }
}