import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  // Define variable to hold the employees we will be getting back
  public employees:Employee[];
  public editEmployee:Employee | undefined;
  public deleteEmployee:Employee | undefined;

  // Inject EmployeeService into this app component
  constructor (private employeeService:EmployeeService) {
    this.employees = [];
  }

  // Override ngOnInit to make sure that the getEmployees method is called whenever this component is loaded
  ngOnInit () {
    this.getEmployees();
  }

  public getEmployees () : void {
    // Observable means that the request will be done over the internet
    this.employeeService.getEmployees().subscribe(
      // If a valid http response is returned, store it in the employees
      (response:Employee[]) => {
        this.employees = response;
      },
      // If an error is returned from the request, show an error message in the console
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  /**
   * @param addForm Form containing user-given employee information
   */
  public onAddEmployee(addForm:NgForm): void {
    // Get the close button by ID and click it to close the form automatically
    document.getElementById('add-employee-form')?.click();
    // Make a call to the service that uses the backend
    this.employeeService
    // addForm.value will give the JSON version of the data automatically to the service
    .addEmployee(addForm.value)
    // Want to subscribe to the response
    .subscribe(
      // What to do with successful HTTP response
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
        // Regardless what happens, reset the form
        addForm.reset();
      },
      // What to do if error is given back
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateEmployee(employee:Employee): void {
    this.employeeService
    .updateEmployee(employee)
    .subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteEmployee(employeeId:number): void {
    this.employeeService
    .deleteEmployee(employeeId)
    .subscribe(
      (response: void) => {
        console.log(response);
        // Reload everything
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  /**
   * Search functionality
   * @param key 
   */
  public searchEmployees(key:string): void {
    // Define a new array that stores employees that match the key
    const results: Employee[] = [];

    // Loop through all the employees that we have
    for (const employee of this.employees) {
      // If the employee's name/email/phone/job title contains the key (i.e. not equal to -1)
      // Convert both to lower case for comparison ease
      if ((employee!.name.toLowerCase().indexOf(key.toLowerCase()) !== -1) 
      // The following three lines were throwing errors because they can be and are undefined in the backend
   //   || (employee!.email.indexOf(key.toLowerCase()) !== -1)
   //   || (employee!.phone.indexOf(key.toLowerCase()) !== -1)
   //   || (employee!.jobTitle.indexOf(key.toLowerCase()) !== -1) 
      ) {
        // Add the employee to the results list
        results.push(employee);
      }
    }

    // Update our overall list of employees to the results
    this.employees = results;

    // If there are no employees or no key, call the backend to get all employees again
    if (results.length === 0 || !key) {
      this.getEmployees();
    }
  }

  /**
   * Set the buttons from the main page to enable the modals to show up
   * @param employee 
   * @param mode What exactly the user is trying to do; tells you what modal to open
   */
  public onOpenModal(mode:string, employee?:Employee): void {

    // Get access to the entire page body div
    const container = document.getElementById('main-container');

    // Create the button. This is the same as doing <button></button> in the HTML
    const button = document.createElement('button');

    // Change button type because the default is submit
    button.type = 'button';

    // Hide the button because we already have buttons shown in the HTML
    button.style.display = 'none';

    // Set button attributes programatically
    button.setAttribute('data-toggle', 'modal');

    // Check the mode the user chose. The #id must be the same id name as the modals
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    else if (mode === 'edit') {
      this.editEmployee = employee;
      button.setAttribute('data-target', '#editEmployeeModal');
    }
    else if (mode === 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container?.appendChild(button);
    button.click();
  }


}
