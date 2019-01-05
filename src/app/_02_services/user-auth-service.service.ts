import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, RegisteredToken, TokenResponse } from '../_01_models/user';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private router: Router, private http: HttpClient) { }

  public loggedUser = new BehaviorSubject<User>(null);
  public usersLogin: string;
  private usersAddress = 'http://localhost:4000';
  private token: string;


 // Metoda pobierajaca token uzytkownika z LocalStorage
 private getToken() : string
 {
    if(!this.token && this.usersLogin!= null)
    {
      this.token = localStorage.getItem("user-token");
    }
    return this.token;
 }

 // Metoda zapisujaca token uzytkownika do LocalStorage
 private saveToken(token: string)
 {
  localStorage.setItem('user-token', token);
  this.token = token;
 }

 // Metoda pobierajaca dane uzytkownika
 public getUser() : User
 {
   const token = this.getToken();

   let response;

   if(token)
   {
     response = this.token.split(".")[1];
     response = window.atob(response);
     return JSON.parse(response);
   }
   else
   {
     return null;
   }
 }

  // Metoda sprawdzajaca czy uzytkownik jest zalogowany
  public isUserLoggedIn() : boolean
  {
    const usr = this.getUser()

    if(usr != null)
    {
      return usr.expTime > Date.now() / 1000;
    }
    else
    {   
      window.localStorage.removeItem("user-token");
      return false;
    }
  }

  // Metoda wysyłająca polecenia do serwera wywoływana przez kolejne metody
  private sendRequestToDB( method: 'post'|'get', type: 'userLoggingIn'|'userRegistration'|'getUser', user?: RegisteredToken ) : Observable<any>
  {
    let query

    if(method === 'post') 
      { query = this.http.post(`${this.usersAddress}/Users/${type}`, user) }
    else
      { query = this.http.get(`${this.usersAddress}/Users/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` } }) }

    const pullRequest = query.pipe(
      map((data: TokenResponse) =>
      {
        if(data.token) { this.saveToken(data.token) }
        return data
      })
    );

    return pullRequest
  }

  // Metoda przenosi użytkownika do głównej aplikacji po popawnym zalogowaniu
  logIn(user: RegisteredToken) : Observable<any>
  {
    return this.sendRequestToDB('post', 'userLoggingIn', user);
  }

  // Metoda odpowiedzialna za wprowadzenie uzytkownika do bazy.
  regOn(user: RegisteredToken) : Observable<any>
  {
    return this.sendRequestToDB('post', 'userRegistration', user);
  }

  // Metoda pobierajaca uzytkownika przy logowaniu
  public uploadUser() : Observable<any>
  {
    return this.sendRequestToDB('get', 'getUser');
  }

  // Metoda odpowiedzialna za akcje przy wylogowywaniu sie uzytkownika
  signOut()
  {
    this.token = '';
    window.localStorage.removeItem("user-token");
    this.router.navigate(['/login']);
  }
}
