import { Subject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { MfpApi } from '../../share/mfp/mfp-api.service';
import { Constants } from '../../share/service/constants';
import { BillPaymentBean } from '../../share/bean/bill-payment-bean';
import { ResponseStatusBean } from '../../share/bean/response-status-bean';
import { TranslateService } from "ng2-translate/src/translate.service";
import { Dateservice } from '../../share/service/date.service';

@Injectable()
export class BillPaymentService {

    private procedure: string;
    private actioncode: string;
    private currentStepWizard: Number;
    private _confirmAddBillerData: any;
    private _selectBillerDetailData: any;
    private observer: Subject<any> = new Subject();
    private billPaymentObj: BillPaymentBean = null;
    alertConfig: { title: string, type: string, message: string, show: boolean, option: any };

    constructor(private mfpApi: MfpApi,
        private constants: Constants,
        private translate: TranslateService,
        private dateService: Dateservice) {
        this.currentStepWizard = 0;
    }

    getObserver(): Subject<any> {
        return this.observer;
    }
    updateObserver(param: any) {
        this.observer.next(param);
    }

    public getBillerList() {
        var promise = new Promise((resolve, reject) => {
            let obj = {
                actionCode: this.constants.REQ_ACTION_CODE.INQUIRY_BILL,
                params: {},
                procedure: this.constants.REQ_PROCEDURE_NAME.INQUIRY_BILL
            }
            this.mfpApi.invokeProcedure(obj).then((result) => {
                resolve(result);
            }, function (error) {
                reject(error);
            });
        });
        return promise;
    }

    public verifyAddBiller(obj: any) {
        var promise = new Promise((resolve, reject) => {
            obj.actionCode = this.getActionCode();
            obj.procedure = this.getProcedure();
            this.mfpApi.invokeProcedure(obj).then((result) => {
                resolve(result);
            }, function (error) {
                reject(error);
            });
        });
        return promise;
    }

    public confirmAddBiller(obj: any) {
        var promise = new Promise((resolve, reject) => {
            obj.actionCode = this.getActionCode();
            obj.procedure = this.getProcedure();
            this.mfpApi.invokeProcedure(obj).then((result) => {
                resolve(result);
            }, function (error) {
                reject(error);
            });
        });
        return promise;
    }

    public deleteBiller(biller: any) {
        let promise = new Promise((resolve, reject) => {
            let objRequest = {
                params: {
                    billerID: biller.billerID
                },
                actionCode: this.constants.REQ_ACTION_CODE.BILLER_DELETE,
                procedure: this.constants.REQ_PROCEDURE_NAME.BILLER_DELETE
            }
            this.mfpApi.invokeProcedure(objRequest).then((result: any) => {
                resolve(result);
            }, function (error) {
                reject(error);
            });
        });
        return promise;
    }
    public getCurrentStepWizard(): Number {
        return this.currentStepWizard;
    }
    public setCurrentStepWizard(step: Number): void {
        this.currentStepWizard = step;
    }
    public getActionCode(): string {
        return this.actioncode;
    }
    public setActionCode(actioncode: string) {
        this.actioncode = actioncode;
    }
    public getProcedure(): string {
        return this.procedure;
    }
    public setProcedure(procedure: string) {
        this.procedure = procedure;
    }
    public getBillPaymentObj(): BillPaymentBean {
        return this.billPaymentObj;
    }
    public setBillPaymentObj(billPaymentBean: BillPaymentBean): void {
        this.billPaymentObj = billPaymentBean;
    }

    set confirmAddBillerData(confirmAddBillerData: any) {
        this._confirmAddBillerData = confirmAddBillerData;
    }
    get confirmAddBillerData() {
        return this._confirmAddBillerData;
    }

    set selectBillerDetailData(selectBillerDetailData: any) {
        this._selectBillerDetailData = selectBillerDetailData;
    }

    get selectBillerDetailData() {
        return this._selectBillerDetailData;
    }

    public requestInquiryBillerSchedule(data: any) {
        let promise = new Promise((resolve, reject) => {
            let objRequest = {
                params: {
                    period: data.period
                },
                actionCode: this.constants.REQ_ACTION_CODE.INQUIRY_BILL_SCHEDULE,
                procedure: this.constants.REQ_PROCEDURE_NAME.INQUIRY_BILL_SCHEDULE
            };
            this.mfpApi.invokeProcedure(objRequest).then((result: any) => {
                resolve(result);
            }, function (error) {
                reject(error);
            });
        });
        return promise;
    }
    public requestInquiryHistoryBiller(data: any) {
        let promise = new Promise((resolve, reject) => {
            let objRequest = {
                params: {
                    period: data.period,
                    paging: data.paging
                },
                actionCode: this.constants.REQ_ACTION_CODE.INQUIRY_HISTORY_PAYMENT_BILL,
                procedure: this.constants.REQ_PROCEDURE_NAME.INQUIRY_HISTORY_PAYMENT_BILL
            };
            this.mfpApi.invokeProcedure(objRequest).then((result: any) => {
                resolve(result);
            }, function (error) {
                reject(error);
            });
        });
        return promise;
    }
    public requestBillPaymentSlip(data: any) {
        console.log(data)
        let actionCode = this.constants.REQ_ACTION_CODE.BILL_PAYMENT_SLIP_PIBRIB;
        let procedure = this.constants.REQ_PROCEDURE_NAME.BILL_PAYMENT_SLIP_PIBRIB;
        if (this.isEDonationCategory(data.categoryId)) {
            console.log('isEDonationCategory')
            actionCode = this.constants.REQ_ACTION_CODE.BILL_PAYMENT_DONATION_SLIP_PIBRIB;
            procedure = this.constants.REQ_PROCEDURE_NAME.BILL_PAYMENT_DONATION_SLIP_PIBRIB;
        }
        let promise = new Promise((resolve, reject) => {
            let objRequest = {
                params: {
                    refNO: data.refNO,
                    refTxnID: data.refTxnID,
                    transactionDate: data.transactionDate,
                    deductDate: data.deductDate,
                    amount: data.amount,
                    fee: data.fee,
                    billerAliasName: data.billerAliasName,
                    ref1: data.ref1,
                    ref2: data.ref2,
                    status: data.status,
                    recurringDetail: data.recurringDetail,
                    submitStatus: data.submitStatus
                },
                actionCode: actionCode,
                procedure: procedure
            };
				this.mfpApi.invokeProcedure(objRequest).then((result: any) => {
                resolve(result);
            }, function (error) {
                reject(error);
            });
        });
        return promise;
    }

    public verifyBillPayment(billPayment: BillPaymentBean) {
        let promise = new Promise((resolve, reject) => {
            let objRequest = {
                params: {
                        fromAccountNumber: billPayment.fromAccount.accNo,
                        billerId: billPayment.toBiller.billerID,
                        billerProfileId: billPayment.toBiller.billerProfileId,
                        promptpayBillerId: billPayment.toBiller.promptPayBillerId,
                        payAmount: billPayment.payAmount,
                        effectiveDate: billPayment.effectiveDate,
                        paymentDate: billPayment.paymentDate,
                        msgLanguage: billPayment.msgLanguage,
                        immediateType: billPayment.immediateType,
                        memo: billPayment.memo,
                        recurringType: billPayment.recurringType,
                        recurringTimes: typeof billPayment.recurringTime.time === "undefined" ? 0 : billPayment.recurringTime.time,
                        scheduleType: typeof billPayment.scheduleType.schedTypeId === "undefined" ? 0 : billPayment.scheduleType.schedTypeId,
                        rtpReferenceNo: billPayment.rtpReferenceNo,
                        reference1: billPayment.toBiller.ref1,
                        reference2: billPayment.toBiller.ref2,
                        reference3: billPayment.toBiller.ref3,
                        profileCode: billPayment.toBiller.profileCode,
                        custName: billPayment.custName,
                        serviceCode: billPayment.toBiller.serviceCode || '',
                        companyCode: billPayment.toBiller.companyCode || ''
                },
                actionCode: this.constants.REQ_ACTION_CODE.VERIFY_BILL_PAYMENT,
                procedure: this.constants.REQ_PROCEDURE_NAME.VERIFY_BILL_PAYMENT
            };
            this.mfpApi.invokeProcedure(objRequest).then((result: any) => {
                if (result != null) {
                    let responseStatus = result.responseJSON.result.responseStatus;
                    let objResponse = result.responseJSON.result.value;
                    if (responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                        console.log('verifyBillPayment', result)
                        billPayment.availableBalance = objResponse.availableBalance;
                        billPayment.paymentStatus = objResponse.paymentStatus;
                        billPayment.paymentStatusDesc = objResponse.paymentStatusDesc;
                        billPayment.transactionDate = objResponse.transactionDate;
                        billPayment.verifyTransactionID = objResponse.verifyTransactionID;
                        billPayment.feeAmount = objResponse.feeAmount;
                        billPayment.paymentDate = objResponse.paymentDate;
                        billPayment.immediateType = objResponse.immediateType;
                        billPayment.toBiller.billerName = (this.translate.currentLang === 'en') ? objResponse.billerNameEn : objResponse.billerNameTh;
                        billPayment.refInfos = objResponse.refInfos;

                        resolve(billPayment);
                    } else {
                        resolve(new ResponseStatusBean(responseStatus.responseCode, responseStatus.responseMessage, responseStatus.errorMessage));
                    }
                }

            }, function (error) {
                reject(error);
            });
        });
        return promise;
    }

    public confirmBillPayment(billPayment: BillPaymentBean) {
        let promise = new Promise((resolve, reject) => {
            let objRequest = {
                params: {
                    memo: billPayment.memo,
                    verifyTransactionID: billPayment.verifyTransactionID,
                    referenceNO: billPayment.verifyOTP.otpRefcode,
                    otp: billPayment.verifyOTP.otpPin,
                    tokenOTPForCAA: billPayment.verifyOTP.tokenOtp
                },
                actionCode: this.constants.REQ_ACTION_CODE.BPS_CONFIRM_BILL_PAYMENT,
                procedure: this.constants.REQ_PROCEDURE_NAME.BPS_CONFIRM_BILL_PAYMENT
            };
            this.mfpApi.invokeProcedure(objRequest).then((result: any) => {
                if (result != null) {
                    let responseStatus = result.responseJSON.result.responseStatus;
                    let objResponse = result.responseJSON.result.value;
                    if (responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                        billPayment.masterTransactionID = objResponse.masterTransactionID;
                        billPayment.refTxnID = objResponse.refTxnId;
                        billPayment.referenceNO = objResponse.referenceNo;
                        billPayment.transactionRef = objResponse.transactionRef;
                        billPayment.submitStatus = objResponse.submitStatus;
                        billPayment.submitStatusDesc = objResponse.submitStatusDesc;
                        billPayment.feeAmount = objResponse.feeAmount;
                        billPayment.recurringTime.desc = objResponse.recurringTimes + ' ' + (objResponse.recurringTimes == 1 ? this.translate.instant('lbl.time') : this.translate.instant('lbl.times'));
                        billPayment.recurringTime.time = objResponse.recurringTimes;
                        billPayment.rtpReferenceNo = objResponse.rtpReferenceNo;
                        billPayment.billpaymentStatusDesc = objResponse.billpaymentStatusDesc;
                        billPayment.billpaymentStatusDisplay = billPayment.isSuccess() ? billPayment.submitStatusDesc: this.translate.instant("lbl.transferStatus.fail") + " - " + billPayment.billpaymentStatusDesc;
                        billPayment.transactionDate = objResponse.transactionDate;
                        billPayment.accountFromNoMarking = objResponse.accountFromNoMarking;
                        billPayment.paymentDate = objResponse.paymentDate;
                        billPayment.immediateType = objResponse.immediateType;
						billPayment.existingBillerInfo = objResponse.existingBillerInfo || 'Y';//objResponse.existingBillerInfo || null;
                        billPayment.availableBalance = objResponse.availableBalance;
                        billPayment.toBiller.billerName = (this.translate.currentLang === 'en') ? objResponse.billerNameEn : objResponse.billerNameTh;
                        billPayment.refInfos = objResponse.ref2;
                        billPayment.canPrintSlip = objResponse.canPrintSlip;

                        resolve(billPayment);
                    } else {
                        resolve(new ResponseStatusBean(responseStatus.responseCode, responseStatus.responseMessage, responseStatus.errorMessage));
                    }
                }
            }, function (error) {
                reject(error);
            });
        });
        return promise;
    }

    public verifyEditBillPayment(billPayment: BillPaymentBean) {
        let promise = new Promise((resolve, reject) => {
            let objRequest = {
                params: {
                        fromAccountNumber: billPayment.fromAccount.accNo,
                        billerId: billPayment.toBiller.billerID,
                        promptpayBillerId: billPayment.toBiller.promptPayBillerId,
                        payAmount: billPayment.payAmount,
                        effectiveDate: billPayment.effectiveDate,
                        paymentDate: billPayment.paymentDate,
                        msgLanguage: billPayment.msgLanguage,
                        immediateType: billPayment.immediateType,
                        memo: billPayment.memo,
                        recurringType: billPayment.recurringType,
                        recurringTimes: typeof billPayment.recurringTime.time === "undefined" ? 0 : billPayment.recurringTime.time,
                        scheduleType: typeof billPayment.scheduleType.schedTypeId === "undefined" ? 0 : billPayment.scheduleType.schedTypeId,
                        rtpReferenceNo: billPayment.rtpReferenceNo,
                        reference1: billPayment.toBiller.ref1,
                        reference2: billPayment.toBiller.ref2,
                        reference3: billPayment.toBiller.ref3,
                        profileCode: billPayment.toBiller.profileCode,
                        custName: billPayment.custName,
                        transactionId: billPayment.transactionID,
                        masterTransactionId: billPayment.masterTransactionID,
                        editType: billPayment.editType,
  						billerProfileId: billPayment.toBiller.billerProfileId,
                        serviceCode: billPayment.toBiller.serviceCode || '',
                        companyCode: billPayment.toBiller.companyCode || ''
                },
                actionCode: this.constants.REQ_ACTION_CODE.BPS_VERIFY_EDIT_BILL_PAYMENT,
                procedure: this.constants.REQ_PROCEDURE_NAME.BPS_VERIFY_EDIT_BILL_PAYMENT
            }
            if (billPayment.editType === this.constants.EDIT_TYPE_THIS_TIME) {
                objRequest.params.recurringType = 'N';
                objRequest.params.recurringTimes = 0;
                objRequest.params.scheduleType = 0;
            }
            this.mfpApi.invokeProcedure(objRequest).then((result: any) => {
                if (result != null) {
                    let responseStatus = result.responseJSON.result.responseStatus;
                    let objResponse = result.responseJSON.result.value;
                    if (responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {

                        billPayment.availableBalance = objResponse.availableBalance;
                        billPayment.paymentStatus = objResponse.paymentStatus;
                        billPayment.paymentStatusDesc = objResponse.paymentStatusDesc;
                        let transactionDate = this.dateService.parseDateTime(objResponse.transactionDate);
                        // billPayment.transactionDate = this.dateService.formatDate(transactionDate, 'DD MMM YYYY', this.translate.currentLang);
                        billPayment.transactionDate = objResponse.transactionDate;
                        billPayment.verifyTransactionID = objResponse.verifyTransactionID;
                        billPayment.feeAmount = objResponse.feeAmount;
                        billPayment.paymentDate = objResponse.paymentDate;
                        billPayment.immediateType = objResponse.immediateType;
                        billPayment.toBiller.billerName = (this.translate.currentLang === 'en') ? objResponse.billerNameEn : objResponse.billerNameTh;
                        
                        resolve(billPayment);
                    } else {
                        resolve(new ResponseStatusBean(responseStatus.responseCode, responseStatus.responseMessage, responseStatus.errorMessage));
                    }
                }
            }, function (error) {
                reject(error);
            });
        });
        return promise;
    }

    public confirmEditBillPayment(billPayment: BillPaymentBean) {
        let promise = new Promise((resolve, reject) => {
            let objRequest = {
                params: {
                    memo: billPayment.memo,
                    verifyTransactionID: billPayment.verifyTransactionID,
                    referenceNO: billPayment.verifyOTP.otpRefcode,
                    otp: billPayment.verifyOTP.otpPin,
                    tokenOTPForCAA: billPayment.verifyOTP.tokenOtp
                },
                actionCode: this.constants.REQ_ACTION_CODE.BPS_CONFIRM_EDIT_BILL_PAYMENT,
                procedure: this.constants.REQ_PROCEDURE_NAME.BPS_CONFIRM_EDIT_BILL_PAYMENT
            };
            this.mfpApi.invokeProcedure(objRequest).then((result: any) => {
                if (result != null) {
                    let responseStatus = result.responseJSON.result.responseStatus;
                    let objResponse = result.responseJSON.result.value;
                    if (responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {

                        billPayment.masterTransactionID = objResponse.masterTransactionID;
                        billPayment.refTxnID = objResponse.refTxnId;
                        billPayment.referenceNO = objResponse.referenceNo;
                        billPayment.transactionRef = objResponse.transactionRef;
                        billPayment.submitStatus = objResponse.submitStatus;
                        billPayment.submitStatusDesc = objResponse.submitStatusDesc;
                        billPayment.feeAmount = objResponse.feeAmount;
                        billPayment.recurringTime.desc = objResponse.recurringTimes + ' ' + (objResponse.recurringTimes == 1 ? this.translate.instant('lbl.time') : this.translate.instant('lbl.times'));
                        billPayment.recurringTime.time = objResponse.recurringTimes;
                        billPayment.rtpReferenceNo = objResponse.rtpReferenceNo;
                        billPayment.billpaymentStatusDesc = objResponse.billpaymentStatusDesc;
                        billPayment.billpaymentStatusDisplay = billPayment.isSuccess() ? billPayment.submitStatusDesc: this.translate.instant("lbl.transferStatus.fail") + " - " + billPayment.billpaymentStatusDesc;
                        billPayment.transactionDate = objResponse.transactionDate;
                        billPayment.accountFromNoMarking = objResponse.accountFromNoMarking;
                        billPayment.paymentDate = objResponse.paymentDate;
                        billPayment.immediateType = objResponse.immediateType;
                        billPayment.availableBalance = objResponse.availableBalance;
                        billPayment.toBiller.billerName = (this.translate.currentLang === 'en') ? objResponse.billerNameEn : objResponse.billerNameTh;
                        billPayment.existingBillerInfo = objResponse.existingBillerInfo || null;
                        
                        resolve(billPayment);
                    } else {
                        resolve(new ResponseStatusBean(responseStatus.responseCode, responseStatus.responseMessage, responseStatus.errorMessage));
                    }
                }
            }, function (error) {
                reject(error);
            });
        });
        return promise;
    }

    public requestRTPHistory(data: any) {
            let promise = new Promise((resolve, reject) => {
            let obj = {
                params: {
                    language: this.translate.currentLang,
                    period: data.period
                },
                actionCode: this.constants.REQ_ACTION_CODE.RTP_INQUIRY_HISTORY,
                procedure: this.constants.REQ_PROCEDURE_NAME.RTP_INQUIRY_HISTORY
            };
            this.mfpApi.invokeProcedure(obj).then((result) => {
                resolve(result);
            }, function (error) {
                reject(error);
                
            }
            );
        });
        return promise;
    }

    public requestInquiryRTPSchedule(data: any){
            let promise = new Promise((resolve, reject) => {
            // let obj = {
            //     params: {
            //         language: this._TranslateService.currentLang,
            //     },
            //     actionCode: this._Constants.REQ_ACTION_CODE.RTP_INQUIRY_INCOMING,
            //     procedure: this._Constants.REQ_PROCEDURE_NAME.RTP_INQUIRY_INCOMING
            // };
            // this._MfpApi.invokeProcedure(obj).then((result) => {
            //     resolve(result);
            // }, function (error) {
            //     reject(error);
            //     
            // }
            // );
            setTimeout(()=>{
                let data = [
                    {"requesterAccountName":"Test","receiverAccountName":"COMPANY SNOWFLAKE  ","receiverAccountDisplayName":"����ѷ �������Ť  ","requesterIdType":"MSISDN","requesterIdTypeLabel":"�������Ͷ��","requesterIdValue":"0892345678","receiverIdType":"MSISDN","receiverIdTypeLabel":"�������Ͷ��","receiverIdValue":"0892345679","terminalId":"I001000B069B0021","orderingBranch":"0001","currencyCode":"THB","amount":15000.25,"senderFee":0,"transfererFee":0,"transfereeFee":0,"additionalNote":"test note","RTPReference":"R068706900000151","expiryDate":"16/06/2017 02:00:00","status":"UNPAID","createdDate":"12/06/2017 10:35:02"},
                    {"requesterAccountName":"Test","receiverAccountName":"COMPANY SNOWFLAKE  ","receiverAccountDisplayName":"����ѷ �������Ť  ","requesterIdType":"MSISDN","requesterIdTypeLabel":"�������Ͷ��","requesterIdValue":"0892345678","receiverIdType":"MSISDN","receiverIdTypeLabel":"�������Ͷ��","receiverIdValue":"0892345679","terminalId":"I001000B069B0021","orderingBranch":"0001","currencyCode":"THB","amount":15000.25,"senderFee":0,"transfererFee":0,"transfereeFee":0,"additionalNote":"test note","RTPReference":"R068706900000150","expiryDate":"16/06/2017 02:00:00","status":"UNPAID","createdDate":"09/06/2017 09:37:59"},
                    {"requesterAccountName":"Test","receiverAccountName":"COMPANY SNOWFLAKE  ","receiverAccountDisplayName":"����ѷ �������Ť  ","requesterIdType":"MSISDN","requesterIdTypeLabel":"�������Ͷ��","requesterIdValue":"0892345678","receiverIdType":"MSISDN","receiverIdTypeLabel":"�������Ͷ��","receiverIdValue":"0892345679","terminalId":"I001000B069B0021","orderingBranch":"0001","currencyCode":"THB","amount":15000.25,"senderFee":0,"transfererFee":0,"transfereeFee":0,"additionalNote":"test note","RTPReference":"R068706900000149","expiryDate":"16/06/2017 02:00:00","status":"UNPAID","createdDate":"30/05/2017 03:01:59"},
                    {"requesterAccountName":"Test","receiverAccountName":"COMPANY SNOWFLAKE  ","receiverAccountDisplayName":"����ѷ �������Ť  ","requesterIdType":"MSISDN","requesterIdTypeLabel":"�������Ͷ��","requesterIdValue":"0892345678","receiverIdType":"MSISDN","receiverIdTypeLabel":"�������Ͷ��","receiverIdValue":"0892345679","terminalId":"I001000B069B0021","orderingBranch":"0001","currencyCode":"THB","amount":15000.25,"senderFee":0,"transfererFee":0,"transfereeFee":0,"additionalNote":"test note","RTPReference":"R068706900000146","expiryDate":"16/06/2017 02:00:00","status":"UNPAID","createdDate":"30/05/2017 02:30:55"},
                    {"requesterAccountName":"Test","receiverAccountName":"COMPANY SNOWFLAKE  ","receiverAccountDisplayName":"����ѷ �������Ť  ","requesterIdType":"MSISDN","requesterIdTypeLabel":"�������Ͷ��","requesterIdValue":"0892345678","receiverIdType":"MSISDN","receiverIdTypeLabel":"�������Ͷ��","receiverIdValue":"0892345679","terminalId":"I001000B069B0021","orderingBranch":"0001","currencyCode":"THB","amount":15000.25,"senderFee":0,"transfererFee":0,"transfereeFee":0,"additionalNote":"test note","RTPReference":"R068706900000145","expiryDate":"16/06/2017 02:00:00","status":"UNPAID","createdDate":"30/05/2017 02:30:42"},
                    {"requesterAccountName":"Test","receiverAccountName":"COMPANY SNOWFLAKE  ","receiverAccountDisplayName":"����ѷ �������Ť  ","requesterIdType":"MSISDN","requesterIdTypeLabel":"�������Ͷ��","requesterIdValue":"0892345678","receiverIdType":"MSISDN","receiverIdTypeLabel":"�������Ͷ��","receiverIdValue":"0892345679","terminalId":"I001000B069B0021","orderingBranch":"0001","currencyCode":"THB","amount":15000.25,"senderFee":0,"transfererFee":0,"transfereeFee":0,"additionalNote":"test note","RTPReference":"R068706900000144","expiryDate":"16/06/2017 02:00:00","status":"UNPAID","createdDate":"30/05/2017 02:29:28"},
                    {"requesterAccountName":"Test","receiverAccountName":"COMPANY SNOWFLAKE  ","receiverAccountDisplayName":"����ѷ �������Ť  ","requesterIdType":"MSISDN","requesterIdTypeLabel":"�������Ͷ��","requesterIdValue":"0892345678","receiverIdType":"MSISDN","receiverIdTypeLabel":"�������Ͷ��","receiverIdValue":"0892345679","terminalId":"I001000B069B0021","orderingBranch":"0001","currencyCode":"THB","amount":15000.25,"senderFee":0,"transfererFee":0,"transfereeFee":0,"additionalNote":"test note","RTPReference":"R068706900000143","expiryDate":"16/06/2017 02:00:00","status":"UNPAID","createdDate":"30/05/2017 02:25:39"},
                    {"requesterAccountName":"Test","receiverAccountName":"COMPANY SNOWFLAKE  ","receiverAccountDisplayName":"����ѷ �������Ť  ","requesterIdType":"MSISDN","requesterIdTypeLabel":"�������Ͷ��","requesterIdValue":"0892345678","receiverIdType":"MSISDN","receiverIdTypeLabel":"�������Ͷ��","receiverIdValue":"0892345679","terminalId":"I001000B069B0021","orderingBranch":"0001","currencyCode":"THB","amount":15000.25,"senderFee":0,"transfererFee":0,"transfereeFee":0,"additionalNote":"test note","RTPReference":"R068706900000142","expiryDate":"16/06/2017 02:00:00","status":"UNPAID","createdDate":"29/05/2017 10:27:13"},
                    {"requesterAccountName":"Test","receiverAccountName":"COMPANY SNOWFLAKE  ","receiverAccountDisplayName":"����ѷ �������Ť  ","requesterIdType":"MSISDN","requesterIdTypeLabel":"�������Ͷ��","requesterIdValue":"0892345678","receiverIdType":"MSISDN","receiverIdTypeLabel":"�������Ͷ��","receiverIdValue":"0892345679","terminalId":"I001000B069B0021","orderingBranch":"0001","currencyCode":"THB","amount":15000.25,"senderFee":0,"transfererFee":0,"transfereeFee":0,"additionalNote":"test note","RTPReference":"R068706900000141","expiryDate":"16/06/2017 02:00:00","status":"UNPAID","createdDate":"25/05/2017 04:03:08"},
                    {"requesterAccountName":"Test","receiverAccountName":"COMPANY SNOWFLAKE  ","receiverAccountDisplayName":"����ѷ �������Ť  ","requesterIdType":"MSISDN","requesterIdTypeLabel":"�������Ͷ��","requesterIdValue":"0892345678","receiverIdType":"MSISDN","receiverIdTypeLabel":"�������Ͷ��","receiverIdValue":"0892345679","terminalId":"I001000B069B0021","orderingBranch":"0001","currencyCode":"THB","amount":15000.25,"senderFee":0,"transfererFee":0,"transfereeFee":0,"additionalNote":"test note","RTPReference":"R068706900000139","expiryDate":"16/07/2017 02:00:00","status":"UNPAID","createdDate":"25/05/2017 03:38:38"},
                    {"requesterAccountName":"Test","receiverAccountName":"COMPANY SNOWFLAKE  ","receiverAccountDisplayName":"����ѷ �������Ť  ","requesterIdType":"MSISDN","requesterIdTypeLabel":"�������Ͷ��","requesterIdValue":"0892345678","receiverIdType":"MSISDN","receiverIdTypeLabel":"�������Ͷ��","receiverIdValue":"0892345679","terminalId":"I001000B069B0021","orderingBranch":"0001","currencyCode":"THB","amount":15000.25,"senderFee":0,"transfererFee":0,"transfereeFee":0,"additionalNote":"test note","RTPReference":"R069706900000138","expiryDate":"16/07/2017 02:00:00","status":"UNPAID","createdDate":"25/05/2017 03:19:12"},
                    {"requesterAccountName":"Test","receiverAccountName":"COMPANY SNOWFLAKE  ","receiverAccountDisplayName":"����ѷ �������Ť  ","requesterIdType":"MSISDN","requesterIdTypeLabel":"�������Ͷ��","requesterIdValue":"0892345678","receiverIdType":"MSISDN","receiverIdTypeLabel":"�������Ͷ��","receiverIdValue":"0892345679","terminalId":"I001000B069B0021","orderingBranch":"0001","currencyCode":"THB","amount":15000.25,"senderFee":0,"transfererFee":0,"transfereeFee":0,"additionalNote":"test note","RTPReference":"R069706900000137","creditNotificationReference":"1234","oneTimePassword":"5678","expiryDate":"16/07/2017 02:00:00","billPresentmentURL":"http://test.go.th/ebewkfjebwei","status":"UNPAID","createdDate":"25/05/2017 02:43:36"},
                    {"requesterAccountName":"Test","receiverAccountName":"COMPANY SNOWFLAKE  ","receiverAccountDisplayName":"COMPANY SNOWFLAKE  ","requesterIdType":"MSISDN","requesterIdTypeLabel":"�������Ͷ��","requesterIdValue":"0892345678","receiverIdType":"MSISDN","receiverIdTypeLabel":"�������Ͷ��","receiverIdValue":"0892345679","terminalId":"I001000B069B0021","orderingBranch":"0001","currencyCode":"THB","amount":10.2,"senderFee":0,"transfererFee":0,"transfereeFee":0,"additionalNote":"test note","RTPReference":"R069706900000032","creditNotificationReference":"1234","oneTimePassword":"5678","expiryDate":"16/07/2017 02:00:00","billPresentmentURL":"http://test.go.th/ebewkfjebwei","status":"UNPAID","createdDate":"16/05/2017 04:51:49"},
                    {"requesterAccountName":"Test","receiverAccountName":"COMPANY SNOWFLAKE  ","receiverAccountDisplayName":"COMPANY SNOWFLAKE  ","requesterIdType":"MSISDN","requesterIdTypeLabel":"�������Ͷ��","requesterIdValue":"0892345678","receiverIdType":"MSISDN","receiverIdTypeLabel":"�������Ͷ��","receiverIdValue":"0892345679","terminalId":"I001000B069B0021","orderingBranch":"0001","currencyCode":"THB","amount":10.2,"senderFee":0,"transfererFee":0,"transfereeFee":0,"additionalNote":"test note","RTPReference":"R069706900000031","creditNotificationReference":"1234","oneTimePassword":"5678","expiryDate":"16/07/2017 02:00:00","billPresentmentURL":"http://test.go.th/ebewkfjebwei","status":"UNPAID","createdDate":"16/05/2017 04:47:12"},
                    {"requesterAccountName":"Test","receiverAccountName":"COMPANY SNOWFLAKE  ","receiverAccountDisplayName":"����ѷ �������Ť  ","requesterIdType":"BILLERID","requesterIdValue":"0892345678","receiverIdType":"MSISDN","receiverIdTypeLabel":"�������Ͷ��","receiverIdValue":"0892345679","terminalId":"I001000B069B0021","orderingBranch":"0001","currencyCode":"THB","amount":15000.25,"senderFee":0,"transfererFee":0,"transfereeFee":0,"additionalNote":"test note","RTPReference":"R069706900000042","creditNotificationReference":"1234","oneTimePassword":"5678","billReference1":"Bill1234","billReference2":"Bill456","expiryDate":"16/06/2017 02:00:00","billPresentmentURL":"http://test.go.th/ebewkfjebwei","status":"UNPAID","createdDate":"18/05/2017 02:51:42"},
                    {"requesterAccountName":"Test","receiverAccountName":"COMPANY SNOWFLAKE  ","receiverAccountDisplayName":"����ѷ �������Ť  ","requesterIdType":"BILLERID","requesterIdValue":"0892345678","receiverIdType":"MSISDN","receiverIdTypeLabel":"�������Ͷ��","receiverIdValue":"0892345679","terminalId":"I001000B069B0021","orderingBranch":"0001","currencyCode":"THB","amount":15000.25,"senderFee":0,"transfererFee":0,"transfereeFee":0,"additionalNote":"test note","RTPReference":"R069706900000039","creditNotificationReference":"1234","oneTimePassword":"5678","billReference1":"Bill1234","billReference2":"Bill456","expiryDate":"16/07/2017 02:00:00","billPresentmentURL":"http://test.go.th/ebewkfjebwei","status":"UNPAID","createdDate":"18/05/2017 02:43:20"},
                    {"requesterAccountName":"Test","receiverAccountName":"COMPANY SNOWFLAKE  ","receiverAccountDisplayName":"COMPANY SNOWFLAKE  ","requesterIdType":"BILLERID","requesterIdValue":"0892345678","receiverIdType":"MSISDN","receiverIdTypeLabel":"�������Ͷ��","receiverIdValue":"0892345679","terminalId":"I001000B069B0021","orderingBranch":"0001","currencyCode":"THB","amount":15000.25,"senderFee":0,"transfererFee":0,"transfereeFee":0,"additionalNote":"test note","RTPReference":"R069706900000037","creditNotificationReference":"1234","oneTimePassword":"5678","billReference1":"Bill1234","billReference2":"Bill456","expiryDate":"16/07/2017 02:00:00","billPresentmentURL":"http://test.go.th/ebewkfjebwei","status":"UNPAID","createdDate":"16/05/2017 08:18:28"},
                    {"requesterAccountName":"Test","receiverAccountName":"COMPANY SNOWFLAKE  ","receiverAccountDisplayName":"COMPANY SNOWFLAKE  ","requesterIdType":"MSISDN","requesterIdTypeLabel":"�������Ͷ��","requesterIdValue":"0892345678","receiverIdType":"MSISDN","receiverIdTypeLabel":"�������Ͷ��","receiverIdValue":"0892345679","terminalId":"I001000B069B0021","orderingBranch":"0001","currencyCode":"THB","amount":15000.25,"senderFee":0,"transfererFee":0,"transfereeFee":0,"additionalNote":"test note","RTPReference":"R069706900000036","creditNotificationReference":"1234","oneTimePassword":"5678","billReference1":"Bill1234","billReference2":"Bill456","expiryDate":"16/07/2017 02:00:00","billPresentmentURL":"http://test.go.th/ebewkfjebwei","status":"UNPAID","createdDate":"16/05/2017 08:16:46"},
                    {"requesterAccountName":"Test","receiverAccountName":"COMPANY SNOWFLAKE  ","receiverAccountDisplayName":"COMPANY SNOWFLAKE  ","requesterIdType":"BILLERID","requesterIdValue":"0892345678","receiverIdType":"MSISDN","receiverIdTypeLabel":"�������Ͷ��","receiverIdValue":"0892345679","terminalId":"I001000B069B0021","orderingBranch":"0001","currencyCode":"THB","amount":15000.25,"senderFee":0,"transfererFee":0,"transfereeFee":0,"additionalNote":"test note","RTPReference":"R069706900000035","creditNotificationReference":"1234","oneTimePassword":"5678","billReference1":"Bill1234","billReference2":"Bill456","expiryDate":"16/07/2017 02:00:00","billPresentmentURL":"http://test.go.th/ebewkfjebwei","status":"UNPAID","createdDate":"16/05/2017 05:12:57"},
                    {"requesterAccountName":"Test","receiverAccountName":"COMPANY SNOWFLAKE  ","receiverAccountDisplayName":"COMPANY SNOWFLAKE  ","requesterIdType":"BILLERID","requesterIdValue":"0892345678","receiverIdType":"MSISDN","receiverIdTypeLabel":"�������Ͷ��","receiverIdValue":"0892345679","terminalId":"I001000B069B0021","orderingBranch":"0001","currencyCode":"THB","amount":10.2,"senderFee":0,"transfererFee":0,"transfereeFee":0,"additionalNote":"test note","RTPReference":"R069706900000034","creditNotificationReference":"1234","oneTimePassword":"5678","billReference1":"Bill1234","billReference2":"Bill456","billReference3":"Bill789","expiryDate":"16/07/2017 02:00:00","billPresentmentURL":"http://test.go.th/ebewkfjebwei","status":"UNPAID","createdDate":"16/05/2017 05:09:24"},
                    {"requesterAccountName":"Test","receiverAccountName":"COMPANY SNOWFLAKE  ","receiverAccountDisplayName":"COMPANY SNOWFLAKE  ","requesterIdType":"MSISDN","requesterIdTypeLabel":"�������Ͷ��","requesterIdValue":"0892345678","receiverIdType":"MSISDN","receiverIdTypeLabel":"�������Ͷ��","receiverIdValue":"0892345679","terminalId":"I001000B069B0021","orderingBranch":"0001","currencyCode":"THB","amount":10.2,"senderFee":0,"transfererFee":0,"transfereeFee":0,"additionalNote":"test note","RTPReference":"R069706900000033","creditNotificationReference":"1234","oneTimePassword":"5678","expiryDate":"16/07/2017 02:00:00","billPresentmentURL":"http://test.go.th/ebewkfjebwei","status":"UNPAID","createdDate":"16/05/2017 04:55:15"},
                    {"requesterAccountName":"Test","receiverAccountName":"COMPANY SNOWFLAKE  ","receiverAccountDisplayName":"COMPANY SNOWFLAKE  ","requesterIdType":"MSISDN","requesterIdTypeLabel":"�������Ͷ��","requesterIdValue":"0892345678","receiverIdType":"MSISDN","receiverIdTypeLabel":"�������Ͷ��","receiverIdValue":"0892345679","terminalId":"I001000B069B0021","orderingBranch":"0001","currencyCode":"THB","amount":10.2,"senderFee":0,"transfererFee":0,"transfereeFee":0,"additionalNote":"test note","RTPReference":"R069706900000024","creditNotificationReference":"1234","oneTimePassword":"5678","expiryDate":"30/06/2017 02:00:00","billPresentmentURL":"http://test.go.th/ebewkfjebwei","status":"UNPAID","createdDate":"16/05/2017 04:24:13"},
                    {"requesterAccountName":"Test","receiverAccountName":"COMPANY SNOWFLAKE  ","receiverAccountDisplayName":"COMPANY SNOWFLAKE  ","requesterIdType":"MSISDN","requesterIdTypeLabel":"�������Ͷ��","requesterIdValue":"0892345678","receiverIdType":"MSISDN","receiverIdTypeLabel":"�������Ͷ��","receiverIdValue":"0892345679","terminalId":"I001000B069B0021","orderingBranch":"0001","currencyCode":"THB","amount":10.2,"senderFee":0,"transfererFee":0,"transfereeFee":0,"additionalNote":"test note","RTPReference":"R069706900000022","creditNotificationReference":"1234","oneTimePassword":"5678","expiryDate":"30/06/2017 02:00:00","billPresentmentURL":"http://test.go.th/ebewkfjebwei","status":"UNPAID","createdDate":"16/05/2017 04:19:34"}
                ];
                let resp = {
                    responseJSON: {
                        result: {
                            value: data,
                            responseStatus: {
                                responseCode: 'RIB-I-SCC000'
                            }
                        }
                    }
                };
                resolve(resp);
            },500);
        });
        return promise;
    }

    public inquiryPayInfo(biller: any) {
        let promise = new Promise((resolve, reject) => {
            let objRequest = {
                params: {
                    promptPayBillerId: biller.requesterIdValue,//biller.requesterIdValue
                    ref1: biller.billReference1,//biller.billReference1
                    ref2: biller.billReference2//biller.billReference2
                },
                actionCode: this.constants.REQ_ACTION_CODE.INQUIRY_PAY_INFO,
                procedure: this.constants.REQ_PROCEDURE_NAME.INQUIRY_PAY_INFO
            }
            this.mfpApi.invokeProcedure(objRequest).then((result: any) => {
                resolve(result);
            }, function (error) {
                reject(error);
            });
        });
        return promise;
    }

    public inquiryPayInfoOnline(biller: any) {
        let promise = new Promise((resolve, reject) => {
            const objRequest = {
                params: {
                    companyCode: biller.companyCode || '',
                    serviceCode: biller.serviceCode || '',
                    promptPayBillerId: biller.promptPayBillerId || biller.requesterIdValue || '',//biller.requesterIdType
                    ref1: biller.ref1 || biller.billReference1,
                    ref2: biller.ref2 || biller.billReference2,
                    ref3: biller.ref3 || '',
                    ref4: biller.ref4 || ''
                },
                actionCode: this.constants.REQ_ACTION_CODE.INQUIRY_PAY_INFO_ONLINE,
                procedure: this.constants.REQ_PROCEDURE_NAME.INQUIRY_PAY_INFO_ONLINE
            };
            //Object.keys(objRequest.params).forEach((key) => (objRequest.params[key] == null) && delete objRequest.params[key]);
            this.mfpApi.invokeProcedure(objRequest).then((result: any) => {
                const responseResult = result.responseJSON.result;
                if(responseResult.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS){
                    resolve(responseResult.value);
                } else {
                    reject(responseResult.responseStatus);
                }
                
            }, function (error) {
                reject(error);
            });
        });
        return promise;
    }


    public getCustomerType() {
        var promise = new Promise((resolve, reject) => {
            let obj = {
                actionCode: this.constants.REQ_ACTION_CODE.EDONATION_INQUIRY_CUSTOMER_TYPE,
                params: {},
                procedure: this.constants.REQ_PROCEDURE_NAME.EDONATION_INQUIRY_CUSTOMER_TYPE
            }
            this.mfpApi.invokeProcedure(obj).then((result) => {
                const responseResult = result.responseJSON.result;
                if(responseResult.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS){
                    resolve(responseResult.value);
                } else {
                    reject(responseResult.responseStatus);
                }

            }, function (error) {
                reject(error);
            });
        });
        return promise;
    }

    private isEDonationCategory(id: string): boolean {
        return id === this.constants.E_DONATION_CATEGORY_ID;
    }
}

