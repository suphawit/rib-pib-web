import { async, fakeAsync, tick, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import {RIBWebContactUs} from './contact-us';
import { TranslateLoader, TranslateStaticLoader } from "ng2-translate/src/translate.service";
import { IdleExpiry } from '@ng-idle/core/src/idleexpiry';
import { MfpApi } from '../../../../share/mfp/mfp-api.service';
import { UtilService } from '../../../../share/service/util.service';
import { PermissionService,PermissionMainMenu } from '../../../../share/service/permission.service';

import { ContactUsService } from '../../contact-us.service';
import { ContactUsServiceMock } from '../../contact-us.service.mock';
import { Http, HttpModule ,  ConnectionBackend, RequestOptions } from '@angular/http';
import { IsLoginService } from '../../../../share/service/islogin.service';
import { Idle } from '@ng-idle/core';
import { TranslateService, LangChangeEvent } from "ng2-translate/src/translate.service";
import { Constants } from '../../../../share/service/constants';
import { Dateservice } from '../../../../share/service/date.service';
import { CurrencyFormatterPipe } from '../../../../share/pipe/currency-formatter.pipe';
import { PreloadService } from '../../../../share/service/preload.service';
import { LanguageSettingService } from '../../../../pages/main-layout/web/language-setting.service';
import { TranslateModule } from "ng2-translate/ng2-translate";



let fixture: ComponentFixture<RIBWebContactUs> = null;

describe('Array', function() {

  beforeEach(async(() => TestBed.configureTestingModule({
    providers: [

  {provide: ContactUsService, useClass: ContactUsServiceMock},

      /**
       * Provide a better mock.
       */
      ContactUsServiceMock,PermissionService,IsLoginService,
      RIBWebContactUs,Idle,IdleExpiry,PermissionMainMenu,Constants,MfpApi,Dateservice,UtilService,CurrencyFormatterPipe,PreloadService
      ,Http,ConnectionBackend, TranslateService,TranslateLoader,LanguageSettingService
   
    ],
     imports: [HttpModule,
         TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
      deps: [Http]
    }),
     
     
     ],


     
  })
  
  
  
  ));

  
  




  it('should log ngOnInit', async(inject([RIBWebContactUs], (contact: RIBWebContactUs) => {
  //  spyOn(console, 'log');
  
spyOn(contact.actionCode, "aa")

expect(contact.actionCode.aa).not.toBeNull();
 //  let options = new RequestOptions({method:"post"});
    //expect(
//contact.getContactus('en').then((value) => {  expect(contact.getContactus('en')).toEqual("hello world!"))
 //expect(contact.getContactus('en')).toEqual("hello world!");
// expect(contact.getContactus('en')).not.toBeNull();
    //about.getTestfunction();
 
   // expect(
  })));



})

