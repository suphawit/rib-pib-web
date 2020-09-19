import { BillPaymentStep1 } from '../../bill-payment-step1';
import { BillPaymentService } from '../../../bill-payment.service';
import { Constants } from '../../../../../share/service/constants';
import { UtilService } from '../../../../../share/service/util.service';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MyAccountService } from '../../../../../pages/my-account/my-account.service';
import { OtherAccountService } from '../../../../other-account/other-account.service';
import { PermissionChangeRoute, PermissionService } from '../../../../../share/service/permission.service';
import { BankCodeDataService } from '../../../../../share/service/bankcode-data.service';
import { FundTransferService } from '../../../../../share/service/fund-transfer.service';
import { TranslateService } from 'ng2-translate';
import { ActivatedRoute } from '@angular/router';
import { BillPaymentRequestToPayService } from '../../../../../pages/bill-payment-request-to-pay/bill-payment-request-to-pay.service';

@Component({
  templateUrl: '../../bill-payment-step1.html'
})

export class RIBBillPaymentStep1 extends BillPaymentStep1 implements OnInit, OnDestroy {
  private sub: any; //@180419 for queryParam subscription

  constructor(
    public constants: Constants,
    public cdRef: ChangeDetectorRef,
    public fundTransferService: FundTransferService,
    public myAccountService: MyAccountService,
    public permissionChangeRoute: PermissionChangeRoute,
    public billPaymentService: BillPaymentService,
    public otherAccountService: OtherAccountService,
    public bankCodeDataService: BankCodeDataService,
    public utilService: UtilService,
    public translateService: TranslateService,
	  public permissionService:PermissionService,
    public route: ActivatedRoute,
    public billPaymentRequestToPayService: BillPaymentRequestToPayService) {
      super(constants, cdRef, fundTransferService, myAccountService, permissionChangeRoute,
       billPaymentService, otherAccountService, bankCodeDataService, utilService ,translateService, permissionService,billPaymentRequestToPayService);

  }

  ngOnInit(): void {
    this.settings = { module: 'BILLPAYMENT', styleClass: this.constants.STYLE_RIB_WEB };
    this.init();
    this.sub = this.route.queryParams.subscribe(params => {
      if(params['refresh'] !== undefined){
          this.init();
      }
    });
  }

  ngOnDestroy(): void {
    this.permissionChangeRoute.targetAction = null;
    this.permissionChangeRoute.prevUrl = null;
    //@180419 unsubscribe queryParam 
    this.sub.unsubscribe();
  }
}