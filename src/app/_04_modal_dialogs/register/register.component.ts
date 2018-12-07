import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { UserAuthService } from '../../_02_services/user-auth-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  private userToBeRegistered = []
  regForm: FormGroup;
  isFormSubmitted = false;

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

    this.userToBeRegistered[0] = this.regForm.controls.login.value
    this.userToBeRegistered[1] = this.regForm.controls.password.value
    this.userToBeRegistered[2] = this.regForm.controls.email.value
    this.userToBeRegistered[3] = this.regForm.controls.periodBegin.value
    this.userToBeRegistered[4] = this.regForm.controls.periodEnd.value
    
    this.dialogRef.close(this.userToBeRegistered)
  }

  // Anulowanie rejestracji uzytkownika
  btnCancel()
  {
    this.dialogRef.close()
  }
}
