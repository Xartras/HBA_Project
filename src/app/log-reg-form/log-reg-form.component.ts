import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-log-reg-form',
  templateUrl: './log-reg-form.component.html',
  styleUrls: ['./log-reg-form.component.css']
})
export class LogRegFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  btnZarejestruj(formRejestracji: any)
  {
    console.log(formRejestracji);
  }

  btnZaloguj(formLogowania: any)
  {
    console.log(formLogowania);
  }
}
