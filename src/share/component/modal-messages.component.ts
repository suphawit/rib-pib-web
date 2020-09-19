import { ModalDirective } from 'ng2-bootstrap';
import { UtilService } from '../../share/service/util.service';
import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';

require("script-loader!assets/jQassets/jquery.min.js");

@Component({
  selector: 'bs-modal-message',
  template: `
    <div bsModal #bsModalMessage="bs-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true" [config]="config" (onHidden)="hidden($event)">
      <div class="modal-dialog modal-{{optionalSize}}">
        <div id="mdlPage" class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title pull-left">{{title | translate}}</h4>
            <button type="button" class="close pull-right" aria-label="Close" (click)="hide()">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" [ngClass]="{ 'overflow-y-scroll' : config.setScroll == true }" innerHTML="{{body | translate}}">
           
          </div>
          <div class="modal-footer">
            <button *ngIf="config.isShowCloseBtn" type="button" class="btn btn-default " (click)="hide()">{{ 'btn.close' | translate }}</button>
            <button *ngIf="config.isShowCancelBtn && config.isShowCancelBtn === true" type="button" class="btn btn-default" (click)="hide()">{{'button.cancel' | translate}}</button>
            <button *ngIf="config.isShowDeleteBtn && config.isShowDeleteBtn === true" type="button" class="btn red " (click)="emitValue('delete')">{{'btn.delete' | translate}}</button>
            <button *ngIf="config.isShowOKBtn && config.isShowOKBtn === true"type="button" class="btn dark btn-outline" (click)="emitValue('ok')">{{'button.ok' | translate}}</button>
            <button *ngIf="config.isShowOKBtnThisTime && config.isShowOKBtnThisTime === true"type="button" class="btn dark btn-outline" (click)="emitValue('this_time')">this time</button>
            <button *ngIf="config.isShowOKBtnAllTime && config.isShowOKBtnAllTime === true"type="button" class="btn dark btn-outline" (click)="emitValue('all_schedule')">All schedule</button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class MessageModalComponent {
  prevHeight: number = 0;

  @Input('body') body: string;
  @Input('title') title: string;
  @Input('size') optionalSize: string;
  @Input('config') config: any;
  @Output('onHidden') onHidden = new EventEmitter();
  @Output('onEmit') onEmit = new EventEmitter();

  @ViewChild('bsModalMessage') public bsModalMessage: ModalDirective;

  constructor(private utilService: UtilService) {
  }

  public show(): void {
    
    this.bsModalMessage.show();
    this.utilService.scrollToTop();
  }

  public hide(): void {
    this.bsModalMessage.hide();

    if (window != window.top && typeof this.config.offsetHeight !== 'undefined') {
      this.utilService.setPageHeight(this.config.offsetHeight);
    }
  }

  public hidden(): void {
    this.onHidden.emit();
  }

  public emitValue(param): void {
    this.onEmit.emit(param);
  }
}
