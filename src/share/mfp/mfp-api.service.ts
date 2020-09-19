import { Injectable } from '@angular/core';
import { Constants } from '../../share/service/constants';
import { Dateservice } from '../../share/service/date.service';
import { IsLoginService } from '../../share/service/islogin.service';
import { PreloadService } from '../../share/service/preload.service';
import { TranslateService } from 'ng2-translate/src/translate.service';


//declare kkp edge-service function
declare var KKPES
declare var KKPESResourceRequest
@Injectable()
export class MfpApi {
  public systemCode: string;
  public channelID: string;
  private connectionCounter: number = 0;

  constructor(private dateservice: Dateservice,
    private preload: PreloadService,
    private translateService: TranslateService,
    private isLoginService: IsLoginService,
    private constants: Constants,
    //  private permissionChangeRoute: PermissionChangeRoute
  ) { };

  /*for connect to mfp
    @mfpContextRoot
    @applicationId
  */
  public connect(mfpContextRoot: string, applicationId: string, systemCode: string, channelID: string): any {

    this.systemCode = systemCode;
    this.channelID = channelID;


    let flag: boolean = false;

    // let wlInitOptions = {
    //   'mfpContextRoot': mfpContextRoot,
    //   'applicationId': applicationId
    // };
    let pathName:string = "" ;


if( window.location.pathname  != "/"){ 
  pathName = window.location.pathname;
}
    let KKPESInitOptions = {
      'contextRoot':  window.location.pathname +'webapi',
      'applicationID': applicationId,
      'applicationVersion': '4.11.0',
      'csrfTimeout': 60000,
      'csrfEnable': false
    };

    var promise = new Promise((resolve, reject) => {


      // alert(KKPES.Client.getEnvironment());

      // alert(KKPES.Client.getLocalization());


      // WL.Client.init(wlInitOptions).then(
      //   function () {

      //     flag = true;
      //   //  ibmmfpfanalytics.logger.enable(false);
      //     //      resolve(true);
      //    resolve(flag);
      //   });

      KKPES.Client.init(KKPESInitOptions).then(
        function () {
          flag = true;
          resolve(flag);
        });

      // WL.Logger.config({ maxFileSize : 100000,              // allow persistent storage of up to 100k of log data
      //   // level : 'info',                   // at debug (and above) level
      //   capture : false,  
      //   stringify: true                  // capture data passed to log API calls into persistent storage
      // });

    });

    return promise;
  }

  private showLoader() {
    this.connectionCounter++;
    this.preload.showLoader();
  }

  private hideLoader() {
    this.connectionCounter--;
    if (this.connectionCounter <= 0) {
      this.preload.hideLoader();
    }
  }




  public invokeProcedure(obj, opt: any = {}): any {

    if (!opt.isHideLoader) {
      this.showLoader();
    }
    let msg: any;
    var serviceNameAct = obj.actionCode;
    let currentDateTime = new Date();
    obj.params.header = {
      transactionDateTime: currentDateTime.toISOString(),
      transactionDate: this.dateservice.getTransactionDate(),
      serviceName: serviceNameAct,
      systemCode: this.systemCode,//RIB,
      // systemCode: 'RIB',
      referenceNo: this.dateservice.getReferenceNo(),
      channelID: this.channelID//'RIBWeb'
    };

    obj.params["language"] = this.translateService.currentLang || 'en';

    obj.params["tokenID"] = "";
    obj.params["cisID"] = "";
    var invocationData = {
      adapter: opt.adapter || 'iBankingCBSAdapter',//'iBankingRTPBillpayAdapter','iBankingAdapter'
      procedure: obj.procedure,
      parameters: [obj.actionCode, (obj.params)]
    };

    let optionWLResource = {};
    if (this.isLoginService.getIsPrivate()) {
      optionWLResource = { scope: 'UserLoginCBS' };
    }

    //var newParams = JSON.stringify([obj.actionCode, obj.params]);
    var p = new Promise((resolve, reject) => {

      var resourceRequest = new KKPESResourceRequest("/v1/" + invocationData.adapter + "/" + obj.actionCode, "POST", {});
      let errorMsg = this.translateService.instant('error.system');
      resourceRequest.setTimeout(60000);

      resourceRequest.sendFormParameters(obj.params).then((response) => {
        
        if (!opt.isHideLoader) {
          this.hideLoader();
        }

        if (response.responseJSON.result.responseStatus.responseCode !== "RIB-E-LOG007") {

          resolve(response);
        } else {
          this.isLoginService.setMultipleLoginEmitter(true);
        }


      }, (error) => {
        
        //timeout case
        if (error.responseJSON.result.responseStatus.responseCode == "RIB-E-REQ408") {
          error.responseJSON.result.responseStatus.errorMessage = errorMsg
          resolve(error);
        }

        //session timeout
        if (error.responseJSON.result.responseStatus.responseCode == "RIB-E-LOG013") {
          this.isLoginService.setMultipleLoginEmitter(true);

        }

        //multiple login case
        if (error.responseJSON.result.responseStatus.responseCode == "RIB-E-LOG007") {
          this.isLoginService.setMultipleLoginEmitter(true);
        }

        if (error.responseJSON.result.responseStatus.responseCode != "") {
          resolve(error);
        }

        //msg = error;
        msg = {
          responseJSON: {
            result: {
              responseStatus: {
                responseCode: "RIB-E-LOG007",
                responseMessage: "RIB-E-LOG007",
                errorMessage: errorMsg
              }
            }
          },
          error: error
        }

        if (!opt.isHideLoader) {
          this.hideLoader();
        }
        resolve(msg);
      });
    });
    return p;
  }



