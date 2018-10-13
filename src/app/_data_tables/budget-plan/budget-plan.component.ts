import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { BudgetPlanDataSource } from './budget-plan-datasource';

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
  displayedColumns = ['type', 'category', 'name', 'amount', 'comment'];

  ngOnInit() {
    this.dataSource = new BudgetPlanDataSource(this.paginator, this.sort);
  }

    // Metody odpowiedzialne za dodawanie / usuwanie / edytowanie wpisow planowanego budzetu
    btnAddBudgetPlanItem()
    {
      console.log('Add budget plan item!')
    }
  
    btnRemoveBudgetPlanItem()
    {
      console.log('Remove budget plan item!')
    }
  
    btnEditBudgetPlanItem()
    {
      console.log('Edit budget plan item!')
    }
}
