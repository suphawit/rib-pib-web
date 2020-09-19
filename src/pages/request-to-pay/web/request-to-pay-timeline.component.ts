import { Dateservice } from '../../../share/service/date.service';
import { MasterDataService } from '../../../share/service/master-data.service';
import { TranslateService } from "ng2-translate/src/translate.service";
import { BankCodeDataService } from '../../../share/service/bankcode-data.service';
import { CurrencyFormatterPipe } from '../../../share/pipe/currency-formatter.pipe';
import { Input, ViewChild, Component, OnChanges, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { PermissionService } from '../../../share/service/permission.service';
import { Constants } from '../../../share/service/constants';
import { RTPTimelineModalComponent } from '../request-to-pay-timeline-modal.component';

@Component({
  selector: 'rtp-timeline',
  templateUrl: './request-to-pay-timeline.html'
})
export class RequestToPayTimelineComponent implements OnChanges, OnInit, OnDestroy {

  anyIDTypeList: any;
  dropdownData: { isopen: boolean; };
  timelineModalData: { size: string; config: any; title: string; };
  timelineDataRender: Array<any>;
  errorMessage: string;

  @Input('data') timelineData: any;
  @Input('title') timelineTitle: string;
  @Output('onActions') onClickActions = new EventEmitter();

 @ViewChild('myTimelineModal') public myTimelineModal: RTPTimelineModalComponent;
  permissionManage: any;
  constructor(public dateservice: Dateservice,
    public translateService: TranslateService,
    public masterDataService: MasterDataService,
    public bankCodeDataService: BankCodeDataService,
    public currencyFormatter: CurrencyFormatterPipe,
    public constants: Constants,
    public _PermissionService: PermissionService) {
  }

  ngOnInit(): void {
    this.dropdownData = { isopen: false };

    this.timelineModalData = {
      title: (this.timelineTitle === 'schedule') ? 'label.scheduleDetail' : (this.timelineTitle === 'history') ? 'lbl.historyDetail': (this._PermissionService.getMenuName() === 'RTP_RECEIVE') ? 'lbl.RTPReceiveDetail': 'lbl.RTPRequestDetail',
      size: 'md',
      config: {}
    };

    this.errorMessage = null;

    this.timelineDataRender = [];

    this.masterDataService.getAllAnyIDTypes().then((result: any) => {
      this.anyIDTypeList = result;
      this.timelineModalData.config = { data: { anyIDTypeList: this.anyIDTypeList } };
    });
    //check permission  
    this.permissionManage = {
      history: {
        fundtransfer:{
          moreInfo: this._PermissionService.getActionCode().MORE_INFO_TRANSFER_HISTORY,
          print: this._PermissionService.getActionCode().PRINT_SLIP_TRANSFER
        },
        biller: {
          moreInfo: this._PermissionService.getActionCode().MORE_INFO_PAY_BILL_HISTORY,
          print: this._PermissionService.getActionCode().PRINT_SLIP_PAY_BILL
        },
        RTP: {
          moreInfo: true,
          print: true
        }
      }
    };
  }

  ngOnChanges(changes: any): void {
    if (changes.timelineData && changes.timelineData.currentValue) {
      
      let tmpData = changes.timelineData.currentValue;
      let tmpTimelineData = this.createTimelineData(tmpData.rawData);
      if(tmpData.isAdded){
        this.timelineDataRender = this.timelineDataRender.concat(tmpTimelineData);
      } else {
        this.timelineDataRender = tmpTimelineData;
      }
      //this.errorMessage = (this.timelineDataRender.length > 0) ? null : (this.timelineTitle === 'schedule') ? this.constants.RESP_CODE_SCHEDULE_NOT_FOUND : this.constants.RESP_CODE_HISTORY_NOT_FOUND;
      this.errorMessage = (this.timelineDataRender.length > 0) ? null : this.translateService.instant('lbl.transactionNotFound');
    }
  }

  ngOnDestroy(): void {
    this.timelineDataRender = [];
    this.anyIDTypeList = null;
  }

  protected createTimelineData(data: Array<any>): Array<any> {
    let returnData = [];
    let prevDate = null; 

    if (data) {
      let i = 0;

      //
      for (let item of data) {
        let timeline = {};

        timeline["actionButton"] = 'action-btn-' + i;
        timeline["requesterAccountName"] = item["requesterAccountName"];
        timeline["requesterIdTypeLabel"] = item["requesterIdTypeLabel"];
        timeline["amount"] = item["amount"];
        timeline["status"] = item["statusDesc"];
        timeline["expiryDate"] = item["expiryDate"];
        timeline["billReference1"] = item["billReference1"];
        timeline["billReference2"] = item["billReference2"];
        timeline["additionalNote"] = item["additionalNote"];
        timeline["RTPReference"] = item["RTPReference"];
        timeline["currencyCode"] = item["currencyCode"];
        timeline["isopen"] = false;
        timeline["rawData"] = item;
        timeline["receiverIdType"] = item["receiverIdType"];
        timeline["requesterIdType"] = item["requesterIdType"];
        timeline["requesterIdValue"] = item["requesterIdValue"];

        //RTP OUTGOING
        timeline["rtpMsgType"] = item["rtpMsgType"];
        timeline["receiverAccountName"] = item["receiverAccountName"];
        timeline["receiverIdValue"] = item["receiverIdValue"];
        timeline["receiverIdTypeLabel"] = item["receiverIdTypeLabel"];
        timeline["rtpMsgTypeLable"] = item["rtpMsgType"] === 'INCOMING' ? this.translateService.instant('label.RTPRecieve'):this.translateService.instant('label.RTPRequest');

        // format transaction date
        let transactionDate = this.dateservice.parseDateTime(item["createdDate"]);
        timeline["createdDate"] = transactionDate;
        if (this.timelineTitle === 'schedule') {
          timeline["transMonth"] = this.dateservice.formatDate(transactionDate, 'MMM YY', this.translateService.currentLang);
        } else {
          timeline["transTime"] = this.dateservice.formatDate(transactionDate, 'HH:mm:ss');
          timeline["transMonth"] = this.dateservice.formatDate(transactionDate, 'MMM YY', this.translateService.currentLang);
        }

        transactionDate.setHours(0,0,0,0);

        if (prevDate == null || (prevDate.getTime() != transactionDate.getTime())) {
          timeline["transDate"] = this.dateservice.formatDate(transactionDate, 'DD', this.translateService.currentLang);
        }

        prevDate = transactionDate;

        // format currency
        timeline["amount"] = this.currencyFormatter.transform(item["amount"]);
        returnData.push(timeline);

        i++;
      }
    }

    return returnData;
  }

  selectMenuList(listname: string, data: any) {
    //
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