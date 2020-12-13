import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../models/employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  // create an object of type Employee
  employees: Employee[];
  currentEmployee: Employee;
  dataFromChild: string;
  private _searchTerm: string;
  errorMessage: string;

  // implementing pipes logic inside the components
  filteredEmployees: Employee[];

  // when we set searchTeam in html input, then we make the filter on the new filteredEmployees array, and in html we just deal with filteredEmployees
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredEmployees = this.employees.filter(emp => emp.Name.toLowerCase().indexOf(this._searchTerm.toLowerCase()) !== -1)
  }
  get searchTerm() {
    return this._searchTerm;
  }

  private employeeIndex: number = 1;

  constructor(private _employeeService: EmployeeService, private _routeService: Router, private _route: ActivatedRoute) {
      // get data using resolver
      const dataResolved = _route.snapshot.data['employeeList']
      if(Array.isArray(dataResolved)){
        this.employees = dataResolved;
      }
      else{
        this.errorMessage = dataResolved;
      }
      this._route.queryParamMap.subscribe(params => {
        if (params.has("searchTerm")) {
          this.searchTerm = params.get("searchTerm");
        }
        else{
          this.filteredEmployees = this.employees;
        }
      })
  }

  ngOnInit(): void {
    // this.employees = this._employeeService.getEmployees();
    
    // invoke getEmployees using Observable approach
    // all commented because we used Resolver instead

    // this._employeeService.getEmployees().subscribe(
    //   employeeList => {
    //     this.employees = employeeList;
    //     // we have to include any code that executed in ngOnInit here in subscribe method, because of delay caused by getting data from WEP API server 

    //     this._route.queryParamMap.subscribe(params => {
    //       if (params.has("searchTerm")) {
    //         this.searchTerm = params.get("searchTerm");
    //       }
    //       else{
    //         this.filteredEmployees = this.employees;
    //       }
    //     })
    //   } 
    // );
    // this.currentEmployee = this.employees[0];

    // initiate filteredEmployees
    this.filteredEmployees = this.employees;

    // read query string parameters using 2 approaches (snapshot, observable)
    // 1 - (snapshot) check if there's a param named searchTerm
    // if (this._route.snapshot.queryParamMap.has("searchTerm")){
    //   // - then get the value and assign it to searchTerm Property
    //   this.searchTerm = this._route.snapshot.queryParamMap.get("searchTerm")
    // }
    // 2- (observable) approach
    // this._route.queryParamMap.subscribe(params => {
    //   if (params.has("searchTerm")) {
    //     this.searchTerm = params.get("searchTerm");
    //   }
    //   else{
    //     this.filteredEmployees = this.employees;
    //   }
    // })
  }

  // handle notify event that we made in child component
  handleNotify(employee: Employee) {
    this.dataFromChild = employee.Name + " " + employee.Gender;
  }

  onEmployeeClick(id: number) {
    // adding required parameter 
    this._routeService.navigate(['employees', id],
      {
        // adding query string parameters 
        queryParams: { searchTerm: (this.employees.find(emp => emp.id == id).Name), testValue: "test" }
      }
    )
  }

  ChangeEmployeeName(searchString: string): void {
    // -in this case we changing object property not the object reference, so SearchFilter pipe not working because its pure pipe 
    // - impure pipe can make this method works, but it decreases performance, so it's not recommended
    // this.employees[0].Name = searchString;
    // to make pure pipe working, we have to make change in object reference
    // let newEmployees: Employee[] = Object.assign([] , this.employees); // we make another pointer to object reference
    // newEmployees[0].Name = searchString; // then we make changes in the other reference
    // this.employees = newEmployees; // then make employees object reference change

    // filteredEmployeesArray to apply pipes logic in component
    this.employees[0].Name = searchString;
    // update filteredEmployees
    this.filteredEmployees = this.employees.filter(emp => emp.Name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  // nextEmployee(): void {
  //   if(this.employeeIndex < 3){
  //     this.currentEmployee = this.employees[this.employeeIndex]
  //     this.employeeIndex++;
  //     console.log("a7a")
  //   }
  //   else{
  //     this.currentEmployee = this.employees[0];
  //     this.employeeIndex = 1;
  //   }
  // }

  deleteEmployee(employeeId: number){
    const index = this.filteredEmployees.findIndex(emp => emp.id == employeeId);
    this.filteredEmployees.splice(index, 1)
   console.log(this.filteredEmployees)
  }
}
