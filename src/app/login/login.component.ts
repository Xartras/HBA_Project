import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { UserAuthService } from '../_services/user-auth-service.service';
import { RegisterComponent } from '../_modal_dialogs/register/register.component';
import { MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private userAuth: UserAuthService, public dialog: MatDialog) { }

  user : any = {};
  loginValidation;
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
  
      this.user = new User(name, pass, "");
      this.loginValidation = this.userAuth.validateLogin(this.user);

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
    
    dialogRef.afterClosed().subscribe(
      result => {
                  console.log(result);
                }
            ) 
  }
}
