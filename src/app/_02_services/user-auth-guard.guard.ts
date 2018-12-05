import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { UserAuthService } from './user-auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {

  constructor(private router: Router, private userAuth: UserAuthService) {}

  // Metoda sprawdza czy uzytkownik jest zalogowany
  // W tym celu pobieramy wartosc zmiennej "isUserLoggedIn" z serwisu
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>  
    {
      return this.userAuth.isUserLoggedIn      // Pobieramy zmienna z serwisu
      .pipe(
        take(1),                               // Pobieramy wartosc z obiektu Observable
        map((isUserLoggedIn: boolean) =>       // Sprawdzamy wartosc okreslona przez BehaviourSubject
        {
          if(!isUserLoggedIn)                  // Jesli uzytkownik nie jest zalogowany
          {                                    // Zostaje przekierowany do strony logowania
            this.router.navigate(['/login']);
            return false;
          }       
          return true;
        })
      );
    }
}
