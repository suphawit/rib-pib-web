import { Constants } from '../../service/constants';
import { TimelineMapFields } from './timeline-mapfields';
import { Dateservice } from '../../service/date.service';
import { TimelineModalComponent } from './timeline-modal.component';
import { PermissionService } from '../../service/permission.service';
import { MasterDataService } from '../../service/master-data.service';
import { TranslateService } from "ng2-translate/src/translate.service";
import { BankCodeDataService } from '../../service/bankcode-data.service';
import { CurrencyFormatterPipe } from '../../pipe/currency-formatter.pipe';
import { Input, ViewChild, Component, OnChanges, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { GetinformationService } from "../../service/getInformation.service";

@Component({
  selector: 'timeline',
  templateUrl: './timeline.html',
  providers: [TimelineMapFields]
})
export class TimelineComponent implements OnChanges, OnInit, OnDestroy {
  public isDesktop = true;
  prevData: any;
  anyIDTypeList: any;
  timelineKey: string;
  errorMessage: string;
  permissionManage: any;
  tlTransFontSize: Number = 20;
  timelineDataRender: Array<any>;
  dropdownData: { isopen: boolean; };
  timelineModalData: { key: string; size: string; config: any; title: string; type: string; };

  @Input('data') timelineData: any;
  @Input('title') timelineTitle: string;
  @Input('subtitle') timelineSubTitle: string;
  @Output('onActions') onClickActions = new EventEmitter();

  @ViewChild('myTimelineModal') public myTimelineModal: TimelineModalComponent;

  constructor(public dateService: Dateservice,
    public translateService: TranslateService,
    public masterDataService: MasterDataService,
    public bankCodeDataService: BankCodeDataService,
    public timelineMapFields: TimelineMapFields,
    public currencyFormatter: CurrencyFormatterPipe,
    public constants: Constants,
    public permissionService: PermissionService,
    public getinformationService: GetinformationService
  ) {
  }

  ngOnInit(): void {
    this.isDesktop = this.getinformationService.isDesktop();
    this.errorMessage = null;
    this.timelineDataRender = [];
    this.dropdownData = { isopen: false };
    this.timelineKey = this.timelineTitle + '.' + this.timelineSubTitle;
    this.tlTransFontSize = ((this.timelineTitle === 'schedule') || (this.timelineTitle === 'history')) ? 12 : 20;

    this.timelineModalData = {
      title: (this.timelineTitle === 'schedule') ? 'label.scheduleDetail' : 'lbl.historyDetail',
      key: this.timelineKey,
      type: this.timelineSubTitle,
      size: 'md',
      config: {}
    };

    this.masterDataService.getAllAnyIDTypes().then((result: any) => {
      this.anyIDTypeList = result;
      this.timelineModalData.config = { data: { anyIDTypeList: this.anyIDTypeList } };
    });

    // Check permission  
    this.permissionManage = {
      history: {
        fundtransfer: {
          moreInfo: this.permissionService.getActionCode().MORE_INFO_TRANSFER_HISTORY,
          print: this.permissionService.getShortcutActionCodePermission('FUND_TRANSFER','PRINT_SLIP_TRANSFER')
        },
        biller: {
          moreInfo: this.permissionService.getActionCode().MORE_INFO_PAY_BILL_HISTORY,
          print: this.permissionService.getShortcutActionCodePermission('PAY_BILL','PRINT_SLIP_PAY_BILL')
        },
        RTP: {
          moreInfo: this.permissionService.getActionCode().MORE_INFO_RTP_HISTORY
        }
      },
      schedule: {
        fundtransfer: {
          edit: this.permissionService.getShortcutActionCodePermission('FUND_TRANSFER','FUND_TRANSFER'),
          delete: this.permissionService.getShortcutActionCodePermission('FUND_TRANSFER','FUND_TRANSFER')
        },
        biller: {
          edit: this.permissionService.getShortcutActionCodePermission('PAY_BILL','PAY_BILL'),
          delete: this.permissionService.getShortcutActionCodePermission('PAY_BILL','PAY_BILL')
        }
      }
    };
  }

  ngOnChanges(changes: any): void {
    

    if (changes.timelineData && changes.timelineData.currentValue) {
      let timelineData = [];
      let currentData = changes.timelineData.currentValue;
      let firstRecord = currentData.rawData[0];

      if (!currentData.isAdded || currentData.rawData.length == 0
        || (this.prevData != null && this.prevData.fromAccountNumber != firstRecord.fromAccountNumber)) {
        this.prevData = null;
      }

      timelineData = this.createTimelineData(currentData.rawData)

      this.timelineDataRender = timelineData;
      this.errorMessage = (this.timelineDataRender.length > 0) || (currentData.resetData) ?
        null : (this.timelineTitle === 'schedule') ? this.constants.RESP_CODE_SCHEDULE_NOT_FOUND : this.constants.RESP_CODE_HISTORY_NOT_FOUND;
    }

    if (changes.timelineSubTitle && changes.timelineSubTitle.currentValue && this.timelineModalData) {
      this.timelineKey = this.timelineTitle + '.' + changes.timelineSubTitle.currentValue;
      this.timelineModalData.key = this.timelineKey;
      this.timelineModalData.type = changes.timelineSubTitle.currentValue;
      this.prevData = null;
    }
  }

  ngOnDestroy(): void {
    this.prevData = null;
    this.timelineDataRender = [];
    this.anyIDTypeList = null;
  }

  protected createTimelineData(data: Array<any>): Array<any> {
    let returnData = [];
    let prevDate = null;
    let timelineTitle = this.timelineTitle;
    let mapfields = this.timelineMapFields.data[this.timelineKey];

    if (data && mapfields) {
      if (this.prevData != null) {
        

        if (timelineTitle === 'schedule') {
          if (this.timelineKey.indexOf('biller') != -1) {
            prevDate = this.dateService.parseDate(this.prevData.paymentDate);
          } else {
            prevDate = this.dateService.parseDate(this.prevData.debitDate);
          }

          prevDate.setHours(0, 0, 0, 0);
        } else {
          prevDate = this.dateService.parseDateTime(this.prevData.transactionDate);
          prevDate.setHours(0, 0, 0, 0);
        }
      }

      for (let i = 0; i < data.length; i++) {
        let timeline = {};
        let txnDate = null;
        let item = data[i];

        if (timelineTitle === 'schedule') {
          timeline["recurringType"] = item[mapfields["recurringType"]];
          timeline["recurringTimes"] = item[mapfields["recurringTimes"]];
          txnDate = this.dateService.parseDate(item[mapfields["debitDate"]]);
          timeline["transMonth"] = this.dateService.formatDate(txnDate, 'MMM', this.translateService.currentLang);
        } else {
          timeline["canPrintSlip"] = item[mapfields["canPrintSlip"]];
          txnDate = this.dateService.parseDateTime(item[mapfields["transactionDate"]]);
          timeline["transTime"] = this.dateService.formatDate(txnDate, 'HH:mm:ss');
          timeline["transMonth"] = this.dateService.formatDate(txnDate, 'MMM', this.translateService.currentLang);
        }

        timeline["actionButton"] = 'action-btn-' + i;
        timeline["accountFromNumber"] = item[mapfields["accountFromNumber"]];
        timeline["accountFromName"] = item[mapfields["accountFromName"]];
        timeline["accountToNumber"] = item[mapfields["accountToNumber"]];
        timeline["accountToName"] = item[mapfields["accountToName"]];
        timeline["status"] = item[mapfields["status"]];
        timeline["paymentFor"] = item[mapfields["paymentFor"]];
        timeline["biller"] = item[mapfields["biller"]];
        timeline["feeAmount"] = item[mapfields["feeAmount"]];
        timeline["note"] = item[mapfields["note"]];
        timeline["statusCode"] = item[mapfields["statusCode"]];
        timeline["isopen"] = false;
        timeline["rawData"] = item;        
        timeline["amount"] = this.currencyFormatter.transform(item[mapfields["amount"]]);

        // RTP
        timeline["requesterAccountName"] = item[mapfields["requesterAccountName"]];
        timeline["rtpReferenceNo"] = item[mapfields["rtpReferenceNo"]];
        timeline["Type"] = item[mapfields["rtpMsgType"]] === 'INCOMING' ? item[mapfields["requesterIdTypeLabel"]] : item[mapfields["receiverIdTypeLabel"]];
        timeline["requesterIdValue"] = item[mapfields["requesterIdValue"]];
        timeline["transactionDate"] = item[mapfields["transactionDate"]];
        timeline["rtpMsgTypeLable"] = item[mapfields["rtpMsgType"]] === 'INCOMING' ? this.translateService.instant('label.RTPRecieve') : this.translateService.instant('label.RTPRequest');
        timeline["rtpMsgType"] = item[mapfields["rtpMsgType"]];
        timeline["receiverAccountName"] = item["receiverAccountName"];
        timeline["receiverIdValue"] = item["receiverIdValue"];
        timeline["receiverIdTypeLabel"] = item["receiverIdTypeLabel"];
        timeline["requesterIdType"] = item["requesterIdType"];
        timeline["receiverIdType"] = item["receiverIdType"];
        timeline["statusDesc"] = item["statusDesc"];

        txnDate.setHours(0, 0, 0, 0);

        if (prevDate == null || (prevDate.getTime() != txnDate.getTime())) {
          timeline["transDate"] = this.dateService.formatDate(txnDate, 'DD', this.translateService.currentLang);
        }

        prevDate = txnDate;
        returnData.push(timeline);
      }

      this.prevData = returnData[returnData.length - 1] ? returnData[returnData.length - 1].rawData : null;
    }

    return returnData;
  }

  selectMenuList(listname: string, data: any) {
    if (listname === 'moreinfo') {
      this.myTimelineModal.show(data);
    } else {
      this.onClickActions.emit({ name: listname, data: data });
    }
  }

  protected trackByFn(index, item) {
    return index;
  }
}
