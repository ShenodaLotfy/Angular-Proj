import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Employee } from '../models/employee';
import { delay } from 'rxjs/internal/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { catchError } from 'rxjs/operators'

@Injectable()
export class EmployeeService {
  
  employeeUrl : string = "http://localhost:3000/employees";

  constructor(private _http: HttpClient) { }

  // employees: Employee[] = [
  //   {
  //     id: 1,
  //     Name: 'Shenoda',
  //     Gender: 'Male',
  //     email: 's@s.com',
  //     contactPreference: 'email',
  //     dateOfBirth: new Date("1990/5/5"),
  //     department: "3",
  //     isActive: false, photoPath:
  //       'assets/images/Penguins.jpg',
  //     password: null,
  //     confirmPassword: null
  //   },
  //   {
  //     id: 2, Name: 'Mena',
  //     Gender: 'Male',
  //     email: 's@s.com',
  //     contactPreference: "s",
  //     dateOfBirth: new Date("1990/5/15"),
  //     department: "3",
  //     isActive: false,
  //     photoPath: 'assets/images/Penguins.jpg',
  //     password: null,
  //     confirmPassword: null
  //   },
  //   {
  //     id: 3,
  //     Name: 'Ahmed',
  //     Gender: 'Male',
  //     email: 's@s.com',
  //     contactPreference: "s",
  //     dateOfBirth: new Date("1990/5/15"),
  //     department: "3",
  //     isActive: false,
  //     photoPath: 'assets/images/Penguins.jpg',
  //     password: null,
  //     confirmPassword: null
  //   }
  // ]


  // getEmployees(): Employee[] {
  //     return this.employees;
  // }

  // using Observable from arrays
  
  getEmployees(): Observable<Employee[]> {
    // using of, Observable.of(this.employees). using delay to delay getting data for 2 seconds 
    // return of(this.employees).pipe(delay(2000));
    return this._http.get<Employee[]>("http://localhost:3000/employees")
      .pipe(catchError(this.handleError));
  }

  private handleError(httpErrorRespone: HttpErrorResponse) {
    if (httpErrorRespone.error instanceof ErrorEvent) {
      console.log("Client Error : " + httpErrorRespone.error.message)
    } else {
      console.log("Server Error : " + httpErrorRespone)
    }

    return throwError('Problem in the service try again later');
  }

  // -------------------------------- Logic of saving existing or new employee -------------------------------------- 
  addEmployee(employeeToSave: Employee): Observable<Employee> {
    return this._http.post<Employee>(this.employeeUrl, employeeToSave,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(catchError(this.handleError))

    // if (employeeToSave.id !== null) // then this an existing employee (edit)
    // {
    //   const foundIndex = this.employees.findIndex(emp => emp.id === employeeToSave.id)
    //   this.employees[foundIndex] = employeeToSave;
    // }
    // else // then this is a new employee (add)
    // {
    //   // const maxId = this.employees.reduce(function (emp1, emp2) {
    //   //   return (emp1.Id > emp2.Id) ? emp1 : emp2; // this function will get the max Id of employees list, max number to increase it by 1 
    //   // })
    //   // employeeToSave.Id = maxId.Id + 1;
    //   // console.log(maxId)
    //   // this.employees.push(employeeToSave);

    //   // REST API Post method
    //   return this._http.post<Employee>(this.employeeUrl, employeeToSave,
    //     {
    //       headers: new HttpHeaders({
    //         'Content-Type': 'application/json'
    //       })
    //     }).pipe(catchError(this.handleError))
    // }
  }

  updateEmployee(employeeToSave: Employee): Observable<void> {
      // REST API Post method
      return this._http.put<void>(`${this.employeeUrl}/${employeeToSave.id}`, employeeToSave,
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        }).pipe(catchError(this.handleError))
    
  }

  getEmployee(employeeId: number): Observable<Employee>{
    // logic REST API for getting employee 
    return this._http.get<Employee>(`${this.employeeUrl}/${employeeId}`).pipe(catchError(this.handleError))
    // local data on Array
    // return this.employees.find(e => e.Id == id)
  }

  deleteEmployee(employeeId: number): Observable<void> {
    console.log(employeeId)
    return this._http.delete<void>(`${this.employeeUrl}/${employeeId}`).pipe(catchError(this.handleError))
    
    // const index = this.employees.findIndex(emp => emp.Id == employeeId)
    // this.employees.splice(index, 1)
  }

}