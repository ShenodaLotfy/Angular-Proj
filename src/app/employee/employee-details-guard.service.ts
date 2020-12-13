import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { EmployeeService } from './employee.service';

@Injectable() 
export class EmployeeDetailsGuardService implements CanActivate{
    // employeeService to getEmployee , Router to navigate to notfound page if id is not exist 
    constructor (private employeeService: EmployeeService, private _router:Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        // try to get the employee of the id passed in URL
        // let EmployeeExists = !!this.employeeService.getEmployee(+route.paramMap.get('id'))  // !! to convert to boolean variable
        return this.employeeService.getEmployee(+route.paramMap.get('id')).pipe(
            map(employee =>{
                const EmployeeExists = !!employee;
                if (EmployeeExists){ // exists return true
                    return true;
                } else {               // in case id is not exists
                    console.log("here")
                    this._router.navigate(['/notfound']); // then navigate to notfound component 
                    return false;
                }
            }),
            catchError((error: any)=>{
                console.log(error);
                return of(false);
            })
        ) 
    }
}