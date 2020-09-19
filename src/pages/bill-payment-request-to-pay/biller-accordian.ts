import { Component, trigger, animate, style, state, transition, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from "ng2-translate/src/translate.service";

import { PermissionChangeRoute, PermissionService } from '../../share/service/permission.service';
import { BillPaymentRequestToPayService } from './bill-payment-request-to-pay.service';
import { BillPaymentService } from '../../pages/bill-payment/bill-payment.service';
import { BillerProfileBean } from '../../share/bean/biller-profile-bean';
import { Constants } from '../../share/service/constants';
import { UtilService } from "../../share/service/util.service";

declare var BUILD_NUM;

@Component({
    selector: 'biller-request-to-pay-accordian',
    templateUrl: './biller-accordian.html',
    animations: [
        trigger('accordingState', [
            state('collapsed, void', style({
                height: '0'
            })),
            state('expanded', style({
                height: '*'
            })),
            transition('collapsed <=> expanded', [animate(250)])
        ])
    ]
})
// Component class
export class BillerAccordianRequestToPay implements OnInit {

    @Output('onGetStatus') onGetStatus = new EventEmitter();

    protected accordian: { data: Array<any>; state: any; };
    public BUILD_NUM = BUILD_NUM;

    constructor(
        protected constants: Constants,
        protected permissionChangeRoute: PermissionChangeRoute,
        protected router: Router,
        protected billPaymentRequestToPayService: BillPaymentRequestToPayService,
        protected translate: TranslateService,
        protected billPaymentService: BillPaymentService,
        public utilService: UtilService,
        public permissionService: PermissionService) {

    }

    ngOnInit() {
        this.accordian = {
            data: [],
            state: {}
        };

        this.getUserBillerProfile();
        this.permissionChangeRoute.prevUrl = this.router.url;
    }

    public toggleState(selectState) {
        this.accordian.state[selectState] = (this.accordian.state[selectState] === 'expanded') ? 'collapsed' : 'expanded';
        this.autoScaleHeight()
    }

    public navigateToBillerProfileDetail(data: BillerProfileBean) {
        
        this.billPaymentRequestToPayService.setSelectBillerProfileDetail(data);
        this.permissionChangeRoute.changeRoute('MANAGE_BILLER.detail');
    }

    public navigateToPayBill(data: BillerProfileBean) {
        // go to biller detail
        this.billPaymentService.selectBillerDetailData = this.billPaymentRequestToPayService.parseBillerProfileBeanToBillerBean(data);
        
        this.permissionChangeRoute.prevUrl = this.router.url;
        // config router to page detail
        this.permissionChangeRoute.changeRoute('PAY_BILL');
    }

    onClickFavourite(data: BillerProfileBean) {
        this.billPaymentRequestToPayService.updateFavouriteBiller(data).then((objResponse: any) => {
            this.sendStatus('', '');
            let result = objResponse.responseJSON.result;
            //

            if (result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                this.getUserBillerProfile();
            } else {
                this.sendStatus('error', result.responseStatus);
            }
        }, function (error) {
            
        });
    }
    protected getUserBillerProfile(){
        this.accordian.data = [];
        this.accordian.state = {};

        this.billPaymentRequestToPayService.getUserDataBillerProfileList().then((result: any) => {
            
            let userDataBillerProfileList = Array<BillerProfileBean>();
            if(result.responseJSON.result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS){
                if (result.responseJSON.result.value.length > 0) {
                    result.responseJSON.result.value.forEach(element => {
                        let billerProfileBean : BillerProfileBean = this.billPaymentRequestToPayService.parseObjToBillerProfileBean(element);
                        userDataBillerProfileList.push(billerProfileBean);
                    });
                    this.createUserBillerProfileRequestToPayForAccordianDataByCategory(userDataBillerProfileList);
                } else {
                    this.sendStatus('no result', result.responseJSON.result.value);
                }
            } else {
                this.sendStatus('error', result.responseJSON.result.responseStatus);
            }
        });
    }

    private createUserBillerProfileRequestToPayForAccordianDataByCategory(data: Array<BillerProfileBean>) {
        let userBillerProfileList: Array<BillerProfileBean> = data;
        let categoriesData = this.getCategories(userBillerProfileList);
        

        let itemCount = 0;
        let favouriteBillerProfileCount = this.createFavouriteBillerProfile(userBillerProfileList);
        
        categoriesData.forEach(category => {
            let accordianData = { stateName: {}, stateData: [] };
            userBillerProfileList.forEach(userBillerProfile => {
                if (userBillerProfile.categoryId === category.id) {
                    accordianData.stateName = { id: userBillerProfile.categoryId, name: (this.translate.currentLang === 'en')?userBillerProfile.categoryEn:userBillerProfile.categoryTh };
                    accordianData.stateData.push(userBillerProfile);
                }

                // set accordian state
                if (this.accordian.state[userBillerProfile.categoryId] === undefined) {
                    if (favouriteBillerProfileCount > 0 || itemCount > 0) {
                        this.accordian.state[userBillerProfile.categoryId] = 'collapsed';
                    } else {
                        this.accordian.state[userBillerProfile.categoryId] = 'expanded';
                    }

                    itemCount++;
                }
            });

            // set accordian data
            this.accordian.data.push(accordianData);
        });

        
    }

    private getCategories(data: Array<BillerProfileBean>): Array<any> {
        let category = {};
        let returnData = [];
        let userBillerProfileList: Array<BillerProfileBean> = data;

        userBillerProfileList.forEach(item => {
            if (category[item.categoryId] !== item.categoryId) {
                category[item.categoryId] = item.categoryId;
                returnData.push({ id: item.categoryId, nameEn: item.categoryEn, nameTh: item.categoryTh });
            }
        });

        return returnData;
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

    private sendStatus(msg, data) {
        
        this.onGetStatus.emit({
            msg: msg,
            data: data
        });
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
}