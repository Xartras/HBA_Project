import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { UserAuthService } from '../../_02_services/user-auth-service.service';
import { PeriodsService } from '../../_02_services/periods-srvc.service'
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
             ,private ServicePrds: PeriodsService
             ) { }

  private userToBeRegistered : RegisteredToken = { login: "", password: "", registered: null, email: null}

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
        email: ['', [Validators.required, Validators.email]]
      })
  }

  // Walidacja danych rejestracji
  btnAuthRegistration()
  {
    this.isFormSubmitted = true;

    this.userToBeRegistered.login    = this.regForm.controls.login.value;
    this.userToBeRegistered.password = this.regForm.controls.password.value;
    this.userToBeRegistered.email    = this.regForm.controls.email.value;

    this.userAuth.regOn(this.userToBeRegistered).subscribe()
    this.dialogRef.close()
  }

  // Anulowanie rejestracji uzytkownika
  btnCancel()
  {
    this.dialogRef.close()
  }
}
