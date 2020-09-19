import { Injectable } from '@angular/core';
import { TranslateService } from "ng2-translate/src/translate.service";
import { MfpApi } from '../../share/mfp/mfp-api.service';
import { Constants } from '../../share/service/constants';
import { Subject } from 'rxjs/Rx';
import { Dictionary } from '../../share/bean/dictionary';
import { OrderByPipe } from '../../share/pipe/order-by.pipe';
import { AnyIDTypeBean } from '../../share/bean/anyid-type-bean';


@Injectable()
export class RequestToPayService {
    private createRTPObj: any = null;
    private tmpRTPObj: any = null;

    constructor(private _MfpApi: MfpApi, private _Constants: Constants, private _TranslateService: TranslateService, private orderBy: OrderByPipe) {
    }

    public inquiryRequestToPay() {
        let promise = new Promise((resolve, reject) => {
            let obj = {
                params: {
                    language: this._TranslateService.currentLang,
                },
                actionCode: this._Constants.REQ_ACTION_CODE.RTP_INQUIRY_INCOMING,
                procedure: this._Constants.REQ_PROCEDURE_NAME.RTP_INQUIRY_INCOMING
            };
            this._MfpApi.invokeProcedure(obj).then((result) => {
                resolve(result);
            }, function (error) {
                reject(error);
                
            }
            );
        });
        return promise;
    }

     public inquiryRequestToPayOutgoing() {
        let promise = new Promise((resolve, reject) => {
            let obj = {
                params: {
                    language: this._TranslateService.currentLang,
                },
                actionCode: this._Constants.REQ_ACTION_CODE.RTP_INQUIRY_OUTGOING,
                procedure: this._Constants.REQ_PROCEDURE_NAME.RTP_INQUIRY_OUTGOING
            };
            this._MfpApi.invokeProcedure(obj).then((result) => {
                resolve(result);
            }, function (error) {
                reject(error);
                
            }
            );
        });
        return promise;
    }
    
    public inquiryRequestToPayAnyIdBlocklist(anyIDTypeList: any = []) {
        let groups: any = [];
        let objRequest = {
            params: {
                language: this._TranslateService.currentLang,
            },
            actionCode: this._Constants.REQ_ACTION_CODE.RTP_INQUIRY_BLOCKLIST,
            procedure: this._Constants.REQ_PROCEDURE_NAME.RTP_INQUIRY_BLOCKLIST
        }

        let p = new Promise((resolve, reject) => {
            this._MfpApi.invokeProcedure(objRequest).then((objResponse: any) => {

                if (objResponse != null) {
                    if (objResponse.responseJSON.result.responseStatus.responseCode === this._Constants.RESP_CODE_SUCCESS) {
                        if(objResponse.responseJSON.result.value.totalAllTransaction > 0){
                            objResponse.responseJSON.result.value.rtpblockList.forEach(element => {
                                let anyIDType = new AnyIDTypeBean();
                                anyIDType = anyIDTypeList[element.blocklistProxyID.type]|| element.blocklistProxyID.type;

                                let accountObj = {
                                accountAliasName : element.blocklistProxyID.name,
                                anyIDValue : element.blocklistProxyID.value,
                                anyIDType : anyIDType
                                };
                                groups.push(accountObj)
                                
                            });
                            resolve(groups);
                        }else{
                            resolve(groups);
                        }
                    }else{
                        resolve(objResponse.responseJSON.result.responseStatus);
                    }
                }

                
            }, function (error) {
                
            });
        });

        return p;
    }

    public inquiryRequestToPayAnyIdMy(anyIDTypeList: any = []) {
        let groups: any = [];
        let objRequest = {
            params: {
                language: this._TranslateService.currentLang,
            },
            actionCode: this._Constants.REQ_ACTION_CODE.RTP_INQUIRY_ANYID_MY,
            procedure: this._Constants.REQ_PROCEDURE_NAME.RTP_INQUIRY_ANYID_MY
        }

        let p = new Promise((resolve, reject) => {
            this._MfpApi.invokeProcedure(objRequest).then((objResponse: any) => {

                if (objResponse != null) {
                    if (objResponse.responseJSON.result.responseStatus.responseCode === this._Constants.RESP_CODE_SUCCESS) {
                        objResponse.responseJSON.result.value.forEach(element => {
                            let anyIDType = anyIDTypeList[element.anyIDType] || new AnyIDTypeBean();

                            let accountObj = {
                            accountName : element.accountName,
                            accountNo : element.accountNo,
                            anyIDValue : element.anyIDValue,
                            anyIDType : anyIDType,
                            promptpayLabelEn : element.promptpayLabelEn,
                            promptpayLabelTh : element.promptpayLabelTh
                            };
                            groups.push(accountObj)
                            
                        });
                        resolve(groups);
                    }else{
                        resolve(objResponse.responseJSON.result.responseStatus);
                    }
                }

                resolve(groups);
            }, function (error) {
                
            });
        });

        return p;
    }
    
