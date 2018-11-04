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

  // Metoda publiczna pozwalajaca na pobranie informacji odnosnie statusu uzytkownika
  get isUserLoggedIn()
  {
    return this.userLogStatus.asObservable();
  }

  // Metoda odpowiedzialna za walidacje danych logowania
  // Po poprawnej walidacji ustawiana jest zmienna zawierajaca dane uzytkownika
  // Nastepnie nastepuje przekierowanie do glownej strony aplikacji
  validateLogin(user: User)
  {
    let dbUser = this.getUser(user.login);

    if(user.login == dbUser.login && user.password == dbUser.password)
    {
      this.loggedUser.next(dbUser);
      this.userLogStatus.next(true);
      this.router.navigate(['/']);
    }
  }

  // Metoda odpowiedzialna za walidacje danych rejestracji
  validateRegistration(user: User)
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
      selectedUser = new User("admin", "admin", "admin@mail.com", "2016-10-01", "2016-10-30");
    }

    return selectedUser;
  }
}
