import { ModalDirective } from 'ng2-bootstrap';
import { Constants } from '../../share/service/constants';
import { TranslateService } from "ng2-translate/src/translate.service";
import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'delete-other-acc-modal',
  template: `
    <div bsModal #bsModalMessage="bs-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true" [config]="config" (onHidden)="hidden($event)">
      <div class="modal-dialog modal-{{ optionalSize }}">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title pull-left">{{ title | translate }}</h4>
            <button type="button" class="close pull-right" aria-label="Close" (click)="hide()">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" >
            <table style="width:100%">
              <tbody class="table table-hover table-striped dataTable no-footer">
                  <tr>
                      <td style="width: 200px;"><span class="bold ">{{'label.tdAliasName'|translate}}</span></td>
                      <td>: {{ accountDetail?.acctAliasName }}</td>
                  </tr>
                  <tr>
                      <td>
                        <span class="bold">{{ currentLang == constants.CULTURE_SHORTNAME_ENGLISH ? accountDetail?.labelEn : accountDetail?.labelTh }}</span>
                      </td>
                      <td>: {{ accountDetail?.acctNo }}</td>
                  </tr>
                  <tr *ngIf="accountDetail?.bankName != null">
                      <td><span class="bold " valign="top" >{{ 'label.bankName' | translate }}</span></td>
                      <td>: {{ accountDetail?.bankName }}</td>
                  </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button *ngIf="config.isShowCloseBtn" type="button" class="btn btn-default " (click)="hide()">{{ 'btn.close'|translate }}</button>
            <button *ngIf="config.isShowCancelBtn && config.isShowCancelBtn === true" type="button" class="btn btn-default" (click)="hide()">{{ 'button.cancel' | translate }}</button>
            <button *ngIf="config.isShowDeleteBtn && config.isShowDeleteBtn === true" type="button" class="btn red" (click)="emitValue('delete')">{{ 'btn.delete' | translate }}</button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class deleteOtherAccModalComponent {
  @Input('accountDetail') accountDetail: any;
  @Input('title') title: string;
  @Input('size') optionalSize: string;
  @Input('config') config: any;
  @Output('onHidden') onHidden = new EventEmitter();
  @Output('onEmit') onEmit = new EventEmitter();

  @ViewChild('bsModalMessage') public bsModalMessage: ModalDirective;

  constructor(public constants: Constants,
    public translate: TranslateService) {
  }

  public show(): void {
    this.bsModalMessage.show();
  }

  public hide(): void {
    this.bsModalMessage.hide();
  }

  public hidden(): void {
    this.onHidden.emit();
  }

  public emitValue(param): void {
    this.onEmit.emit(param);
  }

  public get currentLang() {
    return this.translate.currentLang.toUpperCase();
  }
}
