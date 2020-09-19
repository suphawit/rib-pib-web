import * as moment from 'moment';
import { DecimalPipe } from '@angular/common';
import { TranslateService } from 'ng2-translate';
import { Constants } from '../../share/service/constants';
import { UtilService } from '../../share/service/util.service';
import { Dateservice } from '../../share/service/date.service';
import { Component, OnInit, Input, ViewChild ,Output,EventEmitter} from '@angular/core';
import { MasterDataService } from '../../share/service/master-data.service';
import { PermissionService } from '../../share/service/permission.service';
import { MyAccountService } from '../../pages/my-account/my-account.service';
import { TransactionCodeInfoModalComponent } from './transaction-code-info-modal.component';
import { GetinformationService } from "../../share/service/getInformation.service";

@Component({
    selector: 'my-account-statement',
    templateUrl: './my-account-statement.html'
})
// Component class
export class MyAccountStatementComponent implements OnInit {
    public isDesktop = true;
    @Input('accountId') myAcctId: string;
    @Input('accountType') myAcctType: string;
    @ViewChild('transactionModalComp') public transactionModalComp: TransactionCodeInfoModalComponent;
    @Output() isNoData: EventEmitter<any> = new EventEmitter(true);
    noData: boolean;
    statements: any;
    dateOptions: any;
    statementLayout: any;
    permissionManage: any;
    headerTD: { columnName: Array<string>; fieldName: Array<string>; };
    headerCASA: { columnName: Array<string>; fieldName: Array<string>; };
    transactionModal: { title: string; body: string; size: string; config: any; };
    pagination: { totalItem: number; itemPerPage: number; currentPage: number; pageSize: Array<any>; pageSizeLabel: string; };

    myAccountStatement: {
        tokenID: string;
        paging: { page: number; pageSize: string; };
        inquiryAccountStatement: { myAcctId: string; statementDateFrom: string; statementDateTo: string; };
    };

    datepicker: {
        format: string;
        fromMaxDate: Date;
        fromMinDate: Date;
        toMaxDate: Date;
        toMinDate: Date;
        dt: Date,
        dtFrom: Date;
        dtTo: Date;
        txtDateFrom: string;
        txtDateTo: string;
    };

    constructor(public constants: Constants,
        public myAccountService: MyAccountService,
        public dateservice: Dateservice,
        public translate: TranslateService,
        public utilService: UtilService,
        public masterDataService: MasterDataService,
        public permissionService: PermissionService,
        public getinformationService: GetinformationService
    ) {

        this.isDesktop = this.getinformationService.isDesktop();
        this.permissionManage = {
            viewStatement: this.permissionService.getActionCode().VIEW_STATEMENT_MY_ACCOUNTS,
            printStatement: this.permissionService.getActionCode().PRINT_STATEMENT_MY_ACCOUNTS
        };
    }

    ngOnInit(): void {
        this.headerCASA = {
            columnName: ['lbl.date', 'lbl.description', 'lbl.chequeNo', 'lbl.debitBaht', 'lbl.creditBaht', 'lbl.balanceBaht', 'label.channel'],
            fieldName: ['transactionDate', 'transactionType', 'chequeNO', 'debitAmount', 'creditAmount', 'balance', 'channel']
        };
        this.headerTD = {
            columnName: ['lbl.depositNo', 'lbl.availableBalance', 'lbl.valueDate', 'lbl.maturityDate', 'lbl.termPeriod', 'lbl.interestRate', 'label.benefitAccount'],
            fieldName: ['depNo', 'balAvailable', 'dateOpen', 'dateMaturity', 'termPeriod', 'interest', 'benefitAcc']
        };

        this.statementLayout = {
            SA: this.headerCASA,
            CA: this.headerCASA,
            TD: this.headerTD
        };

        this.pagination = {
            totalItem: 1,
            itemPerPage: 5,
            currentPage: 1,
            pageSize: [5, 10, 15, 20],
            pageSizeLabel: '5'
        };

        this.transactionModal = {
            title: '',
            body: '',
            size: '',
            config: ''
        };

        this.initialStatementDateTime().then((result: any) => {
            this.initialStatementRequest();
        });
    }

    public initialStatementRequest() {
        this.myAccountStatement = {
            tokenID: '',
            paging: {
                page: this.pagination.currentPage,
                pageSize: '' + this.pagination.itemPerPage
            },
            inquiryAccountStatement: {
                myAcctId: this.myAcctId,
                statementDateFrom: this.dateservice.formatDate(this.datepicker.dtFrom, this.datepicker.format),
                statementDateTo: this.dateservice.formatDate(this.datepicker.dtTo, this.datepicker.format)
            }
        };

        if (this.myAcctType == this.constants.ACCOUNT_TYPE_TD) {
            this.getTDStatement(this.myAccountStatement);
        } else {
            this.getCASAStatement(this.myAccountStatement);
        }
    }

