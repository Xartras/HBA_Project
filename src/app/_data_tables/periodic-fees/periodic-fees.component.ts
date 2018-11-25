import { Component, OnInit } from '@angular/core';
import { PeriodicFeeItem } from 'src/app/_models/periodic-fee-item';
import { PeriodicFeesDataSource } from './periodic-fees-datasource';
import { AddPeriodicFeeDialogComponent } from 'src/app/_modal_dialogs/add-periodic-fee-dialog/add-periodic-fee-dialog.component';
import { MatDialog} from '@angular/material';
import { BehaviorSubject } from 'rxjs'


@Component({
  selector: 'periodic-fees',
  templateUrl: './periodic-fees.component.html',
  styleUrls: ['./periodic-fees.component.css']
})
export class PeriodicFeesComponent implements OnInit {
  dataSource: PeriodicFeesDataSource = new PeriodicFeesDataSource(null);
  dataTable: PeriodicFeeItem[] = this.dataSource.getData();
  dataBS = new BehaviorSubject(this.dataTable)

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['category', 'name', 'paidUntil', 'paymentPeriod', 'paymentDeadline', 'warnings', 'actions'];

  constructor(public dialog: MatDialog) {}


  ngOnInit() {
    this.dataSource.sortData(this.dataTable);
    this.dataSource = new PeriodicFeesDataSource(this.dataBS.asObservable());
  }

  // Metody odpowiedzialne za dodawanie wpisow planowanego budzetu
  btnAddPeriodicFee()
  {
    let dialogRef = this.dialog.open(AddPeriodicFeeDialogComponent, 
      {
        data: 
        { category: "",  name: "", paidFrom: "", 
          paidUntil: "", paymentPeriod: "", paymentDeadline: "", warnings: "", 
          title: "Dodaj opłatę okresową"}
      })
  
    dialogRef.afterClosed().subscribe(
    result => {
                this.dataSource.addItem(this.dataTable, result);
                this.dataSource.sortData(this.dataTable);
                this.dataBS.next(this.dataTable);
              }
          )        
    }
  
  // Usuwanie wpisow
  btnRemoveRow(item: PeriodicFeeItem)
  {
    this.dataSource.removeItem(this.dataTable, item)
    this.dataBS.next(this.dataTable);
  }

  // Edycja wpisow
  btnEditRow(item: PeriodicFeeItem)
  {

    let dialogRef = this.dialog.open(AddPeriodicFeeDialogComponent, 
      {
        data: {
                category: item.category,
                name: item.name,
                paidUntil: item.paidUntil,
                paymentPeriod: item.paymentPeriod,
                paymentDeadline: item.paymentDeadline,
                warnings: item.warnings,
                title: "Edytuj opłatę okresową"
              }
      })
    dialogRef.afterClosed().subscribe(
      result => {
                  if(result != null)
                  {
                    this.dataSource.editItem(this.dataTable, item, result);

                    if(item.paidUntil.toLocaleLowerCase() != result.paidUntil.toLocaleLowerCase())
                    this.dataSource.sortData(this.dataTable);

                    this.dataBS.next(this.dataTable);
                  }
                }
            )   
  }
}