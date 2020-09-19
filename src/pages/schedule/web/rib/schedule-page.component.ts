import { SchedulePage } from '../../schedule-page';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Constants } from '../../../../share/service/constants';
import { UtilService } from '../../../../share/service/util.service';
import { TranslateService } from "ng2-translate/src/translate.service";
import { AccountService } from '../../../../share/service/account.service';
import { BillPaymentService } from '../../../bill-payment/bill-payment.service';
import { PermissionService } from '../../../../share/service/permission.service';
import { MasterDataService } from '../../../../share/service/master-data.service';
import { PermissionChangeRoute } from '../../../../share/service/permission.service';
import { FundTransferService } from '../../../../share/service/fund-transfer.service';
import { BankCodeDataService } from '../../../../share/service/bankcode-data.service';
import { ModalEditScheduleComponent } from '../../../../pages/schedule/modal-edit-schedule.component';
import { ScheduleFundTransferService } from '../../../../pages/schedule/schedule-fundtransfer.service';
import { modalDeleteSchComponent, modalDeleteSchAllComponent, modalDeleteSchResultComponent } from '../../../../pages/schedule/modal-delete-schedule.component';
import { BillPaymentRequestToPayService } from '../../../../pages/bill-payment-request-to-pay/bill-payment-request-to-pay.service';
import { NotificationService } from "../../../../share/service/notification.service";
//import { TimelineComponent } from '../../../../share/component/timeline/timeline.component';
import { TimelineModalComponent } from '../../../../share/component/timeline/timeline-modal.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'schedule-page',
    templateUrl: '../../schedule-page.html',
    providers: [ScheduleFundTransferService]
})
export class SchedulePageComponent extends SchedulePage implements OnInit, OnDestroy {

    public param: any;
    public result: any;
    public selectData: any;
    public list_schedule_data: any;
    public deleteScheduleLevel: any;
    public setScheduleRecurring: any;
    public selected_schedule_data: any;
    public permissionManage: any;
    public massageAlert: any;
    timeline: { data: { rawData: Array<any>, isAdded: boolean, resetData: boolean }, title: string; subtitle: string; };
    private sub: any; //@180419 for queryParam subscription
    
    @ViewChild('bsModalMessage') public bsModalMessage: modalDeleteSchComponent;
    @ViewChild('bsModalAllMessage') public bsModalAllMessage: modalDeleteSchAllComponent;
    @ViewChild('bsModalEditSchedule') public bsModalEditSchedule: ModalEditScheduleComponent;
    @ViewChild('bsModalResultMessage') public bsModalResultMessage: modalDeleteSchResultComponent;
    @ViewChild('myTimelineModal') public myTimelineModal: TimelineModalComponent;

    
    timelineModalData: { key: string; size: string; config: any; title: string; type: string; };
    constructor(public constants: Constants,
        public translate: TranslateService,
        public fundTransferService: FundTransferService,
        public billPaymentService: BillPaymentService,
        public scheduleFundService: ScheduleFundTransferService,
        public permissionChangeRoute: PermissionChangeRoute,
        public bankCodeDataService: BankCodeDataService,
        public masterDataService: MasterDataService,
        public permissionService: PermissionService,
        public accountService: AccountService,
        public utilService: UtilService,
        public billPaymentRequestToPayService: BillPaymentRequestToPayService,
        public notificationService:NotificationService,
        public route: ActivatedRoute
    //    public timelineComponent:TimelineComponent
    ) {
        super(constants, translate, fundTransferService, billPaymentService, bankCodeDataService, masterDataService, permissionService, accountService, utilService);
   
 }

  

