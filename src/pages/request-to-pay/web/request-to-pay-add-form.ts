import { Constants } from '../../../share/service/constants';
import { OnInit, OnDestroy } from '@angular/core';
import { PermissionChangeRoute } from '../../../share/service/permission.service';
import { TranslateService } from 'ng2-translate/src/translate.service';
import { Dateservice } from '../../../share/service/date.service';
import { MasterDataService } from '../../../share/service/master-data.service';
import { AnyIDTypeBean } from '../../../share/bean/anyid-type-bean';
import { RequestToPayService } from '../request-to-pay.service';
import { ViewChild } from '@angular/core';
import { AlertMessageComponent } from '../../../share/component/alert-message/alert-message.component';
import { OtherAccountService } from '../../other-account/other-account.service';
import { UtilService } from '../../../share/service/util.service';

export class RequestToPayAddForm implements OnInit, OnDestroy {
    protected settings= { styleClass: ''};
    private myAccountLists = [];
    private otherAccountLists = [];
    private model: any = {
        amount: "0.00",
        createRTPDate: "",
        note: ""
    };
    private anyIDTypes = [];
    private AnyIDTypeForToAccount: any = [];
    private fromAccount = {
        aliasName : '',
        accNo : '',
        anyIDValue : '',
        anyIDType : new AnyIDTypeBean
    };
    private toAccount = {
        accNo: '',
        aliasName: '',
        anyIDType: new AnyIDTypeBean,
        category: {catId:''},
        isSelectAccFromFavList: false
    };

    type: string;
    message: string;
    @ViewChild('alertMessage') public alertMessage: AlertMessageComponent;

    public dt: Date;
    private today: any;
    private minDate: Date;
    private maxDate: Date;
    private dateOptions: any;
    private submitted: boolean = false;
    private nextStep: string = 'MY_RTP.ADD_CONFIRM';
    private currentLang = this.translate.currentLang;

    private isShowRegisterKKPromptPayLink: boolean = false;
    private isMyAccountHasData: boolean =  false;
    private isOtherAccountHasData: boolean =  false;
  constructor(public constants: Constants,
    public permissionChangeRoute: PermissionChangeRoute,
    public translate: TranslateService,
    public dateService: Dateservice,
    public masterDataService: MasterDataService,
    public requestToPayService: RequestToPayService,
    public otherAccountService: OtherAccountService,
    public utilService: UtilService) {
  }

    ngOnInit(): void {
        if (this.utilService.arrayObjectIndexOf(['/other-account-detail'], this.permissionChangeRoute.prevUrl) !== -1
            && this.otherAccountService.selectAccountDetailData != null){
            let fromOtherAccountDetailData = this.otherAccountService.selectAccountDetailData.accountBean;
            
            this.toAccount = {
                accNo: fromOtherAccountDetailData.accNo,
                aliasName: '',
                anyIDType: fromOtherAccountDetailData.anyIDType,
                category: {catId: fromOtherAccountDetailData.category.catId},
                isSelectAccFromFavList: false
            };
        }else if (this.utilService.arrayObjectIndexOf(['/prompt-pay-detail'], this.permissionChangeRoute.prevUrl) !== -1
                && this.requestToPayService.getcreateRTPObj() != null){
            let fromKKPromptPayDetailData = this.requestToPayService.getcreateRTPObj();
            
            this.fromAccount = {
                accNo: fromKKPromptPayDetailData.accountNo,
                aliasName: fromKKPromptPayDetailData.accountName,
                anyIDType: fromKKPromptPayDetailData.anyIDType,
                anyIDValue: fromKKPromptPayDetailData.anyIDValue
            }
        }

        this.masterDataService.getAllAnyIDTypes().then((result: any) => {
            this.anyIDTypes = result;
            for(let i in this.anyIDTypes){
                if (this.anyIDTypes[i].anyIDType === this.constants.ANYID_TYPE_BANK_ACCOUNT) {
                    delete this.anyIDTypes[i];
                }
            }
            this.AnyIDTypeForToAccount = this.anyIDTypes;
            this.inquiryMyAccountData();
            this.inquiryOtherAccountData();
           
        });

        this.dateOptions = this.dateService.getMasterDates();
        
        this.masterDataService.getCurrentDate().then((result: any) => {
            let dt = result;
            this.today = this.dateService.formatDate(dt, 'DD/MM/YYYY');
            this.minDate = dt;
            this.maxDate = dt;
            this.dt = dt;
            this.model.createRTPDate = this.dateService.formatDate(dt, "dddd D MMMM YYYY", this.currentLang);
        });

       let tmpRouteBackRTPObj = this.requestToPayService.gettmpRTPObj();
        
        if(tmpRouteBackRTPObj!=null){
            this.fromAccount = tmpRouteBackRTPObj.fromAccount;
            this.toAccount = tmpRouteBackRTPObj.toAccount;
            this.model.amount = tmpRouteBackRTPObj.amount;
            this.model.note = tmpRouteBackRTPObj.note;
            this.requestToPayService.settmpRTPObj(null);
        }
    }

