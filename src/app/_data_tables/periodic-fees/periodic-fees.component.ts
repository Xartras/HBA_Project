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
  displayedColumns = ['category', 'name', 'paidFrom', 'paidUntil', 'paymentPeriod', 'ifAlreadyPaid', 'actions'];

  constructor(public dialog: MatDialog) {}

  category: string; name: string; paidFrom: string; paidUntil: string; paymentPeriod: string; ifAlreadyPaid: boolean

  ngOnInit() {
    this.dataSource = new PeriodicFeesDataSource(this.paginator, this.sort);
  }

  btnChangeFeeStatus(feeStatus)
  {
    console.log(feeStatus)
  }

  // Metody odpowiedzialne za dodawanie wpisow planowanego budzetu
  btnAddPeriodicFee()
  {
    let dialogRef = this.dialog.open(AddPeriodicFeeDialogComponent, 
      {
        data: {category: "", name: "", paidFrom: "", paidUntil: "", paymentPeriod: "", ifAlreadyPaid: false, title: "Dodaj opłatę okresową"}
      })
  
    dialogRef.afterClosed().subscribe(
    result => {
      console.log(result);
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
    let dialogRef = this.dialog.open(AddPeriodicFeeDialogComponent, 
      {
        data: {
                category: item.category,
                name: item.name,
                paidFrom: item.paidFrom,
                paidUntil: item.paidUntil,
                paymentPeriod: item.paymentPeriod,
                ifAlreadyPaid: item.ifAlreadyPaid,
                title: "Edytuj opłatę okresową"
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