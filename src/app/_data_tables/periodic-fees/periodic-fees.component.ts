import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PeriodicFeesDataSource } from './periodic-fees-datasource';
import { AddPeriodicFeeDialogComponent } from 'src/app/_modal_dialogs/add-periodic-fee-dialog/add-periodic-fee-dialog.component';

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

  constructor(public dialog: MatDialog) {}

  category: string; name: string; paidFrom: string; paidUntil: string; paymentPeriod: string; ifAlreadyPaid: boolean

  ngOnInit() {
    this.dataSource = new PeriodicFeesDataSource(this.paginator, this.sort);
  }

  btnChangeFeeStatus(feeStatus)
  {
    console.log(feeStatus)
  }

  // Metody odpowiedzialne za dodawanie / usuwanie / edytowanie wpisow oplat okresowych
  btnAddPeriodicFee() : void
  {
    let dialogRef = this.dialog.open(AddPeriodicFeeDialogComponent, 
      {})

      dialogRef.afterClosed().subscribe(
        result => {
                    console.log("Dialog closed");
                    console.log(result);
                  }
        )
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