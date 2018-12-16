import { Component, OnInit } from '@angular/core';

import { User } from '../_01_models/user';
import { UserAuthService } from '../_02_services/user-auth-service.service'

import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(private formBuilder: FormBuilder
             ,private userAuth: UserAuthService) { }

  addPeriodForm: FormGroup
  private user: User = {login: "a", password: "b", email: "e", expTime: 1, id: "1", registered: null}
  get formInput() { return this.addPeriodForm.controls }

  ngOnInit() 
  { 
    //this.userAuth.uploadUser().subscribe(user => {this.user = user}, (error) => {console.log(error)} )
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
