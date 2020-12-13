import { CanDeactivate } from '@angular/router';
import { CreateEmployeeComponent } from './create-employee.component';

export class EmployeeCanDeactiveGuard implements CanDeactivate<CreateEmployeeComponent>{

    canDeactivate(component: CreateEmployeeComponent): boolean {
        // we need to know if the create employee form is dirty or not, 
        if(component.employeeReferenceVariable.dirty){
            return confirm("Are you want to discord changes ?!")
        }

        return true;
    }
}