    private _observer: Subject<any> = new Subject();
    getObserver(): Subject<any> {
        return this._observer;
    }
    updateObserver(param: any) {
        this._observer.next(param);
    }

    getOtherAccounts(anyIDTypeList: any = [],currentAccount: any) {
        let groups: any = [];
        let otherAccounts: Dictionary = {};
        let isFavourites: any = [];
        let objRequest = {
            params: {
                language: this._TranslateService.currentLang,
            },
            actionCode: this._Constants.REQ_ACTION_CODE.RTP_INQUIRY_ANYID_OTHER,
            procedure: this._Constants.REQ_PROCEDURE_NAME.RTP_INQUIRY_ANYID_OTHER
        }

        let p = new Promise((resolve, reject) => {
            this._MfpApi.invokeProcedure(objRequest).then((objResponse: any) => {

                if (objResponse != null) {
                    if (objResponse.responseJSON.result.responseStatus.responseCode === this._Constants.RESP_CODE_SUCCESS) {
                        objResponse.responseJSON.result.value.forEach(element => {
                            let category = {
                            catId : element.catId,
                            catName : element.categoryName
                            };
                            let anyIDType = anyIDTypeList[element.anyIDType] || new AnyIDTypeBean();

                            let accountObj ={
                            accId : element.exAcctId,
                            accNo : element.acctNo,
                            aliasName : element.acctAliasName,
                            accName : element.acctName,
                            isFavourite: element.isFavourite,
                            category : category,
                            anyIDType : anyIDType
                            };

                            var catId = accountObj.category.catId;
                            otherAccounts[catId] = otherAccounts[catId] || [];
                            otherAccounts[catId].push(accountObj);

                            if(accountObj.isFavourite === 'Y'){
                                isFavourites.push(accountObj);
                            }
                        });

                        let categories = otherAccounts != null ? this.orderBy.transform(Object.keys(otherAccounts), "") : [];
                        // Initial add new account panel
                        groups[0] = {
                            index: 0,
                            name: this._TranslateService.instant("lbl.newAccount"),
                            catId: 999,
                            items: [],
                            show: (currentAccount.category.catId == 999)
                        };

                        //for filter favorites account
                        if(isFavourites.length > 0){
                            let accounts = isFavourites;
                            groups[1] = {
                                index: 1,
                                items: accounts,
                                catId: 'favorites',
                                show: (currentAccount.isSelectAccFromFavList)
                            };
                            groups[1].name = this._TranslateService.instant("lbl.myFavourite");
                        }
                        
                        categories.forEach(function (catId, index) {
                            let accounts = otherAccounts[catId];
                            let i = isFavourites.length > 0? 2:1;
                            groups[index + i] = {
                                index: index + i,
                                name: accounts[0].category.catName,
                                catId: catId,
                                items: accounts,
                                show: (catId == (currentAccount.category.catId || 1)) && (!currentAccount.isSelectAccFromFavList)
                            };
                        });
                        resolve(groups);
                    } else {
                        resolve(objResponse.responseJSON.result.responseStatus);
                    }
                }

                
            }, function (error) {
                
            });
        });

        return p;
    }

    public getcreateRTPObj(): any {
        
    return this.createRTPObj;
  }
    public setcreateRTPObj(createRTPObj: any) {
        this.createRTPObj = createRTPObj;
        
  }
    public prepareCreateRTP(createRTPObj: any) {
        let verifyRTPObjs: any = {};
        let promise = new Promise((resolve, reject) => {
            let obj = {
                params: {
                    language: this._TranslateService.currentLang,
                    fromAnyIdType:  createRTPObj.fromAnyIdType.anyIDType,
                    fromAnyIdValue:  createRTPObj.fromAnyIdValue,
                    fromAccountNo:  createRTPObj.fromAccountNo,
                    toAnyIdType:  createRTPObj.toAnyIdType.anyIDType,
                    toAnyIdValue:  createRTPObj.toAnyIdValue,
                    amount:  createRTPObj.amount,
                    memo:  createRTPObj.memo,
                    isAddNew: createRTPObj.isAddNew
                },
                actionCode: this._Constants.REQ_ACTION_CODE.RTP_VERIFY_CREATE,
                procedure: this._Constants.REQ_PROCEDURE_NAME.RTP_VERIFY_CREATE
            };
            this._MfpApi.invokeProcedure(obj).then((result) => {
                let response = result.responseJSON.result;
                if(result.responseJSON.result.responseStatus.responseCode === this._Constants.RESP_CODE_SUCCESS){
                        verifyRTPObjs = {
                            fromAnyIdTypeBean: createRTPObj.fromAnyIdType,
                            toAnyIdTypeBean:  createRTPObj.toAnyIdType,
                            amount: response.value.amount,
                            fromAccountAliasName: response.value.fromAccountAliasName,
                            fromAccountNo: response.value.fromAccountNo,
                            fromAnyIdValue: response.value.fromAnyIdValue,
                            memo: response.value.memo,
                            toAccountAcctName: response.value.toAccountAcctName,
                            toAccountAliasName: response.value.toAccountAliasName,
                            toAnyIdValue: response.value.toAnyIdValue,
                            verifyTransactionId: response.value.verifyTransactionId,
                            transactionDate: response.value.transactionDate
                       }
                       resolve(verifyRTPObjs);
                }else {
                       resolve(response.responseStatus);
                }
                
            }, function (error) {
                reject(error);
                
            });
        });
        return promise;
    }

