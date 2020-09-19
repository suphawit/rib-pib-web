import { Component, ViewChild, OnInit } from '@angular/core';
import { TranslateService } from "ng2-translate/src/translate.service";
import { Constants } from '../../../share/service/constants';
import { AlertMessageComponent } from '../../../share/component/alert-message/alert-message.component';
import { PermissionService, PermissionChangeRoute } from '../../../share/service/permission.service';
import { RequestToPayService } from '../request-to-pay.service'
import { BillPaymentService } from '../../bill-payment/bill-payment.service';
import { FundTransferService } from '../../../share/service/fund-transfer.service';
import { AccountBean } from '../../../share/bean/account-bean';
import { CategoryBean } from '../../../share/bean/category-bean';
import { TransferBean } from '../../../share/bean/transfer-bean';
import { AnyIDTypeBean } from '../../../share/bean/anyid-type-bean';
import { RecurringTimeBean } from '../../../share/bean/recurring-time-bean';
import { BankCodeDataService } from '../../../share/service/bankcode-data.service';
import { MasterDataService } from '../../../share/service/master-data.service';
import { NotificationService } from "../../../share/service/notification.service";
import { ModalRTPBlockListComponent } from './modal-rtp-block-list.component';
import { ModalDeleteRTPIncomingComponent } from '../modal-delete-rtp-incoming.component';


@Component({
    selector: 'request-to-pay-list-page',
    templateUrl: './request-to-pay-list-page.html',
    providers: [RequestToPayService]
})
export class RequestToPayListPageComponent implements OnInit {
    timeline: { 
        data: {
            rawData: Array<any>,
            isAdded: boolean
        },
        title: string; 
    };
    alertConfig: { title: string, type: string, message: string, show: boolean, option: any };

    messageModalDeleteRTPData: { title: string; body: string; size: string; action: any; data: Object };
    messageModalRTPBlockListData: { title: string; body: string; size: string; action: any; accountAliasName: string, accountNumber: string, config: string };

    protected anyIDTypeList: any;
    private selectedBlockListAccount: any;

    @ViewChild('alertMessage') public alertMessage: AlertMessageComponent;

    @ViewChild('messageModalRTPBlockList') public messageModalRTPBlockList: ModalRTPBlockListComponent;

    @ViewChild('messageModalDeleteRTPIncoming') public messageModalDeleteRTPIncoming: ModalDeleteRTPIncomingComponent;

    constructor(public constants: Constants,
        public translate: TranslateService,
        public permissionService:PermissionService,
        public requestToPayService:RequestToPayService,
        public billPaymentService:BillPaymentService,
        public permissionChangeRoute:PermissionChangeRoute,
        public fundTransferService: FundTransferService,
        public bankCodeDataService: BankCodeDataService,
        public masterDataService: MasterDataService,
        public notificationService: NotificationService
        ) {    
    }

    ngOnInit(){
        this.alertConfig = {
            title: '', 
            type: '', 
            message: '', 
            show: false, 
            option: {}
        };
        this.timeline = { 
            data: {
                rawData: [],
                isAdded: false
            },
            title: ''
        };

         this.messageModalRTPBlockListData = {
            title: this.translate.instant('title.confirmBlockAccMsg'),
            body: this.translate.instant('body.confirmBlockAccMsg'),
            size: 'md',
            action: '',
            accountAliasName: '',
            accountNumber: '',
            config: 'Block'
        }
        this.messageModalDeleteRTPData = {
            title: this.translate.instant('title.confirmDeleteRTPIncomingMsg'),
            body: this.translate.instant('body.confirmDeleteRTPIncomingMsg'),
            size: 'md',
            action: '',
            data: {}
        }

        // init data
        if (this.permissionService.getMenuName()==='RTP_RECEIVE'){
            this.inquiryRequestToPay();
        }else if (this.permissionService.getMenuName()==='MY_RTP'){
            this.inquiryRequestToPayOutgoing();
        }

        this.masterDataService.getAllAnyIDTypes().then((result: any) => {
            this.anyIDTypeList = result;
        });
    }

    protected onError(responseData: any) {
        this.alertConfig.message = responseData.errorMessage;
        this.alertConfig.type = 'danger';
        this.alertMessage.show();
    }

    onActions(data: any) {
        switch(data.name){
            case 'billpayment': {
                this.permissionChangeRoute.prevUrl='/request-to-pay';
                this.payBillWithRTPReceieve(data.data);
                break;
            }
            case 'transfer': {
                let transferObj = this.populateTranferObj(data.data);
                this.fundTransferService.setTransferObj(transferObj);
                this.permissionChangeRoute.prevUrl='/request-to-pay';
                
                this.permissionChangeRoute.changeRoute('FUND_TRANSFER');
                break;
            }
             case 'rtpblocklist': {
                this.messageModalRTPBlockListData.accountAliasName = data.data.requesterAccountName;
                this.messageModalRTPBlockListData.accountNumber = data.data.requesterIdValue;

                this.selectedBlockListAccount =  data.data;
                this.messageModalRTPBlockList.show();
                break;
            }
             case 'delete': {

                this.messageModalDeleteRTPData.data = data.data;
                this.messageModalDeleteRTPIncoming.show();
                break;
            }
            default:
                break;
            }
    }

