import { Router } from '@angular/router';
import { TranslateService } from 'ng2-translate';
import { Constants } from '../../share/service/constants';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { PermissionChangeRoute } from '../../share/service/permission.service';
import { BillPaymentService } from '../../pages/bill-payment/bill-payment.service';
import { MessageModalComponent } from '../../share/component/modal-messages.component';

@Component({
    selector: 'biller-detail-page',
    templateUrl: './biller-detail-page.html'
})
// Component class
export class BillerDetailPageComponent implements OnInit {
    protected billerDetail: any;
    private isDelete: boolean = false;
    alertConfig: { type: string, message: string, show: boolean };
    protected messageModalData: { title: string; body: string; size: string; config: any; action: any; billerAliasName: string; ref1: string; ref2: string };

    @ViewChild('bsModalMessage') public bsModalMessage:MessageModalComponent;
    
    constructor(
      public permissionChangeRoute: PermissionChangeRoute, 
      public constants: Constants,
      public billPaymentService: BillPaymentService, 
      public translate: TranslateService,
       @Inject(Router) public router: Router ) {}

    ngOnInit() {
        if (this.billPaymentService.selectBillerDetailData !== null) {
            this.billerDetail = this.billPaymentService.selectBillerDetailData;

        }

        this.alertConfig = {
            type: 'danger',
            message: '',
            show: false
        };

        this.messageModalData = {
            title: this.translate.instant('label.delete.title.biller'),
            body: this.translate.instant('label.delete.message.biller'),
            size: 'md',
            config: { isShowCloseBtn: true, isShowDeleteBtn: true },
            action: '',
            billerAliasName: '',
            ref1: '',
            ref2: ''
        }

        this.billPaymentService.alertConfig = undefined;
    }

    OnMenuClick(data: any) {


        if (data === this.constants.PORTLETS_MENU_DATA.PAYMENT) {
            this.permissionChangeRoute.prevUrl = this.router.url;
            this.permissionChangeRoute.changeRoute('PAY_BILL');
        } else if (data === this.constants.PORTLETS_MENU_DATA.FAVOURITE) {

        } else if (data === this.constants.PORTLETS_MENU_DATA.EDIT) {
            this.permissionChangeRoute.changeRoute('MANAGE_BILLER.EDIT_VERIFY');
        } else if (data === this.constants.PORTLETS_MENU_DATA.DELETE) {
            this.show();
        } else if (data === this.constants.PORTLETS_MENU_DATA.SCHEDULE) {
            this.permissionChangeRoute.prevUrl = this.router.url;

            this.permissionChangeRoute.changeRoute('MANAGE_SCHEDULE');
        }
    }

    // start delete other account modal
    protected onEmit($event) {
        if ($event !== undefined && $event === 'delete') {
            this.isDelete = false;

            this.billPaymentService.deleteBiller(this.billPaymentService.selectBillerDetailData).then((objResponse: any) => {
                let result = objResponse.responseJSON.result;

                if (result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                    let alertConfig = {
                        title: 'label.title.deleteBillerSuccess',
                        type: 'success',
                        message: 'label.deleteBillerSuccess',
                        show: true,
                        option: { billerAliasName: this.billPaymentService.selectBillerDetailData.billerAliasName, billerName: this.billPaymentService.selectBillerDetailData.billerName }
                    };

                    this.billPaymentService.alertConfig = alertConfig;
                    this.permissionChangeRoute.changeRoute('MANAGE_BILLER.LIST');
                } else {
                }
            }, function (error) {

            });
        }

        if ($event !== undefined && $event === 'cancel') {
            this.bsModalMessage.hide();
        }
    }

    protected show(): void {
        this.isDelete = true;
        this.messageModalData = {
            title: 'label.delete.title.biller',
            body: 'label.delete.message.biller',
            size: 'md',
            config: { isShowCancelBtn: true, isShowDeleteBtn: true },
            action: '',
            billerAliasName: this.billPaymentService.selectBillerDetailData.billerAliasName,
            ref1: this.billPaymentService.selectBillerDetailData.ref1,
            ref2: this.billPaymentService.selectBillerDetailData.ref2
        };

        this.bsModalMessage.show();
    }

    onModalHidden() {
        if (this.isDelete === false) {
            this.permissionChangeRoute.changeRoute('MANAGE_BILLER.LIST');
        }
    }
    // end delete other account modal
}

interface OtherAccountDetailPage {
    alertConfig: { type: string, message: string, show: boolean };
}