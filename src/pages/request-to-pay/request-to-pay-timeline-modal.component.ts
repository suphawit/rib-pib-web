import { ModalDirective } from 'ng2-bootstrap';
import { Constants } from '../../share/service/constants';
import { Dateservice } from '../../share/service/date.service';
// import { TimelineMapFields } from '../../share/component/timeline/timeline-mapfields';
import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { TranslateService } from "ng2-translate/src/translate.service";
import { BankCodeDataService } from '../../share/service/bankcode-data.service';
import { FundTransferService } from '../../share/service/fund-transfer.service';
import { CurrencyFormatterPipe } from '../../share/pipe/currency-formatter.pipe';
import { UtilService } from '../../share/service/util.service';

@Component({
    selector: 'RTP-timeline-modal-message',
    template: `
    <div bsModal #timelineModalMessage="bs-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true" [config]="config">
        <div class="modal-dialog modal-{{optionalSize}}">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title pull-left">{{ selectTitle | translate }}</h4>
                    <button type="button" class="close pull-right" aria-label="Close" (click)="hide()">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="table-scrollable table-scrollable-borderless">
                        <table class="table table-light">
                            <tbody>
                                <tr>
                                    <td>{{ 'lbl.RTPRefCode' | translate }}</td>
                                    <td>{{ modalData.rtpreference }}</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>{{ 'lbl.RequestTo' | translate}}</td>
                                    <td>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td class="fit">
                                                    <div class="icon-circle" style.background-color="{{ modalData.receiverIdTypeList?.iconObj?.iconColor }}">
                                                            <img src="{{ modalData.receiverIdTypeList?.iconObj?.icon }}" title="{{ modalData.receiverIdTypeList?.desc }}" alt="{{ modalData.receiverIdTypeList?.desc }}" 
                                                            class="user-pic rounded" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="text-wrap">{{ modalData.receiverAccountName }}</div>
                                                    <div *ngIf="modalData.receiverIdType!=='BILLERID'">({{modalData.receiverIdValue}})</div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td>{{ 'lbl.RequestFrom' | translate}}</td>
                                    <td>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td class="fit" *ngIf="modalData.requesterIdType!=='BILLERID'" >
                                                    <div class="icon-circle" style.background-color="{{ modalData.requesterIdTypeList?.iconObj?.iconColor }}">
                                                            <img src="{{ modalData.requesterIdTypeList?.iconObj?.icon }}" title="{{ modalData.requesterIdTypeList?.desc }}" alt="{{ modalData.requesterIdTypeList?.desc }}" 
                                                            class="user-pic rounded" />
                                                    </div>
                                                </td>
                                                <td class="fit" *ngIf="modalData.requesterIdType==='BILLERID'">
                                                    <biller-image
                                                        [srcpath]= "utilService.getDefaultBillerIconPath()"
                                                        [defaultpath]="utilService.getDefaultBillerIconPath()">
                                                    </biller-image>
                                                </td>
                                                <td>
                                                    <div class="text-wrap">{{ modalData.requesterAccountName }}</div>
                                                    <div>({{modalData.requesterIdValue}})</div>
                                                    <div *ngIf="modalData.billReference1!=null && modalData.requesterIdType==='BILLERID'">{{ 'lbl.ref1' | translate }}: {{ modalData.billReference1 }}</div>
                                                    <div *ngIf="modalData.billReference2!=null && modalData.requesterIdType==='BILLERID'">{{ 'lbl.ref2' | translate }}: {{ modalData.billReference2 }}</div>
                                                    <div *ngIf="modalData.billReference3!=null && modalData.requesterIdType==='BILLERID'">{{ 'lbl.ref3' | translate }}: {{ modalData.billReference3 }}</div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td>{{ 'lbl.amount' | translate }}</td>
                                    <td>{{ modalData.amount }} <span *ngIf="modalData.amount">{{ 'lbl.baht' | translate }}</span></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>{{ 'lbl.transactionDate' | translate }}</td>
                                    <td>{{ modalData.txtcreatedDate }}</td>
                                    <td></td>
                                </tr>
                                <tr *ngIf="modalData.txtexpiryDate!=null">
                                    <td>{{ 'lbl.expiredDate' | translate }}</td>
                                    <td>{{ modalData.txtexpiryDate }}
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>{{ 'lbl.note' |translate }}</td>
                                    <td>{{ (modalData.additionalNote) ? modalData.additionalNote : '-'}}
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>{{ 'lbl.status' |translate }}</td>
                                    <td>{{ modalData.statusDesc }}
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" (click)="hide()">{{ 'btn.close' | translate }}</button>
                </div>
            </div>
        </div>
    </div>`
})
export class RTPTimelineModalComponent implements OnInit {

    modalData: any;
    anyIDTypeList: any;
    anyIDFromDesc: string;
    
    @Input('config') config: any;
    @Input('key') selectKey: string;
    @Input('type') selectType: string;
    @Input('title') selectTitle: string;
    @Input('size') optionalSize: string;

    @ViewChild('timelineModalMessage') public timelineModalMessage: ModalDirective;

    constructor(public dateservice: Dateservice,
        public translateService: TranslateService,
        public bankCodeDataService: BankCodeDataService,
        public fundTransferService: FundTransferService,
        public currencyFormatter: CurrencyFormatterPipe,
        public constants: Constants,
        public utilService: UtilService) {
    }

    ngOnInit(): void {
        this.modalData = {
            fromBankCode: '',
            accountFromName: '',
            accountFromNumber: '',
            toBankCode: '',
            accountToName: '',
            accountToNumber: '',
            paymentFor: '',
            biller: '',
            ref1: '',
            ref2: '',
            amount: '',
            referenceNumber: '',
            receivedDate: '',
            transactionDate: '',
            recurringType: '',
            recurringTimes: '',
            toEmail: '',
            toMobileNumber: '',
            msgLanguage: '',
            note: '',
            fundTransferTypeDescToDisplay: '',
            transferTimeName: '',
            debitDate: '',
            anyIDType: this.constants.ANYID_TYPE_BANK_ACCOUNT,
            RTPReference: '',
            requesterAccountName: '',
            expiredDate: '',
            billReference1: '',
            billReference2: '',
            rtpMsgType: '',
            receiverAccountName: '',
            receiverIdValue: '',
            receiverIdTypeLabel: '',
            additionalNote: '',
            receiverIdTypeList: {},
            requesterIdTypeList: {}
        };
    }

    private initialData(data: any) {

        if (!data) return;
        this.modalData = data;
        this.modalData.amount = this.currencyFormatter.transform(this.modalData.amount) || '0.00';

        let createdDate = this.dateservice.parseDateTime(this.modalData.createdDate);
        this.modalData.txtcreatedDate = this.dateservice.formatDate(createdDate, 'DD MMM YYYY HH:mm:ss', this.translateService.currentLang);
        //change Format ExpiryDate
        let expiryDate = this.dateservice.parseDateTime(this.modalData.expiryDate);
        this.modalData.txtexpiryDate = this.dateservice.formatDate(expiryDate, 'DD MMM YYYY HH:mm:ss', this.translateService.currentLang);
        this.modalData.receiverIdTypeList = this.initAnyIDTypeList(data.receiverIdType);
        this.modalData.requesterIdTypeList = this.initAnyIDTypeList(data.requesterIdType);
    }

    public show(data: any): void {
        this.initialData(data);
        this.timelineModalMessage.show();
    }

    public hide(): void {
        this.timelineModalMessage.hide();
    }

    public initAnyIDTypeList(Type: string){
        var anyIDType = this.config.data.anyIDTypeList;
        return anyIDType[Type] || {};
    }
}