    ngOnInit(): void {
        this.webStyle = this.constants.STYLE_RIB_WEB;
        this.alertConfig = {
            title: '',
            type: 'danger',
            message: '',
            show: false,
            option: {}
        };

        this.messageModalData = {
            title: '',
            size: 'md',
            config: { isShowCloseBtn: true, isShowOKBtnThisTime: true, isShowOKBtnAllTime: true, isShowDeleteBtn: true },
        };

        this.dropdownListPeriodOption = {
            isopen: false
        };

        this.monthList = {
            options: [],
            selected: {
                label: "",
                value: ""
            }
        };
        
        this.timelineModalData = {
            title:  'label.scheduleDetail',
            key: "",
            type: "2",
            size: 'md',
            config: {"data":{
                "anyIDTypeList":"ACCTNO"
            }}
        };
        
       

        this.scheduleData = {
            period: ''
        };

        this.accountService.getMyAccounts().then((result: any) => {
            this.accounts = result;
            
        });

        this.masterDataService.getAllBanks().then((result: any) => {
            this.banks = result;
            this.masterDataService.setBankList(this.banks);
        });

        if (this.permissionChangeRoute.prevUrl === '/manage-bill/biller-detail' && this.actionCode.VIEW_BILL_PAYMENT_SCHEDULE) {
            this.permissionChangeRoute.prevUrl = null;

            this.timeline = {
                data: {
                    rawData: [],
                    isAdded: false,
                    resetData: true
                },
                title: 'schedule',
                subtitle: 'biller'
            };

            // this.getBillPaymentSchedule();
            this.scheduleType = 'biller';
        } else if (this.actionCode.VIEW_TRANSFER_SCHEDULE) {
            this.permissionChangeRoute.prevUrl = null;

            this.timeline = {
                data: {
                    rawData: [],
                    isAdded: false,
                    resetData: true
                },
                title: 'schedule',
                subtitle: 'fundtransfer'
            };

            // this.getFundTransferSchedule();
            this.scheduleType = 'fundtransfer';
        } else if (this.actionCode.VIEW_BILL_PAYMENT_SCHEDULE) {
             this.timeline = {
                data: {
                    rawData: [],
                    isAdded: false,
                    resetData: true
                },
                title: 'schedule',
                subtitle: 'biller'
            };
            this.scheduleType = 'biller';
        }

        this.chkFromNotification();
        this.sub = this.route.queryParams.subscribe(params => {
            if(params['refresh'] !== undefined){
                this.chkFromNotification();
            }
        });
    }


    chkFromNotification(){
        let chkFromNotification = this.notificationService.getScheduleData(true);
        let prepareData = {"name":"","data": ""};

        if(chkFromNotification !== null){
            this.switchScheduleType(chkFromNotification.scheduleType);
            this.masterDataService.getAllAnyIDTypes().then((result: any) => {
                prepareData.name = chkFromNotification.name;
                prepareData.data = chkFromNotification;
                this.timelineModalData = {
                    title:  'label.scheduleDetail',
                    key: "schedule." + chkFromNotification.scheduleType,
                    type: chkFromNotification.scheduleType,
                    size: 'md',
                    config: {}
                };
                this.timelineModalData.config = { data: { anyIDTypeList: result,prepareData: prepareData.data } };      
                });    
        }else{
            this.requestSchedule();
        }
    }

    onActions(data: any) {
    
        this.selectData = data;

        if (this.selectData.name === "delete") {
            this.setModalDeleteSchedule(this.selectData.data);
        }

        if (this.selectData.name === "edit") {
            if (this.scheduleType === 'fundtransfer') {
                this.setModalEditScheduleFundTransfer(this.selectData.data);
            } else if (this.scheduleType === 'biller'){
                this.setModalEditScheduleBillPayment(this.selectData.data);
            }
        }
    }

    protected setModalDeleteSchedule(param): void {
        this.selected_schedule_data = param;

        if (this.selected_schedule_data.recurringTimes == 0 || this.selected_schedule_data.scheduleType == 0) {
            this.messageModalData = {
                title: this.translate.instant('lbl.deleteScheduleThistime'),
                size: 'md',
                config: { isShowCloseBtn: true, isShowOKBtn: true },
            };

            this.bsModalMessage.show();
        } else {
            this.messageModalData = {
                title: this.translate.instant('lbl.deleteScheduleAllSchedule'),
                size: 'md',
                config: { isShowCloseBtn: true, isShowOKBtnThisTime: true, isShowOKBtnAllTime: true, isShowOKBtn: true },
            }

            this.bsModalAllMessage.show();
        }
    }

