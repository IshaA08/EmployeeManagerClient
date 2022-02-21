import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

// Add http client
import {HttpClientModule} from '@angular/common/http'
import { EmployeeService } from './employee.service';

// Get form module
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [EmployeeService], // Make the whole Angular app aware of the EmployeeService
  bootstrap: [AppComponent]
})
export class AppModule { }
