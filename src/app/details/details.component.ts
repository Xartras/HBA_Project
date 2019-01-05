import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../_02_services/user-auth-service.service'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(private serviceUsr: UserAuthService) { }


  ngOnInit() { }
}
