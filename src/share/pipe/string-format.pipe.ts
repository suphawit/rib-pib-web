import { Pipe, PipeTransform } from "@angular/core";
import { TranslateService } from "ng2-translate/src/translate.service";

@Pipe({ name: "strformat" })
export class StrFormatPipe implements PipeTransform {

    constructor(private translate: TranslateService) { }

    transform(value: any, args: any[]): any {
        let result = this.translate.instant(value);

        if (result !== '' && args !== undefined && args.length > 0) {
            for (let i = 0; i < args.length; i++) {
                let displayName = "";

                try {
                    displayName = this.translate.instant(args[i]);
                } catch(ex) {
                    displayName = args[i];
                }

                result = result.replace('{' + i + '}', displayName);
            }
        }

        return result;
    }
}