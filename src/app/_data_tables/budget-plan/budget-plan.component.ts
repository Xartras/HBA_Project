import { Component, OnInit } from '@angular/core';
import { BudgetPlanItem } from 'src/app/_models/budget-plan-item';
import { BudgetPlanDataSource } from './budget-plan-datasource';
import { AddBudgetPlanDialogComponent } from '../../_modal_dialogs/add-budget-plan-dialog/add-budget-plan-dialog.component';
import { MatDialog } from '@angular/material';
import { BehaviorSubject, Observable } from 'rxjs'
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { UserAuthService } from '../../_services/user-auth-service.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'budget-plan',
  templateUrl: './budget-plan.component.html',
  styleUrls: ['./budget-plan.component.css']
})
export class BudgetPlanComponent implements OnInit {

  constructor(private formBuilder: FormBuilder
             ,public dialog: MatDialog
             ,private userAuth: UserAuthService) {}

  dataSource: BudgetPlanDataSource = new BudgetPlanDataSource(null);
  dataTable: BudgetPlanItem[] = this.dataSource.getFilteredData(
                                     <Date><any>formatDate("2018-10-27", "yyyy-MM-dd", "en-US")
                                    ,<Date><any>formatDate("2018-11-26", "yyyy-MM-dd", "en-US"));
  dataBS = new BehaviorSubject(this.dataTable);

  dataPivotTable = this.dataSource.calculateReveCost(this.dataTable);
  dataPivotSumm  = [{type: "Zysk", plannedTotal: this.dataPivotTable.Zysk, aktualTotal: 0}
                  , {type: "Koszt", plannedTotal: this.dataPivotTable.Koszt, aktualTotal: 0}]
  

  
  displayedColumns = ['type', 'category', 'name', 'periodBegin', 'periodEnd', 'plannedAmount', 'currentAmount', 'difference', 'comment', 'actions'];
    
  addPeriodForm : FormGroup;
  periods = ["01_2018", "02_2018", "03_2018"]
  periodBegin = "27-11-2018"
  periodEnd = "26-12-2018"

  get formInput() { return this.addPeriodForm.controls }

  ngOnInit() { 
    this.addPeriodForm = this.formBuilder.group(
      {
        cPeriods: new FormControl('02_2018'),
      }
    )
    this.dataSource.sortData(this.dataTable);
    this.dataSource = new BudgetPlanDataSource(this.dataBS.asObservable());
  }


  // Dodawanie wpisu
  btnAddBudgetPlanItem()
  {
    let dialogRef = this.dialog.open(AddBudgetPlanDialogComponent, 
      {
        data: {type: "", category: "", name: "",periodBegin: "", periodEnd: "", amount: 0, comment: "", title: "Dodaj wpis"}
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
    this.dataSource.removeItem(this.dataTable, item)
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
                periodBegin: item.periodBegin,
                periodEnd: item.periodEnd,
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

  }
}
