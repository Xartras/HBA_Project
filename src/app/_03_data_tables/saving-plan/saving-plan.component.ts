import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { SavingPlanDataSource } from './saving-plan-datasource';
import { SavingPlanItem } from '../../_01_models/saving-plan-item';
import { SavingPlanService } from '../../_02_services/saving-plan-srvc.service';
import { UserAuthService } from '../../_02_services/user-auth-service.service';
import { BehaviorSubject } from 'rxjs'

@Component({
  selector: 'saving-plan',
  templateUrl: './saving-plan.component.html',
  styleUrls: ['./saving-plan.component.css']
})
export class SavingPlanComponent implements OnInit {

  constructor(private formBuilder: FormBuilder
             ,private serviceUsr: UserAuthService
             ,private serviceSP: SavingPlanService) {}


  dataSource: SavingPlanDataSource = new SavingPlanDataSource(null, this.serviceSP);
  dataTable: SavingPlanItem[] = [];
  dataBS = new BehaviorSubject(this.dataTable);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['target', 'plannedAmount', 'currentAmount', 'getUntil', 'comment', 'actions'];

  ngOnInit() {
    this.dataSource = new SavingPlanDataSource(this.dataBS.asObservable(), this.serviceSP);
  }
}
