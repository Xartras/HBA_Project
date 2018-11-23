import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private router: Router) { }

  // Zmienne odpowiadajaca za monitorowanie statusu uzytkownika: zalogowany (true) lub niezalogowany (false)
  // oraz za przechowywanie danych o uzytkowniku
  // BehaviorSubject przechowuje ostatnio zapisana w pamieci Cache wartosc
  private userLogStatus = new BehaviorSubject<Boolean>(false);
  public loggedUser = new BehaviorSubject<User>(null);
  private allUsers : Array<User> = [new User("admin", "admin", "admin@mail.com", "2016-10-01", "2016-10-30")]

  // Metoda publiczna pozwalajaca na pobranie informacji odnosnie statusu uzytkownika
  get isUserLoggedIn()
  {
    return this.userLogStatus.asObservable();
  }

  // Metoda odpowiedzialna za walidacje danych logowania
  // Zwracane wartości: 
  //   - logujący się użytkownik oraz flaga błędu: true => niepoprawny / false => poprawny

  validateLogin(user: User) : any[]
  {
    // pierwszy element to użytkownik, a drugi odpowiada za informacje, czy dane logowania sa poprawne
    let loginValidation = [];
    let dbUser : User;
    
    // Przy rejestracji sprawdzana jest dlugość loginu i hasła, jeśli podano "zbyt krótkie" dane
    // wtedy nie ma potrzeby sprawdzania danych logowania

    dbUser = this.getUser(user.login, "log"); // próba pobrania danych użytkownika

    // Jeśli mamy null to znaczy, że użytkownik nie istnieje (zły login) => dalej nie sprawdzamy
    if(dbUser == null) 
    {
      loginValidation[0] = null; 
      loginValidation[1] = true; 
    } 
    else
    {
      // Sprawdzamy czy hasło się zgadza, jeśli nie to kończymy działanie
      if(dbUser.password != user.password)
      {
        loginValidation[0] = null; 
        loginValidation[1] = true;
      }
      else
      {
        // Dane poprawne, zwracamy użytkownika oraz ustawiamy flagę błędu na fałsz (użytkownik poprawny)
        loginValidation[0] = dbUser;
        loginValidation[1] = false;
      }
    }        

    return loginValidation;
  }

  // Metoda przenosi użytkownika do głównej aplikacji po popawnym zalogowaniu
  logIn(user: User)
  {
    this.loggedUser.next(user);
    this.userLogStatus.next(true);
    this.router.navigate(['/']);
  }

  // Metoda odpowiedzialna za walidacje danych rejestracji
  validateRegistration(user: User) : boolean
  {
    let checkUser: User = this.getUser(user.login, "reg");
    let isUserValid: boolean = checkUser == null ? true : false;

    if (isUserValid == true) { this.allUsers.push(user)}
    return isUserValid;
  }

  // Metoda odpowiedzialna za akcje przy wylogowywaniu sie uzytkownika
  signOut()
  {
    this.userLogStatus.next(false);
    this.router.navigate(['/login']);
  }

  // Metoda sluzaca do pobrania danych uzytkownika przy logowaniu
  getUser(login: string, option: string) : User
  {
    let selectedUser: User = null;

    this.allUsers.forEach(user => {
      if(user.login == login)
      {
        if(option=="log") { selectedUser = user; return; };
        if(option=="reg") { selectedUser = new User(user.login, "", "", "", ""); return; }
      }      
    });

    return selectedUser;
  }
}
