import { ModalDirective } from 'ng2-bootstrap';
import { Constants } from '../../service/constants';
import { Dateservice } from '../../service/date.service';
import { TimelineMapFields } from './timeline-mapfields';
import { UtilService } from '../../service/util.service';
import { Component, Input, ViewChild, OnInit, OnChanges } from '@angular/core';
import { TranslateService } from "ng2-translate/src/translate.service";
import { BankCodeDataService } from '../../service/bankcode-data.service';
import { FundTransferService } from '../../service/fund-transfer.service';
import { CurrencyFormatterPipe } from '../../pipe/currency-formatter.pipe';
import { BillPaymentRequestToPayService } from '../../../pages/bill-payment-request-to-pay/bill-payment-request-to-pay.service';
@Component({
    selector: 'timeline-modal-message',
    templateUrl: 'timeline-modal.html',
    providers: [TimelineMapFields]
})
export class TimelineModalComponent implements OnInit, OnChanges {

    modalData: any;
    anyIDTypeList: any;
    anyIDFromDesc: string;

    @Input('config') config: any;
    @Input('key') selectKey: string;
    @Input('type') selectType: string;
    @Input('title') selectTitle: string;
    @Input('size') optionalSize: string;

    @ViewChild('timelineModalMessage') public timelineModalMessage: ModalDirective;

    constructor(public dateservice: Dateservice,
        public translateService: TranslateService,
        public bankCodeDataService: BankCodeDataService,
        public timelineMapFields: TimelineMapFields,
        public fundTransferService: FundTransferService,
        public billPaymentRequestToPayService: BillPaymentRequestToPayService,
        public currencyFormatter: CurrencyFormatterPipe,
        public constants: Constants,
        public utilService: UtilService) {
    }

    ngOnChanges(changes: any){
        if(changes.config && changes.config.currentValue.data && 
            changes.config.currentValue.data.anyIDTypeList && 
            changes.config.currentValue.data.prepareData){
            this.config.data.anyIDTypeList = changes.config.currentValue.data.anyIDTypeList;
            this.initialData(changes.config.currentValue.data.prepareData);
            this.timelineModalMessage.show();
        }
    }

    ngOnInit(): void {
        this.modalData = {
            fromBankCode: '',
            accountFromName: '',
            accountFromNumber: '',
            toBankCode: '',
            accountToName: '',
            accountToNumber: '',
            paymentFor: '',
            biller: '',
            categoryId: '',
            ref1: '',
            ref2: '',
            amount: '',
            referenceNumber: '',
            receivedDate: '',
            transactionDate: '',
            recurringType: '',
            recurringTimes: '',
            toEmail: '',
            toMobileNumber: '',
            msgLanguage: '',
            note: '',
            fundTransferTypeDescToDisplay: '',
            transferTimeName: '',
            debitDate: '',
            anyIDType: this.constants.ANYID_TYPE_BANK_ACCOUNT,
            rtpReferenceNo: '',
            requesterAccountName: '',
            Type: '',
            requesterIdValue: '',
            expiryDate: '',
            ref3: '',
            requesterIdType: '',
            feeAmount: '',
            rtpMsgType: '',
            receiverAccountName: '',
            receiverIdValue: '',
            receiverIdTypeLabel: '',
            receiverIdType: '',
            profileCode: '',
            promptPayBillerId: '',
            statusDesc: '',
            transactionRef: '',
            ref1Text: '',
            ref2Text: '',
            ref3Text: ''
        };
    }

