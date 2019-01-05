import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { BehaviorSubject } from 'rxjs'

import { SavingPlanDataSource } from './saving-plan-datasource';
import { SavingPlanItem } from '../../_01_models/saving-plan-item';
import { SavingPlanService } from '../../_02_services/saving-plan-srvc.service';
import { UserAuthService } from '../../_02_services/user-auth-service.service';

import { AddSavingPlanDialogComponent } from '../../_04_modal_dialogs/add-saving-plan-dialog/add-saving-plan-dialog.component'
import { MatDialog } from '@angular/material';

@Component({
  selector: 'saving-plan',
  templateUrl: './saving-plan.component.html',
  styleUrls: ['./saving-plan.component.css']
})
export class SavingPlanComponent implements OnInit {

  constructor(private formBuilder: FormBuilder
             ,private serviceUsr: UserAuthService
             ,private serviceSP: SavingPlanService
             ,public dialog: MatDialog) {}


  dataSource: SavingPlanDataSource = new SavingPlanDataSource(null, this.serviceSP);
  dataTable: SavingPlanItem[] = [];
  dataBS = new BehaviorSubject(this.dataTable);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['target', 'plannedAmount', 'currentAmount', 'getUntil', 'comment', 'actions'];

  ngOnInit() 
  {
    this.dataSource = new SavingPlanDataSource(this.dataBS.asObservable(), this.serviceSP);
    this.serviceSP.getSavingPlan().subscribe((data: any[]) =>
    {
      data.forEach(item => 
      { 
          if(item.user == this.serviceUsr.usersLogin)
          this.dataTable.push(new SavingPlanItem(item._id, item.target, item.plannedAmount, item.currentAmount, item.getUntil, item.comment, item.user))
          else
          data.splice(data.indexOf(item), 1);
      })

      this.dataSource = new SavingPlanDataSource(this.dataBS.asObservable(), this.serviceSP);
    })      
  }

  btnAddSavingPlanItem()
  {
    let dialogRef = this.dialog.open(AddSavingPlanDialogComponent, 
      {
        data: { target: "", plannedAmount: "", getUntil: "", comment: "", title: "Dodaj wpis" }
      })
  
    dialogRef.afterClosed().subscribe(
    result => {
                if(result != null)
                {
                  result.user = this.serviceUsr.usersLogin;
                  result.currentAmount = 0;
                  this.dataSource.addItem(this.dataTable, result);
                  this.dataBS.next(this.dataTable);
                }
              })
  }

  // Edycja wpisow
  btnEditRow(item: SavingPlanItem)
  {

    let dialogRef = this.dialog.open(AddSavingPlanDialogComponent, 
      {
        data: {
                target:        item.target,
                plannedAmount: item.plannedAmount,
                getUntil:      item.getUntil,
                comment:       item.comment,
                title: "Edytuj wpis"
              }
      })
    dialogRef.afterClosed().subscribe(
      result => {
                  if(result != null)
                 {
                    result.id = item.id;
                    result.user = this.serviceUsr.usersLogin;
                    result.currentAmount = 0;

                    this.dataSource.editItem(this.dataTable, item, result);
                    this.dataBS.next(this.dataTable);
                  }
                })   
  }

  // Usuwanie wpisow
  btnRemoveRow(item: SavingPlanItem)
  {
    this.dataSource.removeItem(this.dataTable, item)
    this.dataBS.next(this.dataTable);
  }
}
