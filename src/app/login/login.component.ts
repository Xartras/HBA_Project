import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { UserAuthService } from '../_services/user-auth-service.service';
import { RegisterComponent } from '../_modal_dialogs/register/register.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userAuth: UserAuthService, public dialog: MatDialog) { }

  user : any = {};
  submitterUser: User;
  

  ngOnInit() { }

  // metoda odpowiada za obsługę przycisku logowania
  // metoda walidujaca dane odpowiada rowniez za przekierowanie do glownej aplikacji
  btnLogIn()
  {
    let name = this.user.login == null ? "" : this.user.login.trim();
    let pass = this.user.password == null ? "" : this.user.password.trim();

    this.user = new User(name, pass, "", "", "");
    console.log("1) Form"); console.log(this.user);
    this.userAuth.validateLogin(this.user);
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
