import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { PermissionService, PermissionMainMenu } from '../../service/permission.service'
import { MyAccountService } from '../../../pages/my-account/my-account.service';
import { Constants } from '../../service/constants';
import { TranslateService } from "ng2-translate/src/translate.service";

@Component({
    selector: 'portlets-menu',
    templateUrl: './portlets-menu.html'
})

export class PortletsMenuComponent implements OnInit, OnChanges {
    menuData: Array<{ name: string; icon: string; value: string; isShow: Boolean }>
    @Input('config') configData: any;
    @Input('isEDonateCategory') isEDonateCategory: any;
    @Input('style') styleWeb: any;
    @Output('OnMenuClick') menuClick = new EventEmitter();
    permissionManage: any;
    constructor(public permissionService: PermissionService,
        public myAccountService: MyAccountService,
        public constants: Constants,
        public translateService: TranslateService,
        public permissionMainMenu: PermissionMainMenu) {
    }

    ngOnChanges(changed: any) {

        if(changed.configData && changed.configData.currentValue){
            this.changeFavoriteIcon(changed.configData.currentValue);
        }
    }

    ngOnInit() {
        const menuName = this.validMenuName(this.permissionService.getMenuName());
        this.permissionManage = this.permissionService.getActionCode();
        if (menuName === 'MY_DEPOSITS.DETAIL') {

            this.myAccountService.requestInquiryMyAccount().then((result: any) => {
                let tmpresult = result.responseJSON.result;




                if (tmpresult.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                    let accountLists = tmpresult.value;

                    this.menuData = [
                        {
                            name: 'label.changeterm', icon: 'fa-file-text-o', value: this.constants.PORTLETS_MENU_DATA.CHANGETERM
                            , isShow: this.permissionManage.CHANGE_TERM_TD
                                && this.configData.accountType === this.constants.ACCOUNT_TYPE_TD ? true : false
                        },
                        {
                            name: 'lbl.transaction', icon: 'fa-file-text-o', value: this.constants.PORTLETS_MENU_DATA.STATEMENT
                            , isShow: this.permissionManage.VIEW_STATEMENT_MY_ACCOUNTS 
                                && this.permissionService.isProductAllow(this.configData.productID, "allowStatement") ? true : false
                        },
                        {
                            name: 'lbl.transfer', icon: 'fa-exchange', value: this.constants.PORTLETS_MENU_DATA.TRANSFER
                            , isShow: this.permissionService.getShortcutActionCodePermission('FUND_TRANSFER','FUND_TRANSFER')
                                && this.checkStatusAcc(this.configData.statusCode)
                               // && this.configData.accountType !== this.constants.ACCOUNT_TYPE_TD
                                && this.permissionService.isProductAllow(this.configData.productID, "allowTransferFrom") ? true : false
                        },
                        {
                            name: 'label.billpayment', icon: 'fa-barcode', value: this.constants.PORTLETS_MENU_DATA.PAYMENT
                            , isShow: 
                                this.permissionService.getShortcutActionCodePermission('PAY_BILL','PAY_BILL')
                                && this.permissionService.isProductAllow(this.configData.productID, "allowPayment")
                                && this.checkStatusAcc(this.configData.statusCode) ? true : false
                        },
                        {
                            name: 'lbl.pending', icon: 'fa-calendar', value: this.constants.PORTLETS_MENU_DATA.SCHEDULE
                            , isShow: 
                                this.permissionService.getShortcutActionCodePermission('MANAGE_SCHEDULE','VIEW_TRANSFER_SCHEDULE')
                                && this.permissionService.isProductAllow(this.configData.productID, "allowSchedule") ? true : false
                        },
                        {
                            name: 'btn.editAccount', icon: 'fa-cogs', value: this.constants.PORTLETS_MENU_DATA.EDIT
                            , isShow: this.permissionManage.MANAGE_MY_ACCOUNTS ? true : false
                        },
                        {
                            name: 'label.remove', icon: 'fa-trash-o', value: this.constants.PORTLETS_MENU_DATA.DELETE
                            , isShow: this.permissionManage.MANAGE_MY_ACCOUNTS && accountLists.length > 1 ? true : false
                        },
                    ];
                    this.filterPIBMenu([this.constants.PORTLETS_MENU_DATA.CHANGETERM]);
                }

            }, function (error) {

            });
        } else if (menuName === 'MANAGE_BILLER.DETAIL' || menuName === 'MANAGE_BILLER.detail') {
            this.menuData = [
                { name: 'label.billpayment', icon: 'fa fa-exchange', value: this.constants.PORTLETS_MENU_DATA.PAYMENT, isShow: this.permissionService.getShortcutActionCodePermission('PAY_BILL','PAY_BILL') ? true : false },
                { name: 'btn.editAccount', icon: 'fa-cogs', value: this.constants.PORTLETS_MENU_DATA.EDIT, isShow: true },
                { name: 'label.remove', icon: 'fa-trash-o', value: this.constants.PORTLETS_MENU_DATA.DELETE, isShow: true },
                { name: 'lbl.pending.paybill', icon: 'fa-calendar', value: this.constants.PORTLETS_MENU_DATA.SCHEDULE, isShow: this.permissionService.getShortcutActionCodePermission('MANAGE_SCHEDULE','VIEW_BILL_PAYMENT_SCHEDULE') ? true : false }
            ];
            if(this.isEDonateCategory) {
                //remove schedule if category == 26
                this.menuData.pop();
            }
        } else if (menuName === 'OTHER_ACCOUNTS.DETAIL') {
            let anyIDType = this.configData.anyIDType;
            this.menuData = [
                { name: 'lbl.transfer', icon: 'fa-exchange', value: this.constants.PORTLETS_MENU_DATA.TRANSFER, isShow: this.permissionService.getShortcutActionCodePermission('FUND_TRANSFER','FUND_TRANSFER')? true:false  },
                { name: 'btn.shortCutCreateRTP', icon: 'demo-icon icon-menu-request-to-pay2', value: this.constants.PORTLETS_MENU_DATA.CREATERTP, 
                isShow: anyIDType !== this.constants.ANYID_TYPE_BANK_ACCOUNT && this.permissionService.getShortcutActionCodePermission('MY_RTP','CREATE_RTP')?true:false },
                { name: 'label.favourite', icon: (this.configData.isFavourite === 'Y' ? 'fa-star' : 'fa-star-o') || this.configData, value: this.constants.PORTLETS_MENU_DATA.FAVOURITE, isShow: true },
                { name: 'btn.editAccount', icon: 'fa-cogs', value: this.constants.PORTLETS_MENU_DATA.EDIT, isShow: this.permissionManage.MANAGE_OTHER_ACCOUNTS? true:false },
                { name: 'label.remove', icon: 'fa-trash-o', value: this.constants.PORTLETS_MENU_DATA.DELETE, isShow: this.permissionManage.MANAGE_OTHER_ACCOUNTS? true:false }
            ];
        } else if (menuName === 'MY_KK_PROMPTPAY.DETAIL') {
                this.menuData = [
                    { name: 'btn.shortCutCreateRTP', icon: 'demo-icon icon-menu-request-to-pay2', value: this.constants.PORTLETS_MENU_DATA.CREATERTP, isShow: this.permissionService.getShortcutActionCodePermission('MY_RTP','CREATE_RTP') },
                    { name: 'btn.QRGen', icon: 'demo-icon icon-menu-qr', value: this.constants.PORTLETS_MENU_DATA.QRGEN, isShow: this.permissionService.getShortcutActionCodePermission('QR_GENERATOR','QR_GENERATOR')},
                    { name: 'btn.edit', icon: 'fa-cogs', value: this.constants.PORTLETS_MENU_DATA.EDIT, isShow: true},
                ];
        }
    }

