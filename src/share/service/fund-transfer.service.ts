import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { Dictionary } from '../../share/bean/dictionary';
import { MfpApi } from '../../share/mfp/mfp-api.service';
import { Constants } from '../../share/service/constants';
import { AccountBean } from '../../share/bean/account-bean';
import { TransferBean } from '../../share/bean/transfer-bean';
import { TermTypeBean } from '../../share/bean/term-type-bean';
import { TransferTimeBean } from '../../share/bean/transfer-time-bean';
import { TranslateService } from "ng2-translate/src/translate.service";
import { ResponseStatusBean } from '../../share/bean/response-status-bean';
import { TransferStatusBean } from '../../share/bean/transfer-status-bean';
import { MasterDataService } from '../../share/service/master-data.service';
import { TransferDecisionBean } from '../../share/bean/transfer-decision-bean';

@Injectable()
export class FundTransferService {
  private _invokeOption = {adapter: 'FundTransferAdapter'};
  private transferObj: TransferBean = null;
  private observer: Subject<any> = new Subject();
  private accountAfterFund: AccountBean = null;

  constructor(
    private mfpApi: MfpApi,
    private constants: Constants,
    private translate: TranslateService,
    private masterDataService: MasterDataService
  ) {
  }

  getObserver(): Subject<any> {
    return this.observer;
  }
  updateObserver(param: any) {
    this.observer.next(param);
  }

  public getTransferObj(): any {
    return this.transferObj;
  }
  public setTransferObj(transferObj: any) {
    this.transferObj = transferObj;
  }

  get newAccountAfterFund(): AccountBean {
    return this.accountAfterFund;
  }
  set newAccountAfterFund(account: AccountBean) {
    this.accountAfterFund = account;
  }

