import { Component, OnInit, ViewChild } from '@angular/core';
import { PeriodsDataSource } from './periods-datasource';

@Component({
  selector: 'app-periods',
  templateUrl: './periods.component.html',
  styleUrls: ['./periods.component.css']
})
export class PeriodsComponent implements OnInit {

  dataSource: PeriodsDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new PeriodsDataSource(null, null);
  }
}
