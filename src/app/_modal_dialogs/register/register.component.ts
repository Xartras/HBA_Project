import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { UserAuthService } from '../../_services/user-auth-service.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

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

  user : any = { }
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
    //let isUserCorrect = this.userAuth.validateRegistration(this.user);

    //if (isUserCorrect == true)
    //{
    //  this.dialogRef.close(this.user);
    //}
  }

  // Anulowanie rejestracji uzytkownika
  btnCancel()
  {
    this.dialogRef.close()
  }
}