    filterPIBMenu(condition: Array<string>) {
        if (this.styleWeb !== this.constants.STYLE_PIB_WEB) return;

        let filterCondition = function (item) {

            return condition.indexOf(item.value) === -1;
        };
        this.menuData = this.menuData.filter(filterCondition);
    }

    checkStatusAcc(accStatus) {
        if (accStatus == 1) {
            return true;
        }
        return false;
    }
    
    onMenuClick(value: string) {
        this.menuClick.emit(value);
    }

    private changeFavoriteIcon(config: any){
        if (this.menuData === undefined) return;

        for(let i = 0; i < this.menuData.length; i++){
            if (this.menuData[i].icon === 'fa-star' || this.menuData[i].icon ===  'fa-star-o'){
                this.menuData[i].icon = config;
            }
        }
    }

    private validMenuName(menuName){
        let returnMenuName = '';
        let arrMenuName = ['MY_DEPOSITS.DETAIL','MANAGE_BILLER.DETAIL','OTHER_ACCOUNTS.DETAIL','MANAGE_BILLER.detail','MY_KK_PROMPTPAY.DETAIL'];
        if(arrMenuName.indexOf(menuName) > -1){
            returnMenuName = menuName;
        } else {
            returnMenuName = this.permissionService.activeMenuName;
        }

        return returnMenuName;
    }
}
