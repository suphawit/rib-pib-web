import { Router } from '@angular/router';
import { Constants } from '../../share/service/constants';
import { UtilService } from '../../share/service/util.service';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { TranslateService } from "ng2-translate/src/translate.service";
import { PermissionChangeRoute } from '../../share/service/permission.service';
import { BankCodeDataService } from '../../share/service/bankcode-data.service';
import { OtherAccountService } from '../../pages/other-account/other-account.service';
import { deleteOtherAccModalComponent } from './delete-other-account-modal.component';

@Component({
    selector: 'my-account-detail-page',
    templateUrl: './other-account-detail-page.html',
    providers: [BankCodeDataService]
})
// Component class
export class OtherAccountDetailPageComponent implements OnInit {
    public currentLang;
    public accountDetail: any;
    alertConfig: { type: string, message: string, show: boolean };
    public messageModalData: { title: string; accountDetail: any; size: string; config: Object; };
    protected firstLoad: boolean = true;
    @ViewChild('bsModalMessage') public bsModalMessage: deleteOtherAccModalComponent;

    constructor( @Inject(Router) public router: Router,
        public constants: Constants,
        public otherAccountService: OtherAccountService,
        public bankCodeDataService: BankCodeDataService,
        public translate: TranslateService,
        public permissionChangeRoute: PermissionChangeRoute,
        public utilService: UtilService) {

        this.currentLang = this.translate.currentLang;
        this.permissionChangeRoute.prevUrl = this.router.url;
        let selectAccountDetailData = this.otherAccountService.selectAccountDetailData


        if (selectAccountDetailData !== null && selectAccountDetailData !== undefined) {
            this.accountDetail = selectAccountDetailData;
        } else {

            this.permissionChangeRoute.changeRoute("OTHER_ACCOUNTS");
        }
    }

    ngOnInit(): void {
        this.alertConfig = {
            type: 'danger',
            message: '',
            show: false
        };

        this.messageModalData = {
            title: 'label.msgDeleteExAccHead',
            accountDetail: this.accountDetail,
            size: 'md',
            config: { isShowCloseBtn: true, isShowDeleteBtn: true },
        };

        this.utilService.scrollToTop();
    }

    OnMenuClick(data: any) {


        if (data === 'statement') {
            this.router.navigate(['my-account/statement']);
        } else if (data === 'transfer') {
            this.permissionChangeRoute.changeRoute('FUND_TRANSFER');
        } else if (data === 'payment') {
        } else if (data === 'favourite') {
            this.onClickFavourite(this.accountDetail);
        } else if (data === 'edit') {
            this.permissionChangeRoute.changeRoute('OTHER_ACCOUNTS.edit1');
        } else if (data === 'delete') {
            this.show();
        } else if (data === 'create_rtp'){
            this.permissionChangeRoute.changeRoute('MY_RTP.ADD');
        }
    }

    // Start delete other account modal
    public onEmit($event) {
        if ($event !== undefined && $event === 'delete') {
            this.otherAccountService.removeExternalAccount(this.accountDetail.exAcctId).then((objResponse: any) => {
                let result = objResponse.responseJSON.result;

                if (result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                    let alertConfig = {
                        title: 'label.Success',
                        type: 'success',
                        message: 'label.deleteExtAccSuccess',
                        show: true,
                        option: { otherAccountNumber: this.accountDetail.acctNo }
                    };

                    this.otherAccountService.alertConfig = alertConfig;
                    this.router.navigate(['list-other-account']);
                }
            }, function (error) {

            });
            this.bsModalMessage.hide();
        }
    }

    public show(): void {
        this.bsModalMessage.show();
    }

    public onModalHidden($event) {
        // location.reload();
    }
    // End delete other account modal

    onClickFavourite(data: any) {

        this.firstLoad = false;
        this.otherAccountService.requestManageFavourite(data).then((objResponse: any) => {
            let result = objResponse.responseJSON.result;


            if (result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                if (this.accountDetail.isFavourite === 'Y') {
                    this.accountDetail.isFavourite = 'N';
                } else if (this.accountDetail.isFavourite === 'N') {
                    this.accountDetail.isFavourite = 'Y';
                }
            }
        }, function (error) {

        });
    }
}

interface OtherAccountDetailPage {
    alertConfig: { type: string, message: string, show: boolean };
    // accountDetailConfig: {accountData:any; hideMenu:boolean; showBorder:boolean;};
}
