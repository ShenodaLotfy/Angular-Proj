import { Component, OnInit, ViewChild } from '@angular/core';
import { NgControl, NgForm } from '@angular/forms';
import { Department } from '../models/department';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker'
import { Employee } from '../models/employee';
import { EmployeeService } from './employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeResolver } from './employee-resolve.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  // to get the template reference variable here in a component class
  @ViewChild('employeeForm') public employeeReferenceVariable: NgForm;
  Title: string;
  bsConfig: Partial<BsDatepickerConfig>;
  previewImage: boolean = false;
  imagePath: string;

  constructor(private _employeeService: EmployeeService, private router: Router, private _route: ActivatedRoute) {
    this.bsConfig = Object.assign({}, {
      containerClass: 'theme-dark-blue',
      showWeekNumbers: false,
      dateInputFormat: 'DD/MM/YYYY'
    })
  }

  employee: Employee;

  departments: Department[] =
    [
      { id: 1, Name: "HR" },
      { id: 2, Name: 'Payroll' },
      { id: 3, Name: "Admin" },
      { id: 4, Name: "Help Desk" }
    ]

  ngOnInit(): void {
    this._route.paramMap.subscribe(paramMap => {
      const id = +paramMap.get('id');
      this.getEmployee(id);
    })
  }

  getEmployee(employeeId: number) {
    // if URL has id of 0, then make all fields is empty 
    if (employeeId === 0) {
      this.Title = "Create Employee";
      this.employee =
      {
        Name: null,
        email: null,
        phoneNumber: null,
        contactPreference: null,
        Gender: null,
        isActive: null,
        department: "select",
        dateOfBirth: null,
        photoPath: null,
        id: null,
        password: null,
        confirmPassword: null
      }
      this.employeeReferenceVariable.reset(); // reset all the fields
    } else { // else if id in URL is not 0, then make all fields full of employee data
      this.Title = "Edit Employee";
      // this.employee = Object.assign({},  this._employeeService.getEmployee(employeeId));

      //REST API logic retrieving Employee object
      this._employeeService.getEmployee(employeeId).subscribe(
        (data: Employee) => this.employee = data,
        (error: any) => { console.log(error) }
      );
    }
  }

  saveEmployee(newEmployee: Employee) {
    // we have to make a copy of employee Variable because when we use this.employeeReferenceVariable.reset() this will empty employee variable 
    // so we will make a copy of it and pass to saveEmployee method to avoid error of null data saved
    // to disable guard component confirmation by clearing all input fields
    if (newEmployee.id == null) {
      const newEmployeeVar: Employee = Object.assign({}, this.employee)
      // then we pass the newEmployee to save method 
      this._employeeService.addEmployee(newEmployeeVar).subscribe((data: Employee) => {
        this.employeeReferenceVariable.reset();
        this.router.navigate(['list']);
      }, (error: any) => { console.log(error) });
    }
    else {
      const newEmployeeVar: Employee = Object.assign({}, this.employee)
      // then we pass the newEmployee to save method 
      this._employeeService.updateEmployee(newEmployeeVar).subscribe(() => {
        this.employeeReferenceVariable.reset();
        this.router.navigate(['list']);
      }, (error: any) => { console.log(error) });
    }

  }

  togglePreview() {
    this.previewImage = !this.previewImage;
  }

}
