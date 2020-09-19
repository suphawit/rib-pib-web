import { Dateservice } from '../../share/service/date.service';
import { TranslateService } from "ng2-translate/src/translate.service";
import { BankCodeDataService } from '../../share/service/bankcode-data.service';
import { CurrencyFormatterPipe } from '../../share/pipe/currency-formatter.pipe';
import { Input, Component, OnChanges, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { PermissionService } from '../../share/service/permission.service';
import { Constants } from '../../share/service/constants';

@Component({
  selector: 'prompt-pay-account-timeline',
  templateUrl: './prompt-pay-account-timeline.html'
})
export class PromptPayAccountTimelineComponent implements OnChanges, OnInit, OnDestroy {

  private timelineDataRender: Array<any>;
  private errorMessage: string;
  @Input('data') timelineData: any;
  @Input('title') timelineTitle: string;
  @Input('initialMonthData')monthList: { options: Array<any>; selected: any; };
  @Output('onActions') onClickActions = new EventEmitter();
  @Output('changePeriod') changePeriod = new EventEmitter();

  permissionManage: any;
  constructor(private dateservice: Dateservice,
    private translateService: TranslateService,
    private bankCodeDataService: BankCodeDataService,
    private currencyFormatter: CurrencyFormatterPipe,
    private constants: Constants,
    private _PermissionService: PermissionService) {
  }

  ngOnInit(): void {
    this.errorMessage = null;

    this.timelineDataRender = [];
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
      this.errorMessage = (this.timelineDataRender.length > 0) ? null : this.translateService.instant('lbl.transactionNotFound');
    }
  }

  ngOnDestroy(): void {
    this.timelineDataRender = [];
  }

  protected createTimelineData(data: Array<any>): Array<any> {
    let returnData = [];

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

        timeline["transTime"] = this.dateservice.formatDate(transactionDate, 'HH:mm:ss');
        timeline["transMonth"] = this.dateservice.formatDate(transactionDate, 'MMM YY', this.translateService.currentLang);

        timeline["transDate"] = this.dateservice.formatDate(transactionDate, 'DD', this.translateService.currentLang);

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
      //this.myTimelineModal.show(data);
    } else {
      this.onClickActions.emit({ name: listname, data: data });
    }
  }

  protected trackByFn(index, item) {
    return index;
  }


  onChangePeriod(period: any) {
      // this.utilService.setPageHeight(700);
      //this.historyData.period = period.value;
      this.monthList.selected = period;
      this.changePeriod.emit(period);
  }
}