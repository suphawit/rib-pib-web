
import { async, fakeAsync, tick, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { TranslateLoader, TranslateStaticLoader } from "ng2-translate/src/translate.service";
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Constants } from '../../share/service/constants';
import { Dateservice } from '../../share/service/date.service';
import { TranslateService } from 'ng2-translate';
import { UtilService } from '../../share/service/util.service';
import { MutualFundService } from '../../share/service/mutual-fund.service';
import { PermissionAction } from '../../share/service/permission.service';
import { PermissionChangeRoute, PermissionMainMenu, PermissionService } from '../../share/service/permission.service';
import { DecimalPipe } from '@angular/common';
import { AlertMessageComponent } from '../../share/component/alert-message/alert-message.component';
import { MutualFundSummaryPageComponent } from './mutual-fund-summary-page.component';
import { MutualFundServiceMock } from './mutual-fund.service.mock';

import { Http, HttpModule ,  ConnectionBackend, RequestOptions } from '@angular/http';
import { TranslateModule } from "ng2-translate/ng2-translate";
import { NgModel } from '@angular/forms';
import { PaginationComponent } from '../../share/component/pagination/pagination.component';
import { OnlyNumberDirective, onlyENUpperDirective, maxLengthLimitDirective, AllowCurrencyDirective } from '../../share/directives/common.directive';
import { CurrencyFormatterPipe } from '../../share/pipe/currency-formatter.pipe';
import { MfpApi } from '../../share/mfp/mfp-api.service';
import { PreloadService } from '../../share/service/preload.service';
import { IsLoginService } from '../../share/service/islogin.service';
import { Router,Routes, NavigationEnd } from '@angular/router';
import { Idle } from '@ng-idle/core';
import { IdleExpiry } from '@ng-idle/core/src/idleexpiry';

describe('Testing Mutual Fund component', () => {
let fixture;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MutualFundSummaryPageComponent,
        AlertMessageComponent,
        NgModel,
        PaginationComponent,
        OnlyNumberDirective,
        
      ],
      providers:  [ 
    {provide: MutualFundService, useClass: MutualFundServiceMock},
    {provide: Router, useClass: class { navigate = jasmine.createSpy("navigate"); }},
    MutualFundSummaryPageComponent,TranslateService,ViewChild,
    Constants,Dateservice,UtilService,CurrencyFormatterPipe,MfpApi,
    PreloadService,IsLoginService,PermissionAction,PermissionChangeRoute,
    PermissionMainMenu,PermissionService,Idle,IdleExpiry
     ],
     imports: [HttpModule,
         TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
      deps: [Http]
        })
     ],
    })
    fixture = TestBed.createComponent(MutualFundSummaryPageComponent);
    fixture.detectChanges();
  });

  //    it('Should get qorrectly page', fakeAsync(() => {
  //       fixture = TestBed.createComponent(MutualFundSummaryPageComponent);
  //       fixture.detectChanges();
  //     tick();
  //     var mutualFundType = {
  //       type:String,headPage:String,headTable:String
  //     }
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.children[0].componentInstance.mutualFundType;
  //   expect(compiled).toBeTruthy();
    
  //   //var h3 = fixture.nativeElement.querySelector('h3');
  //   //expect(h3.innerText).toEqual('g');
  // }));

  it('Should callmutual fund service', fakeAsync(() => {
    fixture.componentInstance.initMutualFundSummary();
    tick();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement.type;
    //expect(compiled.querySelector('p').innerText).toEqual('en');
  }));
});