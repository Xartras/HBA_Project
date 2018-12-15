import { Component, OnInit } from '@angular/core';

import { User } from '../_01_models/user';
import { UserAuthService } from '../_02_services/user-auth-service.service';

import { RegisterComponent } from '../_04_modal_dialogs/register/register.component';
import { MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private userAuth: UserAuthService, public dialog: MatDialog) { }

  user : User;
  loginValidation = [];
  logForm: FormGroup;
  isFormSubmitted = false;
  isUserIncorrect = false;

  
  get formInput() { return this.logForm.controls }

  ngOnInit() 
  {
    this.userAuth.getUsers();
    this.logForm = this.formBuilder.group(
      {
        login: [ '', [Validators.required, Validators.minLength(4)]],
        password: [ '', [Validators.required, Validators.minLength(4)]]
      }
    )
  }

  // metoda odpowiada za obsługę przycisku logowania
  // metoda walidujaca dane odpowiada rowniez za przekierowanie do glownej aplikacji
  btnLogIn()
  {

    this.isFormSubmitted = true;
    if(this.logForm.invalid) { return }
    else
    {  
      let name = this.formInput.login.value == null ? "" : this.formInput.login.value.trim();
      let pass = this.formInput.password.value == null ? "" : this.formInput.password.value.trim();
  
      //this.user = {id: 0, login: name, password: pass, email: "", registered: <Date><any>formatDate(Date.now(), "yyyy-MM-dd", "en-US")}
      //this.loginValidation = this.userAuth.validateLogin(this.user);

      this.loginValidation[1] = false
      this.loginValidation[0] = {id: 0, login: name, password: pass, email: "admin@gmail.com", registered: <Date><any>formatDate(Date.now(), "yyyy-MM-dd", "en-US")}
      if(this.loginValidation[1] == false)
      { this.userAuth.logIn(this.loginValidation[0]); }
      else
      { 
        this.isUserIncorrect = this.loginValidation[1];
      }
    }
  }

  btnRegOn()
  {
    let dialogRef = this.dialog.open(RegisterComponent);
  }
}
