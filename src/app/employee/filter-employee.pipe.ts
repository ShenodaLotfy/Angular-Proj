import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../models/employee';


@Pipe({
    name: "SearchFilter",
    pure: false
})
export class FilterEmployeeByName implements PipeTransform{
    transform(employees: Employee[], searchTerm: string){
        if ( !employees || !searchTerm){
            return employees;
        }

        return employees.filter(emp => emp.Name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
    }
}