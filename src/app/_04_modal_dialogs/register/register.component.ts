import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { UserAuthService } from '../../_02_services/user-auth-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisteredToken } from '../../_01_models/user'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder
             ,public dialogRef: MatDialogRef<RegisterComponent>
             ,private userAuth: UserAuthService
             ) { }

  private userToBeRegistered : RegisteredToken = { login: "", password: ""}

  regForm: FormGroup;
  isFormSubmitted = false;
  isUserNotValid = true;

  get formInput() { return this.regForm.controls }

  ngOnInit() 
  { 
    this.regForm = this.formBuilder.group(
      {
        login: ['', Validators.required],
        password: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        periodBegin: ['', Validators.required],
        periodEnd: ['', Validators.required]
      })
  }

  // Walidacja danych rejestracji
  btnAuthRegistration()
  {
    this.isFormSubmitted = true;

    this.userToBeRegistered.login = this.regForm.controls.login.value
    this.userToBeRegistered.password = this.regForm.controls.password.value

    this.userAuth.regOn(this.userToBeRegistered).subscribe(() => this.dialogRef.close())
  }

  // Anulowanie rejestracji uzytkownika
  btnCancel()
  {
    this.dialogRef.close()
  }
}
