import * as moment from 'moment';
import { Constants } from '../../share/service/constants';
import { Injectable } from '@angular/core';

@Injectable()
export class Dateservice {

    constructor(private constants: Constants) {
    }

    private padnum(digit, size) {
        var s = String(digit);
        while (s.length < (size || 2)) { s = "0" + s; }
        return s;
    }

    public getTransactionDate() {
        let today = new Date();
        let curYear = today.getFullYear().toString();
        let curMonth = (today.getMonth() + 1).toString();
        curMonth = this.padnum(curMonth, 2);
        let curDate = today.getDate().toString();
        curDate = this.padnum(curDate, 2);
        let curHour = today.getHours().toString();
        curHour = this.padnum(curHour, 2);
        let curMin = today.getMinutes().toString();
        curMin = this.padnum(curMin, 2);
        let curSec = today.getSeconds().toString();
        curSec = this.padnum(curSec, 2);

        let transationdate: string = curYear + curMonth + curDate + curHour + curMin + curSec;
        return transationdate;
    }

    public getReferenceNo() {
        let tsdate: string = this.getTransactionDate();
        let random: string = (Math.floor((Math.random() * 998) + 1)).toString();
        let padrandom = this.padnum(random, 3);
        return tsdate + padrandom;
    }

    public parseDate(value: string): Date {
        let reggie = /(\d{2})\/(\d{2})\/(\d{4})/;
        let dateArray = reggie.exec(value);
        if(dateArray == null){
            return null;
        }
        let dateObject = new Date(
            (+dateArray[3]),
            ((+dateArray[2])) - 1, // Careful, month starts at 0!
            (+dateArray[1])
        );

        return dateObject;
    }

    public parseDateTime(value: string): Date {
        let reggie = /(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}):(\d{2})/;
        let dateArray = reggie.exec(value);
        if(dateArray == null){
            return null;
        }
        let dateObject = new Date(
            (+dateArray[3]),
            ((+dateArray[2])) - 1, // Careful, month starts at 0!
            (+dateArray[1]),
            (+dateArray[4]),
            (+dateArray[5]),
            (+dateArray[6])
        );

        return dateObject;
    }

    public formatDate(date: Date, datePattern: string, defaultLang: string = this.constants.KNOWN_CULTURE_ENLISH_US) {
        //return new DatePipe(this.util.getCurrentKnownCulture(defaultLang)).transform(date, datePattern);
        moment.locale(defaultLang);
        return moment(date).format(datePattern);
    }

    public toString(date: Date) {
        return ("0" + (date.getDate() + 1)).slice(-2) + '/'
            + ("0" + (date.getMonth() + 1)).slice(-2) + '/'
            + date.getFullYear()
    }

    public toISOFormat(date: string) {
        let returnDate = date;
        let arrDate = returnDate.split(" ");
        if (arrDate.length > 0) {
            let selectSign = '/';
            if (arrDate[0].indexOf('/') > -1) {
                selectSign = '/';
            } else if (arrDate[0].indexOf('-') > -1) {
                selectSign = '-';
            }

            returnDate = arrDate[0].split(selectSign)[1] + '/' + arrDate[0].split(selectSign)[0] + '/' + arrDate[0].split(selectSign)[2] + ' ' + ((arrDate[1]) ? arrDate[1] : '');
        }

        return returnDate;
    }

    public getMasterDates() {
        let data = {
            dayShortNames: ["label.weekDay.Sun", "label.weekDay.Mon", "label.weekDay.Tue", "label.weekDay.Wed", "label.weekDay.Thu", "label.weekDay.Fri", "label.weekDay.Sat"],
            dayNames: ["label.weekDay.Sunday", "label.weekDay.Monday", "label.weekDay.Tuesday", "label.weekDay.Wednesday", "label.weekDay.Thursday", "label.weekDay.Friday", "label.weekDay.Saturday"],
            monthShortNames: ["label.months.Jan", "label.months.Feb", "label.months.Mar", "label.months.Apr", "label.months.May", "label.months.Jun", "label.months.Jul", "label.months.Aug", "label.months.Sep", "label.months.Oct", "label.months.Nov", "label.months.Dec"],
            monthNames: ["label.months.January", "label.months.February", "label.months.March", "label.months.April", "label.months.MayFullName", "label.months.June", "label.months.July", "label.months.August", "label.months.September", "label.months.October", "label.months.November", "label.months.December"],
        };

        return data;
    }

    public parseMomentDate(txtdate: string, pattern: string): any {
        return moment(txtdate, pattern);
    }

    public formatISODate(date: any, pattern: string) {
        return this.formatDate(new Date(date), pattern);
    }
}