     public gettmpRTPObj(): any {
        
    return this.tmpRTPObj;
  }
    public settmpRTPObj(tmpRTPObj: any) {
        this.tmpRTPObj = tmpRTPObj;
        
  }

    public confirmCreateRTP(createRTPObj) {
    let completeRTPObjs: any = {};
    let objRequest = {
      params: {
        verifyTransactionId: createRTPObj.verifyOTP.verifyTransactionId,
        // referenceNO: createRTPObj.verifyOTP.otpRefcode,
        // otp: createRTPObj.verifyOTP.otpPin,
        // tokenOTPForCAA: createRTPObj.verifyOTP.tokenOtp
      },
      actionCode: this._Constants.REQ_ACTION_CODE.RTP_CONFIRM_CREATE,
      procedure: this._Constants.REQ_PROCEDURE_NAME.RTP_CONFIRM_CREATE
    };

    let p = new Promise((resolve, reject) => {
      this._MfpApi.invokeProcedure(objRequest).then((objResponse: any) => {
        if (objResponse != null) {
          let response = objResponse.responseJSON.result;
          
          if (response.responseStatus.responseCode === this._Constants.RESP_CODE_SUCCESS) {

                completeRTPObjs = {
                            fromAnyIdTypeBean: createRTPObj.fromAnyIdType,
                            toAnyIdTypeBean:  createRTPObj.toAnyIdType,
                            amount: response.value.amount,
                            fromAccountAliasName: response.value.fromAccountAliasName,
                            fromAccountNo: response.value.fromAccountNo,
                            //fromAnyIdType: response.value.fromAnyIdType,
                            fromAnyIdValue: response.value.fromAnyIdValue,
                            memo: response.value.memo,
                            toAccountAcctName: response.value.toAccountAcctName,
                            toAccountAliasName: response.value.toAccountAliasName,
                            //toAnyIdType: response.value.toAnyIdType,
                            toAnyIdValue: response.value.toAnyIdValue,
                            transactionDate: response.value.transactionDate,
                            rtpRefNo: response.value.rtpRefNo
                       }
             resolve(completeRTPObjs);
          } else {
             resolve(response.responseStatus);
          }
        }
      }, function (error) {
        
      });
    });

    return p;
  }

    public createRequestToPayAnyIdBlocklist(createRTPBlocklistData: any) {

        let objRequest = {
            params: {
                type: createRTPBlocklistData.type,
                value: createRTPBlocklistData.value,
                name: createRTPBlocklistData.name
            },
            actionCode: this._Constants.REQ_ACTION_CODE.RTP_CREATE_BLOCKLIST,
            procedure: this._Constants.REQ_PROCEDURE_NAME.RTP_CREATE_BLOCKLIST
        }

        let p = new Promise((resolve, reject) => {
            this._MfpApi.invokeProcedure(objRequest).then((objResponse: any) => {

                if (objResponse != null) {
                   
                    resolve(objResponse.responseJSON.result.responseStatus);
                    
                }

                
            }, function (error) {
                
            });
        });

        return p;
    }

    public deleteRequestToPayAnyIdBlocklist(deleteRTPBlocklistData: any) {

        let objRequest = {
            params: {
                type: deleteRTPBlocklistData.type,
                value: deleteRTPBlocklistData.value,
                name: deleteRTPBlocklistData.name
            },
            actionCode: this._Constants.REQ_ACTION_CODE.RTP_DELETE_BLOCKLIST,
            procedure: this._Constants.REQ_PROCEDURE_NAME.RTP_DELETE_BLOCKLIST
        }

        let p = new Promise((resolve, reject) => {
            this._MfpApi.invokeProcedure(objRequest).then((objResponse: any) => {

                if (objResponse != null) {
                   
                    resolve(objResponse.responseJSON.result.responseStatus);
                    
                }

                
            }, function (error) {
                
            });
        });

        return p;
    }
  public deleteRTPIncoming(selectedRTPIncomingData) {
    let objRequest = {
      params: {
        fromAnyIdType: selectedRTPIncomingData.requesterIdType,
        fromAnyIdValue: selectedRTPIncomingData.requesterIdValue,
        rtpReference: selectedRTPIncomingData.rtpreference
      },
      actionCode: this._Constants.REQ_ACTION_CODE.RTP_CANCEL,
      procedure: this._Constants.REQ_PROCEDURE_NAME.RTP_CANCEL
    };

    let p = new Promise((resolve, reject) => {
      this._MfpApi.invokeProcedure(objRequest).then((objResponse: any) => {
        if (objResponse != null) {
          let response = objResponse.responseJSON.result;
          
          resolve(response);
        }
      }, function (error) {
        
      });
    });

    return p;
  }

}