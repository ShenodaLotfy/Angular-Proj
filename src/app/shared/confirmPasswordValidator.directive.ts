import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
    selector: '[confirmPasswordValidator]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: ConfirmPasswordValidator,
            multi: true,
        }
    ]
})
export class ConfirmPasswordValidator implements Validator {

    @Input() confirmPasswordValidator: string;
    validate(control: AbstractControl): { [key: string]: any } | null {
        const controlToCompare = control.parent.get(this.confirmPasswordValidator)
        if (controlToCompare && control.value !== controlToCompare.value) {
            console.log("ssssssssssssssssssssssssssssssssssssssssssssssssssss")
            return { "notEqual": true }
        }
        return null;
    }

    
}