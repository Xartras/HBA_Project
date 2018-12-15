import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../_01_models/user';
import { HttpClient, HttpParams } from '@angular/common/http';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private router: Router, private http: HttpClient) { }

  // Zmienne odpowiadajaca za monitorowanie statusu uzytkownika: zalogowany (true) lub niezalogowany (false)
  // oraz za przechowywanie danych o uzytkowniku
  // BehaviorSubject przechowuje ostatnio zapisana w pamieci Cache wartosc
  private userLogStatus = new BehaviorSubject<Boolean>(false);
  public loggedUser = new BehaviorSubject<User>(null);
  private today = new Date()
  private allUsers : User[]
  private usersAddress = 'http://localhost:4000/RegisteredUsers';

  // Metoda publiczna pozwalajaca na pobranie informacji odnosnie statusu uzytkownika
  get isUserLoggedIn()
  {
    return this.userLogStatus.asObservable();
  }

  // Metoda publiczna wykorzystywana w "OnInit" przy starcie aplikacji w celu pobrania danych uzytkownika
  getUsers()
  {
    this.getAllUsers().subscribe((data : User[]) => {this.allUsers = data});
  }
  
  // Metoda prywatna pobierajaca dane o wszystkich uzytkownikach w bazie
  private getAllUsers()
  {
    return this.http.get(`${this.usersAddress}`);
  }

  // Metoda odpowiedzialna za walidacje danych logowania
  // Zwracane wartości: 
  //   - logujący się użytkownik oraz flaga błędu: true => niepoprawny / false => poprawny

  validateLogin(user: User): any[]
  {
    let authorizedUser = []

    // pierwszy element to użytkownik, a drugi odpowiada za informacje, czy dane logowania sa poprawne
    for(let i = 0; i < this.allUsers.length; i++)
    {
      if(this.allUsers[i].login.toLowerCase() == user.login.toLowerCase() && this.allUsers[i].password == user.password)
      { 
        authorizedUser[0] = this.allUsers[i];
        authorizedUser[1] = false;
        break;
      }
    }

    return authorizedUser;
  }

  // Metoda przenosi użytkownika do głównej aplikacji po popawnym zalogowaniu
  logIn(user: User)
  {
    this.loggedUser.next(user);
    this.userLogStatus.next(true);
    this.router.navigate(['/']);
  }

  // Metoda odpowiedzialna za walidacje danych rejestracji
  validateRegistration(user: any) : boolean
  {
    let isUserValid: boolean = false
    let newUser: User;

    for(let i = 0; i < this.allUsers.length; i++)
    {
      if(user[0].toLowerCase() == this.allUsers[i].login.toLowerCase())
      { isUserValid = false; break; }
      else
      { isUserValid = true }
    }

    if (isUserValid == true) 
    { 
      newUser = {id: null, login: user[0], password: user[1], email: user[2], registered: <Date><any>formatDate(this.today, "yyyy-MM-dd", "en-US")}
      this.allUsers.push(newUser)
    }
    return isUserValid;
  }

  // Metoda odpowiedzialna za wprowadzenie uzytkownika do bazy.
  regOn(user)
  {
    const newUser = 
    {
      login: user[0],
      password: user[1],
      email: user[2],
      registered: formatDate(this.today, "yyyy-MM-dd", "en-US")
    };

    this.http.post(`${this.usersAddress}/add`, newUser).subscribe(res => console.log("Done"))
  }

  // Metoda odpowiedzialna za akcje przy wylogowywaniu sie uzytkownika
  signOut()
  {
    this.userLogStatus.next(false);
    this.router.navigate(['/login']);
  }

}
