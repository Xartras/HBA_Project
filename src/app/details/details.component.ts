import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../_services/user-auth-service.service'
import { User } from '../_models/user';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(private userAuth: UserAuthService) { }

  
  ngOnInit() { }
 
  private user: User = this.userAuth.loggedUser.value;
  
  // Metody odpowiedzialne z zmiane adresu email oraz hasla uzytkownika
  btnChangePss()
  {
    console.log(this.user)
  }

  btnChangeEmail()
  {  
  }
}
