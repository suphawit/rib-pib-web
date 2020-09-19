import { Injectable } from '@angular/core';
import { MfpApi } from '../../share/mfp/mfp-api.service';
import { TranslateService } from "ng2-translate/src/translate.service";
import { Constants } from '../../share/service/constants';
@Injectable()
export class qrGeneratorService {
    private QRCodeData: any;

    constructor(private _MfpApi: MfpApi,
    private _TranslateService: TranslateService,
    private _Constants: Constants) {

    };

    public generateQRCodeData(Data: any) {
        let promise = new Promise((resolve, reject) => {
            let obj = {
                params: {
                    language: this._TranslateService.currentLang,
                    fromAnyIdType:  Data.fromAnyIdType,
                    fromAnyIdValue:  Data.fromAnyIdValue,
                    amount:  Data.amount,
                    format: 'EMV'
                },
                actionCode: this._Constants.REQ_ACTION_CODE.QR_GERNERATE,
                procedure: this._Constants.REQ_PROCEDURE_NAME.QR_GERNERATE
            };
            this._MfpApi.invokeProcedure(obj).then((result) => {
                let response = result.responseJSON.result;
                if(result.responseJSON.result.responseStatus.responseCode === this._Constants.RESP_CODE_SUCCESS){
                       resolve(response);
                }else {
                       resolve(response.responseStatus);
                }
                
            }, function (error) {
                reject(error);

            });
        });
        return promise;
    }

    public getQRCodeData(): any {

        return this.QRCodeData;
    }
    public setQRCodeData(QRCodeData: any) {

        this.QRCodeData = QRCodeData;
    }
}