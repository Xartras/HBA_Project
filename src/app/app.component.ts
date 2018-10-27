import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginComponent } from './_modal_dialogs/login/login.component'
import { RegisterComponent } from './_modal_dialogs/register/register.component'
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HomeBudgetAnalyzer';

  constructor(public dialog: MatDialog, public route: Router) {}

  btnLogIn()
  {
    let dialogRef = this.dialog.open(LoginComponent, {})
  
    dialogRef.afterClosed().subscribe(
    result => {
                console.log("Dialog closed");
                console.log(result);
              }
          )    
  }

  btnRegIn()
  {
    let dialogRef = this.dialog.open(RegisterComponent, {})
  
    dialogRef.afterClosed().subscribe(
    result => {
                console.log("Dialog closed");
                console.log(result);
              }
          )      
  }
}