    protected inquiryRequestToPay(){
        this.requestToPayService.inquiryRequestToPay().then((result: any) => {
            let tmpresult = result.responseJSON.result;
            if (tmpresult.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {               
                this.notificationService.updateBadgeMenuCount()
                this.timeline.data = {
                    rawData: tmpresult.value.rtpInfoDetailList,
                    isAdded: false
                };

            } else {
                this.onError(tmpresult.responseStatus);
            }

        }, function (error) {

        });
    }

    protected inquiryRequestToPayOutgoing(){
        this.requestToPayService.inquiryRequestToPayOutgoing().then((result: any) => {
            let tmpresult = result.responseJSON.result;
            if (tmpresult.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
            
                this.timeline.data = {
                    rawData: tmpresult.value.rtpInfoDetailList,
                    isAdded: false
                };

            } else {
                this.onError(tmpresult.responseStatus);
            }

        }, function (error) {

        });
    }



    protected populateTranferObj(data: any): TransferBean {


        let category = new CategoryBean();
        category.catId = -1;
        let anyIDType = this.anyIDTypeList[data.requesterIdType] || new AnyIDTypeBean();

        let recurringTime = new RecurringTimeBean();
        recurringTime.time = 0;
        recurringTime.desc = '';

        let destAccount = new AccountBean();
        destAccount.accId = -1;
        destAccount.accNo = data.requesterIdValue;
        destAccount.accName = data.requesterAccountName;
        destAccount.aliasName = "";
        destAccount.category = category;
        destAccount.anyIDType = anyIDType;

        let transferObj = new TransferBean();
        transferObj.srcAccount = new AccountBean();
        transferObj.destAccount = destAccount;
        transferObj.rtpReferenceNo = data.rtpreference;
        transferObj.transferAmount = data.amount;
        transferObj.recurringType = this.constants.RECURRING_TYPE_NO;
        transferObj.editType = '0';
        transferObj.note = data.additionalNote;


        return transferObj;
    }

    private gotoAddRequestToPayPage(){
        this.permissionChangeRoute.changeRoute('MY_RTP.ADD');
    }

	private payBillWithRTPReceieve(data){
    //     this.billPaymentService.inquiryPayInfo(data).then((result: any) => {
    //
    //         if (result.responseJSON.result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
    //                 this.billPaymentService.selectBillerDetailData = {
    //                     billObj:data,
    //                     billpayInfo:result.responseJSON.result.value
    //                 }
    //                 this.permissionChangeRoute.changeRoute('PAY_BILL');
    //         }else{
    //                 this.billPaymentService.selectBillerDetailData = {
    //                     billObj:data,
    //                     billpayInfo:null,
    //                     errorMessage:result.responseJSON.result.responseStatus.errorMessage 
    //                 }                     
    //                 this.permissionChangeRoute.changeRoute('PAY_BILL');
    //         }
        
    //     }, function (error) {
    //
    // });

        this.billPaymentService.inquiryPayInfoOnline(data).then((result: any)=>{
            this.billPaymentService.selectBillerDetailData = {
                billObj: data,
                billpayInfo: result
            };
            this.permissionChangeRoute.changeRoute('PAY_BILL');
        },(error: any)=>{
            this.billPaymentService.selectBillerDetailData = {
                billObj: data,
                billpayInfo: null,
                errorMessage: error.errorMessage
            };                  
            this.permissionChangeRoute.changeRoute('PAY_BILL');
        });
    }
    

     onEmitRTPBlockList($event){
        this.messageModalRTPBlockList.hide();
        if($event === 'block'){
            let createRTPBlocklistData = {
                name:this.selectedBlockListAccount.requesterAccountName,
                type:this.selectedBlockListAccount.requesterIdType,
                value:this.selectedBlockListAccount.requesterIdValue
            }
            this.createRequestToPayBlocklist(createRTPBlocklistData);
        }
    }

    protected createRequestToPayBlocklist(createRTPBlocklistData: any){
       
        this.requestToPayService.createRequestToPayAnyIdBlocklist(createRTPBlocklistData).then((result: any) => {
            if(result.errorMessage == undefined){
                this.alertConfig.type ='success',
                this.alertConfig.message = this.translate.instant('block.successMsg');
                this.alertMessage.show();
            }else{
                this.onError(result);
            }

        }, function (error) {

        });
    }

    onEmitDeleteRTPIncoming($event){
        this.messageModalDeleteRTPIncoming.hide();
        if($event === 'delete'){
            this.deleteRTPIncomingData(this.messageModalDeleteRTPData.data);
        }
    }

    public deleteRTPIncomingData(selectedData: Object){
        
        this.requestToPayService.deleteRTPIncoming(selectedData).then((result: any) => {
            if(result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS){
                this.alertConfig.type = 'success',
                this.alertConfig.message = this.translate.instant('label.title.deleteMyAccountRTPReceiveSuccess');
                this.alertMessage.show();
                this.inquiryRequestToPay();
            }else{
                 this.onError(result.responseStatus);
            }

        }, function (error) {

        });
    }
}