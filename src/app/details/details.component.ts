import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

  user : any = {login: "Xarq", password: "Abc1", email: "mail@mail.com"
              , periodStart: "2018-01-27", periodEnd: "2018-02-26" }
  
  btnChangePss()
  {
    console.log(this.user.password)
    this.user.password = "XYZ2"
    console.log(this.user.password)
  }

  btnChangeEmail()
  {
    console.log(this.user.email)
    this.user.password = "nowyMail@mail.com"
    console.log(this.user.password)    
  }

}
