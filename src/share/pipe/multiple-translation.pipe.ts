import { Pipe, PipeTransform } from "@angular/core";
import { TranslateService } from "ng2-translate/src/translate.service";

@Pipe({ name: "multiTranslate" })
export class MultipleTranslationPipe implements PipeTransform {

    constructor(private translate: TranslateService) { }

    transform(value: any[], args: any[]): any {
        let result = [];

        if (value !== undefined && value.length > 0) {
            for (var i = 0; i < value.length; i++) {
               result.push(this.translate.instant(value[i]));
            }
        }

        return result;
    }
}