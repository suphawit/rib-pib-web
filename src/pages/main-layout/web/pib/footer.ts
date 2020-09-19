import { Component, ViewChild } from '@angular/core';
import { Constants } from '../../../../share/service/constants';
import { UtilService } from '../../../../share/service/util.service';
import { TranslateService } from "ng2-translate/src/translate.service";
import { ContactUsService } from '../../../contact-us/contact-us.service'
import { GetinformationService } from '../../../../share/service/getInformation.service';
import { MessageModalComponent } from '../../../../share/component/modal-messages.component';

declare var APP_VERSION;
declare var BUILD_NUM;

@Component({
  selector: 'footer-pib',
  templateUrl: './footer.html',
  providers: [ContactUsService, GetinformationService]
})
export class PIBFooter {
  appVersion: string;
  buildNumber: string;
  newsAndUpdateUrl: string = this.constants.KK_PATH_URL + '/th/news-activities';
  messageModalData: { title: string; body: string; size: string; config: any; action: any; };

  @ViewChild('messageModal') public messageModal: MessageModalComponent;

  constructor(public constants: Constants,
    private contactUsService: ContactUsService,
    private getinformationService: GetinformationService,
    private translate: TranslateService,
    private utilService: UtilService) {
    this.appVersion = this.constants.VER_PIB_WEB;
    this.buildNumber = BUILD_NUM;
  }

  ngOnInit(): void {
    this.openInTab();
    this.messageModalData = {
      title: '',
      body: '',
      size: '',
      config: {},
      action: {}
    };

  }

  public showContactUs(): void {
    let displayName;

    this.getinformationService.getInformation("getContactUsProcedure", "contact_us").then((objResponse: any) => {
      displayName = objResponse.responseJSON.result.value.data;
      this.messageModalData = {
        title: 'ContactUs',
        body: displayName,
        size: 'md',
        config: { offsetHeight: this.utilService.getDocHeight(20) },
        action: {}
      };

      this.messageModal.show();
      this.autoScaleHeight();
    }, function (error) {
      
    });
  }

  public showDisclaimer(): void {
    let displayName;

    this.getinformationService.getInformation("getContactUsProcedure", "desclaimer").then((objResponse: any) => {
      displayName = objResponse.responseJSON.result.value.data;

      this.messageModalData = {
        title: 'Disclaimer',
        body: displayName,
        size: 'md',
        config: { offsetHeight: this.utilService.getDocHeight(20), setScroll: true },
        action: {}
      };

      this.messageModal.show();
      this.autoScaleHeight();
    }, function (error) {
      
    });
  }

  public showPrivacy(): void {
    let displayName;
    let lang = this.translate.currentLang;

    this.getinformationService.getInformation("getPrivacyWithLoginProcedure", "policy").then((objResponse: any) => {
      displayName = objResponse.responseJSON.result.value.data;

      this.messageModalData = {
        title: ' Privacy Policy',
        body: displayName,
        size: 'md',
        config: { offsetHeight: this.utilService.getDocHeight(20), setScroll: true },
        action: {}
      };

      this.messageModal.show();
      this.autoScaleHeight();
    }, function (error) {
      
    });
  }

  public showTermAndCondition(): void {
    let displayName;

    this.getinformationService.getInformation("getContactUsProcedure", "pib_term_and_con_footer").then((objResponse: any) => {
      displayName = objResponse.responseJSON.result.value.data;
      this.messageModalData = {
        title: 'Terms and condition',
        body: displayName,
        size: 'md',
        config: { offsetHeight: this.utilService.getDocHeight(20) , setScroll: true},
        action: {}
      };

      this.messageModal.show();
      this.autoScaleHeight();
    }, function (error) {
      
    });
  }

  public onModalHidden(): void {
  }

  public openInTab(): void {
      this.getinformationService
          .getInformation(this.constants.REQ_PROCEDURE_NAME.NEWS_INFORMATION,'news')
          .then((objResponse: any) => {
              if (objResponse.responseJSON.result.responseStatus.responseCode == this.constants.RESP_CODE_SUCCESS) {
                  
                  this.newsAndUpdateUrl = objResponse.responseJSON.result.value.data;
              }else{
                  this.newsAndUpdateUrl = '#';
              }
              // var j = { "key": 'openInTab', "value": this.newsAndUpdateUrl };

              // post our message to the parent
              // window.parent.postMessage(
              //     JSON.stringify(j)
              //     // set target domain
              //     , "*"
              // );
          });
  }

  private autoScaleHeight(): void {
    let prevHeight: number = this.utilService.getDocHeight(20);

    if (window != window.top) {
      let root = this;
      setTimeout(function () {
        let modal: any = document.getElementById("mdlPage"); //mdlPage.getElementByClassName("modal-content")[0];
        

        if(modal.offsetHeight > prevHeight) {
          root.utilService.setPageHeight(modal.offsetHeight + 300);
        }
      }, 2000);
    }
  }
}