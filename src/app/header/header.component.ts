import { Component, OnInit } from '@angular/core';
import { RegisterComponent } from '../_modal_dialogs/register/register.component';
import { MatDialog } from '@angular/material';
import { UserAuthService } from '../_services/user-auth-service.service';
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
