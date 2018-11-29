import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../_services/user-auth-service.service'
import { User } from '../_models/user';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(private formBuilder: FormBuilder
             ,private userAuth: UserAuthService) { }

  addPeriodForm: FormGroup
  private user: User = this.userAuth.loggedUser.value;
  get formInput() { return this.addPeriodForm.controls }

  ngOnInit() 
  { 
    this.addPeriodForm = this.formBuilder.group(
    {
       cPeriodBegin: new FormControl('')
      ,cPeriodEnd:   new FormControl('')
    })
  }
 

  
  // Metody odpowiedzialne z zmiane adresu email oraz hasla uzytkownika
  btnAddPeriod()
  {
    console.log(this.addPeriodForm.controls.cPeriodBegin.value)
    console.log(this.addPeriodForm.controls.cPeriodEnd.value)
  }


}
