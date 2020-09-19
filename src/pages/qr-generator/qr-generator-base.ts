import { OnInit,ViewChild} from '@angular/core';
import { RequestToPayService } from '../request-to-pay/request-to-pay.service';
import { Constants } from '../../share/service/constants';
import { TranslateService } from "ng2-translate/src/translate.service";
import { MasterDataService } from '../../share/service/master-data.service';
import { FormBuilder, Validators } from '@angular/forms';
import { qrGeneratorService } from './qr-generator.service';
import { CurrencyFormatterPipe } from '../../share/pipe/currency-formatter.pipe';
import { ValidationService } from '../../share/service/validation.service';
import { PermissionService, PermissionChangeRoute, PermissionMainMenu } from '../../share/service/permission.service';
import { AlertMessageComponent } from '../../share/component/alert-message/alert-message.component';

export class QRGeneratorBase{

    private QRGeneratorFormGroup: any;
    private accounts: any = [];
    private anyIDTypes: any = [];
    private message: string;
    private type: string;

    private isHasMyAccountData: boolean;

    private isDisableAmount: boolean = true;
    private finishLoad: boolean = false;
    private isShowKKPromptPayLink: boolean = false;
     @ViewChild('alertMessage') public alertMessage: AlertMessageComponent;

    constructor(protected fb: FormBuilder,
    protected requestToPayService: RequestToPayService,
    protected translate: TranslateService,
    protected constants: Constants,
    protected masterDataService: MasterDataService,
    protected qrGeneratorService: qrGeneratorService,
    protected currencyFormatter: CurrencyFormatterPipe,
    protected permissionChangeRoute: PermissionChangeRoute
    ) {
    
    }
   initial(){
        this.initQRFormGroup();
        this.inquiryAnyIDMy();
        this.checkTmpfromRouteBack();
   }
   


    onSubmit(){
        
        if (this.QRGeneratorFormGroup.value.myPromptPayAccount !== '') {
            let promise = null;

            let QRgenerateData = {
                fromAnyIdType:  ((this.accounts.find(x => x.anyIDValue == this.QRGeneratorFormGroup.value.myPromptPayAccount)).anyIDType).anyIDType,
                fromAnyIdValue:  this.QRGeneratorFormGroup.value.myPromptPayAccount,
                amount:  (parseFloat(this.QRGeneratorFormGroup.value.amount) == 0 || isNaN(parseFloat(this.QRGeneratorFormGroup.value.amount)) )
                ? null : this.currencyFormatter.parse(this.QRGeneratorFormGroup.value.amount).toString()
            };

             
            promise = this.qrGeneratorService.generateQRCodeData(QRgenerateData);

            if (promise != null) {
                promise.then((result: any) => {
                    
                    if (typeof result.responseCode === 'undefined') {

                        let QRData = {
                            value: result.value,
                            QRGeneratorFormGroup: this.QRGeneratorFormGroup.value,
                            isDisableAmount: this.isDisableAmount,
                            accountName: ((this.accounts.find(x => x.anyIDValue == this.QRGeneratorFormGroup.value.myPromptPayAccount))).accountName
                        }

                        this.qrGeneratorService.setQRCodeData(QRData);                     
                        this.permissionChangeRoute.changeRoute('QR_GENERATOR.COMPLETE');
                    } else {

                        this.showErrorMessage(result.errorMessage);
                    }
                });
            }
        }
    }

    private toggleDisableAmount(value: boolean){
        this.isDisableAmount = value;
        this.QRGeneratorFormGroup.controls['amount'].reset({ value: '0.00', disabled: this.isDisableAmount });
    }

    private inquiryAnyIDMy(){
         this.masterDataService.getAllAnyIDTypes().then((result: any) => {
            this.anyIDTypes = result;
            for(let i in this.anyIDTypes){
                if (this.anyIDTypes[i].anyIDType === this.constants.ANYID_TYPE_BANK_ACCOUNT) {
                    delete this.anyIDTypes[i];
                }
            }

            this.requestToPayService.inquiryRequestToPayAnyIdMy(this.anyIDTypes).then((result: any) => {
               
                if(result.errorMessage === undefined){
                    this.accounts = result;
                    this.isHasMyAccountData = (this.accounts.length > 0);
                }else if(result.responseCode == 'RIB-E-ANY019'){
                    this.message = result.errorMessage;
                    this.isShowKKPromptPayLink = true;
                }else{
                    this.showErrorMessage(result.errorMessage);
                } 
            });
            this.finishLoad = true;
        });
    }

    private initQRFormGroup(){
        this.QRGeneratorFormGroup = this.fb.group({
            'myPromptPayAccount': ['', [
                Validators.required,
            ]
            ],
            'amount': ['' , [
                Validators.required
            ]
            ]
        });
        this.QRGeneratorFormGroup.get('amount').disable();

        switch(this.permissionChangeRoute.prevUrl){
            case '/prompt-pay-detail': { 
                let promptPayData = this.qrGeneratorService.getQRCodeData();
                this.QRGeneratorFormGroup.controls['myPromptPayAccount'].setValue( promptPayData.anyIDValue );
                this.qrGeneratorService.setQRCodeData(undefined);
                break; 
            } 
            default: { 
               break; 
            } 
        }
    }

    private checkTmpfromRouteBack(){
        let tempExtAccData = this.qrGeneratorService.getQRCodeData();
        if(tempExtAccData != undefined){

            if(!tempExtAccData.isDisableAmount){
                this.toggleDisableAmount(tempExtAccData.isDisableAmount);
                tempExtAccData.QRGeneratorFormGroup.amount = this.currencyFormatter.parse(tempExtAccData.QRGeneratorFormGroup.amount)
            }
            this.QRGeneratorFormGroup.patchValue(tempExtAccData.QRGeneratorFormGroup);

            this.qrGeneratorService.setQRCodeData(undefined);
        }
    }

    validateAmount(){
       return  (parseFloat(this.QRGeneratorFormGroup.value.amount) < 0.01 || isNaN(parseFloat(this.QRGeneratorFormGroup.value.amount)) )
    }

    private showErrorMessage(errorMessage: string){
        this.message = errorMessage;
        this.type = 'danger';
        this.alertMessage.show();
    }
   
}