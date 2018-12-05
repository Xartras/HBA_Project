import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../_02_services/user-auth-service.service';

import { RegisterComponent } from '../_04_modal_dialogs/register/register.component';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog, private userAuth: UserAuthService) { }

  isUsrLoggedIn$: Observable<Boolean>;

  ngOnInit() {
    this.isUsrLoggedIn$ = this.userAuth.isUserLoggedIn;
  }

  btnRegIn()
  {
    let dialogRef = this.dialog.open(RegisterComponent, {})
  
    dialogRef.afterClosed().subscribe(
    result => {
                console.log("Dialog closed");
                console.log(result);
              }
          )      
  }

  btnSgnOut()
  {
    this.userAuth.signOut();
  }
}
