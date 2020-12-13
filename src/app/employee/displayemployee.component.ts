
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../models/employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-displayemployee',
  templateUrl: './displayemployee.component.html',
  styleUrls: ['./displayemployee.component.css']
})
export class DisplayemployeeComponent implements OnInit {

  selectedEmployeeId: number;
  @Input() employee: Employee;
  @Input() searchTerm: string;
  confirmDelete = false;
  // output property to notify parent component when we are deleting an employee
  @Output() notifyDelete: EventEmitter<number> = new EventEmitter<number>();

  constructor(private activatedRoute: ActivatedRoute, private _router: Router, private _employeeService: EmployeeService) { }

  @Output() notify: EventEmitter<Employee> = new EventEmitter<Employee>();


  ngOnInit(): void {
    this.selectedEmployeeId =  +this.activatedRoute.snapshot.paramMap.get('id')
  }

  // when we click on any employee card, then fire the event notify and send the employee data to parent component 
  handleClick(){
    this.notify.emit(this.employee)
  }

  onViewClick(id: number){
    this._router.navigate(['employees', id] ,{
      queryParams:{'searchTerm': this.searchTerm}
    })
  }

  EditEmployee(id: number){
    this._router.navigate(['edit', id])
  }

  deleteEmployee(){
    this._employeeService.deleteEmployee(this.employee.id).subscribe(
      () => console.log(`Employee with id ${this.employee.id} deleted`),
      (error : any) => console.log(error)
    )
    // then fire the event, to notify the parent component to update filteredEmployees List
    this.notifyDelete.emit(this.employee.id)

    // REST API logic
  }

  // detect and react when an input propert values changes using ngOnChanges
  // @Input() employee: Employee;
  // ngOnChanges(changes: SimpleChanges){
  //   const current : Employee = changes.employee.currentValue;
  //   const previous : Employee = changes.employee.previousValue;
  //   console.log(current);
  //   console.log(previous);
  // }

  // // detect and react when an input propert values changes using setter and setter for property employee
  // private _employee: Employee
  // @Input() 
  // set employee (val: Employee){
  //   console.log("previous is :" + JSON.stringify(this.employee) + " and current is: " + JSON.stringify(val))
  //   this._employee = val; // then assign current to previous 
  // }

  // get employee() {
  //   return this._employee
  // }

}
