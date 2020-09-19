import { Injectable } from '@angular/core';
import { MfpApi } from '../../mfp/mfp-api.service';
import { CardInfoBean } from '../../../share/bean/card-info-bean';
import { Constants } from '../../service/constants';
import { TranslateService } from "ng2-translate/src/translate.service";

@Injectable()
export class ResetPasswordFormService {
    private _cardInfo:CardInfoBean;

    constructor(private _MfpApi: MfpApi, private constants: Constants, public translateService:TranslateService) {

    };

    public requestResetPassword(data: any) {
        let promise = new Promise((resolve, reject) => {
            let objRequest = {
                params: {
                    language: this.translateService.currentLang, 
					password: data.password,
					referenceCode: this._cardInfo.referenceCode,
                    idType: this._cardInfo.cardType,
                    idNo: this._cardInfo.cardId,
                    idIssueCountryCode: this._cardInfo.idIssueCountryCode
                },
				actionCode: this.constants.REQ_ACTION_CODE.RESET_PASSWORD, // resetpass
				procedure: this.constants.REQ_PROCEDURE_NAME.RESET_PASSWORD
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