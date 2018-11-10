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
        data: {type: "", category: "", name: "", amount: 0, comment: "", title: "Dodaj wpis"}
      })
  
    dialogRef.afterClosed().subscribe(
    result => {
                this.dataSource.addItem(result);
                this.dataSource.connect();
              }
          )        
    }
  
  // Usuwanie wpisow
  btnRemoveRow(item)
  {
    this.dataSource.removeItem(item);
    this.dataSource.connect();
  }

  // Edycja wpisow
  btnEditRow(item)
  {
    let dialogRef = this.dialog.open(AddBudgetPlanDialogComponent, 
      {
        data: {
                type: item.type, 
                category: item.category, 
                name: item.name,
                amount: item.amount,
                comment: item.comment,
                title: "Edytuj wpis"
              }
      })
    dialogRef.afterClosed().subscribe(
      result => {
                  this.dataSource.editItem(item, result);
                  this.dataSource.connect();
                }
            )   
  }
}
