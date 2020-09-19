
import { Component, Input, Output, EventEmitter, OnInit, style, state, transition, trigger, animate } from '@angular/core';
import { Constants } from '../../../../../../share/service/constants';
import { BillPaymentService } from '../../../../bill-payment.service';
import { BillPaymentRequestToPayService } from '../../../../../../pages/bill-payment-request-to-pay/bill-payment-request-to-pay.service';
import { BillerBean } from '../../../../../../share/bean/biller-bean';
import { TranslateService } from "ng2-translate/src/translate.service";
import { UtilService } from '../../../../../../share/service/util.service';

require("!style-loader!css-loader!sass-loader!./to-biller-list.scss");

@Component({
    selector: 'to-biller-list',
    templateUrl: './to-biller-list.html',
    animations: [
        trigger('accordingState', [
            state('collapsed, void', style({
                display: 'none'
            })),
            state('expanded', style({
                display: 'block'
            }))
        ])
    ]
})

export class ToBillerList implements OnInit {

    public msg: string;

    protected accordian: { data: Array<any>; state: any; };

    public billers: Array<BillerBean> = new Array<BillerBean>();

    @Input() settings: any;
    @Input() currentBiller: BillerBean;
    @Output() billerChanged = new EventEmitter();

    constructor(public constants: Constants,
        public billPaymentService: BillPaymentService,
        public billPaymentRequestToPayService: BillPaymentRequestToPayService,
        protected translate: TranslateService,
        public utilService: UtilService
    ) {
    }

    protected init() {
        this.accordian = {
            data: [],
            state: {}
        };
        this.accordian.data = [];
        this.accordian.state = {};
        
        this.billPaymentRequestToPayService.getUserDataBillerProfileList().then((result: any) => {
            let userDataBillerProfileList = Array<BillerBean>();
            if(result.responseJSON.result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS){
                if (result.responseJSON.result.value.length > 0) {
                    result.responseJSON.result.value.forEach(element => {
                        let billerBean : BillerBean = this.parseObjToBillerBean(element);
                        userDataBillerProfileList.push(billerBean);
                    });
                    this.createUserBillerProfileRequestToPayForAccordianData(userDataBillerProfileList);
                }
                // } else if(this.settings.module != 'BILL_REQUEST_TO_PAY'){
                //     this.msg = this.translate.instant(this.constants.RESP_CODE_BILLER_NOT_FOUND);
                //     this.billPaymentService.updateObserver([
                //         { key: 'alertmessage', value:this.msg, show: true }
                //     ])
                // }
            } else {
                this.msg = result.responseJSON.result.responseStatus.errorMessage;
                this.billPaymentService.updateObserver([
                    { key: 'alertmessage', value: this.msg, show: true }
                ])
            }
        });
    }

    ngOnInit(): void {
        this.init();
    }

    public toggleState(selectState) {
        this.accordian.state[selectState] = (this.accordian.state[selectState] === 'expanded') ? 'collapsed' : 'expanded';
        this.autoScaleHeight();
    }

    onSelectChanged(billerObj: any) {
        console.log(billerObj)
        if(this.settings.module!='BILL_REQUEST_TO_PAY'){
            this.getBiller(billerObj);
        }
    }

    private getBiller(billerObj: any) {
       
        //if(this.isRTP!=undefined && this.isRTP!=true){
        this.currentBiller = billerObj;
        this.billerChanged.emit(billerObj);
       // }
    }

    isHighlighted(billerObj, currentBiller) {
        return currentBiller != null ? billerObj.billerID === currentBiller.billerID : false;
    }

    private createUserBillerProfileRequestToPayForAccordianData(data: Array<BillerBean>) {
        console.log('createUserBillerProfileRequestToPayForAccordianData')
        let userBillerProfileList: Array<BillerBean> = data;
        let itemCount = 0;
        let favouriteBillerProfileCount = this.createFavouriteBillerProfile(userBillerProfileList);
        
        let accordianData = { stateName: {}, stateData: [] };
        userBillerProfileList.forEach(userBillerProfile => {
            accordianData.stateName = { id: 'list', name: this.translate.instant('label.rightPanelbillerList') };
            accordianData.stateData.push(userBillerProfile);
            
            // set accordian state
            if (favouriteBillerProfileCount > 0) {
                this.accordian.state['list'] = 'collapsed';
            } else {
                this.accordian.state['list'] = 'expanded';
            }

            itemCount++;
        });

        this.accordian.data.push(accordianData);


    }

    private createFavouriteBillerProfile(data: any) {
        let userBillerProfileList = data;
        let favouriteData = userBillerProfileList.filter(x => x.isFavourite === 'Y') || [];


        if (favouriteData.length > 0) {
            let accordianData = { stateName: {}, stateData: [] };
            accordianData.stateName = { id: 'fav', name: 'lbl.myFavourite' };
            accordianData.stateData = favouriteData;

            // set accordian state
            this.accordian.state['fav'] = 'expanded';

            // set accordian data
            this.accordian.data.push(accordianData);
        }

        return favouriteData.length;
    }

    private parseObjToBillerBean(data: any) : BillerBean {
        console.log('data' , data);
        let billerBean : BillerBean = new BillerBean();
        billerBean.billerAliasName = data.aliasName;
        billerBean.billerID = data.billerId;
        billerBean.categoryId = data.categoryId;
        billerBean.billerName = (this.translate.currentLang === 'en')?data.billerNameEn:data.billerNameTh;
        billerBean.companyCode = data.companyCode;
        billerBean.createdDate = data.createdDate;
        billerBean.lastUpdatedDate = data.lastUpdatedDate;
        billerBean.isFavourite = data.isFavourite;
        billerBean.profileCode = data.profileCode;
        billerBean.billerProfileId = data.billerProfileId;
        billerBean.promptPayBillerId = data.promptPayBillerId;
        billerBean.serviceCode = data.serviceCode;
        if (data.refInfos != null) {
            data.refInfos.forEach((element) => {
                if (element.no == '1') {
                    billerBean.ref1 = element.value;
                    billerBean.ref1TextEn = element.textEn;
                    billerBean.ref1TextTh = element.textTh;
                }
                if (element.no == '2' && !this.isEDonationCategory(data.categoryId)) {
                    billerBean.ref2 = element.value;
                    billerBean.ref2TextEn = element.textEn;
                    billerBean.ref2TextTh = element.textTh;
                }
                if (element.no == '3') {
                    billerBean.ref3 = element.value;
                    billerBean.ref3TextEn = element.textEn;
                    billerBean.ref3TextTh = element.textTh;
                }
            });
        }
        
        return billerBean;
    }

    protected trackByFn(index, item) {
        return index;
    }

    protected autoScaleHeight(): void {
        if (window != window.top) {
            let root = this;
            root.utilService.setPageHeight(700);

            setTimeout(function () {
                root.utilService.pageLoad();
            }, 500);
        }
    }

    getAddNewBillerBeanData(data: BillerBean){
        if(this.settings.module!='BILL_REQUEST_TO_PAY'){
            data.isAddNewToBiller = true;
            this.billerChanged.emit(data);
        }
    }

    private isEDonationCategory(id: string): boolean {
        return id === this.constants.E_DONATION_CATEGORY_ID;
    }
}