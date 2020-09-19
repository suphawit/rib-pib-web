import { FormGroup } from '@angular/forms';

export class ValidationService {

    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
        let config = {
            'required': 'label.Required',
            'invalidCreditCard': 'Is invalid credit card number',
            'invalidEmailAddress': 'valErr.invalidEmail',
            'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.',
            'minlength': `Minimum length ${validatorValue.requiredLength}`,
            'maxlength': `Maximum length ${validatorValue.requiredLength}`,
            'mismatchedPasswords': 'Passwords do not match.',
            'invalidMobileNo': 'valErr.invalidMobileNo',
            'invalidAccountName': 'valErr.invalidAccName',
            'invalidString': 'wrong for string ',
            'invalidNonString': 'valErr.invalidAccNo',
            'invalidAmount': 'valErr.invalidAmounts',
            'mismatchedUsername': 'valErr.InvalidUsername'
        };

        return config[validatorName];
    }

    static creditCardValidator(control) {
        // Visa, MasterCard, American Express, Diners Club, Discover, JCB
        if (control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
            return null;
        } else {
            return { 'invalidCreditCard': true };
        }
    }

    static emailValidator(control) {
        // RFC 2822 compliant regex
        if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/) || control.value == "") {
            return null;
        } else {
            return { 'invalidEmailAddress': true };
        }
    }

    static passwordValidator(control) {
        // {6,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
            return null;
        } else {
            return { 'invalidPassword': true };
        }
    }

    // FORM GROUP VALIDATORS
    static matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
        return (group: FormGroup): { [key: string]: any } => {
            let password = group.controls[passwordKey];
            let confirmPassword = group.controls[confirmPasswordKey];
            
            if ((password.value !== confirmPassword.value) && confirmPassword.value.length > 0) {
                
                return {
                    mismatchedPasswords: true
                };
            }
        }
    }
    static mobileNoValidator(control) {
        if (control.value.match(/^\(?([0]{1}[0-9]{2})\)?([0-9]{3})([0-9]{4})$/) || control.value == "") {
            return null;
        } else {
            return { 'invalidMobileNo': true };
        }
    }

    static requiredValidator(control) {
        let input = control.value.trim();
        if (input == '' || input.length == 0 || input == null) {
            // error
            return { 'required': true };
        } else {
            // no error
            return null;
        }
    }
    static nonStringValidator(control) {
        if (control.value.match(/^\d+$/)) {
            return null;
        } else {
            return { 'invalidNonString': true };
        }
    }

    static amountValidator(control) {
        if (control.value.match(/^\d+$/)|| control.value.match(/./)) {
            return null;
        } else {
            return { 'invalidAmount': true };
        }
    }

    static matchingUsername(usernameKey: string, confirmUsernameKey: string) {
        return (group: FormGroup): { [key: string]: any } => {
            let username = group.controls[usernameKey];
            let confirmUsername = group.controls[confirmUsernameKey];
            
            if ((username.value !== confirmUsername.value) && confirmUsername.value.length > 0) {
                
                return {
                    mismatchedUsername: true
                };
            }
        }
    }
}