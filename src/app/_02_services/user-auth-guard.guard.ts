import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserAuthService } from './user-auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {

  constructor(private router: Router, private userAuth: UserAuthService) {}

  // Metoda sprawdza czy uzytkownik jest zalogowany
  // Jesli nie, to zostanie przekierowany do strony logowania
  canActivate()
  {
    if(!this.userAuth.isUserLoggedIn() || this.userAuth.usersLogin == null) 
    {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}
