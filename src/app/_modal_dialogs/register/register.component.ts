import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { UserAuthService } from '../../_services/user-auth-service.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RegisterComponent>
             ,private userAuth: UserAuthService
             ) { }

  user : any = { }

  ngOnInit() { }

  // Walidacja danych rejestracji
  btnAuthRegistration()
  {
    let isUserCorrect = this.userAuth.validateRegistration(this.user);

    if (isUserCorrect == true)
    {
      this.dialogRef.close(this.user);
    }
  }

  // Anulowanie rejestracji uzytkownika
  btnCancel()
  {
    this.dialogRef.close()
  }
}
