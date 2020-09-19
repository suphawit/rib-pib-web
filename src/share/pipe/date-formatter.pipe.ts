import { Pipe, PipeTransform } from "@angular/core";
import { Dateservice } from '../service/date.service';
import { TranslateService } from "ng2-translate/src/translate.service";

@Pipe({ name: "dateFormat" })
export class DateFormatterPipe implements PipeTransform {

    constructor(private dateService: Dateservice, private translate: TranslateService) {
    }

    transform(value: any, args: string[]): string {

        if (value) {
            let pattern = args !== undefined && args.length > 0 ? args[0] : "DD MMM YYYY";

            if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
                let date = this.dateService.parseDate(value);
                return this.dateService.formatDate(date, pattern, this.translate.currentLang);
            } else {
                let date = this.dateService.parseDateTime(value);
                return this.dateService.formatDate(date, pattern + " HH:mm:ss", this.translate.currentLang);
            }
        }
    }
}