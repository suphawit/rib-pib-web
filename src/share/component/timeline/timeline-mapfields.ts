import { Injectable } from '@angular/core';

@Injectable()
export class TimelineMapFields {
    private _data: any = {
        "schedule.biller": {
            transactionDate: 'transactionDate',
            accountFromNumber: 'fromAccountNumber',
            accountFromName: 'fromAliasName',
            status: 'paymentStatus',
            paymentFor: 'billerAliasName',
            amount: 'payAmount',
            biller: 'billerName',
            note: 'memo',
            toBankCode: 'bankCode',
            fromBankCode: 'fromBankCode',
            fromBankName: 'fromBankName',
            referenceNumber: 'referenceNO',
            recurringType: 'recurringType',
            recurringTimes: 'recurringTimes',
            ref1: 'reference1',
            ref2: 'reference2',
            ref3: 'reference3',
            statusCode: 'statusCode',
            bankName: 'bankName',
            debitDate: 'paymentDate',
            anyIDType: 'anyIDType',
            addNewBillerFlag: 'addNewBillerFlag',
            transactionRef: 'transactionRef'
        },
        "schedule.fundtransfer": {
            transactionDate: 'transactionDate',
            accountFromNumber: 'fromAccountNumber',
            accountFromName: 'fromAliasName',
            accountToNumber: 'toAccountNumber',
            accountToName: 'toAccountAliasName',
            status: 'status',
            amount: 'amount',
            note: 'memo',
            toBankCode: 'bankCode',
            fromBankCode: 'fromBankCode',
            fromBankName: 'fromBankName',
            referenceNumber: 'referenceNumber',
            receivedDate: 'creditDate',
            recurringType: 'recurringType',
            recurringTimes: 'recurringTimes',
            toMobileNumber: 'toMobileNumber',
            toEmail: 'toEmail',
            msgLanguage: 'msgLanguage',
            fee: 'feeAmount',
            immediateType: 'immediateType',
            funtransferTypeDescToDisplay: 'funtransferTypeDescToDisplay',
            statusCode: 'statusCode',
            bankName: 'bankName',
            transferTimeName: 'transferTimeName',
            fundTransferTypeDescToDisplay: 'fundTransferTypeDescToDisplay',
            debitDate: 'debitDate',
            anyIDType: 'anyIDType',
            transactionRef: 'transactionRef'
        },
        "history.biller": {
            transactionDate: 'transactionDate',
            accountFromNumber: 'fromAccountNumber',
            accountFromName: 'fromAliasName',
            status: 'paymentStatusDesc',
            paymentFor: 'billerAliasName',
            amount: 'payAmount',
            biller: 'billerName',
            note: 'memo',
            toBankCode: 'bankCode',
            fromBankCode: 'fromBankCode',
            fromBankName: 'fromBankName',
            referenceNumber: 'referenceNO',
            ref1: 'reference1',
            ref2: 'reference2',
            ref3: 'reference3',
            statusCode: 'statusCode',
            bankName: 'bankName',
            debitDate: 'paymentDate',
            anyIDType: 'anyIDType',
            rtpReferenceNo: 'rtpRef',
            feeAmount: 'feeAmount',
            errorMsg: 'errorMsg',
            canPrintSlip: 'canPrintSlip',
            transactionRef: 'transactionRef'
        },
        "history.fundtransfer": {
            transactionDate: 'transactionDate',
            accountFromNumber: 'fromAccountNumber',
            accountFromName: 'fromAliasName',
            accountToNumber: 'toAccountNumber',
            accountToName: 'toAliasName',
            status: 'status',
            errorMsg: 'errorMsg',
            amount: 'amount',
            note: 'memo',
            toBankCode: 'bankCode',
            fromBankCode: 'fromBankCode',
            fromBankName: 'fromBankName',
            referenceNumber: 'referenceNumber',
            receivedDate: 'creditDate',
            recurringType: 'recurringType',
            recurringTimes: 'recurringTimes',
            toMobileNumber: 'toMobileNumber',
            toEmail: 'toEmail',
            msgLanguage: 'msgLanguage',
            fee: 'feeAmount',
            immediateType: 'immediateType',
            funtransferTypeDescToDisplay: 'funtransferTypeDescToDisplay',
            statusCode: 'statusCode',
            bankName: 'bankName',
            transferTimeName: 'transferTimeName',
            fundTransferTypeDescToDisplay: 'fundTransferTypeDescToDisplay',
            debitDate: 'debitDate',
            anyIDType: 'anyIDType',
            canPrintSlip: 'canPrintSlip',
            rtpReferenceNo: 'rtpReferenceNo',
            transactionRef: 'transactionRef'
        },
        "history.RTP": { //history.RTP.biller
            requesterAccountName: 'requesterAccountName',
            amount: 'amount',
            status: 'status',
            note: 'additionalNote',
            expiryDate: 'expiryDate',
            ref1: 'billReference1',
            ref2: 'billReference2',
            ref3: 'billReference3',
            rtpReferenceNo: 'rtpreference',
            currencyCode: 'currencyCode',
            referenceNumber: 'referenceNumber',
            transactionDate: 'createdDate', //createdDate
            requesterIdType: 'requesterIdType',
            receiverIdValue: 'receiverIdValue',
            requesterIdValue: 'requesterIdValue',
            rtpMsgType: 'rtpMsgType',
            receiverIdTypeLabel: 'receiverIdTypeLabel',
            requesterIdTypeLabel: 'requesterIdTypeLabel',
            receiverAccountName: 'receiverAccountName',
            transactionRef: 'transactionRef'
        }
    }

    get data(): any {
        return this._data;
    }
}