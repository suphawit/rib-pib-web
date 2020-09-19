import { Component, Input } from '@angular/core';
import { UtilService } from "../../service/util.service";

@Component({
  selector: 'alert-message',
  templateUrl: './alert-message.html'
})
// Component class
export class AlertMessageComponent {
  @Input('title') messageTitle: string;
  @Input('message') messageBody: string;
  @Input('type') messageType: string;
  @Input('option') option: { any };

  private _isShow: boolean = false;

  constructor(private utilService: UtilService){
    
  }

  hide() {
    this.isShow = false;
  }

  show() {
    this.isShow = true;
    this.utilService.scrollToTop();
  }

  get isShow() {
    return this._isShow;
  }
  set isShow(value: boolean) {
    this._isShow = value;
  }
}