    protected setModalEditScheduleFundTransfer(param): void {
        this.selected_schedule_data = param;

        if (this.selected_schedule_data.recurringTimes == 0 || this.selected_schedule_data.scheduleType == 0) {
            this.selectData.data.editType = this.constants.EDIT_TYPE_THIS_TIME;
            let transferObj = this.populateTranferObj(this.selectData.data);
            this.fundTransferService.setTransferObj(transferObj);
            
            this.permissionChangeRoute.changeRoute("FUND_TRANSFER");
        } else {
            this.messageModalData = {
                title: this.translate.instant("lbl.editScheduleFund"),
                body: this.translate.instant("msg.editScheduleFund"),
                size: 'md',
                config: {}
            }
            this.bsModalEditSchedule.show();
        }
    }

    protected setModalEditScheduleBillPayment(param): void {
        this.selected_schedule_data = param;
        this.prepareEditNewBillerScheduleBillPayment(this.selectData.data);
        if (this.selected_schedule_data.recurringTimes == 0 || this.selected_schedule_data.scheduleType == 0) {
            this.selectData.data.editType = this.constants.EDIT_TYPE_THIS_TIME;

            let billPaymentObj = this.populateBillPaymentObj(this.selectData.data);
            this.billPaymentService.setBillPaymentObj(billPaymentObj);
            this.permissionChangeRoute.changeRoute("PAY_BILL");
        } else {
            this.messageModalData = {
                title: this.translate.instant("lbl.editScheduleBillpay"),
                body: this.translate.instant("msg.editScheduleBillpay"),
                size: 'md',
                config: {}
            }
            this.bsModalEditSchedule.show();
        }
    }

    public prepareEditNewBillerScheduleBillPayment(BillObj){
        if(BillObj.addNewBillerFlag.toUpperCase() == 'Y'){
            let addNewBillObjForEdit = this.billPaymentRequestToPayService.parseObjToBillerProfileBean(this.selectData.data);
            addNewBillObjForEdit.billerNameEn = BillObj.billerName;
            addNewBillObjForEdit.billerNameTh = BillObj.billerName;
            addNewBillObjForEdit.promptPayBillerId = BillObj.promptpayBillerId;
            addNewBillObjForEdit.billerId = BillObj.billerID;
            this.billPaymentRequestToPayService.setConfirmBillerProfileForAddNew(addNewBillObjForEdit);    
        }
    }
    
    public onModalHiddenResultMessage($event){
        if (this.timeline.subtitle === "fundtransfer") {
            this.getFundTransferSchedule();
        } else if (this.timeline.subtitle === "biller") {
            this.getBillPaymentSchedule();
        }
    }

    protected onEmit($event) {
        if (this.timeline.subtitle === "fundtransfer") {
            this.emitValueFundtransfer($event);
        } else if (this.timeline.subtitle === "biller") {
            this.emitValueBillPayment($event);
        }
    }

