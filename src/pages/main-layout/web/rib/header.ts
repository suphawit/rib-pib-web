import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { LanguageSettingService } from '../language-setting.service';
import { TranslateService } from "ng2-translate/src/translate.service";
import { DropdownDataService } from '../../../../share/service/dropdown.service';
import { MessageModalComponent } from '../../../../share/component/modal-messages.component';
import { PermissionAction, PermissionService, PermissionChangeRoute } from '../../../../share/service/permission.service';
import { Subscription } from "rxjs";
import { NotificationService } from "../../../../share/service/notification.service";
import { TimelineModalComponent } from '../../../../share/component/timeline/timeline-modal.component';
import { TransferBean } from '../../../../share/bean/transfer-bean';
import { BillPaymentService } from '../../../bill-payment/bill-payment.service';
import { MasterDataService } from '../../../../share/service/master-data.service';
import { Constants } from '../../../../share/service/constants';
import { FundTransferService } from '../../../../share/service/fund-transfer.service';
import { AccountBean } from '../../../../share/bean/account-bean';
import { AlertMessageComponent } from '../../../../share/component/alert-message/alert-message.component';
import { RTPTimelineModalComponent } from '../../../../pages/request-to-pay/request-to-pay-timeline-modal.component';
declare var WLAuthorizationManager;
declare var BUILD_NUM;
@Component({
    selector: 'header-web-rib',
    templateUrl: './header.html'
})
export class RIBWebHeader implements OnInit, OnDestroy {
    @ViewChild('messageModal') public messageModal: MessageModalComponent;
    @ViewChild('myTimelineModal') public myTimelineModal: TimelineModalComponent;
    @ViewChild('rtpTimelineModal') public rtpTimelineModal: RTPTimelineModalComponent;

    alertConfig: { type: string, message: string, show: boolean };
    @ViewChild('alertMessage') public alertMessage: AlertMessageComponent;

    protected labelLanguageSettings: any;
    protected languageSettingValue: any;
    protected statuslogin: any;
    protected hiddenLang = false;
    private permissionSubscription: Subscription;
    private currentPage = 0;
    private modalType = "";
    public isLogin;
    public isTermAndCon: boolean;
    public notificationList = [];
    public notificationListReverse = [];
    public badgeMenu = "0";
    public anyIDTypeList: any;
    public BUILD_NUM = BUILD_NUM;

    public lastUpdated = new Date();

    messageModalData: { title: string; body: string; size: string; config: any; action: any; };
    timelineModalData: { key: string; size: string; config: any; title: string; type: string; };
    constructor(public permissionAction: PermissionAction,
        public translate: TranslateService,
        public dropdownLanguageDataService: DropdownDataService,
        public permissionService: PermissionService,
        public languageSettingService: LanguageSettingService,
        public permissionChangeRoute: PermissionChangeRoute,
        public notificationService: NotificationService,
        public billPaymentService: BillPaymentService,
        public masterDataService: MasterDataService,
        public constants: Constants,
        public fundTransferService: FundTransferService
      ) {
    }

    ngOnInit(): void {
        this.permissionSubscription = this.permissionService.PermssionChangeEvent
            .subscribe(user => this.selectedUserEventHandler(user));

        this.labelLanguageSettings = this.dropdownLanguageDataService.languageSetting;

        let languageSetting = this.labelLanguageSettings[0];
        this.translate.setDefaultLang(this.languageSettingValue);
        this.languageSettingValue = languageSetting.value;

        this.translate.use(this.languageSettingValue);
        this.messageModalData = {
            title: 'lbl.ConfirmLogout',
            body: 'msg.confirmLogout',
            size: 'md',
            config: { isShowOKBtn: true, isShowCancelBtn: true },
            action: {}
        };

        this.timelineModalData = {
            title: '',
            key: "",
            type: "",
            size: '',
            config: {}
        };

        this.notificationService.notificationEvent.subscribe(user => this.notificationUpdateEvent(user));
        this.notificationService.notificationHistoryEvent.subscribe(noti => this.notificationHistory(noti));
        this.notificationService.badgeUpdateEvent.subscribe(badge => this.badgeUpdateEvent(badge));
    }

    ngOnDestroy(): void {
        if (this.permissionSubscription) {
            this.permissionSubscription.unsubscribe();
        }
    }
    onScrollDown() {
        
        let countPage = this.currentPage + 1;

        this.notificationService.getAllNotification(countPage).then((result) => {
            if (result > 0) {
                this.currentPage += 1;
            }
        }, function (error) {

        });

    }

    onScrollUp() {
        
    }

    notificationUpdateEvent(notification) {
        this.isLogin = this.permissionService.getIsLogin();
        if(this.isLogin){
            if (notification.actionType == 'logoff_notification') {
                this.permissionService.logoutSession().then((result) => {
                    this.permissionChangeRoute.changeRoute("HOME");
                    this.currentPage = 0;
                    this.notificationList = [];
                    this.notificationListReverse = [];
                    this.languageSettingValue = this.translate.currentLang;
                });

            } else {
                this.notificationList = [notification, ...this.notificationList];
                this.notificationListReverse = this.notificationList;
            }
        }
    }

