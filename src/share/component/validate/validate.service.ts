import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class ValidateService {
  private _formErrors: any = {
    idType: '',
    idNo: '',
    birthDay: '',
    mobileNO: '',
    username: '',
    email: ''
  };

  private _validationMessages: any = {
    idType: {
      'required':      'idType is required.',
      'minlength':     'idType must be at least 4 characters long.',
      'maxlength':     'idType cannot be more than 24 characters long.'
    },
    idNo: {
      'required':      'idNo is required.',
      'minlength':     'idNo must be at least 4 characters long.',
      'maxlength':     'idNo cannot be more than 24 characters long.'
    },
    birthDay: {
      'required':      'birthDay is required.',
      'minlength':     'birthDay must be at least 4 characters long.',
      'maxlength':     'birthDay cannot be more than 24 characters long.'
    },
    mobileNO: {
      'required':      'mobileNO is required.',
      'minlength':     'mobileNO must be at least 4 characters long.',
      'maxlength':     'mobileNO cannot be more than 24 characters long.'
    },
    username: {
      'required':      'username is required.',
      'minlength':     'username must be at least 4 characters long.',
      'maxlength':     'username cannot be more than 24 characters long.'
    },
    email: {
      'required':      'email is required.',
      'minlength':     'email must be at least 4 characters long.',
      'maxlength':     'email cannot be more than 24 characters long.'
    }
  };

  private _onError: Subject<any> = new Subject();

  onFormChanged(formTarget: NgForm, data?: any) {
    if (!formTarget) { return; }
    const form = formTarget.form;

    let errorMessages: Array<string> = [];

    for (const field in this._formErrors) {
      // clear previous error message (if any)
      this._formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this._validationMessages[field];
        for (const key in control.errors) {
          errorMessages.push(messages[key]);
          this._formErrors[field] += messages[key] + ' ';
        }
      }
    }

    // update error observer
    this._onError.next(errorMessages);
  }

  get onError(): Subject<any> {
      return this._onError;
  }
}