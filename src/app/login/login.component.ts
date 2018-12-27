import { Component, OnInit } from '@angular/core';

import { RegisteredToken } from '../_01_models/user';
import { UserAuthService } from '../_02_services/user-auth-service.service';

import { RegisterComponent } from '../_04_modal_dialogs/register/register.component';
import { MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private userAuth: UserAuthService, public dialog: MatDialog, private router: Router) { }

  user : RegisteredToken = {login: "", password: ""}
  loginValidation = [];
  logForm: FormGroup;
  isFormSubmitted = false;
  isUserIncorrect = false;

  
  get formInput() { return this.logForm.controls }

  ngOnInit() 
  {
    this.logForm = this.formBuilder.group(
      {
        login: [ '', [Validators.required, Validators.minLength(4)]],
        password: [ '', [Validators.required, Validators.minLength(4)]]
      }
    )
    this.router.navigateByUrl('/')
  }

  // metoda odpowiada za obsługę przycisku logowania
  // metoda walidujaca dane odpowiada rowniez za przekierowanie do glownej aplikacji
  btnLogIn()
  {
    if(this.logForm.valid)
    {
      this.user.login = this.logForm.controls.login.value;
      this.user.password = this.logForm.controls.password.value;
  
      this.userAuth.logIn(this.user).subscribe(() => 
      {
        this.router.navigateByUrl('/details')
        this.userAuth.usersLogin = this.user.login;
      })
    }
  }

  btnRegOn()
  {
    let dialogRef = this.dialog.open(RegisterComponent);
  }
}
