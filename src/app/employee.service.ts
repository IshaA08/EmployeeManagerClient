import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Employee } from "./employee";

// Need to be able to use http client
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";

/**
 *  In this file: Create a function that can reach the backend to do work for us
 */ 

@Injectable( {
    providedIn:'root'
} )
export class EmployeeService {
    // Define the url we are going to be using
    private apiServerUrl = environment.apiBaseUrl;

    // Enable back end functionality for components. Access to the HTTP client gives us access to the backend
    constructor (private http:HttpClient) { }

    /**
     * Define basic CRUD functionality
     */

    public getEmployees() : Observable<Employee[]> {
      // Pass the URL we are using into the get request via back tick symbols. We are telling the http client
      // where to make the request
        return this.http.get<Employee[]>(`${this.apiServerUrl}/employee/all`);
    }

    public addEmployee (employee:Employee) : Observable<Employee> {
        console.log("In add employee");
        return this.http.post<Employee>(`${this.apiServerUrl}/employee/add`, employee);
    }

    public updateEmployee (employee:Employee) : Observable<Employee> {
        return this.http.put<Employee>(`${this.apiServerUrl}/employee/update`, employee);
    }

    public deleteEmployee (employeeId:number) : Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/employee/delete/${employeeId}`);
    }
}