    private emitValueBillPayment($event) {

        if ($event === this.constants.RECURRING_THIS_TIME) {
            this.scheduleFundService.setScheduleRecurring = this.constants.RECURRING_THIS_TIME;

        } else if ($event === this.constants.RECURRING_ALL_SCHEDULE) {
            this.scheduleFundService.setScheduleRecurring = this.constants.RECURRING_ALL_SCHEDULE;

        } else if ($event === "delete") {
            this.deleteBillPaymentSchedule(this.constants.RECURRING_THIS_TIME);

        } else if ($event === "confirm") {
            if (this.scheduleFundService.getScheduleRecurring === this.constants.RECURRING_ALL_SCHEDULE) {
                this.deleteBillPaymentSchedule(this.constants.RECURRING_ALL_SCHEDULE);

            } else if (this.scheduleFundService.getScheduleRecurring === this.constants.RECURRING_THIS_TIME) {
                this.deleteBillPaymentSchedule(this.constants.RECURRING_THIS_TIME);
            } else
                this.deleteBillPaymentSchedule(this.constants.RECURRING_THIS_TIME);
        } else if ($event === "close") {
            this.bsModalResultMessage.hide();
            this.getBillPaymentSchedule();


        } else if ($event.action && $event.action === "edit") {
            

            if ($event.recurringType === this.constants.RECURRING_ALL_SCHEDULE) {
                this.selectData.data.editType = this.constants.EDIT_TYPE_ALL_SCHEDULE;
            }
            if ($event.recurringType === this.constants.RECURRING_THIS_TIME) {
                this.selectData.data.editType = this.constants.EDIT_TYPE_THIS_TIME;
            }

            let billPaymentObj = this.populateBillPaymentObj(this.selectData.data);
            this.billPaymentService.setBillPaymentObj(billPaymentObj);
            this.permissionChangeRoute.changeRoute("PAY_BILL");
        }
    }

    private emitValueFundtransfer($event) {

        if ($event === this.constants.RECURRING_THIS_TIME) {
            this.scheduleFundService.setScheduleRecurring = this.constants.RECURRING_THIS_TIME;

        } else if ($event === this.constants.RECURRING_ALL_SCHEDULE) {
            this.scheduleFundService.setScheduleRecurring = this.constants.RECURRING_ALL_SCHEDULE;

        } else if ($event === "delete") {
            this.deleteFundtransferSchedule(this.constants.RECURRING_THIS_TIME);

        } else if ($event === "confirm") {
            if (this.scheduleFundService.getScheduleRecurring === this.constants.RECURRING_ALL_SCHEDULE) {
                this.deleteFundtransferSchedule(this.constants.RECURRING_ALL_SCHEDULE);

            } else if (this.scheduleFundService.getScheduleRecurring === this.constants.RECURRING_THIS_TIME) {
                this.deleteFundtransferSchedule(this.constants.RECURRING_THIS_TIME);

            } else {
                this.deleteFundtransferSchedule(this.constants.RECURRING_THIS_TIME);

            }
        } else if ($event === "close") {
            this.bsModalResultMessage.hide();
            this.getFundTransferSchedule();

        } else if ($event.action && $event.action === "edit") {
            if ($event.recurringType === this.constants.RECURRING_ALL_SCHEDULE) {
                this.selectData.data.editType = this.constants.EDIT_TYPE_ALL_SCHEDULE;
            }
            if ($event.recurringType === this.constants.RECURRING_THIS_TIME) {
                this.selectData.data.editType = this.constants.EDIT_TYPE_THIS_TIME;
            }

            let transferObj = this.populateTranferObj(this.selectData.data);
            this.fundTransferService.setTransferObj(transferObj);
            this.permissionChangeRoute.changeRoute("FUND_TRANSFER");
        }
    }


    deleteBillPaymentSchedule(param) {
        if (param === this.constants.RECURRING_THIS_TIME) {

            let params = {
                transactionID: this.selected_schedule_data.transactionID,
            };
            
            this.scheduleFundService.setParam(params);
            this.scheduleFundService.setActionCode('ACT_DELETE_BILL_SCHEDULE_ONETIME');
            this.scheduleFundService.setProcedure('deleteBillPaymentProcedure');
            this.scheduleFundService.setInvokeOption = {};
            this.scheduleFundService.deleteSchedule().then((result: any) => {
                if (result.responseJSON.result.responseStatus.responseCode == this.constants.RESP_CODE_SUCCESS) {

                    this.scheduleFundService.setScheduleRecurring = "";
                    this.massageAlert = "label.removeScheduleSuccess"
                    this.setMessageResult(this.massageAlert);

                } else {
                    let error = result.responseJSON.result.responseStatus;
                    this.onError(error);
                    this.scheduleFundService.setScheduleRecurring = "";
                }
            }, function (error) {
                
                
            });
            this.bsModalMessage.hide();
            this.bsModalAllMessage.hide();

        } else if (param === this.constants.RECURRING_ALL_SCHEDULE) {

            let params = {
                masterTransactionID: this.selected_schedule_data.masterTransactionID,
            };
            
            this.scheduleFundService.setParam(params);
            this.scheduleFundService.setActionCode('ACT_DELETE_BILL_SCHEDULE_ALL');
            this.scheduleFundService.setProcedure('deleteAllBillPaymentProcedure');
            this.scheduleFundService.setInvokeOption = {};
            this.scheduleFundService.deleteSchedule().then((result: any) => {
                if (result.responseJSON.result.responseStatus.responseCode == this.constants.RESP_CODE_SUCCESS) {
                    this.scheduleFundService.setScheduleRecurring = "";
                    this.massageAlert = "label.removeScheduleSuccess"
                    this.setMessageResult(this.massageAlert);


                } else {
                    let error = result.responseJSON.result.responseStatus;
                    this.onError(error);
                    this.scheduleFundService.setScheduleRecurring = "";

                }
            }, function (error) {
                
                
            });
            this.bsModalAllMessage.hide();
        }
    }