    notificationHistory(notification) {
        this.notificationList.push(notification);
        this.notificationListReverse = this.notificationList;
    }

    badgeUpdateEvent(badge) {
        this.badgeMenu = badge;

    }
    onEmit($event) {
        if (this.modalType === "logout") {
            this.permissionService.logoutSession().then((result) => {
                this.messageModal.hide();
                this.permissionChangeRoute.changeRoute("HOME");
                this.currentPage = 0;
                this.notificationList = [];
                this.notificationListReverse = [];
                this.languageSettingValue = this.translate.currentLang;
            }, function (error) {
                this.messageModal.hide();
            });
        } else {
            this.messageModal.hide();
        }

        if ($event !== undefined && $event === 'cancel') {
            this.messageModal.hide();
        }
    }

    selectedUserEventHandler(user: any) {
        this.isLogin = this.permissionService.getIsLogin();
        this.isTermAndCon = this.permissionService.getIsTermAndCon();

        if (this.isLogin && this.isTermAndCon) {
            this.currentPage = 0;
            this.notificationList = [];
            this.notificationListReverse = [];
            this.notificationService.clearBeforeLongPolling().then((result) => {
                
                this.notificationService.getAllNotification(0);
            }, function (error) {

            });
            //this.notificationService.getAllNotification(0);
            //  this.notificationService.getAllNotification(0);
        } else {
            this.rtpTimelineModal.hide();
            this.myTimelineModal.hide();
            this.hiddenLang = true;
        }
    }

    onModalHidden() {
    }

