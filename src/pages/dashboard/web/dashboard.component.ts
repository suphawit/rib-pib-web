import { OnInit , ViewChild} from '@angular/core';
import { Constants } from '../../../share/service/constants';
import { MyAccountService } from '../../../pages/my-account/my-account.service';
import { TranslateService } from 'ng2-translate';
import { PermissionService, PermissionChangeRoute } from '../../../share/service/permission.service';
import { AlertMessageComponent } from '../../../share/component/alert-message/alert-message.component';
import { RequestToPayService } from '../../../pages/request-to-pay/request-to-pay.service';
import { MasterDataService } from '../../../share/service/master-data.service';

export class DashboardComponent implements OnInit {
    public pageType: string;
    public firstLoad: boolean;
    @ViewChild('alertMessage') public alertMessage: AlertMessageComponent;
    alertConfig: { title: string, type: string, message: string, show: boolean, option: any };

    private isShowRegisterKKPromptPayLink: boolean = false;

    accountDetailConfig: { accountData: any; hideMenu: boolean; showBorder: boolean; style: string; };
    KKPromptPayListOptions: {isFromDashBoard: boolean, 
        DashBoardData: {
            accountList: Array<ArrayConstructor>
        }
    };


    constructor(
        public myAccountService: MyAccountService,
        public constants: Constants,
        public translateService: TranslateService,
        public permissionService: PermissionService,
        public permissionChangeRoute: PermissionChangeRoute,
        public requestToPayService: RequestToPayService,
        public masterDataService: MasterDataService) {
      
    }
  ngOnInit() {
    this.firstLoad = true;
    
    this.alertConfig = {
      title: '',
      type: 'danger',
      message: '',
      show: false,
      option: {}
    };
    //set kk prompt pay tab
    this.KKPromptPayListOptions = {
      isFromDashBoard: true,
      DashBoardData:{
        accountList:[]
      }
    }

    //set my account detail tab
    this.accountDetailConfig = {
            accountData: {},
            hideMenu: false,
            showBorder: true,
            style: this.constants.STYLE_RIB_WEB
    };
    //set default page as my account tab
    this.pageType = this.constants.DASHBOARD_MENU.MY_ACCOUNT;
  }

  switchPageType(pageTypeChange: string){
    this.pageType = pageTypeChange;
    if(this.pageType === this.constants.DASHBOARD_MENU.MY_PROMPTPAY && this.firstLoad){
      this.inquiryAnyIDAccountService();
    }
  }

  ongetMyAccount(data: any) {
    let newData = data;
        newData.allowTransfer = false;
        newData.allowPayment = false;
        
        this.accountDetailConfig.accountData = newData;
        this.myAccountService.selectAccountDetailData = newData;
  }

  onAccountDetail(data: any) {
    if (data.name === 'moreinfo') {
     this.permissionChangeRoute.changeRoute('MY_DEPOSITS.DETAIL');
    }
  }

  gotoAddAccountPage() {
    this.myAccountService.newMyAccountData = undefined;
    this.permissionChangeRoute.changeRoute('MY_DEPOSITS.ADD');
  }

  onListError(data: any) {
    if (data.msg === 'error') {
        this.alertConfig.message = data.data.errorMessage;
      } else {
        this.alertConfig.message = this.translateService.instant(this.constants.RESP_CODE_MY_ACCOUNT_NOT_FOUND);
      }
      this.alertMessage.show();
    }

  inquiryAnyIDAccountService(){
    this.masterDataService.getAllAnyIDTypes().then((result: any) => {
        let anyIDTypes = result;
        for(let i in anyIDTypes){
            if (anyIDTypes[i].anyIDType === this.constants.ANYID_TYPE_BANK_ACCOUNT) {
                delete anyIDTypes[i];
            }
        }
        this.requestToPayService.inquiryRequestToPayAnyIdMy(anyIDTypes).then((result: any) => {
           if(result.errorMessage === undefined){
                this.KKPromptPayListOptions = {
                  isFromDashBoard: true,
                  DashBoardData:{
                    accountList:result
                  }
                }
          } else if(result.responseCode == 'RIB-E-ANY019'){ 
                this.alertConfig.message = result.errorMessage;
                this.isShowRegisterKKPromptPayLink = (this.pageType === this.constants.DASHBOARD_MENU.MY_PROMPTPAY);
          } else {
                this.alertConfig.message = result.errorMessage;
                this.alertMessage.show();
           }
           

           this.firstLoad = false;
        });

    });

  }

  checkIsHiddenPageType(currentPage: string){

      switch(currentPage){
        case this.constants.DASHBOARD_MENU.MY_ACCOUNT: {
          return !(this.pageType === currentPage)
        }
        case this.constants.DASHBOARD_MENU.MY_PROMPTPAY: {
          return !(this.pageType === currentPage)
        }
      }
  }
}