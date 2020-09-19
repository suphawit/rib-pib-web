import { Component, trigger, animate, style, state, transition, OnInit, Inject } from '@angular/core';
import { BillPaymentService } from '../../pages/bill-payment/bill-payment.service';
import { Constants } from '../../share/service/constants';
import { BankCodeDataService } from '../../share/service/bankcode-data.service';
import { TranslateService} from "ng2-translate/src/translate.service";
import { PermissionChangeRoute, PermissionService } from '../../share/service/permission.service';
import { Router } from '@angular/router';

declare var BUILD_NUM;

@Component({
  selector: 'biller-accordian',
  templateUrl: './biller-accordian.html',
  animations: [
    trigger('accordingState', [
      state('collapsed', style({
        height: '0px',
        display: 'none',
        overflow: 'hidden',
        '-webkit-transition-property': 'height, visibility',
        'transition-property': 'height, visibility'
      })),
      state('expanded',   style({
        height: '*',
        display: 'block',
        overflow: 'visible',
        '-webkit-transition-property': 'height, visibility',
        'transition-property': 'height, visibility'
      })),
      transition('collapsed <=> expanded', [animate(200)])
    ])
  ]
})
// Component class
export class BillerAccordianComponent implements OnInit {
    accordian:{data:Array<any>; state:any;};
    bankcodeImageProperties: any;
    private isShowMoreInfo: boolean = true;
    private isShowBillPay: boolean = true;
    private isShowMoreInfoDetail: boolean = true;
    public BUILD_NUM = BUILD_NUM;
    
    constructor(
        public constants: Constants, 
        public billPaymentService: BillPaymentService, 
        public bankCodeDataService: BankCodeDataService,
        public permissionChangeRoute: PermissionChangeRoute, 
        public translateService: TranslateService,
        @Inject(Router) public router: Router, 
        public permissionService: PermissionService) {
    }

    ngOnInit(){
        this.accordian = {
          data:[],
          state: {}
        };

        this.getBillerList();
        this.billPaymentService.confirmAddBillerData = undefined;
        
        
        this.isShowMoreInfo = this.permissionService.getActionCode().MANAGE_BILLER? true:false;
        this.isShowBillPay = this.permissionService.getShortcutActionCodePermission('PAY_BILL','PAY_BILL')? true:false;
    
    }

    toggleState(selectState){
      
      let selectedState = (this.accordian.state[selectState] === 'expanded') ? 'collapsed' : 'expanded';
      let allState = (this.accordian.state[selectState] === 'expanded') ? 'expanded' : 'collapsed';
      for (let key in this.accordian.state) {
        if(selectState === key){
            this.accordian.state[key] = selectedState;
        } else {
            this.accordian.state[key] = allState;
        }
      } 
    }

    onClickFavourite(data: any){

    }

    getBillerList(){
        this.accordian.data = [];
        this.accordian.state = {};

        this.billPaymentService.getBillerList().then((result: any) => {
            let tmpresult = result.responseJSON.result;
            if(tmpresult.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS){
                this.createBillerAccordianDataByCategory(tmpresult.value);
            } else {
                //prepare for biller list not found
            }
        }, function (error) {
            
        });
    }

    createBillerAccordianDataByCategory(data: any) {
        let billerList = data;
        let categoriesData = this.getCategories(billerList);

        // createFavouriteAccount -- wait for add favourite biller --
        // this.createFavouriteAccount(externalAccount);

        for (let category of categoriesData) {
            let categoryTmp = category;
            let accordianData = {stateName: {}, stateData: []};
            for (let item of billerList) {
                accordianData.stateName = {id: '1', name: 'Kiatnakin Product'};
                accordianData.stateData.push(item);
            }
            // set accordian data
            this.accordian.data.push(accordianData);
        }
        
    }

    createFavouriteAccount(data: any){
        // let favouriteData = [];
        // let externalAccount = data;
        // for (let item of externalAccount){
        //     if(item.isFavourite === 'Y'){
        //         favouriteData.push(item);
        //     }
        // }
        // 
        // if(favouriteData.length > 0){
        //     let accordianData = {stateName: {}, stateData: []};
        //     accordianData.stateName = {id: 'fav', name: 'label.favourites'};
        //     accordianData.stateData = favouriteData;
            
        //     // set accordian state
        //     this.accordian.state['fav'] = 'expanded';

        //     // set accordian data
        //     this.accordian.data.push(accordianData);
        // }
    }
    
    getCategories(data: any): Array<any> {
        let returnData = [];
        
        // ----- wait for biller category -----
        // let cateTmp = {};
        // let billerList = data;
        // for (let item of billerList){
        //     if(cateTmp[item.catId] !== item.categoryName){
        //         cateTmp[item.catId] = item.categoryName;
        //         returnData.push({ id: item.catId, name: item.categoryName });
        //     }
        // }
        // ------- 

        /// mock category biller
        returnData.push({id: '1', name: 'Kiatnakin Product'});

        return returnData;
    }

    navigateToBillerDetail(data: any){
        // go to biller detail
        this.billPaymentService.selectBillerDetailData = data;
        // config router to page detail
        this.permissionChangeRoute.changeRoute('MANAGE_BILLER.DETAIL');
    }


    navigateToBillerPromptpayDetail(data: any){
    
        this.permissionChangeRoute.changeRoute('MANAGE_BILLER.detail');
    }

    navigateToPayBill(data: any) {
        // go to biller detail
        this.billPaymentService.selectBillerDetailData = data;
        
        this.permissionChangeRoute.prevUrl = this.router.url; 
        // config router to page detail
        this.permissionChangeRoute.changeRoute('PAY_BILL');
    }
}