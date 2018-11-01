import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { BudgetPlanDataSource } from './budget-plan-datasource';
import { AddBudgetPlanDialogComponent } from '../../_modal_dialogs/add-budget-plan-dialog/add-budget-plan-dialog.component';

@Component({
  selector: 'budget-plan',
  templateUrl: './budget-plan.component.html',
  styleUrls: ['./budget-plan.component.css']
})
export class BudgetPlanComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: BudgetPlanDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['type', 'category', 'name', 'amount', 'comment', 'actions'];

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.dataSource = new BudgetPlanDataSource(this.paginator, this.sort);
  }

  // Metody odpowiedzialne za dodawanie wpisow planowanego budzetu
  btnAddBudgetPlanItem()
  {
    let dialogRef = this.dialog.open(AddBudgetPlanDialogComponent, 
      {
        data: {type: "", category: "", name: "", amount: 0, comment: ""}
      })
  
    dialogRef.afterClosed().subscribe(
    result => {
                this.dataSource.addItem(result);
                this.dataSource.connect();
              }
          )        
    }
  
  // Usuwanie wpisow
  btnRemoveRow(element)
  {
    this.dataSource.removeItem(element);
    this.dataSource.connect();
  }

  // Edycja wpisow
  // TO DO: autofill form with item values
  btnEditRow(element)
  {
    let dialogRef = this.dialog.open(AddBudgetPlanDialogComponent, 
      {
        data: {
                type: element.type, 
                category: element.category, 
                name: element.name,
                amount: element.amount,
                comment: element.comment
              }
      })
    dialogRef.afterClosed().subscribe(
      result => {
                  this.dataSource.editItem(element, result);
                  this.dataSource.connect();
                }
            )   
  }
}
