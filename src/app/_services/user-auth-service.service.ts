import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private router: Router) { }

  // Zmienna odpowiadajaca za monitorowanie statusu uzytkownika: zalogowany (true) lub niezalogowany (false)
  // BehaviorSubject przechowuje ostatnio zapisana w pamieci Cache wartosc
  private userLogStatus = new BehaviorSubject<Boolean>(false);

  // Metoda publiczna pozwalajaca na pobranie informacji odnosnie statusu uzytkownika
  get isUserLoggedIn()
  {
    return this.userLogStatus.asObservable();
  }

  // Metoda odpowiedzialna za walidacje danych logowania
  validateLogin(user: User)
  {
    let dbUser = this.getUser(user.login);

    if(user.login == dbUser.login && user.password == dbUser.password)
    {
      this.userLogStatus.next(true);
      this.router.navigate(['/']);
    }
  }

  // Metoda odpowiedzialna za walidacje danych rejestracji
  validateRegister(user: User)
  {
    if(user.login != "" && user.password != "" && user.email != "" && user.periodStart != "" && user.periodEnd != "")
    {
      console.log("OK");
    }
  }

  // Metoda odpowiedzialna za akcje przy wylogowywaniu sie uzytkownika
  signOut()
  {
    this.userLogStatus.next(false);
    this.router.navigate(['/login']);
  }

  // Metoda sluzaca do pobrania danych uzytkownika przy logowaniu
  getUser(login: string) : User
  {
    let selectedUser: User = null;

    if(login == "admin")
    {
      selectedUser = new User("admin", "admin", "", "", "");
    }

    return selectedUser;
  }
}
