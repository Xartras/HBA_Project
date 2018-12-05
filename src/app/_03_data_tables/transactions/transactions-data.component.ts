import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { TransactionsDataDataSource } from './transactions-data-datasource';

@Component({
  selector: 'app-transactions-data',
  templateUrl: './transactions-data.component.html',
  styleUrls: ['./transactions-data.component.css']
})
export class TransactionsDataComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: TransactionsDataDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['type', 'category', 'name', 'amount', 'accounted', 'entered', 'period', 'description', 'actions'];

  ngOnInit() {
    this.dataSource = new TransactionsDataDataSource(this.paginator, this.sort);
  }

  btnEditRow(item)
  {
    console.log(item)
  }

  btnRemoveRow(item)
  {
    this.dataSource.removeItem(item);
    this.dataSource.connect();
  }
}
