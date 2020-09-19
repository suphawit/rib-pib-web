import { Injectable } from '@angular/core';
import { MfpApi } from '../../mfp/mfp-api.service';
import { CardInfoBean } from '../../../share/bean/card-info-bean';
import { Constants } from '../../service/constants';
import { TranslateService } from "ng2-translate/src/translate.service";

@Injectable()
export class VerifyAccountFormService {
    private _cardInfo:CardInfoBean;

    constructor(private _MfpApi: MfpApi, private constants: Constants, public translateService:TranslateService) {

    };

    public requestVerifyAccount(data: any) {
        let promise = new Promise((resolve, reject) => {
            
            let objRequest = {
                params: {
                    language: this.translateService.currentLang,
					referenceCode: this._cardInfo.referenceCode,
					accountNO: data.accountNO,
                    productType: data.productType,
                    idType: this._cardInfo.cardType,
                    idNO: this._cardInfo.cardId
                },
				actionCode: this.constants.REQ_ACTION_CODE.REQUEST_USERNAME_BY_VERIFY_DEPOSIT_ACCOUNT, 
				procedure: this.constants.REQ_PROCEDURE_NAME.REQUEST_USERNAME_BY_VERIFY_DEPOSIT_ACCOUNT
            };

            this._MfpApi.invokeProcedure(objRequest).then((result: any) => {
                resolve(result);
            }, function (error) {
                reject(error);

            });
        });
        return promise;
    }

    set cardInfo(cardInfo: CardInfoBean) {
        this._cardInfo = cardInfo;
    }
}