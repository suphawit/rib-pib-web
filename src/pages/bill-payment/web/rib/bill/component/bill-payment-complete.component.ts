import { Component } from '@angular/core';
import { Constants } from '../../../../../../share/service/constants';
import { BillPaymentService } from '../../../../bill-payment.service';
import { UtilService } from '../../../../../../share/service/util.service';
import { Dateservice } from '../../../../../../share/service/date.service';
import { ReportService } from '../../../../../../share/service/report.service';
import { BillPaymentBean } from '../../../../../../share/bean/bill-payment-bean';
import { BankCodeDataService } from '../../../../../../share/service/bankcode-data.service';
import { TranslateService } from "ng2-translate/src/translate.service";
import { PermissionService, PermissionChangeRoute } from '../../../../../../share/service/permission.service';
import { NotificationService } from '../../../../../../share/service/notification.service';
import { RequestToPayService } from '../../../../../../pages/request-to-pay/request-to-pay.service';
import { GetinformationService } from "../../../../../../share/service/getInformation.service";
import {BillPaymentRequestToPayService} from "../../../../../bill-payment-request-to-pay/bill-payment-request-to-pay.service";

declare var BUILD_NUM;

@Component({
    selector: 'bill-payment-complete',
    templateUrl: './bill-payment-complete.html'
})

export class BillPaymentComplete {
    public BUILD_NUM = BUILD_NUM;
    authorized: any;
    billPaymentObj: BillPaymentBean;
    isDesktop: boolean = true;
    private userCardType: string;

    constructor(
        public constants: Constants,
        private reportService: ReportService,
        private bankCodeDataService: BankCodeDataService,
        private billPaymentService: BillPaymentService,
        private utilService: UtilService,
        private dateservice: Dateservice,
        private translate: TranslateService,
        private permissionService: PermissionService,
        public notificationService: NotificationService,
        public requestToPayService:RequestToPayService,
        public getinformationService: GetinformationService,
        public permissionChangeRoute: PermissionChangeRoute,
        public translateService: TranslateService ) { }

    ngOnInit(): void {

        this.isDesktop = this.getinformationService.isDesktop();
        this.authorized = {
            printSlip: this.permissionService.getActionCode().PRINT_SLIP_PAY_BILL,
            makeTransaction: this.permissionService.getActionCode().PAY_BILL
        };
        this.billPaymentObj = this.billPaymentService.getBillPaymentObj();
         this.getBadgeList(this.billPaymentObj );
        this.billPaymentService.getCustomerType().then((result: any) => {
            this.userCardType = result;
        });
        console.log(this.billPaymentObj)
    }

    ngOnDestroy(): void {
        this.billPaymentService.updateObserver([{ key: 'alertmessage', value: '', show: false }]);
        this.billPaymentService.setBillPaymentObj(null);
    }

    protected getBillPaymentSlip() {

        let transactionDate = this.dateservice.parseDateTime(this.billPaymentObj.transactionDate);
        let paymentDate = this.dateservice.parseDate(this.billPaymentObj.paymentDate);
        let ref2 = '';
        if(this.isEDonationCategory(this.billPaymentObj.toBiller.categoryId)) {
            ref2 = this.billPaymentObj.refInfos;
        }else {
            ref2 = this.billPaymentObj.toBiller.ref2;
        }
        console.log('this.billPaymentObj', this.billPaymentObj)
        let slipBillerData = {
            refNO: this.billPaymentObj.referenceNO,
            refTxnID: this.billPaymentObj.refTxnID,
            transactionDate: this.dateservice.formatDate(transactionDate, 'DD MMM YYYY HH:mm:ss', this.translate.currentLang),
            deductDate: this.dateservice.formatDate(paymentDate, 'DD MMM YYYY', this.translate.currentLang),
            amount: this.billPaymentObj.payAmount,
            fee: this.billPaymentObj.feeAmount,
            billerAliasName: this.billPaymentObj.toBiller.billerAliasName,
            ref1: this.billPaymentObj.toBiller.ref1,
            ref2: ref2,
            ref3: this.billPaymentObj.toBiller.ref3 || null,
            status: this.billPaymentObj.paymentStatusDesc,
            submitStatus: this.billPaymentObj.submitStatusDesc,
            categoryId: this.billPaymentObj.toBiller.categoryId,
            transactionRef: this.billPaymentObj.transactionRef
        };



        if (this.billPaymentObj.recurringType === this.constants.RECURRING_TYPE_YES) {
            if (typeof this.billPaymentObj.scheduleType.desc !== 'undefined') {
                slipBillerData['recurringDetail'] = this.billPaymentObj.scheduleType.desc + ', ' + this.billPaymentObj.recurringTime.desc;
            }
        }

        this.billPaymentService.requestBillPaymentSlip(slipBillerData).then((objResponse: any) => {
            let result = objResponse.responseJSON.result;
            if (result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                this.utilService.downloadStreamFile(result.value.data, 'KKPBankBillPayment_' + this.dateservice.formatDate(new Date(), 'YYYYMMDD') + '.pdf');
            } else {
                this.billPaymentService.updateObserver([{ key: 'alertmessage', value: result.responseStatus.errorMessage, show: true }]);
            }
        }, function (error) {

        });
    }


     private getBadgeList(data: any) {
      
            if( data.submitStatus === "3" && data.rtpReferenceNo !== null){
                    this.requestToPayService.inquiryRequestToPay().then((result: any) => {
                        let tmpresult = result.responseJSON.result;
                        if (tmpresult.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                            const count = tmpresult.value.totalAllTransaction;
                            this.updateNotification(count);
                        }
                    }, function (error) {

                    });
            }
    }

    private updateNotification(count){
        if(count !=null){
           let count = this.notificationService.getBadgeMenuCount("RTP_RECEIVE");
           this.notificationService.setBadgeMenuCount("RTP_RECEIVE",count);
        }else{
            let count = this.notificationService.getBadgeMenuCount("RTP_RECEIVE");
            this.notificationService.setBadgeMenuCount("RTP_RECEIVE",0);
        }
    }

    private AddNewBillerAfterPayBill(){
        this.permissionChangeRoute.prevUrl = 'bill-payment';
        this.permissionChangeRoute.changeRoute('MANAGE_BILLER.add');
    }

    isEDonationCategory(id: string): boolean {
        return id === this.constants.E_DONATION_CATEGORY_ID;
    }

    isCitizenCardType() {
        return this.userCardType === 'I';
    }

    public getDisplayLabel(biller: any, index: any) {
        let label = null;
        switch (index) {
            case 1 :
                if(this.translateService.currentLang === 'en') {
                    label = biller.ref1TextEn;
                }else {
                    label = biller.ref1TextEn;
                }
                break;
            case 2 :
                if(this.translateService.currentLang === 'en') {
                    label = biller.ref2TextEn;
                }else {
                    label = biller.ref2TextEn;
                }
                break;
            case 3 :
                if(this.translateService.currentLang === 'en') {
                    label = biller.ref3TextEn;
                }else {
                    label = biller.ref3TextEn;
                }
                break;

        }
        return label;
    }
}