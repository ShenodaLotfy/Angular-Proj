import { ParamMap, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router"
import { Employee } from '../models/employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  employee: Employee; 
  private id: number; 
  employeesCount: number;

  constructor(private activatedRouteService: ActivatedRoute, private _routeService: Router, private employeeService: EmployeeService) { }

  ngOnInit(): void {

      this.activatedRouteService.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id');
      // this.employee = this.employeeService.getEmployee(this.id);
      // REST API logic
      this.employeeService.getEmployee(this.id).subscribe(
        (data: Employee) => {this.employee = data},
        (error: any) => {console.log(error)}
      )

      this.employeeService.getEmployees().subscribe(
        (data: Employee[]) => {this.employeesCount = data.length},
        (error: any) => {console.log(error)}
      )
    });
  }

  NextEmployee(){
    if(this.id < this.employeesCount ){
      this.id = this.id +1 
    }
    else{
      this.id = 1;
    }

    // to keep query string parameters in URL and not to be deleted when we proceed to next employee
    // using queryParamsHandling to keep the QueryStringParameters not deletes to the next employee 
    this._routeService.navigate(['employees', this.id], 
      {queryParamsHandling : 'preserve'}
    )
  }
}
