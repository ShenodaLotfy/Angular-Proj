import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//routing module 
import { RouterModule , Routes} from '@angular/router'
// to hold forms data 
import { FormsModule } from '@angular/forms'
import { BsDatepickerModule }  from 'ngx-bootstrap/datepicker'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import HttpClientModule to use HttpClient for get, post, delete etc
import { HttpClientModule } from '@angular/common/http'


import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { CreateEmployeeComponent } from './employee/create-employee.component';
import { NotFoundComponent } from './not-found/not-found.component';
//custom validator
import { SelectRequiredValidatorDirective } from './shared/select-list-validator.directive';
// custom confirm password directive
import { ConfirmPasswordValidator } from './shared/confirmPasswordValidator.directive';
import { EmployeeService } from './employee/employee.service';
import { DisplayemployeeComponent } from './employee/displayemployee.component';
import { EmployeeCanDeactiveGuard } from './employee/employee-can-deactive-guard.service';
import { EmployeeDetailsComponent } from './employee/employee-details.component';
// filter Pipe search by name
import { FilterEmployeeByName } from './employee/filter-employee.pipe';
import { EmployeeResolver } from './employee/employee-resolve.service';
import { EmployeeDetailsGuardService } from './employee/employee-details-guard.service';
import { AccordionComponent } from './shared/accordion.component';

// routes 
const appRoutes: Routes = [
  { path: 'list' , 
    component: EmployeeComponent,
    // add resolver to this path
    resolve: {employeeList : EmployeeResolver}
  
  },
  // we tie guard component to the specified route 
  { 
    path: 'edit/:id' , 
    component: CreateEmployeeComponent,
    canDeactivate : [EmployeeCanDeactiveGuard]
  },
  { path: 'employees/:id' ,
   component: EmployeeDetailsComponent,
   canActivate: [EmployeeDetailsGuardService] // to check if the id exists or not
   },
  { path: 'notfound' ,  component: NotFoundComponent},
  { path: '' , redirectTo: 'list' , pathMatch: 'full'},
  { path: '**' , component: NotFoundComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    CreateEmployeeComponent,
    ConfirmPasswordValidator,
    SelectRequiredValidatorDirective,
    DisplayemployeeComponent,
    EmployeeDetailsComponent,
    FilterEmployeeByName,
    AccordionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    RouterModule.forRoot(appRoutes),

  ],
  // adding a guard as a service
  providers: [EmployeeService , EmployeeCanDeactiveGuard , EmployeeResolver, EmployeeDetailsGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
