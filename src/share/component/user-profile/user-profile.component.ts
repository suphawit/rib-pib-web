import { Component, ViewChild, Input, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from 'ng2-translate/src/translate.service';
import { MessageModalComponent } from '../../../share/component/modal-messages.component';
import { PermissionService, PermissionChangeRoute } from '../../service/permission.service';
import { Constants } from '../../../share/service/constants';
import { Subscription } from "rxjs";
import { NotificationService } from "../../../share/service/notification.service";
import { TimelineModalComponent } from '../../../share/component/timeline/timeline-modal.component';
import { BillPaymentService } from '../../../pages/bill-payment/bill-payment.service';
import { FundTransferService } from '../../../share/service/fund-transfer.service';
import { AccountBean } from '../../../share/bean/account-bean';
import { TransferBean } from '../../../share/bean/transfer-bean';
import { MasterDataService } from '../../../share/service/master-data.service';
declare var confirm;

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.html'
})

export class UserProfileComponent implements OnInit, OnDestroy {

  private isLogin;
  private permissionSubscription: Subscription;
  fullName: string;
  fullSurName: string;
  messageModalData: { title: string; body: string; size: string; config: any; action: any; };
  timelineModalData: { key: string; size: string; config: any; title: string; type: string; };

  //variable for notification
  public notificationList = [];
  public notificationListReverse = [];
  public badgeMenu = "0";
  public anyIDTypeList;
  private currentPage = 0;
  private notificationEventSub: Subscription;
  private notificationHistoryEventSub: Subscription;
  private badgeUpdateEventSub: Subscription;
  public notiLoading;

  @Input('username') nameDisplay: String;
  @ViewChild('messageModal') public messageModal: MessageModalComponent;
  @ViewChild('myTimelineModal') public myTimelineModal: TimelineModalComponent;

  constructor(private permissionService: PermissionService,
    private translate: TranslateService,
    private constants: Constants,
    private notificationService: NotificationService,
    private permissionChangeRoute: PermissionChangeRoute,
    public billPaymentService: BillPaymentService,
    public fundTransferService: FundTransferService,
     public masterDataService: MasterDataService,) {
  }

  ngOnInit(): void {
    this.permissionSubscription = this.permissionService.PermssionChangeEvent.subscribe(user => this.selectedUserEventHandler(user));

    this.isLogin = this.permissionService.getIsLogin();


    //setup notification
    this.notificationEventSub = this.notificationService.notificationEvent.subscribe(user => this.notificationUpdateEvent(user));
    this.notificationHistoryEventSub = this.notificationService.notificationHistoryEvent.subscribe(noti => this.notificationHistory(noti));
    this.badgeUpdateEventSub = this.notificationService.badgeUpdateEvent.subscribe(badge => this.badgeUpdateEvent(badge));

    this.messageModalData = {
      title: 'notify',
      body: "s",
      size: 'md',
      config: { isShowOKBtn: true, isShowCancelBtn: false },
      action: {}
    };

    

             this.timelineModalData = {
                    title:  'lbl.historyDetail',
                    key:"history.fundtransfer",
                    type:"2",
                    size: 'md',
                    config: {}
                    };
   
        
         this.timelineModalData.config = { data: { anyIDTypeList: "aaaaaaaaaa" } };

  }

  ngOnDestroy(): void {
    this.permissionSubscription.unsubscribe();
    this.notificationEventSub.unsubscribe();
    this.notificationHistoryEventSub.unsubscribe();
    this.badgeUpdateEventSub.unsubscribe();
  }

  //notification event
  notificationUpdateEvent(notification) {

    this.notificationList = [notification, ...this.notificationList];

  
    this.notificationListReverse = this.notificationList;
  }
  notificationHistory(notification) {
 
    this.notificationList.push(notification);
    this.notificationListReverse = this.notificationList;
  
  }

  onScrollDown() {

    let countPage = this.currentPage + 1;
    this.notiLoading = true;
    this.notificationService.getAllNotification(countPage).then((result) => {
      if (result > 0) {
        this.notiLoading = false;
        this.currentPage += 1;
      }
    }, function (error) {
      this.notiLoading = false;
    });

  }

  badgeUpdateEvent(badge) {
    this.badgeMenu = badge;

  }

  onclickNotification(noti, id) {

    if (this.notificationListReverse[id]["isRead"] !== true) {
      this.notificationListReverse[id]["isRead"] = true;
      this.notificationService.triggerNotification(noti.notificationId).then((result: any) => {

      }, function (error) {
        
      });

    }

    this.masterDataService.getAllAnyIDTypes().then((result: any) => {
         this.anyIDTypeList = result;
  
    this.notificationDecision(noti);
     });


    //

    //  this.permissionChangeRoute.changeRoute("TRANSACTION_HISTORY");

  }

