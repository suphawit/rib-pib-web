import { NgModule } from '@angular/core';
import { ClickOutsideDirective } from "./click-outside.directive";
import { OnlyNumberDirective, onlyENUpperDirective, InfiniteScrollerDirective, maxLengthLimitDirective, AllowCurrencyDirective } from "./common.directive";
import { CurrencyFormatterDirective } from "./currency-formatter.directive";
import { FormValidatorDirective } from "./form-validator.directive";
import { MinValidator } from "./min-validator.directive";
import { RangeLengthValidator } from "./range-length-validator.directive";

@NgModule({
  imports: [
  ],
  declarations: [
    ClickOutsideDirective,
    OnlyNumberDirective,
    onlyENUpperDirective,
    InfiniteScrollerDirective,
    maxLengthLimitDirective,
    AllowCurrencyDirective,
    CurrencyFormatterDirective,
    FormValidatorDirective,
    MinValidator,
    RangeLengthValidator
  ],
  exports: [
    ClickOutsideDirective,
    OnlyNumberDirective,
    onlyENUpperDirective,
    InfiniteScrollerDirective,
    maxLengthLimitDirective,
    AllowCurrencyDirective,
    CurrencyFormatterDirective,
    FormValidatorDirective,
    MinValidator,
    RangeLengthValidator
  ]
})
export class DirectivesModule {
}