    public getTDStatement(data: any) {
        let promise = new Promise((resolve, reject) => {
            this.myAccountService.requestInquiryTDStatement(data).then((objResponse: any) => {
                let result = objResponse.responseJSON.result;
                if (result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                    let list = result.value.depositsList;
                    if(list.length!=0){
                        this.hasDataEvent();
                        this.statements = this.formatTDStatement(list);
                    }else{
                        this.noDataEvent();
                    }
                }
            }, function (error) {
                    
            });
        });

        return promise;
    }

    public getCASAStatement(data: any) {
        let p = new Promise((resolve, reject) => {
            this.myAccountService.requestInquiryCASAStatement(data).then((objResponse: any) => {
                let result = objResponse.responseJSON.result;
                if (result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                    let list = result.value.statements.items;
                    if(list.length!=0){
                        this.hasDataEvent();
                        this.statements = this.formatCASAStatement(list);
                        this.pagination.totalItem = result.value.statements.totalItem;
                    }else{
                        this.noDataEvent();
                    }
                    
                }
            }, function (error) {
                
            });
        });

        return p;
    }

    public initialStatementDateTime() {

        this.datepicker = {
            format: 'DD/MM/YYYY',
            fromMaxDate: new Date(),
            fromMinDate: new Date(),
            toMaxDate: new Date(),
            toMinDate: new Date(),
            dt: new Date(),
            dtFrom: new Date(),
            dtTo: new Date(),
            txtDateFrom: '',
            txtDateTo: ''
        };

        this.dateOptions = this.dateservice.getMasterDates();

        // get server time
        let p = new Promise((resolve, reject) => {
            this.masterDataService.getCurrentDate().then((result: any) => {
                this.datepicker.dt = result;
                this.datepicker.fromMaxDate = this.datepicker.dt;
                this.datepicker.fromMinDate = moment(this.datepicker.dt).subtract(179, 'days').toDate();
                this.datepicker.toMaxDate = this.datepicker.dt;
                this.datepicker.toMinDate = moment(this.datepicker.dt).subtract(29, 'days').toDate();

                this.datepicker.dtFrom = moment(this.datepicker.dt).subtract(29, 'days').toDate();
                this.datepicker.dtTo = this.datepicker.dt;
                // this.datepicker.txtDateFrom = this.dateservice.formatDate(this.datepicker.dtFrom, this.datepicker.format, this.translate.currentLang);
                // this.datepicker.txtDateTo = this.dateservice.formatDate(this.datepicker.dtTo, this.datepicker.format, this.translate.currentLang);
                resolve(true);
            });
        });

        return p;
    }

    public formatTDStatement(statement): any {
        let returnData = this.utilService.cloneObject(statement);
        let rawData = this.utilService.cloneObject(statement);

        if (statement) {
            returnData = [];

            for (let item of statement) {
                let dateOpen = this.dateservice.parseDate(item.dateOpen);
                item.dateOpen = this.dateservice.formatDate(dateOpen, 'DD MMM YYYY', this.translate.currentLang);

                let dateMaturity = this.dateservice.parseDate(item.dateMaturity);
                item.dateMaturity = this.dateservice.formatDate(dateMaturity, 'DD MMM YYYY', this.translate.currentLang);

                let bahtLabel = this.translate.instant('lbl.baht');
                item.balAvailable = new DecimalPipe("en-us").transform(item.balAvailable, '.2-2') + ' ' + bahtLabel;
                item.balPrincipal = new DecimalPipe("en-us").transform(item.balPrincipal, '.2-2') + ' ' + bahtLabel;
                item.interest = item.interest + '%';

                returnData.push(item);
            }

            this.addTermPeriod(returnData);
        }

        return { data: returnData, rawData: rawData };
    }

    private addTermPeriod(data: any) {
        for (let item of data) {
            let termDay = item.termDay;
            let termMonth = item.termMonth;

            if (termDay == 1) {
                termDay = ' ' + termDay + ' ' + this.translate.instant('label.day');
            } else if (termDay > 1) {
                termDay = ' ' + termDay + ' ' + this.translate.instant('label.days');
            } else {
                termDay = '';
            }

            if (termMonth == 1) {
                termMonth = termMonth + ' ' + this.translate.instant('label.month');
            } else if (termMonth > 1) {
                termMonth = termMonth + ' ' + this.translate.instant('label.months');
            } else {
                termMonth = '';
            }

            item['termPeriod'] = termMonth + termDay;
        }
    }