    deleteFundtransferSchedule(param) {
        this.deleteScheduleLevel = param;

        if (this.deleteScheduleLevel === this.constants.RECURRING_THIS_TIME) {

            let params = {
                transactionId: this.selected_schedule_data.transactionID,
                masterTransactionId: this.selected_schedule_data.masterTransactionID
            };

            this.scheduleFundService.setParam(params);
            this.scheduleFundService.setActionCode('ACT_DELETE_FUND_TRANSFER');
            this.scheduleFundService.setProcedure('deleteFundTransferProcedure');
            this.scheduleFundService.setInvokeOption = {adapter: 'FundTransferAdapter'};
            this.scheduleFundService.deleteSchedule().then((result: any) => {
                if (result.responseJSON.result.responseStatus.responseCode == this.constants.RESP_CODE_SUCCESS) {
                    

                    this.scheduleFundService.setScheduleRecurring = "";
                    this.massageAlert = "msg.deletePendingSuccess"
                    this.setMessageResult(this.massageAlert);
                    //   this.getFundTransferSchedule();
                } else {
                    let error = result.responseJSON.result.responseStatus;
                    this.onError(error);
                    this.scheduleFundService.setScheduleRecurring = "";
                }
            }, function (error) {
                
            });
            this.bsModalMessage.hide();
            this.bsModalAllMessage.hide();

        } else if (this.deleteScheduleLevel === this.constants.RECURRING_ALL_SCHEDULE) {

            let params = {
                masterTransactionId: this.selected_schedule_data.masterTransactionID,
            };

            this.scheduleFundService.setParam(params);
            this.scheduleFundService.setActionCode('ACT_DELETE_ALL_FUND_TRANSFER');
            this.scheduleFundService.setProcedure('deleteAllFundTransferProcedure');
            this.scheduleFundService.setInvokeOption = {adapter: 'FundTransferAdapter'};
            this.scheduleFundService.deleteSchedule().then((result: any) => {
                if (result.responseJSON.result.responseStatus.responseCode == this.constants.RESP_CODE_SUCCESS) {
                    
                    this.scheduleFundService.setScheduleRecurring = "";
                    this.massageAlert = "msg.deletePendingSuccess"
                    this.setMessageResult(this.massageAlert);

                } else {
                    let error = result.responseJSON.result.responseStatus;
                    this.onError(error);
                    this.scheduleFundService.setScheduleRecurring = "";
                }
            }, function (error) {
                
            });
            this.bsModalAllMessage.hide();
        }
    }

    setMessageResult(massageAlert) {
        this.messageModalData = {
            title: this.translate.instant("lbl.regStatus.success"),
            body: this.translate.instant(massageAlert),
            size: 'md',
            config: { isShowCloseBtn: true }
        }

        this.bsModalResultMessage.show();
    }

    ngOnDestroy(){
        //@180419 unsubscribe queryParam
        this.sub.unsubscribe();
    }
}