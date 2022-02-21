/**
 * Interface that contains the employee that mirrors the backend
 */

export interface Employee {

    // Define the attributes that employees have. Essentially mirror the backend Employee structure
    id: number;
    name: string;
    email: string;
    jobTitle: string;
    phone: string;
    imageUrl: string;
    employeeCode: string;

}