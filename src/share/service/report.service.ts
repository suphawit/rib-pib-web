import { Injectable } from '@angular/core';
import { MfpApi } from '../../share/mfp/mfp-api.service';
import { Constants } from '../../share/service/constants';
import { TransferBean } from '../../share/bean/transfer-bean';
import { TranslateService } from "ng2-translate/src/translate.service";
import { TransferDecisionBean } from '../../share/bean/transfer-decision-bean';

@Injectable()
export class ReportService {

    constructor(
        private mfpApi: MfpApi,
        private constants: Constants,
        private translate: TranslateService
    ) {
    }

    printTransaction(transferObj: TransferBean) {
        let accType = transferObj.destAccount.accountType || "";

        if (accType == this.constants.ACCOUNT_TYPE_TD) {
            return this.getTermDepositTransfer(transferObj);
        }

        return this.getCasaTransfer(transferObj);
    }

    private getCasaTransfer(transferObj: TransferBean) {

        let reportData = "";
        let decision = transferObj.transferDecisionList[0] || new TransferDecisionBean();

        let objRequest = {
            params: {
                language: this.translate.currentLang,
                refTxnID: transferObj.refTxnId,
                refNO: transferObj.refNo,
                transactionDate: transferObj.txnDate,
                deductDate: decision.getDebitDateTimeDisplay(),
                receiveDate: decision.getCreditTimeDisplay(),
                amount: transferObj.transferAmount,
                fee: decision.feeAmount,
                acctNameTo: transferObj.destAccount.accName,
                recurringDetail: transferObj.recurringType,
                email: transferObj.notifyEmail,
                mobile: transferObj.notifyMobileNo,
                submitStatus: decision.transferStatus.desc
            },
            actionCode: this.constants.REQ_ACTION_CODE.CASA_TRANSFER_SLIP,
            procedure: this.constants.REQ_PROCEDURE_NAME.CASA_TRANSFER_SLIP
        };

        let p = new Promise((resolve, reject) => {
            this.mfpApi.invokeProcedure(objRequest).then((objResponse: any) => {
                if (objResponse != null) {
                    let responseStatus = objResponse.responseJSON.result.responseStatus;

                    if (responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                        reportData = objResponse.responseJSON.result.value.data;
                    }
                }

                resolve(reportData);
            }, function (error) {

            });
        });

        return p;
    }

    private getTermDepositTransfer(transferObj: TransferBean) {

        let reportData = "";
        let decision = transferObj.transferDecisionList[0] || new TransferDecisionBean();

        let objRequest = {
            params: {
                language: this.translate.currentLang,
                refTxnID: transferObj.refNo,
                refNO: transferObj.refNo,
                transactionDate: transferObj.txnDate,
                deductDate: decision.getDebitDateTimeDisplay(),
                receiveDate: decision.getCreditTimeDisplay(),
                amount: transferObj.transferAmount,
                fee: decision.feeAmount,
                interestRate: decision.intRate,
                acctNameTo: transferObj.destAccount.accName,
                depNO: transferObj.depositNo,
                valueDate: transferObj.valueDate
            },
            actionCode: this.constants.REQ_ACTION_CODE.TD_TRANSFER_SLIP,
            procedure: this.constants.REQ_PROCEDURE_NAME.TD_TRANSFER_SLIP
        };

        let p = new Promise((resolve, reject) => {
            this.mfpApi.invokeProcedure(objRequest).then((objResponse: any) => {
                if (objResponse != null) {
                    let responseStatus = objResponse.responseJSON.result.responseStatus;

                    if (responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                        reportData = objResponse.responseJSON.result.value.data;
                    }
                }

                resolve(reportData);
            }, function (error) {

            });
        });

        return p;
    }

    public requestCASATransferSlip(data: any) {
        let promise = new Promise((resolve, reject) => {
            let objRequest = {
                params: {
                    refNO: data.refNO,
                    refTxnID: data.refTxnID,
                    acctNameTo: data.acctNameTo,
                    recurringDetail: data.recurringDetail
                },
                actionCode: this.constants.REQ_ACTION_CODE.CASA_TRANSFER_HISTORY_SLIP,
                procedure: this.constants.REQ_PROCEDURE_NAME.CASA_TRANSFER_SLIP
            };

            this.mfpApi.invokeProcedure(objRequest).then((result: any) => {
                resolve(result);
            }, function (error) {
                reject(error);
            });
        });
        return promise;
    }

    public requestTDTransferSlip(data: any) {
        let promise = new Promise((resolve, reject) => {
            let objRequest = {
                params: {
                    refNO: data.refNO,
                    refTxnID: data.refTxnID,
                    acctNameTo: data.acctNameTo,
                    recurringDetail: data.recurringDetail
                },
                actionCode: this.constants.REQ_ACTION_CODE.TD_TRANSFER_HISTORY_SLIP,
                procedure: this.constants.REQ_PROCEDURE_NAME.TD_TRANSFER_SLIP
            };
            this.mfpApi.invokeProcedure(objRequest).then((result: any) => {
                resolve(result);
            }, function (error) {
                reject(error);
            });
        });
        return promise;
    }
}