    ngOnDestroy(): void {
        this.permissionChangeRoute.targetAction = null;
        this.permissionChangeRoute.prevUrl = null;
    }


    updateMyAccount(obj){
        this.fromAccount = {
            aliasName : obj.accountAliasName,
            accNo : obj.accountNo,
            anyIDValue : obj.anyIDValue,
            anyIDType : obj.anyIDType
        };
    }


    updateOtherAccount(obj){
        this.toAccount = {
            accNo: obj.accNo,
            aliasName: '',
            anyIDType : obj.anyIDType,
            category:{ catId: obj.category.catId },
            isSelectAccFromFavList: obj.isSelectAccFromFavList
        }
    }

    public getShortDescDisplay(account,Type) {
        let anyIDType = account.anyIDType || new AnyIDTypeBean;
        let prefix = '';
        if (typeof anyIDType.anyIDType !== "undefined") {
            prefix = anyIDType.shortName;
        }
        let checkType = Type === 'fromAccount'?  account.anyIDValue: account.accNo;
        return prefix + ' (' + checkType + ')';
    }

    onSelect(date: Date) {
        this.model.createRTPDate = this.dateService.formatDate(date, 'dddd D MMMM YYYY', this.currentLang);
    }

    goToNextStep(data,valid){
        this.submitted = true;

        if(this.utilService.validSpecialChar(data.note) || this.utilService.validNewline(data.note)){
            this.showErrorMessage(this.translate.instant('valErr.validSpecialChar'));
            return; 
        }

        if (this.fromAccount.accNo !== '' && this.toAccount.accNo !== '' && valid) {
            let promise = null;
            
            let createRTPObj = {
                fromAnyIdType:  this.fromAccount.anyIDType,
                fromAnyIdValue:  this.fromAccount.anyIDValue,
                fromAccountNo:  this.fromAccount.accNo,
                toAnyIdType:  this.toAccount.anyIDType,
                toAnyIdValue:  this.toAccount.accNo,
                amount:  data.amount,
                memo:  data.note,
                isAddNew: (Number(this.toAccount.category.catId) === 999) 
            };
            promise = this.requestToPayService.prepareCreateRTP(createRTPObj);

            if (promise != null) {
                promise.then((result: any) => {
                    
                    if (typeof result.responseCode === 'undefined') {
                        this.requestToPayService.setcreateRTPObj(result);
                        //tmp toute back
                        this.model.fromAccount = this.fromAccount;
                        this.model.toAccount = this.toAccount
                        this.requestToPayService.settmpRTPObj(this.model);
                        
                        this.permissionChangeRoute.changeRoute(this.nextStep);
                    } else {
                        this.showErrorMessage(result.errorMessage);
                    }
                });
            }
        }
    }

    private inquiryMyAccountData(){
        this.requestToPayService.inquiryRequestToPayAnyIdMy(this.anyIDTypes).then((result: any) => {

            if(result.errorMessage === undefined){
                this.myAccountLists = result;
                this.isMyAccountHasData = true;
            }else if(result.responseCode == 'RIB-E-ANY019'){
                this.message = result.errorMessage;
                this.isShowRegisterKKPromptPayLink = true;
            }else{
                this.showErrorMessage(result.errorMessage);
            }

        });
    }

    private inquiryOtherAccountData(){
        this.requestToPayService.getOtherAccounts(this.anyIDTypes,this.toAccount).then((result: any) => {
            //result = []
            if(result.errorMessage){
                this.showErrorMessage(result.errorMessage);
            } else {
                this.isOtherAccountHasData = (result.length>0);
                this.otherAccountLists = result;
            }
        });
    }

    private showErrorMessage(errorMessage: string){
        this.message = errorMessage;
        this.type = 'danger';
        this.alertMessage.show();
    }
}