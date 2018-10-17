import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { HomeBillingsDataSource } from './home-billings-datasource';

@Component({
  selector: 'home-billings-data',
  templateUrl: './home-billings.component.html',
  styleUrls: ['./home-billings.component.css']
})
export class HomeBillingsDataComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: HomeBillingsDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'period', 'actualState', 'difference', 'actions'];

  ngOnInit() {
    this.dataSource = new HomeBillingsDataSource(this.paginator, this.sort);
  }

  btnEditRow(element)
  {
    console.log(element)
  }

  btnRemoveRow(element)
  {
    console.log(element)
  }
}
