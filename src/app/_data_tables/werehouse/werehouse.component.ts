import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { WerehouseDataSource } from './werehouse-datasource';

@Component({
  selector: 'app-werehouse-data',
  templateUrl: './werehouse.component.html',
  styleUrls: ['./werehouse.component.css']
})
export class WerehouseDataComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: WerehouseDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['category', 'name', 'state', 'actions'];

  ngOnInit() {
    this.dataSource = new WerehouseDataSource(this.paginator, this.sort);
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