  public invokeNotiProcedure(obj): any {

    let msg: any;
    var serviceNameAct = obj.actionCode;
    var invocationData = {
      adapter: 'LongpollingCBSAdapter',
      procedure: obj.procedure,
      parameters: [obj.actionCode, (obj.params)]
    };
    let currentDateTime = new Date();
    obj.params.header = {
      transactionDateTime: currentDateTime.toISOString(),
      transactionDate: this.dateservice.getTransactionDate(),
      serviceName: serviceNameAct,
      systemCode: this.systemCode,//RIB,
      // systemCode: 'RIB',
      referenceNo: this.dateservice.getReferenceNo(),
      channelID: this.channelID//'RIBWeb'
    };
    obj.params["language"] = this.translateService.currentLang || 'en';
    let optionWLResource = {};
    if (this.isLoginService.getIsLogin()) {
      optionWLResource = { scope: 'UserLoginCBS' };
    }
    // var newParams = { 'params': JSON.stringify([obj.actionCode, obj.params]) };
    var p = new Promise((resolve, reject) => {

      var resourceRequest2 = new KKPESResourceRequest("/v1/" + invocationData.adapter + "/" + obj.actionCode, "POST", optionWLResource);
      resourceRequest2.setTimeout(60000);
      resourceRequest2.sendFormParameters(obj.params).then((response) => {
        //
        //

        resolve(response);
      }, (error) => {

        //session timeout
        if (error.responseJSON.result.responseStatus.responseCode == "RIB-E-LOG013") {
          this.isLoginService.setMultipleLoginEmitter(true);

        }

        msg = error;

        reject(msg);
      });
    });

    return p;
  }





  public invokeDateTime(obj): any {

    let msg: any;
    var invocationData = {
      adapter: 'getDateTime',

    };
    obj.params = {}

    let currentDateTime = new Date();
    obj.params.header = {
      transactionDateTime: currentDateTime.toISOString(),
      transactionDate: this.dateservice.getTransactionDate(),
      serviceName: "getDateTime",
      systemCode: this.systemCode,//RIB,
      // systemCode: 'RIB',
      referenceNo: this.dateservice.getReferenceNo(),
      channelID: this.channelID//'RIBWeb'
    };

    obj.params["language"] = this.translateService.currentLang || 'en';
    let optionWLResource = {};

    // var newParams = { 'params': JSON.stringify([obj.actionCode, obj.params]) };
    var p = new Promise((resolve, reject) => {

      var resourceRequest3 = new KKPESResourceRequest("/" + invocationData.adapter, "GET", optionWLResource);
      resourceRequest3.setTimeout(60000);
      resourceRequest3.sendFormParameters(obj.params, "GET").then((response) => {

        resolve(response);
      }, (error) => {

        msg = error;
        reject(msg);
      });
    });

    return p;


  }




  getCurrentDate(): any {

    let p = new Promise((resolve, reject) => {

      this.invokeDateTime({}).then((objResponse: any) => {

        let day = objResponse.responseJSON.result.date;
        let month = objResponse.responseJSON.result.month - 1;
        let year = objResponse.responseJSON.result.year;
        var utc = new Date();
            // utc.setUTCDate(day);
            // utc.setUTCMonth(month)
            // utc.setUTCFullYear(year);
            // utc.setUTCHours(0);
            // utc.setUTCMinutes(0);
            // utc.setUTCSeconds(0);
          let currentDate = new Date(year, month, day);
        resolve(currentDate);
      }, (error) => {

          var utc = new Date();
          resolve(utc);
      });
    });

    return p;
  }

}
