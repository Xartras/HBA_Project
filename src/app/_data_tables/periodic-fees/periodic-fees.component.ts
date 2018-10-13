import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { PeriodicFeesDataSource } from './periodic-fees-datasource';

@Component({
  selector: 'periodic-fees',
  templateUrl: './periodic-fees.component.html',
  styleUrls: ['./periodic-fees.component.css']
})
export class PeriodicFeesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: PeriodicFeesDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['category', 'name', 'paidFrom', 'paidUntil', 'paymentPeriod', 'ifAlreadyPaid'];

  ngOnInit() {
    this.dataSource = new PeriodicFeesDataSource(this.paginator, this.sort);
  }

  btnChangeFeeStatus(feeStatus)
  {
    console.log(feeStatus)
  }

  // Metody odpowiedzialne za dodawanie / usuwanie / edytowanie wpisow oplat okresowych
  btnAddPeriodicFee()
  {
    console.log('Btn Add works!')
  }
  
  btnRemovePeriodicFee()
  {
    console.log('Btn Remove works!')
  }
  
  btnEditPeriodicFee()
  {
    console.log('Btn Edit works!')
  }
}