    clickLogout() {
        this.modalType = "logout";
        this.messageModalData = {
            title: 'lbl.ConfirmLogout',
            body: 'msg.confirmLogout',
            size: 'md',
            config: { isShowOKBtn: true, isShowCancelBtn: true },
            action: {}
        };
        this.messageModal.show();
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
            this.timelineModalData.config = { data: { anyIDTypeList: result } };
            this.notificationDecision(noti);
        });
    }

    private notificationDecision(noti) {
        
        switch (noti.actionType) {
            case "notification_info":
                this.notificationModalInformation(noti);
                break;
            case "transfer_result":

                this.timelineModalData = {
                    title: 'lbl.historyDetail',
                    key: "history.fundtransfer",
                    type: "fundtransfer",
                    size: 'md',
                    config: {}
                };

                this.notificationHistoryModal(noti)
                break;

            case "payment_result":

                this.timelineModalData = {
                    title: 'lbl.historyDetail',
                    key: "history.biller",
                    type: "biller",
                    size: 'md',
                    config: {}
                };

                this.notificationHistoryModal(noti)

                break;
            case "transfer_schedule":
                this.notificationRedirectSchedule(noti,"fundtransfer");
                break;

            case "payment_schedule":
                this.notificationRedirectSchedule(noti,"biller");
                break;
            case "rtp_incoming":
                this.notificationRedirectIncoming(noti);
                break;
            case "notification_detail_by_user":
                this.notificationModalInformationByUser(noti);
                break;

            default:
            // confirm("Sorry, that color is not in the system yet!");
        }
    }

    private notificationRedirectSchedule(noti,scheduleType) {
        this.modalType = "notification";
        this.notificationService.getInfo(noti).then((objResponse: any) => {
            if (objResponse.responseJSON.result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                let result = objResponse.responseJSON.result.value.detail;
                    result.scheduleType = scheduleType;
                    result.name = 'edit';
                    this.notificationService.setScheduleData(result);
                   this.permissionChangeRoute.changeRoute('MANAGE_SCHEDULE', this.navagateRefreshParams);
            } else {
                this.alertConfig.message = objResponse.responseJSON.result.responseStatus.errorMessage;
                this.alertMessage.show();
            }
        }, function (error) {
            
        });
    }

    notificationRedirectIncoming(noti) {
        
        this.modalType = "notification";
            this.notificationService.getRTPIncomingInfo(noti).then((objResponse: any) => {
                if (objResponse.responseJSON.result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                    let result  = objResponse.responseJSON.result.value.rtpInfoDetailList[0];
                  
                    this.verifyNotificationRedirectIncoming(result);
                } else {
                    this.alertConfig.message = objResponse.responseJSON.result.responseStatus.errorMessage;
                    this.alertMessage.show();
                }

            }, function (error) {
                
            });      


    }
    

    notificationModalInformationByUser(noti) {
        this.modalType = "notification";
        this.notificationService.getInfoByUser(noti).then((objResponse: any) => {
            if (objResponse.responseJSON.result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                let result = objResponse.responseJSON.result.data;
                let msgBody = {
                    "TH": result.infoWebTh,
                    "EN": result.infoWebEn
                };
                let msgTitle = {
                    "TH": result.titleTh,
                    "EN": result.titleEn
                };
                this.messageModalData = {
                    title: msgTitle[this.translate.currentLang.toUpperCase()],
                    body: msgBody[this.translate.currentLang.toUpperCase()],
                    size: 'md',
                    config: { isShowOKBtn: true, isShowCancelBtn: false },
                    action: {}
                };
                this.messageModal.show();
            } else {
                this.alertConfig.message = objResponse.responseJSON.result.responseStatus.errorMessage;
                this.alertMessage.show();
            }

        }, function (error) {
            
        });
    }


    verifyNotificationRedirectIncoming(data){
        this.permissionChangeRoute.prevUrl = '/request-to-pay';

        if(data.status === 'UNPAID'){
      
            switch(data.requesterIdType) { 
                case 'BILLERID': { 
                    this.inquiryBillPayInfo(data);
                    this.permissionChangeRoute.changeRoute('PAY_BILL', this.navagateRefreshParams);
                    break; 
                } 
                default: { 
                    let transferObj = this.populateTranferObj(data);
                    this.fundTransferService.setTransferObj(transferObj);
                    this.permissionChangeRoute.changeRoute('FUND_TRANSFER', this.navagateRefreshParams);
                    break; 
                } 
            } 
        }else{
         
            this.rtpTimelineModal.show(data);
        }
    }

    protected inquiryBillPayInfo(data: any){
        this.billPaymentService.inquiryPayInfo(data).then((result: any) => {
            let billPaymentObj: any;
            let responseCode = result.responseJSON.result.responseStatus.responseCode;
            if (responseCode === this.constants.RESP_CODE_SUCCESS) {
                billPaymentObj = {
                    billObj: data,
                    billpayInfo: result.responseJSON.result.value
                }
            } else {
                billPaymentObj = {
                    billObj: data,
                    billpayInfo: null,
                    errorMessage: result.responseJSON.result.responseStatus.errorMessage
                }     
            }
            this.billPaymentService.selectBillerDetailData = billPaymentObj;
        }, function (error) {
            
        });

    }

    protected populateTranferObj(data: any) {
        let category: any;
            category = { catId: -1 };
        let anyIDType = this.anyIDTypeList[data.requesterIdType];
        let recurringTime;
            recurringTime = { time: 0 };
            recurringTime = { desc: '' };

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





    notificationModalInformation(noti) {
        this.modalType = "notification";
        this.notificationService.getInfo(noti).then((objResponse: any) => {
            if (objResponse.responseJSON.result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                let result = objResponse.responseJSON.result.value.detail;
                let msgBody = {
                    "TH": result.infoWebTH,
                    "EN": result.infoWebEN
                };
                let msgTitle = {
                    "TH": result.titleTH,
                    "EN": result.titleEN
                };
                this.messageModalData = {
                    title: msgTitle[this.translate.currentLang.toUpperCase()],
                    body: msgBody[this.translate.currentLang.toUpperCase()],
                    size: 'md',
                    config: { isShowOKBtn: true, isShowCancelBtn: false },
                    action: {}
                };
                this.messageModal.show();
            } else {
                this.alertConfig.message = objResponse.responseJSON.result.responseStatus.errorMessage;
                this.alertMessage.show();
            }

        }, function (error) {
            
        });
    }

    notificationHistoryModal(noti: any) {
        this.modalType = "notification";

        // let result;
        this.masterDataService.getAllAnyIDTypes().then((result: any) => {
            this.anyIDTypeList = result;
            this.timelineModalData.config = { data: { anyIDTypeList: result } };

            this.notificationService.getInfo(noti).then((objResponse: any) => {
                if (objResponse.responseJSON.result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                    this.myTimelineModal.show(objResponse.responseJSON.result.value.detail);
                } else {
                    this.alertConfig.message = objResponse.responseJSON.result.responseStatus.errorMessage;
                    this.alertMessage.show();
                }

            }, function (error) {
                
            });
        });
    }





    onLanguageSettingsChange(newValue) {
        this.isLogin = this.permissionService.getIsLogin();
        this.languageSettingValue = newValue;
        this.translate.use(this.languageSettingValue);

        if (this.isLogin === true) {
            this.languageSettingService.setActionCode("ACT_CHANGE_LNG");
            this.languageSettingService.getLanguage(this.languageSettingValue).then((result: any) => {
            }, function (error) {
                
            });
        } else {
            this.translate.use(this.languageSettingValue);
        }
    }
	get navagateRefreshParams(){
        return {
            'queryParams': { 'refresh': Math.floor(Math.random() * 100) } 
        };
    }

    protected inquiryBillPayInfoOnline(biller: any){
        let promise = new Promise((resolve, reject) => {
            let billPaymentObj: any;
            this.billPaymentService.inquiryPayInfoOnline(biller).then((result: any)=>{
                billPaymentObj = {
                    billObj: biller,
                    billpayInfo: result
                };
                resolve(billPaymentObj);
            },(error: any)=>{
                billPaymentObj = {
                    billObj: biller,
                    billpayInfo: null,
                    errorMessage: error.errorMessage
                };
                resolve(billPaymentObj);
            });
        });
        return promise;
    }
}