    private initialData(data: any) {
        
        if (!data) return;
          
          
        this.anyIDTypeList = this.config.data.anyIDTypeList || [];
        let mapfields = this.timelineMapFields.data[this.selectKey];
        console.log(data)
        console.log('this.selectType', this.selectType)
        let transactionDate = this.dateservice.parseDateTime(data[mapfields["transactionDate"]]);
        let txtTransactionDate = this.dateservice.formatDate(transactionDate, 'DD MMM YYYY HH:mm:ss', this.translateService.currentLang);

        let expiryDate = this.dateservice.parseDateTime(data[mapfields["expiryDate"]]);
        let txtExpiryDate = this.dateservice.formatDate(expiryDate, 'DD MMM YYYY HH:mm:ss', this.translateService.currentLang);
        let txtAmount = this.currencyFormatter.transform(data[mapfields["amount"]]) || '0.00';
        let receivedDate;
        let txtReceivedDate;
        let debitDate;
        let txtDebitDate;
        
        this.modalData = {
            fromBankCode: data[mapfields["fromBankCode"]] || this.constants.KKP_BANK_CODE,
            fromBankName: data[mapfields["fromBankName"]],
            accountFromName: data[mapfields["accountFromName"]],
            accountFromNumber: data[mapfields["accountFromNumber"]],
            toBankCode: data[mapfields["toBankCode"]] || this.constants.KKP_BANK_CODE,
            accountToName: data[mapfields["accountToName"]],
            accountToNumber: data[mapfields["accountToNumber"]],
            paymentFor: data[mapfields["paymentFor"]],
            biller: data[mapfields["biller"]],
            categoryId: data[mapfields["categoryId"]],
            ref1: data[mapfields["ref1"]],
            ref2: data[mapfields["ref2"]],
            ref3: data[mapfields["ref3"]],
            referenceNumber: data[mapfields["referenceNumber"]],
            recurringType: data[mapfields["recurringType"]],
            recurringTimes: data[mapfields["recurringTimes"]],
            toEmail: data[mapfields["toEmail"]],
            toMobileNumber: data[mapfields["toMobileNumber"]],
            msgLanguage: data[mapfields["msgLanguage"]],
            note: data[mapfields["note"]],
            fundTransferTypeDescToDisplay: data[mapfields["fundTransferTypeDescToDisplay"]],
            transferTimeName: data[mapfields["transferTimeName"]],
            anyIDType: data[mapfields["anyIDType"]] || this.constants.ANYID_TYPE_BANK_ACCOUNT,
            toBankName: data[mapfields["bankName"]],
            status: data[mapfields["status"]],
            errorMsg: data[mapfields["errorMsg"]],
            //RTP
            rtpReferenceNo: data[mapfields["rtpReferenceNo"]],
            requesterAccountName: data[mapfields["requesterAccountName"]],
            Type: data[mapfields["Type"]],
            requesterIdValue: data[mapfields["requesterIdValue"]],
            expiryDate: data[mapfields["expiryDate"]],
            requesterIdType: data[mapfields["requesterIdType"]],
            rtpMsgType: data[mapfields["rtpMsgType"]],
            receiverAccountName: data[mapfields["receiverAccountName"]],
            receiverIdValue: data[mapfields["receiverIdValue"]],
            receiverIdTypeLabel: data[mapfields["receiverIdTypeLabel"]],
            requesterIdTypeLabel: data[mapfields["requesterIdTypeLabel"]],
            receiverIdType: data[mapfields["receiverIdType"]],
            statusDesc: data[mapfields["statusDesc"]],
            transactionRef: data[mapfields["transactionRef"]],
            ref1Text: this.translateService.instant('lbl.ref1'),
            ref2Text: this.translateService.instant('lbl.ref2'),
            ref3Text: this.translateService.instant('lbl.ref3')
        };

        if (this.selectType === 'fundtransfer') {
            receivedDate = this.dateservice.parseDate(data[mapfields["receivedDate"]]);
            txtReceivedDate = this.dateservice.formatDate(receivedDate, 'DD MMM YYYY', this.translateService.currentLang);
            debitDate = this.dateservice.parseDate(data[mapfields["debitDate"]]);
            txtDebitDate = this.dateservice.formatDate(debitDate, 'DD MMM YYYY', this.translateService.currentLang);
            // Get fee detail
            if (this.selectKey && this.selectKey.indexOf('schedule') > -1) {
                let objRequest = { transactionID: data["transactionID"] };
                
                this.fundTransferService.requestTransferFee(objRequest).then((objResponse: any) => {
                    let result = objResponse.responseJSON.result;
                    if (result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                        let feeAmount = result.value.fee;
                        this.modalData.feeAmount = this.currencyFormatter.transform(feeAmount);
                    }
                }, function (error) {
                    
                });
            } else {
                this.modalData.feeAmount = this.currencyFormatter.transform(data[mapfields["fee"]]) || '0.00';
            }
        } else if(this.selectType === 'biller') {
            debitDate = this.dateservice.parseDate(data[mapfields["debitDate"]]);
            txtDebitDate = this.dateservice.formatDate(debitDate, 'DD MMM YYYY', this.translateService.currentLang);
            if (this.selectKey && this.selectKey.indexOf('schedule') > -1) {
                let objRequest = { transactionID: data["transactionID"] };
                
                this.billPaymentRequestToPayService.requestBillPaymentFee(objRequest).then((objResponse: any) => {
                    let result = objResponse.responseJSON.result;
                    if (result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                        let feeAmount = result.value.feeAmount;
                        this.modalData.feeAmount = this.currencyFormatter.transform(feeAmount);
                    }
                }, function (error) {
                    
                });
            } else {
                this.modalData.feeAmount = this.currencyFormatter.transform(data[mapfields["feeAmount"]]) || '0.00';
            }
            this.modalData['promptPayBillerId'] = data['promptPayBillerId'];
            this.modalData['profileCode'] = data['profileCode'];
            this.modalData['billerProfileId'] = data['billerProfileId'];
            this.modalData['categoryId'] = data['categoryId'];

            if (data['refInfos']) {
                let refInfos  = data['refInfos'];
                for (let i=0; i < refInfos.length; i++) {
                    let refInfo = refInfos[i];
                    let label = this.getDisplayLabel(refInfo);
                    switch (i) {
                        case 0:
                            //ref1
                            if(!label) {
                                this.modalData.ref1Text = this.translateService.instant('lbl.ref1')
                            }else {
                                this.modalData.ref1Text = label
                            }
                            this.modalData.ref1 = this.getDisplayValue(refInfo);
                            break;
                        case 1:
                            //ref2
                            if(!label) {
                                this.modalData.ref2Text = this.translateService.instant('lbl.ref2')
                            }else {
                                this.modalData.ref2Text = label
                            }
                            this.modalData.ref2 = this.getDisplayValue(refInfo);
                            break;
                        case 2:
                            //ref1
                            if(!label) {
                                this.modalData.ref3Text = this.translateService.instant('lbl.ref3')
                            }else {
                                this.modalData.ref3Text = label
                            }
                            this.modalData.ref3 = this.getDisplayValue(refInfo);
                            break;
                    }
                }
            }

        } else if(this.selectType === 'RTP'){
            this.modalData.Type = this.modalData.rtpMsgType === 'INCOMING' ? this.modalData.requesterIdTypeLabel:this.modalData.receiverIdTypeLabel;
            this.modalData.feeAmount = this.currencyFormatter.transform(data[mapfields["fee"]]) || '0.00';
            this.modalData['status'] = data['statusDesc'];
        }
        this.modalData.amount           = txtAmount;
        this.modalData.debitDate        = txtDebitDate;
        this.modalData.receivedDate     = txtReceivedDate;
        this.modalData.transactionDate  = txtTransactionDate;
        this.modalData.expiryDate       = txtExpiryDate;

        this.anyIDFromDesc = (this.modalData.anyIDType === this.constants.ANYID_TYPE_BANK_ACCOUNT) ? this.modalData.toBankName : this.anyIDTypeList[this.modalData.anyIDType].desc;
    }

    public show(data: any): void {
        this.initialData(data);
        this.timelineModalMessage.show();
        this.utilService.scrollToTop();
    }

    public hide(): void {
        this.timelineModalMessage.hide();
    }

    public isEDonationCategory(id: string): boolean {
        return id === this.constants.E_DONATION_CATEGORY_ID;
    }

    private getDisplayLabel(refInfo: any) {
        let label = null;
        if(this.translateService.currentLang === 'en') {
            if(refInfo && refInfo.textEn) {
                label = refInfo.textEn;
            }
        }else {
            if(refInfo && refInfo.textTh) {
                label = refInfo.textTh;
            }
        }
        return label;
    }

    private getDisplayValue(refInfo: any) {
        return refInfo.value;
    }
}