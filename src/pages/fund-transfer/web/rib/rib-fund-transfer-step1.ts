import { FundTransferStep1 } from '../fund-transfer-step1';
import { Constants } from '../../../../share/service/constants';
import { UtilService } from '../../../../share/service/util.service';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { OtherAccountService } from '../../../other-account/other-account.service';
import { MyAccountService } from '../../../../pages/my-account/my-account.service';
import { PermissionChangeRoute, PermissionService } from '../../../../share/service/permission.service';
import { BankCodeDataService } from '../../../../share/service/bankcode-data.service';
import { FundTransferService } from '../../../../share/service/fund-transfer.service';
import { ActivatedRoute } from '@angular/router';

require("!style-loader!css-loader!sass-loader!../fund-transfer-step1.scss");
require("!style-loader!css-loader!sass-loader!./rib-fund-transfer-step1.scss");

@Component({
  templateUrl: '../fund-transfer-step1.html'
})

export class RIBFundTransferStep1 extends FundTransferStep1 implements OnInit, OnDestroy {
  private sub: any; //@180419 for queryParam subscription

  constructor(public constants: Constants,
    public cdRef: ChangeDetectorRef,
    public fundTransferService: FundTransferService,
    public myAccountService: MyAccountService,
    public permissionChangeRoute: PermissionChangeRoute,
    public otherAccountService: OtherAccountService,
    public bankCodeDataService: BankCodeDataService,
    public utilService: UtilService, 
    public permissionService: PermissionService,
    public route: ActivatedRoute) {
    super(constants, cdRef, fundTransferService, myAccountService, permissionChangeRoute, 
          otherAccountService, bankCodeDataService, utilService, permissionService);
  }

  ngOnInit(): void {
    this.settings = { module: 'TRANSFER', styleClass: this.constants.STYLE_RIB_WEB };
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