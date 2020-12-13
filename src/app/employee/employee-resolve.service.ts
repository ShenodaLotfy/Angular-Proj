import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Employee } from '../models/employee';
import { EmployeeService } from './employee.service';
import { of } from 'rxjs'



@Injectable()
export class EmployeeResolver implements Resolve<Employee[] | string> {

    constructor (private _employeeService: EmployeeService){

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Employee[] | string> {
        return this._employeeService.getEmployees() // if succeded then return Employee[]
                .pipe(catchError((error: string ) => of(error))); // if not succeded then return Observable.of(error: string)
    }
}