import { Component, OnInit } from '@angular/core';

import { BudgetPlanItem } from 'src/app/_01_models/budget-plan-item';
import { BudgetPlanDataSource } from './budget-plan-datasource';
import { PeriodsComponent } from '../periods/periods.component';
import { UserAuthService } from '../../_02_services/user-auth-service.service';

import { AddBudgetPlanDialogComponent } from '../../_04_modal_dialogs/add-budget-plan-dialog/add-budget-plan-dialog.component';
import { MatDialog } from '@angular/material';
import { BehaviorSubject } from 'rxjs'
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { BudgetPlanService } from '../../_02_services/budget-plan-srvc.service'

@Component({
  selector: 'budget-plan',
  templateUrl: './budget-plan.component.html',
  styleUrls: ['./budget-plan.component.css']
})
export class BudgetPlanComponent implements OnInit {

  constructor(private formBuilder: FormBuilder
             ,public dialog: MatDialog
             ,private userAuth: UserAuthService
             ,private serviceBP: BudgetPlanService) {}

  periodRange = [];
  dataSource: BudgetPlanDataSource = new BudgetPlanDataSource(null, this.serviceBP);
  dataTable: BudgetPlanItem[] = this.dataSource.getFilteredData("01_2018");
  dataBS = new BehaviorSubject(this.dataTable);

  dataPivotTable = this.dataSource.calculateReveCost(this.dataTable);
  dataPivotSumm  = [{type: "Zysk", plannedTotal: this.dataPivotTable.Zysk, aktualTotal: 0}
                  , {type: "Koszt", plannedTotal: this.dataPivotTable.Koszt, aktualTotal: 0}]
  
  displayedColumns = ['type', 'category', 'name', 'plannedAmount', 'currentAmount', 'difference', 'comment', 'actions'];
    
  filterPlanForm : FormGroup;
  periods = []
  
  get formInput() { return this.filterPlanForm.controls }

  ngOnInit() { 
    this.filterPlanForm = this.formBuilder.group(
      {
        cPeriods: new FormControl('01_2018'),
      }
    )
    this.dataSource.sortData(this.dataTable);
    this.dataSource = new BudgetPlanDataSource(this.dataBS.asObservable(), this.serviceBP);

    this.periodRange = this.getPeriodRange(this.periods, this.filterPlanForm.controls.cPeriods.value);
  }


  // Dodawanie wpisu
  btnAddBudgetPlanItem()
  {
    let dialogRef = this.dialog.open(AddBudgetPlanDialogComponent, 
      {
        data: {type: "", category: "", name: "", period: "", amount: 0, comment: "", title: "Dodaj wpis"}
      })
  
    dialogRef.afterClosed().subscribe(
    result => {
                if(result != null)
                {
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
                title: "Edytuj wpis"
              }
      })
    dialogRef.afterClosed().subscribe(
      result => {
                  if(result != null)
                 {
                    this.dataSource.editItem(this.dataTable, item, result);

                    if(item.category.toLocaleLowerCase() != result.category.toLocaleLowerCase() || item.amount != result.amount)
                    this.dataSource.sortData(this.dataTable);

                    this.dataBS.next(this.dataTable);
                  }
                })   
  }

  getFilteredData()
  {
    this.periodRange = this.getPeriodRange(this.periods, this.filterPlanForm.controls.cPeriods.value);
    this.dataTable = this.dataSource.getFilteredData(this.filterPlanForm.controls.cPeriods.value)
    this.dataBS.next(this.dataTable);
  }

  private getPeriodRange(allPeriods, selectedPeriod: string)
  {
    let currentPeriodRange = []

    allPeriods.forEach(element => {
      if(element.period == selectedPeriod)
      { 
        currentPeriodRange[0] = element.from
        currentPeriodRange[1] = element.to
      }
    });

    return currentPeriodRange;
  }
}