  private notificationDecision(noti) {
      this.timelineModalData = {
    title:  'lbl.historyDetail',
    key:"history.fundtransfer",
    type:"2",
    size: 'md',
    config: {}
    };
       this.timelineModalData.config = { data: { anyIDTypeList: "ACCTNO" } };

  this.notificationHistoryModal();
//    this.notificationModalInformation(noti);

    //this.notificationRedirectIncoming();

    //this.notificationModal(noti)

    /*   switch (noti.actionType) {
           case "notification_info":
           this.notificationModalInformation(noti);
               break;
           case "transfer_result":
         
   
                     this.notificationHistoryModal()    
               break;

           case "payment_result":

               break;
           case "Transfer_schedule":

               break;
           case "rtp_incomming":
               this.notificationRedirectIncoming();
               break;

           default:
           // confirm("Sorry, that color is not in the system yet!");
       }
*/


  }

  notificationRedirectIncoming() {

    let data = { "name": "transfer", "data": { "receiverIdTypeLabel": "เบอร์มือถือ", "senderFee": 2, "billPresentmentURL": null, "rtpreference": "R012718100000210", "rtpMsgType": "INCOMING", "receiverAccountName": "COMPANY SNOWFLAKE  ", "terminalId": "I001000B069B0021", "amount": 10.1, "transfereeFee": 0, "requesterIdType": "MSISDN", "receiverIdValue": "0820000893", "receiverAccountDisplayName": "บริษัท สโนว์เฟลค  ", "orderingBranch": "0001", "requesterAccountName": "Test", "oneTimePassword": null, "createdDate": "24/11/2017 12:05:07", "currencyCode": "THB", "status": "UNPAID", "expiryDate": "30 ธ.ค. 2560 09:00:00", "requesterIdTypeLabel": "เบอร์มือถือ", "billReference3": null, "emailAddress": null, "requesterIdValue": "0329090908", "billReference2": "100112345", "billReference1": "81401001001", "transfererFee": 1, "modifiedDate": null, "creditNotificationReference": null, "receiverIdType": "MSISDN", "additionalNote": null, "mobileNo": null, "statusDesc": "อยู่ระหว่างรอชำระเงิน", "cardNumber": null } }


    if (data.name == 'billpayment') {
      this.permissionChangeRoute.prevUrl = '/request-to-pay';
      // this.billPaymentService.inquiryPayInfo(data.data).then((result: any) => {
      //   if (result.responseJSON.result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
      //     this.billPaymentService.selectBillerDetailData = {
      //       billObj: data.data,
      //       billpayInfo: result.responseJSON.result.value
      //     }
      //     this.permissionChangeRoute.changeRoute('PAY_BILL');
      //   } else {
      //     this.billPaymentService.selectBillerDetailData = {
      //       billObj: data.data,
      //       billpayInfo: null,
      //       errorMessage: result.responseJSON.result.responseStatus.errorMessage
      //     }
      //     this.permissionChangeRoute.changeRoute('PAY_BILL');
      //   }

      // }, function (error) {
      //   
      // });

      this.billPaymentService.inquiryPayInfoOnline(data.data).then((result: any)=>{
          this.billPaymentService.selectBillerDetailData = {
              billObj: data.data,
              billpayInfo: result
          };
          this.permissionChangeRoute.changeRoute('PAY_BILL');
      },(error: any)=>{
          this.billPaymentService.selectBillerDetailData = {
              billObj: data.data,
              billpayInfo: null,
              errorMessage: error.errorMessage
          };                  
          this.permissionChangeRoute.changeRoute('PAY_BILL');
      });
    } else if (data.name === 'transfer') {


      let transferObj = this.populateTranferObj(data.data);

      this.fundTransferService.setTransferObj(transferObj);
      this.permissionChangeRoute.prevUrl = '/request-to-pay';

      this.permissionChangeRoute.changeRoute('FUND_TRANSFER');
    }


  }

  protected populateTranferObj(data: any) {
    // let anyIDTypeList


    

    let category: any;
    category = { catId: -1 };
    let anyIDType = this.anyIDTypeList[data.requesterIdType];

    let recurringTime;
    recurringTime = { time: 0 };
    recurringTime = { desc: '' };

    let destAccount = new AccountBean()
    // {
    //     accId : -1,
    //     accNo : data.requesterIdValue,
    //     accName : data.requesterAccountName,
    //     aliasName : "",
    //     category : category,
    //     anyIDType : anyIDType
    // };
    destAccount.accId = -1;
    destAccount.accNo = data.requesterIdValue;
    destAccount.accName = data.requesterAccountName;
    destAccount.aliasName = "";
    destAccount.category = category;
    destAccount.anyIDType = anyIDType;

    // let transferObj = {
    // srcAccount :  new AccountBean(),
    // destAccount : destAccount,
    //     rtpReferenceNo : data.rtpreference,
    // transferAmount : data.amount,
    // recurringType : this.constants.RECURRING_TYPE_NO,
    // editType : '0',
    // note : data.additionalNote

    // }




    let transferObj = new TransferBean();
    transferObj.srcAccount = new AccountBean();
    transferObj.destAccount = destAccount;
    transferObj.rtpReferenceNo = data.rtpreference;
    transferObj.transferAmount = data.amount;
    transferObj.recurringType = this.constants.RECURRING_TYPE_NO;
    transferObj.editType = '0';
    transferObj.note = data.additionalNote;

    // transferObj.srcAccount;
    // transferObj.destAccount = destAccount;
    // transferObj.rtpReferenceNo = data.rtpreference;
    // transferObj.transferAmount = data.amount;
    // transferObj.recurringType = this.constants.RECURRING_TYPE_NO;
    // transferObj.editType = '0';
    // transferObj.note = data.additionalNote;

    
    return transferObj;
  }

