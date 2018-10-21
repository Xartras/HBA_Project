import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { User } from '../_models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private route: Router) 
  { }

  user : any = {};
  userForm: User;
  userBase: User;
  checkValidation: boolean;

  ngOnInit() { }

  // metoda odpowiada za obsługę przycisku logowania
  btnLogIn()
  {
    // Etap 1
    // stworzenie uzytkownika na podstawie danych formularza oraz
    // drugiej zawierajace dane z bazy (o ile dany uzytkownik istnieje)
    this.userForm = new User(this.user.login, this.user.password, "", "","");
    this.userBase = this.userForm.getUser();

    // Etap 2 - walidacja hasła (akcja się nie wykona jeśli podano zły lozgin lub użytkwonik nie istnieje)
    if(this.userBase != null)  
    {
      this.checkValidation = this.userForm.validateLogForm(this.userBase);
    }
    else console.log("User does not exist");

    console.log(this.userBase);
    console.log(this.checkValidation)
  }
}
