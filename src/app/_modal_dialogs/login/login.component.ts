import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router'
import { User } from '../../_models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private route: Router, public dialogRef: MatDialogRef<LoginComponent>) 
  { }

  user : any = {};
  userForm: User;
  userBase: User;
  checkValidation: boolean;

  ngOnInit() { }

  // metoda odpowiada za obsługę przycisku logowania
  btnAuthUser()
  {
    this.dialogRef.close(this.user);
  }

  btnCancel()
  {
    this.dialogRef.close();
  }
}
