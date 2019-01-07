import { Component, OnInit } from '@angular/core';

import { BudgetPlanItem } from 'src/app/_01_models/budget-plan-item';
import { BudgetPlanDataSource } from './budget-plan-datasource';
import { UserAuthService } from '../../_02_services/user-auth-service.service';

import { Period } from '../../_01_models/period';
import { PeriodsService } from '../../_02_services/periods-srvc.service';

import { AddBudgetPlanDialogComponent } from '../../_04_modal_dialogs/add-budget-plan-dialog/add-budget-plan-dialog.component';
import { MatDialog } from '@angular/material';
import { BehaviorSubject } from 'rxjs'
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { BudgetPlanService } from '../../_02_services/budget-plan-srvc.service'

@Component({
  selector: 'budget-plan',
  templateUrl: './budget-plan.component.html',
  styleUrls: ['../../app.component.css']
})
export class BudgetPlanComponent implements OnInit {

  constructor(private formBuilder: FormBuilder
             ,public dialog: MatDialog
             ,private userAuth: UserAuthService
             ,private serviceBP: BudgetPlanService
             ,private servicePrds: PeriodsService) {}

  dataSource: BudgetPlanDataSource = new BudgetPlanDataSource(null, this.serviceBP);
  dataTable: BudgetPlanItem[] = [];
  dataBS = new BehaviorSubject(this.dataTable);

  dataPivotTable = this.dataSource.calculateReveCost(this.dataTable);
  dataPivotSumm  = [{type: "Zysk", plannedTotal: this.dataPivotTable.Zysk, aktualTotal: 0}
                  , {type: "Koszt", plannedTotal: this.dataPivotTable.Koszt, aktualTotal: 0}]
  
  displayedColumns = ['type', 'category', 'name', 'plannedAmount', 'currentAmount', 'difference', 'comment', 'actions'];
    
  filterPlanForm : FormGroup;
  periods = []

  initialPeriod = new Period('', null, null, '');
  
  get formInput() { return this.filterPlanForm.controls }

  ngOnInit() 
  {
    this.filterPlanForm = this.formBuilder.group(
      {
        cPeriods: new FormControl(this.initialPeriod.id),
      }
    )

    this.servicePrds.getPeriods().subscribe((data: any) =>
    {
      data.forEach(item =>
        {
          if(item.user == this.userAuth.usersLogin)
          this.periods.push(new Period(item._id.split("_")[0] + "_" + item._id.split("_")[1], item.periodFrom, item.periodUntil, item.user))
          else
          data.splice(data.indexOf(item), 1);
        })
      this.initialPeriod = this.servicePrds.getCurrentPeriod(this.periods);
      this.filterPlanForm.controls.cPeriods.setValue(this.initialPeriod.id);
    });

    this.dataSource = new BudgetPlanDataSource(this.dataBS.asObservable(), this.serviceBP); 
    this.serviceBP.getBudgetPlan().subscribe((data: any[]) =>
    {
      data.forEach(item => 
        {
          if(item.user == this.userAuth.usersLogin)
          this.dataTable.push(new BudgetPlanItem(item._id, item.type, item.category, item.name, item.period, item.amount, item.comment, item.user))
          else
          data.splice(data.indexOf(item), 1);
        })
      
      this.dataSource.sortData(this.dataTable);
      this.dataSource = new BudgetPlanDataSource(this.dataBS.asObservable(), this.serviceBP);
    })
  }

  // Dodawanie wpisu
  btnAddBudgetPlanItem()
  {
    let dialogRef = this.dialog.open(AddBudgetPlanDialogComponent, 
      {
        data: {
                type: "", category: "", name: "", period: "", 
                amount: 0, comment: "", title: "Dodaj wpis", periods: this.periods
              }
      })
  
    dialogRef.afterClosed().subscribe(
    result => {
                if(result != null)
                {
                  result.user = this.userAuth.usersLogin;
                  this.dataSource.addItem(this.dataTable, result);
                  this.dataSource.sortData(this.dataTable);
                  this.dataBS.next(this.dataTable);
                }
              })        
  }
  
  // Usuwanie wpisow
  btnRemoveRow(item: BudgetPlanItem)
  {

    this.dataSource.removeItem(this.dataTable, item);
    this.dataBS.next(this.dataTable);
  }

  // Edycja wpisow
  btnEditRow(item: BudgetPlanItem)
  {

    let dialogRef = this.dialog.open(AddBudgetPlanDialogComponent, 
      {
        data: {
                type: item.type, 
                category: item.category, 
                name: item.name,
                period: item.period,
                amount: item.amount,
                comment: item.comment,
                title: "Edytuj wpis",
                periods: this.periods
              }
      })
    dialogRef.afterClosed().subscribe(
      result => {
                  if(result != null)
                 {
                    result.id = item.id;
                    result.user = this.userAuth.usersLogin;
                    this.dataSource.editItem(this.dataTable, item, result);

                    if(item.category.toLocaleLowerCase() != result.category.toLocaleLowerCase() || item.amount != result.amount)
                    this.dataSource.sortData(this.dataTable);

                    this.dataBS.next(this.dataTable);
                  }
                })   
  }

  onPeriodChange(event)
  {
    this.periods.forEach(prd =>
      {
        if(prd.id == event.target.value)
        {
          this.initialPeriod = prd
        }
      })
  }
}