  prepareFundTransfer(transferObj: TransferBean) {

    

    // Check if new account, then change value to -1. 
    let catId = transferObj.destAccount.category.catId == 999 ? -1 : transferObj.destAccount.category.catId;

    let objRequest = {
      params: {
        language: this.translate.currentLang,
        fromAccount: transferObj.srcAccount.accId + ":" + transferObj.srcAccount.accNo,
        toAccount: catId + "," + transferObj.destAccount.accId + ":" + transferObj.destAccount.accNo,
        toBankCode: transferObj.destAccount.anyIDType.anyIDType === this.constants.ANYID_TYPE_BANK_ACCOUNT ? transferObj.destAccount.bank.bankCode : '',
        amount: transferObj.transferAmount,
        immediateType: transferObj.immediateType,
        transferDate: transferObj.effectiveDate,
        alertEmail: transferObj.notifyEmail,
        alertSMS: transferObj.notifyMobileNo,
        alertLanguage: transferObj.notifyLang,
        toAccountName: transferObj.destAccount.accName,
        anyIDType: transferObj.destAccount.anyIDType.anyIDType,
        recurringType: transferObj.recurringType,
        scheduleType: transferObj.scheduleType.schedTypeId,
        recurringTime: transferObj.recurringTime.time,
        rtpReferenceNo: transferObj.rtpReferenceNo
      }, 
      actionCode: this.constants.REQ_ACTION_CODE.PREPARE_FUND_TRANSFER,
      procedure: this.constants.REQ_PROCEDURE_NAME.PREPARE_FUND_TRANSFER
    };

    let p = new Promise((resolve, reject) => {
      this.mfpApi.invokeProcedure(objRequest).then((objResponse: any) => {
        if (objResponse != null) {
          let responseStatus = objResponse.responseJSON.result.responseStatus;

          if (responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {

            let srcAccount = transferObj.srcAccount as AccountBean;
            let destAccount = transferObj.destAccount as AccountBean;
            let transferTimeList = this.masterDataService.getTransferTimeList();

            let data = objResponse.responseJSON.result.value;
            transferObj.verifyTxnID = data.verifyTransactionId;
            transferObj.txnDate = data.transactionDate;
            transferObj.isOwnerAccount = this.constants.OWNER_ACCOUNT == data.ownerAccount;
            transferObj.isRequireOtp = data.requireOtp;
            transferObj.transferDecisionList = [];
            
            srcAccount.accName = data.fundTransferRequest.fromAccountName;
            transferObj.srcAccount = srcAccount;

            if (data.toAccountName !== null && data.toAccountName !== '') {
              destAccount.accName = data.toAccountName;
            }

            transferObj.destAccount = destAccount;

            data.atsTransferDetails.forEach(element => {
              let transferDecision = new TransferDecisionBean();
              transferDecision.RIBTransferTypeCode = element.transferTypeCode;
              transferDecision.feeAmount = element.atsSummaryFee.summaryFee;
              transferDecision.desc = element.atsSummaryFee.displayTransferType;
              transferDecision.debitDate = element.atsSummaryFee.transferDate;
              transferDecision.debitTime = transferTimeList.find(x => x.code === element.atsSummaryFee.debitTime) || new TransferTimeBean();
              transferDecision.creditDate = element.atsSummaryFee.receiveDate;
              transferDecision.creditTime = transferTimeList.find(x => x.code === element.atsSummaryFee.creditTime) || new TransferTimeBean();
              transferObj.transferDecisionList.push(transferDecision);
            });

            
            resolve(transferObj);
          } else {
            
            resolve(new ResponseStatusBean(responseStatus.responseCode, responseStatus.responseMessage, responseStatus.errorMessage));
          }
        }

      }, function (error) {
        
      });
    });

    return p;
  }

  submitFundTransfer(transferObj: TransferBean) {
    

    let referenceDetail = transferObj.note;

    let objRequest = {
      params: {
        language: this.translate.currentLang,
        verifyTransactionId: transferObj.verifyTxnID,
        toAccountName: transferObj.destAccount.accName,
        transferTypeCode: transferObj.transferType.code,
        referenceDetail: referenceDetail,
        verifyOTPRequest: transferObj.verifyOTP == null ? {} : {
          referenceNO: transferObj.verifyOTP.otpRefcode,
          otp: transferObj.verifyOTP.otpPin,
          tokenOTPForCAA: transferObj.verifyOTP.tokenOtp
        }
      },
      actionCode: this.constants.REQ_ACTION_CODE.FUND_TRANSFER,
      procedure: this.constants.REQ_PROCEDURE_NAME.FUND_TRANSFER
    };

    let p = new Promise((resolve, reject) => {
      this.mfpApi.invokeProcedure(objRequest).then((objResponse: any) => {
        if (objResponse != null) {
          let responseStatus = objResponse.responseJSON.result.responseStatus;

          if (responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {

            let data = objResponse.responseJSON.result.value;
            let transferRequest = data.fundTransferRequest;
            let transferTimeList = this.masterDataService.getTransferTimeList();

            let srcAccount = transferObj.srcAccount;
            srcAccount.accNo = transferRequest.fromAccount;
            srcAccount.accName = transferRequest.fromAccountName;
            srcAccount.aliasName = transferRequest.fromAccountAliasName;
            srcAccount.balance = data.fromAccountBalance;
            transferObj.srcAccount = srcAccount;

            let anyIDType = transferObj.destAccount.anyIDType;
            anyIDType.anyIDType = transferRequest.anyIDType;

            let destAccount = transferObj.destAccount;
            destAccount.accNo = transferRequest.toAccount;
            destAccount.accName = data.toAccountName;
            destAccount.aliasName = transferRequest.toAccountAliasName;
            destAccount.anyIDType = anyIDType;
            transferObj.destAccount = destAccount;

            let scheduleType = transferObj.scheduleType;
            scheduleType.schedTypeId = transferRequest.scheduleType;
            transferObj.scheduleType = scheduleType;

            let recurringTime = transferObj.recurringTime;
            recurringTime.time = transferRequest.recurringTime;
            recurringTime.desc = recurringTime.time + " " + (recurringTime.time == 0 || recurringTime.time == 1 ? this.translate.instant("lbl.time") : this.translate.instant("lbl.times"));

            transferObj.immediateType = transferRequest.immediateType;
            transferObj.effectiveDate = transferRequest.transferDate;
            transferObj.notifyLang = transferRequest.alertLanguage;
            transferObj.notifyMobileNo = transferRequest.alertSMS;
            transferObj.notifyEmail = transferRequest.alertEmail;
            transferObj.recurringType = transferRequest.recurringType;
            transferObj.recurringTime = recurringTime;
            transferObj.refNo = data.refNo;
            transferObj.transactionRef = data.transactionRef;
            transferObj.txnDate = data.txnDate;
            transferObj.recvDate = data.txnReceiveDate || data.receiveDate;
            transferObj.note = referenceDetail;
            transferObj.transferAmount = transferRequest.amount;
            transferObj.isAllowPrint = data.canPrintSlip;
            transferObj.txnId = data.txnId;
            transferObj.txnMasId = data.txnMasId;
            transferObj.refTxnId = data.refTxnId;
            transferObj.existingTransferAccountNo = data.existingTransferAccountNo;
            transferObj.transactionRef = data.transactionRef;

            let transferStatus = new TransferStatusBean();
            transferStatus.code = data.transactionStatusCode || data.fundTransferStatusCode;
            transferStatus.name = this.getTransferStatusNameDisplay(data);
            transferStatus.desc = this.getTransferStatusDescDisplay(data);

            let transferDecision = new TransferDecisionBean();

            transferDecision.transferStatus = transferStatus
            transferDecision.creditDate = data.receiveDate;
            transferDecision.creditTime = transferTimeList.find(x => x.code == data.creditTime) || new TransferTimeBean();
            transferDecision.debitDate = data.deducedDate;
            transferDecision.debitTime = transferTimeList.find(x => x.code == data.debitTime) || new TransferTimeBean();
            transferDecision.feeAmount = data.feeAmount;
            transferDecision.desc = data.displayTransferType;

            transferObj.transferDecisionList = [];
            transferObj.transferDecisionList.push(transferDecision);

            transferObj.addAccountType = data.addAccountType;

            transferObj.maskingToAccount = transferRequest.maskingToAccount;
            transferObj.maskingFromAccount = transferRequest.maskingFromAccount;

            
            resolve(transferObj);
          } else {
            
            resolve(new ResponseStatusBean(responseStatus.responseCode, responseStatus.responseMessage, responseStatus.errorMessage));
          }
        }
      }, function (error) {
        
      });
    });

    return p;
  }

  prepareFundTransferTermDeposit(transferObj: TransferBean) {
    
    let termTypes: Dictionary = {};

    // Check if new account, then change value to -1. 
    let catId = transferObj.destAccount.category.catId == 999 ? -1 : transferObj.destAccount.category.catId;

    let objRequest = {
      params: {
        language: this.translate.currentLang,
        fromAccount: transferObj.srcAccount.accId + ":" + transferObj.srcAccount.accNo,
        toAccount: catId + "," + transferObj.destAccount.accId + ":" + transferObj.destAccount.accNo,
        amount: transferObj.transferAmount,
        alertEmail: transferObj.notifyEmail,
        alertSMS: transferObj.notifyMobileNo,
        alertLanguage: transferObj.notifyLang
      },
      actionCode: this.constants.REQ_ACTION_CODE.PREPARE_FUND_TRANSFER_TD,
      procedure: this.constants.REQ_PROCEDURE_NAME.PREPARE_FUND_TRANSFER_TD
    }

    let p = new Promise((resolve, reject) => {
      this.mfpApi.invokeProcedure(objRequest).then((objResponse: any) => {
        if (objResponse != null) {
          let responseStatus = objResponse.responseJSON.result.responseStatus;

          if (responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
            let data = objResponse.responseJSON.result.value;

            let index = 0;
            data.fcconTdTermTypes.forEach(element => {
              if(element){
                let termTypeObj = new TermTypeBean();
                termTypeObj.termNameTh = element.termNameTha;
                termTypeObj.termNameEn = element.termNameEng;
                termTypeObj.termCode = element.termCode;
                termTypeObj.term = element.term;
                termTypeObj.minAmount = element.minAmount;
                termTypeObj.maxAmount = element.maxAmount;
                termTypeObj.freqIntPayCode = element.freqIntPayCode;
                termTypeObj.freqIntPay = element.freqIntPay;
                termTypeObj.freqIntPayDescTh = element.freqIntPayDescTha;
                termTypeObj.freqIntPayDescEn = element.freqIntPayDescEng;
                termTypeObj.language = this.translate.currentLang;
                termTypeObj.productCode = element.productCode;
                termTypeObj.currencyType = element.currencyType;
                termTypeObj.productTypeDescription = element.productTypeDescription;

                // var termMonth = termTypeObj.termMonth;
                termTypes[index] = termTypes[index] || [];
                termTypes[index].push(termTypeObj);
                index++;
              }
              
            });

            
            resolve({ 'termTypes': termTypes, 'benefitAccList': data.benefitAccList});
          } else {
            
            resolve(new ResponseStatusBean(responseStatus.responseCode, responseStatus.responseMessage, responseStatus.errorMessage));
          }
        }
      }, function (error) {
        
      });
    });

    return p;
  }

  getRatesByCifType(transferObj: TransferBean) {
    

    let objRequest = {
      params: {
        language: this.translate.currentLang,
        fromAccount: transferObj.srcAccount.accId + ":" + transferObj.srcAccount.accNo,
        toAccount: "0," + transferObj.destAccount.accId + ":" + transferObj.destAccount.accNo,
        amount: transferObj.transferAmount,
        alertEmail: transferObj.notifyEmail,
        alertSMS: transferObj.notifyMobileNo,
        alertLanguage: transferObj.notifyLang,
        fcconTdTermType: {
          termNameTha: transferObj.termType.termNameTh,
          termNameEng: transferObj.termType.termNameEn,
          term: transferObj.termType.term,
          productTypeDescription: transferObj.termType.productTypeDescription,
          termCode: transferObj.termType.termCode,
          minAmount: transferObj.termType.minAmount,
          maxAmount: transferObj.termType.maxAmount,
          freqIntPayCode: transferObj.termType.freqIntPayCode,
          freqIntPay: transferObj.termType.freqIntPay,
          freqIntPayDescTha: transferObj.termType.freqIntPayDescTh,
          freqIntPayDescEng: transferObj.termType.freqIntPayDescEn,
          productCode: transferObj.termType.productCode,
          currencyType: transferObj.termType.currencyType,
          benefitAcc: transferObj.benefitAcc
        }
      },
      actionCode: this.constants.REQ_ACTION_CODE.GET_RATES_BY_CIF_TYPE,
      procedure: this.constants.REQ_PROCEDURE_NAME.GET_RATES_BY_CIF_TYPE
    }

    let p = new Promise((resolve, reject) => {
      this.mfpApi.invokeProcedure(objRequest).then((objResponse: any) => {
        if (objResponse != null) {
          let responseStatus = objResponse.responseJSON.result.responseStatus;

          if (responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
            let data = objResponse.responseJSON.result.value;

            transferObj.verifyTxnID = data.verifyTransactionId;
            transferObj.txnDate = data.txnDate;
            transferObj.refTxnId = data.refTxnId;

            let transferDecision = new TransferDecisionBean();
            transferDecision.creditDate = data.receiveDate;
            transferDecision.debitDate = data.deducedDate;
            transferDecision.intRate = data.interestRate;
            transferDecision.intCond = data.interestCon;
            transferDecision.feeAmount = 0;

            transferObj.transferDecisionList = [];
            transferObj.transferDecisionList.push(transferDecision);
            transferObj.benefitAcc = data.benefitAcc;          

            
            resolve(transferObj);
          } else {
            
            resolve(new ResponseStatusBean(responseStatus.responseCode, responseStatus.responseMessage, responseStatus.errorMessage));
          }
        }
      }, function (error) {
        
      });
    });

    return p;
  }

  submitFundTransferTermDeposit(transferObj: TransferBean) {
    

    let referenceDetail = transferObj.note;

    let objRequest = {
      params: {
        language: this.translate.currentLang,
        verifyTransactionId: transferObj.verifyTxnID,
        referenceDetail: referenceDetail
      },
      actionCode: this.constants.REQ_ACTION_CODE.FUND_TRANSFER_TD,
      procedure: this.constants.REQ_PROCEDURE_NAME.FUND_TRANSFER_TD
    };

    let p = new Promise((resolve, reject) => {
      this.mfpApi.invokeProcedure(objRequest).then((objResponse: any) => {
        if (objResponse != null) {
          let responseStatus = objResponse.responseJSON.result.responseStatus;

          if (responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {

            let data = objResponse.responseJSON.result.value;
            let transferRequest = data.fundTransferTDRequest;
            let fcconTdTermType = transferRequest.fcconTdTermType;

            let srcAccount = transferObj.srcAccount;
            srcAccount.aliasName = data.fromAccountAliasName;
            srcAccount.accName = data.fromAccountName;
            srcAccount.balance = data.fromAccountBalance;
            transferObj.srcAccount = srcAccount;

            let destAccount = transferObj.destAccount;
            destAccount.aliasName = data.toAccountAliasName;
            destAccount.accName = data.toAccountName;
            transferObj.destAccount = destAccount;

            transferObj.refNo = data.refNo;
            transferObj.transactionRef = data.transactionRef;
            transferObj.depositNo = data.depositNo;
            transferObj.txnDate = data.txnDate;
            transferObj.valueDate = data.valueDate;
            transferObj.maturityDate = data.maturityDate;

            let termType = transferObj.termType;
            termType.termNameTh = fcconTdTermType.termNameTha;
            termType.termNameEn = fcconTdTermType.termNameEng;
            termType.termCode = fcconTdTermType.termCode;
            termType.term = fcconTdTermType.term;
            termType.minAmount = fcconTdTermType.minAmount;
            termType.maxAmount = fcconTdTermType.maxAmount;
            termType.freqIntPayCode = fcconTdTermType.freqIntPayCode;
            termType.freqIntPay = fcconTdTermType.freqIntPay;
            termType.freqIntPayDescTh = fcconTdTermType.freqIntPayDescTha;
            termType.freqIntPayDescEn = fcconTdTermType.freqIntPayDescEng;
            termType.productCode = fcconTdTermType.productCode;
            termType.currencyType = fcconTdTermType.currencyType;
            termType.productTypeDescription = fcconTdTermType.productTypeDescription;
            transferObj.termType = termType;
            transferObj.isAllowPrint = true;
            transferObj.existingTransferAccountNo = data.existingTransferAccountNo;
            transferObj.transactionRef = data.transactionRef;

            let transferStatus = new TransferStatusBean();
            transferStatus.code = data.transactionStatusCode || data.fundTransferStatusCode;
            transferStatus.desc = this.getTransferStatusDescDisplay(data);

            let transferDecision = new TransferDecisionBean();
            transferDecision.transferStatus = transferStatus
            transferDecision.creditDate = data.receiveDate;
            transferDecision.debitDate = data.deducedDate;
            transferDecision.intRate = data.interestRate;
            transferDecision.intCond = data.interestCon;
            transferDecision.feeAmount = 0;

            transferObj.transferDecisionList = [];
            transferObj.transferDecisionList.push(transferDecision);

            
            resolve(transferObj);
          } else {
            
            resolve(new ResponseStatusBean(responseStatus.responseCode, responseStatus.responseMessage, responseStatus.errorMessage));
          }
        }
      }, function (error) {
        
      });
    });

    return p;
  }

  getTransferStatusNameDisplay(data: any): string {
    let fundTransferStatusCode = data.fundTransferStatusCode || "";
    let transferStatusCodeList = [this.constants.TRANSFER_STATUS_SUCCESS, this.constants.TRANSFER_STATUS_PENDING, this.constants.TRANSFER_STATUS_PROCESSING];

    if (fundTransferStatusCode != "" && transferStatusCodeList.indexOf(fundTransferStatusCode) == -1) {
      return this.translate.instant("lbl.transferStatus.fail");
    }

    return data.fundTransferStatusDesc || "";
  }

  getTransferStatusDescDisplay(data: any): string {
    let fundTransferStatusCode = data.fundTransferStatusCode || "";
    let transferStatusCodeList = [this.constants.TRANSFER_STATUS_SUCCESS, this.constants.TRANSFER_STATUS_PENDING, this.constants.TRANSFER_STATUS_PROCESSING];

    if (fundTransferStatusCode != "" && transferStatusCodeList.indexOf(fundTransferStatusCode) == -1) {
      return this.translate.instant("lbl.transferStatus.fail") + " - " + data.fundTransferStatusDesc;
    }

    return data.fundTransferStatusDesc || "";
  }

  public requestInquiryFundTransferSchedule(data: any) {
    let adapter = {adapter:'FundTransferAdapter'};
    let promise = new Promise((resolve, reject) => {
      let objRequest = {
        params: {
          period: data.period
        },
        actionCode: this.constants.REQ_ACTION_CODE.INQUIRY_FUND_TRANSFER,
        procedure: this.constants.REQ_PROCEDURE_NAME.INQUIRY_FUND_TRANSFER
      };
      
      this.mfpApi.invokeProcedure(objRequest, adapter).then((result: any) => {
        resolve(result);
      }, function (error) {
        reject(error);
        
      });
    });
    return promise;
  }

  public requestInquiryHistoryFundtransfer(data: any) {
    let adapter = {adapter:'FundTransferAdapter'};
    let promise = new Promise((resolve, reject) => {
      let objRequest = {
        params: {
          period: data.period,
          paging: data.paging,
          accountNo: data.accountNo
        },
        actionCode: this.constants.REQ_ACTION_CODE.INQUIRY_HISTORY_FUND_TRANSFER,
        procedure: this.constants.REQ_PROCEDURE_NAME.INQUIRY_HISTORY_FUND_TRANSFER
      };
      
      this.mfpApi.invokeProcedure(objRequest, adapter).then((result: any) => {
        resolve(result);
      }, function (error) {
        reject(error);
        
      });
    });
    return promise;
  }

  public requestTransferFee(data: any) {
    let promise = new Promise((resolve, reject) => {
      let objRequest = {
        params: {
          transactionId: data.transactionID
        },
        actionCode: this.constants.REQ_ACTION_CODE.INQUIRY_TRANSFER_FEE,
        procedure: this.constants.REQ_PROCEDURE_NAME.INQUIRY_TRANSFER_FEE
      };
      
      this.mfpApi.invokeProcedure(objRequest,this._invokeOption).then((result: any) => {
        resolve(result);
      }, function (error) {
        reject(error);
        
      });
    });
    return promise;
  }

  prepareSchedule(transferObj: TransferBean) {
    

    // Check if new account, then change value to -1. 
    let catId = transferObj.destAccount.category.catId == 999 ? -1 : transferObj.destAccount.category.catId;

    let objRequest = {
      params: {
        language: this.translate.currentLang,
        fromAccount: transferObj.srcAccount.accId + ":" + transferObj.srcAccount.accNo,
        toAccount: catId + "," + transferObj.destAccount.accId + ":" + transferObj.destAccount.accNo,
        toBankCode: transferObj.destAccount.anyIDType.anyIDType === this.constants.ANYID_TYPE_BANK_ACCOUNT ? transferObj.destAccount.bank.bankCode : '',
        amount: transferObj.transferAmount,
        immediateType: transferObj.immediateType,
        transferDate: transferObj.effectiveDate,
        alertEmail: transferObj.notifyEmail,
        alertSMS: transferObj.notifyMobileNo,
        alertLanguage: transferObj.notifyLang,
        toAccountName: transferObj.destAccount.accName,
        anyIDType: transferObj.destAccount.anyIDType.anyIDType,
        recurringType: transferObj.recurringType,
        scheduleType: transferObj.scheduleType.schedTypeId,
        recurringTime: transferObj.recurringTime.time,
        transactionID: transferObj.txnId,
        masterTransactionID: transferObj.txnMasId,
        editType: transferObj.editType,
      },
      actionCode: this.constants.REQ_ACTION_CODE.EDIT_FUND_TRANSFER,
      procedure: this.constants.REQ_PROCEDURE_NAME.EDIT_FUND_TRANSFER
    };

    let p = new Promise((resolve, reject) => {
      this.mfpApi.invokeProcedure(objRequest).then((objResponse: any) => {
        if (objResponse != null) {
          let responseStatus = objResponse.responseJSON.result.responseStatus;

          if (responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {

            let srcAccount = transferObj.srcAccount as AccountBean;
            let destAccount = transferObj.destAccount as AccountBean;
            let transferTimeList = this.masterDataService.getTransferTimeList();

            let data = objResponse.responseJSON.result.value;
            transferObj.verifyTxnID = data.verifyTransactionId;
            transferObj.txnDate = data.transactionDate;
            transferObj.isOwnerAccount = this.constants.OWNER_ACCOUNT == data.ownerAccount;
            transferObj.isRequireOtp = data.requireOtp;
            transferObj.transferDecisionList = [];

            srcAccount.accName = data.fundTransferRequest.fromAccountName;
            transferObj.srcAccount = srcAccount;

            if (data.toAccountName !== null && data.toAccountName !== '') {
              destAccount.accName = data.toAccountName;
            }

            transferObj.destAccount = destAccount;

            data.atsTransferDetails.forEach(element => {
              let transferDecision = new TransferDecisionBean();
              transferDecision.RIBTransferTypeCode = element.transferTypeCode;
              transferDecision.feeAmount = element.atsSummaryFee.summaryFee;
              transferDecision.desc = element.atsSummaryFee.displayTransferType;
              transferDecision.debitDate = element.atsSummaryFee.transferDate;
              transferDecision.debitTime = transferTimeList.find(x => x.code === element.atsSummaryFee.debitTime) || new TransferTimeBean();
              transferDecision.creditDate = element.atsSummaryFee.receiveDate;
              transferDecision.creditTime = transferTimeList.find(x => x.code === element.atsSummaryFee.creditTime) || new TransferTimeBean();
              transferObj.transferDecisionList.push(transferDecision);
            });

            
            resolve(transferObj);
          } else {
            
            resolve(new ResponseStatusBean(responseStatus.responseCode, responseStatus.responseMessage, responseStatus.errorMessage));
          }
        }

      }, function (error) {
        
      });
    });

    return p;
  }

  submitSchedule(transferObj: TransferBean) {
    

    let referenceDetail = transferObj.note;

    let objRequest = {
      params: {
        language: this.translate.currentLang,
        verifyTransactionId: transferObj.verifyTxnID,
        toAccountName: transferObj.destAccount.accName,
        transferTypeCode: transferObj.transferType.code,
        referenceDetail: referenceDetail,
        editType: transferObj.editType,
        verifyOTPRequest: transferObj.verifyOTP == null ? {} : {
          referenceNO: transferObj.verifyOTP.otpRefcode,
          otp: transferObj.verifyOTP.otpPin,
          tokenOTPForCAA: transferObj.verifyOTP.tokenOtp
        }
      },
      actionCode: this.constants.REQ_ACTION_CODE.EDIT_FUND_TRANSFER_SUBMIT,
      procedure: this.constants.REQ_PROCEDURE_NAME.EDIT_FUND_TRANSFER_SUBMIT
    };

    let p = new Promise((resolve, reject) => {
      this.mfpApi.invokeProcedure(objRequest).then((objResponse: any) => {
        if (objResponse != null) {
          let responseStatus = objResponse.responseJSON.result.responseStatus;

          if (responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {

            let data = objResponse.responseJSON.result.value;
            let transferRequest = data.fundTransferRequest;
            let transferTimeList = this.masterDataService.getTransferTimeList();

            let srcAccount = transferObj.srcAccount;
            srcAccount.accNo = transferRequest.fromAccount;
            srcAccount.accName = transferRequest.fromAccountName;
            srcAccount.aliasName = transferRequest.fromAccountAliasName;
            srcAccount.balance = data.fromAccountBalance;
            transferObj.srcAccount = srcAccount;

            let anyIDType = transferObj.destAccount.anyIDType;
            anyIDType.anyIDType = transferRequest.anyIDType;

            let destAccount = transferObj.destAccount;
            destAccount.accNo = transferRequest.toAccount;
            destAccount.accName = data.toAccountName;
            destAccount.aliasName = transferRequest.toAccountAliasName;
            destAccount.anyIDType = anyIDType;
            transferObj.destAccount = destAccount;

            let scheduleType = transferObj.scheduleType;
            scheduleType.schedTypeId = transferRequest.scheduleType;
            transferObj.scheduleType = scheduleType;

            let recurringTime = transferObj.recurringTime;
            recurringTime.time = transferRequest.recurringTime;
            recurringTime.desc = recurringTime.time + " " + (recurringTime.time == 0 || recurringTime.time == 1 ? this.translate.instant("lbl.time") : this.translate.instant("lbl.times"));

            transferObj.immediateType = transferRequest.immediateType;
            transferObj.effectiveDate = transferRequest.transferDate;
            transferObj.notifyLang = transferRequest.alertLanguage;
            transferObj.notifyMobileNo = transferRequest.alertSMS;
            transferObj.notifyEmail = transferRequest.alertEmail;
            transferObj.recurringType = transferRequest.recurringType;
            transferObj.recurringTime = recurringTime;
            transferObj.refNo = data.refNo;
            transferObj.transactionRef = data.transactionRef;
            transferObj.txnDate = data.txnDate;
            transferObj.recvDate = data.txnReceiveDate || "";
            transferObj.note = referenceDetail;
            transferObj.transferAmount = transferRequest.amount;
            transferObj.isAllowPrint = data.canPrintSlip;
            transferObj.txnId = data.txnId;
            transferObj.txnMasId = data.txnMasId;
            transferObj.refTxnId = data.refTxnId;
            transferObj.existingTransferAccountNo = data.existingTransferAccountNo;
            transferObj.transactionRef = data.transactionRef;

            let transferStatus = new TransferStatusBean();
            transferStatus.code = data.transactionStatusCode || data.fundTransferStatusCode;
            transferStatus.name = this.getTransferStatusNameDisplay(data);
            transferStatus.desc = this.getTransferStatusDescDisplay(data);

            let transferDecision = new TransferDecisionBean();

            transferDecision.transferStatus = transferStatus
            transferDecision.creditDate = data.receiveDate;
            transferDecision.creditTime = transferTimeList.find(x => x.code == data.creditTime) || new TransferTimeBean();
            transferDecision.debitDate = data.deducedDate;
            transferDecision.debitTime = transferTimeList.find(x => x.code == data.debitTime) || new TransferTimeBean();
            transferDecision.feeAmount = data.feeAmount;
            transferDecision.desc = data.displayTransferType;

            transferObj.transferDecisionList = [];
            transferObj.transferDecisionList.push(transferDecision);
            
            transferObj.addAccountType = data.addAccountType;
            
            resolve(transferObj);
          } else {
            
            resolve(new ResponseStatusBean(responseStatus.responseCode, responseStatus.responseMessage, responseStatus.errorMessage));
          }
        }
      }, function (error) {
        
      });
    });

    return p;
  }

  verifyFundTransfer(transferObj: TransferBean) {

    

    // Check if new account, then change value to -1. 
    let catId = transferObj.destAccount.category.catId == 999 ? -1 : transferObj.destAccount.category.catId;

    let objRequest = {
      params: {
        language: this.translate.currentLang,
        fromAccount: transferObj.srcAccount.accId + ":" + transferObj.srcAccount.accNo,
        toAccount: catId + "," + transferObj.destAccount.accId + ":" + transferObj.destAccount.accNo,
        toBankCode: transferObj.destAccount.anyIDType.anyIDType === this.constants.ANYID_TYPE_BANK_ACCOUNT ? transferObj.destAccount.bank.bankCode : '',
        amount: transferObj.transferAmount,
        immediateType: transferObj.immediateType,
        transferDate: transferObj.effectiveDate,
        alertEmail: transferObj.notifyEmail,
        alertSMS: transferObj.notifyMobileNo,
        alertLanguage: transferObj.notifyLang,
        toAccountName: transferObj.destAccount.accName,
        anyIDType: transferObj.destAccount.anyIDType.anyIDType,
        recurringType: transferObj.recurringType,
        scheduleType: transferObj.scheduleType.schedTypeId,
        recurringTime: transferObj.recurringTime.time,
        rtpReferenceNo: transferObj.rtpReferenceNo,
        memo: transferObj.note
      }, 
      actionCode: this.constants.REQ_ACTION_CODE.VERIFY_FUND_TRANSFER,
      procedure: this.constants.REQ_PROCEDURE_NAME.VERIFY_FUND_TRANSFER
    };

    let p = new Promise((resolve, reject) => {
      this.mfpApi.invokeProcedure(objRequest, this._invokeOption).then((objResponse: any) => {
        if (objResponse != null) {
          let responseStatus = objResponse.responseJSON.result.responseStatus;

          if (responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {

            let srcAccount = transferObj.srcAccount as AccountBean;
            let destAccount = transferObj.destAccount as AccountBean;
            let transferTimeList = this.masterDataService.getTransferTimeList();

            let data = objResponse.responseJSON.result.value;
            transferObj.verifyTxnID = data.verifyTransactionId;
            transferObj.txnDate = data.transactionDate;
            transferObj.isOwnerAccount = this.constants.OWNER_ACCOUNT == data.ownerAccount;
            transferObj.transferDecisionList = [];
            transferObj.isRequireOtp = data.requireOtp;

            srcAccount.accName = data.fundTransferRequest.fromAccountName;
            transferObj.srcAccount = srcAccount;

            if (data.toAccountName !== null && data.toAccountName !== '') {
              destAccount.accName = data.toAccountName;
            }

            transferObj.destAccount = destAccount;

            data.atsTransferDetails.forEach(element => {
              let transferDecision = new TransferDecisionBean();
              transferDecision.RIBTransferTypeCode = element.transferTypeCode;
              transferDecision.feeAmount = element.atsSummaryFee.summaryFee;
              transferDecision.desc = element.atsSummaryFee.displayTransferType;
              transferDecision.debitDate = element.atsSummaryFee.transferDate;
              transferDecision.debitTime = transferTimeList.find(x => x.code === element.atsSummaryFee.debitTime) || new TransferTimeBean();
              transferDecision.creditDate = element.atsSummaryFee.receiveDate;
              transferDecision.creditTime = transferTimeList.find(x => x.code === element.atsSummaryFee.creditTime) || new TransferTimeBean();
              transferObj.transferDecisionList.push(transferDecision);
            });

            
            resolve(transferObj);
          } else {
            
            resolve(new ResponseStatusBean(responseStatus.responseCode, responseStatus.responseMessage, responseStatus.errorMessage));
          }
        }

      }, function (error) {
        
      });
    });

    return p;
  }

  confirmFundTransfer(transferObj: TransferBean) {
    

    //let referenceDetail = transferObj.note;

    let objRequest = {
      params: {
        language: this.translate.currentLang,
        verifyTransactionId: transferObj.verifyTxnID,
        transferTypeCode: transferObj.transferType.code
      },
      actionCode: this.constants.REQ_ACTION_CODE.CONFIRM_FUND_TRANSFER,
      procedure: this.constants.REQ_PROCEDURE_NAME.CONFIRM_FUND_TRANSFER
    };
    
    if(transferObj.verifyOTP != null){
      objRequest.params['referenceNo'] = transferObj.verifyOTP.otpRefcode;
      objRequest.params['otp'] = transferObj.verifyOTP.otpPin;
      objRequest.params['tokenOTPForCAA'] = transferObj.verifyOTP.tokenOtp;
    }

    let p = new Promise((resolve, reject) => {
      this.mfpApi.invokeProcedure(objRequest, this._invokeOption).then((objResponse: any) => {
        if (objResponse != null) {
          let responseStatus = objResponse.responseJSON.result.responseStatus;
          if (responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
            let data = objResponse.responseJSON.result.value;
            let transferTimeList = this.masterDataService.getTransferTimeList();
            let srcAccount = transferObj.srcAccount;
            srcAccount.accNo = data.fromAccountInformation.accountNo;
            srcAccount.accName = data.fromAccountInformation.accountName;
            srcAccount.aliasName = data.fromAccountInformation.aliasName;
            srcAccount.balance = data.fromAccountBalance;
            transferObj.srcAccount = srcAccount;

            let anyIDType = transferObj.destAccount.anyIDType;
            anyIDType.anyIDType = data.toAccountInformation.anyIdType;

            let destAccount = transferObj.destAccount;
            destAccount.accNo = data.toAccountInformation.accountNo;
            destAccount.accName = data.toAccountInformation.accountName;
            destAccount.aliasName = data.toAccountInformation.aliasName;
            destAccount.anyIDType = anyIDType;
            transferObj.destAccount = destAccount;

            let scheduleType = transferObj.scheduleType;
            scheduleType.schedTypeId = data.scheduleType;
            transferObj.scheduleType = scheduleType;
            
            let recurringTime = transferObj.recurringTime;
            recurringTime.time = data.recurringTime;
            recurringTime.desc = recurringTime.time + " " + (recurringTime.time == 0 || recurringTime.time == 1 ? this.translate.instant("lbl.time") : this.translate.instant("lbl.times"));

            // transferObj.immediateType = transferRequest.immediateType;
            transferObj.effectiveDate = data.transferDate;
            transferObj.notifyLang = data.alertLanguage;
            transferObj.notifyMobileNo = data.alertSMS;
            transferObj.notifyEmail = data.alertEmail;
            transferObj.recurringType = data.recurringType;
            transferObj.recurringTime = recurringTime;
            transferObj.refNo = data.refNo;
            transferObj.transactionRef = data.transactionRef;
            transferObj.txnDate = data.txnDate;
            transferObj.recvDate = data.txnReceiveDate || data.receiveDate;
            transferObj.note = data.memo;//referenceDetail;
            transferObj.transferAmount = data.transferAmount;
            transferObj.isAllowPrint = data.canPrintSlip;
            transferObj.txnId = data.txnId;
            transferObj.txnMasId = data.txnMasId;
            transferObj.refTxnId = data.refTxnId;
            transferObj.existingTransferAccountNo = data.existingTransferAccountNo;
            transferObj.transactionRef = data.transactionRef;

            let transferStatus = new TransferStatusBean();
            transferStatus.code = data.transactionStatusCode || data.fundTransferStatusCode;
            transferStatus.name = this.getTransferStatusNameDisplay(data);
            transferStatus.desc = this.getTransferStatusDescDisplay(data);

            let transferDecision = new TransferDecisionBean();

            transferDecision.transferStatus = transferStatus
            transferDecision.creditDate = data.creditDate;
            transferDecision.creditTime = transferTimeList.find(x => x.code == data.creditTime) || new TransferTimeBean();
            transferDecision.debitDate = data.debitDate;
            transferDecision.debitTime = transferTimeList.find(x => x.code == data.debitTime) || new TransferTimeBean();
            transferDecision.feeAmount = data.feeAmount;
            transferDecision.desc = data.displayTransferType;

            transferObj.transferDecisionList = [];
            transferObj.transferDecisionList.push(transferDecision);

            transferObj.addAccountType = data.addAccountType;

            transferObj.maskingToAccount = data.toAccountInformation.markingAccountNo;
            transferObj.maskingFromAccount = data.fromAccountInformation.markingAccountNo;

            
            resolve(transferObj);
          } else {
            
            resolve(new ResponseStatusBean(responseStatus.responseCode, responseStatus.responseMessage, responseStatus.errorMessage));
          }
        }
      }, function (error) {
        
      });
    });

    return p;
  }

  verifyEditFundTransfer(transferObj: TransferBean) {
    

    // Check if new account, then change value to -1. 
    let catId = transferObj.destAccount.category.catId == 999 ? -1 : transferObj.destAccount.category.catId;

    let objRequest = {
      params: {
        language: this.translate.currentLang,
        fromAccount: transferObj.srcAccount.accId + ":" + transferObj.srcAccount.accNo,
        toAccount: catId + "," + transferObj.destAccount.accId + ":" + transferObj.destAccount.accNo,
        toBankCode: transferObj.destAccount.anyIDType.anyIDType === this.constants.ANYID_TYPE_BANK_ACCOUNT ? transferObj.destAccount.bank.bankCode : '',
        amount: transferObj.transferAmount,
        immediateType: transferObj.immediateType,
        transferDate: transferObj.effectiveDate,
        alertEmail: transferObj.notifyEmail,
        alertSMS: transferObj.notifyMobileNo,
        alertLanguage: transferObj.notifyLang,
        toAccountName: transferObj.destAccount.accName,
        anyIDType: transferObj.destAccount.anyIDType.anyIDType,
        recurringType: transferObj.recurringType,
        scheduleType: transferObj.scheduleType.schedTypeId,
        recurringTime: transferObj.recurringTime.time,
        transactionId: transferObj.txnId,
        masterTransactionId: transferObj.txnMasId,
        editType: transferObj.editType,
        memo: transferObj.note
      },
      actionCode: this.constants.REQ_ACTION_CODE.VERIFY_EDIT_FUND_TRANSFER,
      procedure: this.constants.REQ_PROCEDURE_NAME.VERIFY_EDIT_FUND_TRANSFER
    };

    let p = new Promise((resolve, reject) => {
      this.mfpApi.invokeProcedure(objRequest, this._invokeOption).then((objResponse: any) => {
        if (objResponse != null) {
          let responseStatus = objResponse.responseJSON.result.responseStatus;

          if (responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {

            let srcAccount = transferObj.srcAccount as AccountBean;
            let destAccount = transferObj.destAccount as AccountBean;
            let transferTimeList = this.masterDataService.getTransferTimeList();

            let data = objResponse.responseJSON.result.value;
            transferObj.verifyTxnID = data.verifyTransactionId;
            transferObj.txnDate = data.transactionDate;
            transferObj.isOwnerAccount = this.constants.OWNER_ACCOUNT == data.ownerAccount;
            transferObj.isRequireOtp = data.requireOtp;
            transferObj.transferDecisionList = [];

            srcAccount.accName = data.fundTransferRequest.fromAccountName;
            transferObj.srcAccount = srcAccount;

            if (data.toAccountName !== null && data.toAccountName !== '') {
              destAccount.accName = data.toAccountName;
            }

            transferObj.destAccount = destAccount;

            data.atsTransferDetails.forEach(element => {
              let transferDecision = new TransferDecisionBean();
              transferDecision.RIBTransferTypeCode = element.transferTypeCode;
              transferDecision.feeAmount = element.atsSummaryFee.summaryFee;
              transferDecision.desc = element.atsSummaryFee.displayTransferType;
              transferDecision.debitDate = element.atsSummaryFee.transferDate;
              transferDecision.debitTime = transferTimeList.find(x => x.code === element.atsSummaryFee.debitTime) || new TransferTimeBean();
              transferDecision.creditDate = element.atsSummaryFee.receiveDate;
              transferDecision.creditTime = transferTimeList.find(x => x.code === element.atsSummaryFee.creditTime) || new TransferTimeBean();
              transferObj.transferDecisionList.push(transferDecision);
            });

            
            resolve(transferObj);
          } else {
            
            resolve(new ResponseStatusBean(responseStatus.responseCode, responseStatus.responseMessage, responseStatus.errorMessage));
          }
        }

      }, function (error) {
        
      });
    });

    return p;
  }

  confirmEditFundTransfer(transferObj: TransferBean) {
    

    let referenceDetail = transferObj.note;

    let objRequest = {
      params: {
        language: this.translate.currentLang,
        verifyTransactionId: transferObj.verifyTxnID,
        transferTypeCode: transferObj.transferType.code
      },
      actionCode: this.constants.REQ_ACTION_CODE.CONFIRM_EDIT_FUND_TRANSFER,
      procedure: this.constants.REQ_PROCEDURE_NAME.CONFIRM_EDIT_FUND_TRANSFER
    };

    if(transferObj.verifyOTP != null){
      objRequest.params['referenceNo'] = transferObj.verifyOTP.otpRefcode;
      objRequest.params['otp'] = transferObj.verifyOTP.otpPin;
      objRequest.params['tokenOTPForCAA'] = transferObj.verifyOTP.tokenOtp;
    }

    let p = new Promise((resolve, reject) => {
      this.mfpApi.invokeProcedure(objRequest, this._invokeOption).then((objResponse: any) => {
        if (objResponse != null) {
          let responseStatus = objResponse.responseJSON.result.responseStatus;

          if (responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {

            let data = objResponse.responseJSON.result.value;
            let transferTimeList = this.masterDataService.getTransferTimeList();

            let srcAccount = transferObj.srcAccount;
            srcAccount.accNo = data.fromAccountInformation.accountNo;
            srcAccount.accName = data.fromAccountInformation.accountName;
            srcAccount.aliasName = data.fromAccountInformation.aliasName;
            srcAccount.balance = data.fromAccountBalance;
            transferObj.srcAccount = srcAccount;

            let anyIDType = transferObj.destAccount.anyIDType;
            anyIDType.anyIDType = data.toAccountInformation.anyIdType;

            let destAccount = transferObj.destAccount;
            destAccount.accNo = data.toAccountInformation.accountNo;
            destAccount.accName = data.toAccountInformation.accountName;
            destAccount.aliasName = data.toAccountInformation.aliasName;
            destAccount.anyIDType = anyIDType;
            transferObj.destAccount = destAccount;

            let scheduleType = transferObj.scheduleType;
            scheduleType.schedTypeId = data.scheduleType;
            transferObj.scheduleType = scheduleType;

            let recurringTime = transferObj.recurringTime;
            recurringTime.time = data.recurringTime;
            recurringTime.desc = recurringTime.time + " " + (recurringTime.time == 0 || recurringTime.time == 1 ? this.translate.instant("lbl.time") : this.translate.instant("lbl.times"));

            // transferObj.immediateType = transferRequest.immediateType;
            transferObj.effectiveDate = data.transferDate;
            transferObj.notifyLang = data.alertLanguage;
            transferObj.notifyMobileNo = data.alertSMS;
            transferObj.notifyEmail = data.alertEmail;
            transferObj.recurringType = data.recurringType;
            transferObj.recurringTime = recurringTime;
            transferObj.refNo = data.refNo;
            transferObj.transactionRef = data.transactionRef;
            transferObj.txnDate = data.txnDate;
            transferObj.recvDate = data.txnReceiveDate || "";
            transferObj.note = data.memo;//referenceDetail;
            transferObj.transferAmount = data.transferAmount;
            transferObj.isAllowPrint = data.canPrintSlip;
            transferObj.txnId = data.txnId;
            transferObj.txnMasId = data.txnMasId;
            transferObj.refTxnId = data.refTxnId;
            transferObj.existingTransferAccountNo = data.existingTransferAccountNo;
            transferObj.transactionRef = data.transactionRef;

            let transferStatus = new TransferStatusBean();
            transferStatus.code = data.transactionStatusCode || data.fundTransferStatusCode;
            transferStatus.name = this.getTransferStatusNameDisplay(data);
            transferStatus.desc = this.getTransferStatusDescDisplay(data);

            let transferDecision = new TransferDecisionBean();

            transferDecision.transferStatus = transferStatus
            transferDecision.creditDate = data.creditDate;
            transferDecision.creditTime = transferTimeList.find(x => x.code == data.creditTime) || new TransferTimeBean();
            transferDecision.debitDate = data.debitDate;
            transferDecision.debitTime = transferTimeList.find(x => x.code == data.debitTime) || new TransferTimeBean();
            transferDecision.feeAmount = data.feeAmount;
            transferDecision.desc = data.displayTransferType;

            transferObj.transferDecisionList = [];
            transferObj.transferDecisionList.push(transferDecision);
            
            transferObj.addAccountType = data.addAccountType;

            transferObj.maskingToAccount = data.toAccountInformation.markingAccountNo;
            transferObj.maskingFromAccount = data.fromAccountInformation.markingAccountNo;

            
            resolve(transferObj);
          } else {
            
            resolve(new ResponseStatusBean(responseStatus.responseCode, responseStatus.responseMessage, responseStatus.errorMessage));
          }
        }
      }, function (error) {
        
      });
    });

    return p;
  }

}