    public formatCASAStatement(statement): any {
        let returnData = this.utilService.cloneObject(statement);
        let rawData = this.utilService.cloneObject(statement);

        if (statement) {
            let dt = null;
            returnData = [];

            for (let item of statement) {
                let transactionDate = this.dateservice.parseDateTime(item.transactionDate);
                item["transTime"] = this.dateservice.formatDate(transactionDate, 'hh:mm:ss');

                if (dt !== transactionDate.getDate()) {
                    dt = transactionDate.getDate();
                    item["transDate"] = this.dateservice.formatDate(transactionDate, 'DD MMMM YYYY', this.translate.currentLang);
                }

                item.transactionDate = this.dateservice.formatDate(transactionDate, 'DD MMM YYYY HH:mm', this.translate.currentLang);

                // format currency
                item.debitAmount = new DecimalPipe("en-us").transform(item.debitAmount, '.2-2');
                item.creditAmount = new DecimalPipe("en-us").transform(item.creditAmount, '.2-2');
                item.balance = new DecimalPipe("en-us").transform(item.balance, '.2-2');

                returnData.push(item);
            }
        }

        return { data: returnData, rawData: rawData };
    }

    onChange(type: string, dt: Date) {
        // let txtDate = this.dateservice.formatDate(dt, this.datepicker.format, this.translate.currentLang);
        // if (type === 'datefrom') {
        //     this.datepicker.txtDateFrom = txtDate;
        // } else {
        //     this.datepicker.txtDateTo = txtDate;
        // }

        // Check limit date range
        let limitDate;

        if (type === 'datefrom') {
            limitDate = moment(dt).add(89, 'days').toDate();
            

            if (this.datepicker.dtTo > limitDate) {
                this.datepicker.dtTo = limitDate;
                // this.datepicker.txtDateTo = this.dateservice.formatDate(this.datepicker.dtTo, this.datepicker.format, this.translate.currentLang);
            }

            // Set dt_to equal to dt_from
            if (this.datepicker.dtFrom >= this.datepicker.dtTo) {
                
                this.datepicker.dtTo = this.datepicker.dt;
                // this.datepicker.txtDateTo = this.dateservice.formatDate(this.datepicker.dtTo, this.datepicker.format, this.translate.currentLang);
            }

            this.datepicker.toMinDate = dt;
        } else if (type === 'dateto') {
            limitDate = moment(dt).subtract(89, 'days').toDate();
            

            if (this.datepicker.dtFrom < limitDate) {
                this.datepicker.dtFrom = limitDate;
                // this.datepicker.txtDateFrom = this.dateservice.formatDate(this.datepicker.dtFrom, this.datepicker.format, this.translate.currentLang);
            }
        }

        // Set to first page
        this.pagination.currentPage = 1;
    }

    onCurrentPage(page: number) {
        //
        this.pagination.currentPage = page;
        this.initialStatementRequest();
    }

    onChangePageSize(page) {
        this.pagination.itemPerPage = (page === 'All') ? this.pagination.totalItem : page;
        this.pagination.currentPage = 1;
        this.initialStatementRequest();
    }

    downloadStatement(): void {
        if (this.myAcctType == this.constants.ACCOUNT_TYPE_TD) {
            this.myAccountService.requestDownloadTDStatement(this.myAccountStatement.inquiryAccountStatement.myAcctId).then((objResponse: any) => {
                let result = objResponse.responseJSON.result;
                if (result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                    this.utilService.downloadStreamFile(result.value.data, 'tdStatement.pdf');
                }
            }, function (error) {
                
            });
        } else {
            this.myAccountService.requestDownloadCASAStatement(this.myAccountStatement.inquiryAccountStatement.myAcctId, this.myAccountStatement.inquiryAccountStatement.statementDateFrom, this.myAccountStatement.inquiryAccountStatement.statementDateTo).then((objResponse: any) => {
                let result = objResponse.responseJSON.result;
                if (result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                    this.utilService.downloadStreamFile(result.value.data, 'casaStatement.pdf');
                }
            }, function (error) {
                
            });
        }
    }

    viewStatement(): void {
        this.initialStatementRequest();
    }

    clickToShowTransactionInfo(): void {
        this.transactionModalComp.show();
    }

    public trackByFn(index, item) {
        return index;
    }

    private noDataEvent(){
        this.pagination.currentPage = 1;
        this.pagination.totalItem = 1;

        this.noData = true;
        this.isNoData.emit(this.noData);
    }

    private hasDataEvent(){
        this.noData = false;
        this.isNoData.emit(this.noData);
    }
}