  selectedUserEventHandler(user: any) {

    let isLogin = this.permissionService.getIsLogin();
    this.isLogin = isLogin;
    // this.menuList = this._MainMenuPibWebService.getMainMenuList();
    let isTermAndCon = this.permissionService.getIsTermAndCon();

    if (!isLogin || !isTermAndCon) {
      let userData = this.permissionService.getUserData();
      

      if (userData != null) {
        if (this.translate.currentLang === 'th') {
          this.fullName = userData.fullNameTH || '';
          this.fullSurName = userData.fullSurNameTH || '';
        } else {
          this.fullName = userData.fullNameEN || '';
          this.fullSurName = userData.fullSurNameEN || '';
        }

        this.nameDisplay = (userData.username) ? userData.username : this.fullName + ' ' + this.fullSurName;
      }
    } else {
     
      this.currentPage = 0;
      this.notificationList = [];
      this.notificationListReverse = [];
      this.notificationService.getAllNotification(0);
    }
  }

  notificationModalInformation(noti) {

    this.notificationService.getNotifyDetail("ACT_RBAC_GET_INFORMATION_SERVICE", "getContactUsProcedure").then((objResponse: any) => {
      if (objResponse.responseJSON.result.responseStatus.responseCode === "RIB-I-SCC000") {
        let result = objResponse.responseJSON.result.value.data;


        this.messageModalData = {
          title: 'notify33',
          body: result,
          size: 'md',
          config: { isShowOKBtn: true, isShowCancelBtn: false },
          action: {}
        };

        this.messageModal.show();

      } else {
        //   this.alertConfig.message = objResponse.responseJSON.result.responseStatus.errorMessage;
        //    this.alertMessage.show();
      }
    }, function (error) {
      
    });


  }

  notificationHistoryModal() {

    // let result;

    let data = { "atsTransferDetails": null, "referenceNumber": "TX171123100000002", "maskingFromAccount": "xxx001024", "transferTimeName": "ทันที", "toAccountNumber": "00583130000079", "errorMsg": null, "depNo": null, "debitDate": "23/11/2017 00:00:00", "recurringTimes": null, "amount": "5000", "scheduleType": "0", "feeAmount": "0", "msgLanguage": "TH", "fromAccountAliasName": null, "rtpReferenceNo": null, "status": "สำเร็จ", "allowUpdateAcctName": false, "toAccountName": null, "refTxnId": "TX171123100000002", "bankName": "ธ.เกียรตินาคินภัทร ", "toAliasName": "TD Acct 22222222222", "toAccountAliasName": "TD Acct 22222222222", "transactionID": "21924", "transactionDate": "23/11/2017 14:13:55", "bankCode": "069", "fromBankCode": "069", "atsTransferDetail": null, "fundTransferTypeDescToDisplay": "โอนเงินทันที", "fromAliasName": "dddd", "anyIDType": "ACCTNO", "canPrintSlip": true, "recurringType": "ครั้งเดียว", "maskingToAccount": "xxx000079", "shortNameTo": null, "existingTransferAccountNo": null, "toEmail": null, "scheduleTypeDesc": "ครั้งเดียว", "fundTransferTypeDesc": "OWNER", "immediateType": null, "receiveDate": null, "ownerAccount": null, "memo": null, "selectFromAccountList": null, "atsReceiving": null, "statusCode": "SC", "fromAccountID": null, "creditDate": "23/11/2017 00:00:00", "txnReceiveDate": null, "toCategoryID": null, "masterTransactionID": "", "toMobileNumber": null, "valueDate": null, "addAccountType": null, "fromAccountNumber": "00582510001024", "fundTransferType": "7", "maturityDate": null, "interestRate": null, "interestCondition": null, "fromAccountName": null, "transferDate": "23/11/2017 00:00:00", "term": null, "toAccountID": null, "shortNameFrom": null, "errorCode": null, "fromBankName": "ธ.เกียรตินาคินภัทร ", "editType": null };

    
    this.myTimelineModal.show(data);

  }

  onModalHidden() {
  }


  onEmit($event) {
    this.messageModal.hide();

  }


  confirmLogout(): void {
    if (confirm(this.translate.instant('msg.confirmLogoutPIB'))) {
      this.permissionService.logoutPIB().then((result)=>{
        this.permissionService.logoutSession().then((result) => {
          //  this.permissionChangeRoute.changeRoute("HOME");
        }, (error) => {
          this.messageModal.hide();
        });
        this.nameDisplay = "";
        this.permissionService.setIsLogin(false);
        this.permissionService.setIsChallenged(false);
        this.permissionService.setIsChallengedSuccess(false);
        this.permissionService.setUserData(null);
        this.isLogin = false;
        top.location.href = this.constants.PIB_LOGOUT_URL;
      })
    }
  }
}
