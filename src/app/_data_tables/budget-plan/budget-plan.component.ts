import { Component, OnInit } from '@angular/core';
import { BudgetPlanItem } from 'src/app/_models/budget-plan-item';
import { BudgetPlanDataSource } from './budget-plan-datasource';
import { AddBudgetPlanDialogComponent } from '../../_modal_dialogs/add-budget-plan-dialog/add-budget-plan-dialog.component';
import { MatDialog } from '@angular/material';
import { BehaviorSubject } from 'rxjs'
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { UserAuthService } from '../../_services/user-auth-service.service'

@Component({
  selector: 'budget-plan',
  templateUrl: './budget-plan.component.html',
  styleUrls: ['./budget-plan.component.css']
})
export class BudgetPlanComponent implements OnInit {
  dataSource: BudgetPlanDataSource = new BudgetPlanDataSource(null);
  dataTable: BudgetPlanItem[] = this.dataSource.getData();
  dataBS = new BehaviorSubject(this.dataTable)

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['type', 'category', 'name', 'periodBegin', 'periodEnd', 'plannedAmount', 'currentAmount', 'difference', 'comment', 'actions'];

  constructor(private formBuilder: FormBuilder
             ,public dialog: MatDialog
             ,private userAuth: UserAuthService) {}

  addPlanItemForm : FormGroup;
  get formInput() { return this.addPlanItemForm.controls }

  ngOnInit() {
    this.addPlanItemForm = this.formBuilder.group(
      {
        cPrdStart: new FormControl(this.userAuth.loggedUser.value.periodStart),
        cPrdEnd:   new FormControl(this.userAuth.loggedUser.value.periodStart)
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
    console.log(this.dataSource.calculateReveCost(this.dataTable))
    console.log(this.addPlanItemForm.controls.cPrdStart.value)
    console.log(this.addPlanItemForm.controls.cPrdEnd.value)
  }
}
