import { NgModule, ModuleWithProviders, PipeTransform } from '@angular/core';
import { CurrencyFormatterPipe } from "./currency-formatter.pipe";
import { DateFormatterPipe } from "./date-formatter.pipe";
import { MultipleTranslationPipe } from "./multiple-translation.pipe";
import { SanitizeHtmlPipe } from "./sanitize-html.pipe";
import { StrFormatPipe } from "./string-format.pipe";
import { SubstringPipe } from "./substring.pipe";
import { OrderByPipe } from "./order-by.pipe";
@NgModule({
        declarations: [
                CurrencyFormatterPipe,
                DateFormatterPipe,
                MultipleTranslationPipe,
                SanitizeHtmlPipe,
                StrFormatPipe,
                SubstringPipe,
                OrderByPipe,
        ],
        imports: [
        ],
        providers: [
        ],
        exports: [
                CurrencyFormatterPipe,
                DateFormatterPipe,
                MultipleTranslationPipe,
                SanitizeHtmlPipe,
                StrFormatPipe,
                SubstringPipe,
                OrderByPipe,
        ]
})
export class PipesModule {
        static forRoot(): ModuleWithProviders {
                return {
                        ngModule: PipesModule,
                        providers: [
                                CurrencyFormatterPipe,
                                DateFormatterPipe,
                                MultipleTranslationPipe,
                                SanitizeHtmlPipe,
                                StrFormatPipe,
                                SubstringPipe,
                                OrderByPipe,
                        ],
                }
        }
}
