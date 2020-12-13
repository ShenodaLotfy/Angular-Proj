import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';


@Directive({
    selector: '[appSelectValidator]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: SelectRequiredValidatorDirective,
            multi: true
        }
    ]
})
export class SelectRequiredValidatorDirective implements Validator {
    // to get the value of the select element as a parameter
    @Input() appSelectValidator: string;
    validate(control: AbstractControl) : { [key: string] : any } | null {
        // return control.value === "-1" ? {'default': true} : null;
        return control.value === this.appSelectValidator ? {'default': true} : null;
    }
}