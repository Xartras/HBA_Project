import { Component, OnInit } from '@angular/core';

import { PeriodicFeeItem } from 'src/app/_01_models/periodic-fee-item';
import { PeriodicFeesDataSource } from './periodic-fees-datasource';
import { PeriodicFeesService } from '../../_02_services/periodic-fees-srvc.service';

import { AddPeriodicFeeDialogComponent } from 'src/app/_04_modal_dialogs/add-periodic-fee-dialog/add-periodic-fee-dialog.component';
import { MatDialog} from '@angular/material';
import { BehaviorSubject } from 'rxjs'


@Component({
  selector: 'periodic-fees',
  templateUrl: './periodic-fees.component.html',
  styleUrls: ['./periodic-fees.component.css']
})
export class PeriodicFeesComponent implements OnInit {
  dataSource: PeriodicFeesDataSource = new PeriodicFeesDataSource(null, this.servicePF);
  dataTable: PeriodicFeeItem[];
  dataBS = new BehaviorSubject(this.dataTable)

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['category', 'name', 'paidUntil', 'paymentPeriod', 'paymentDeadline', 'warnings', 'actions'];

  constructor(public dialog: MatDialog, private servicePF: PeriodicFeesService) {}


  ngOnInit() 
  {
    this.dataTable = this.dataSource.getData();
    this.dataSource.sortData(this.dataTable);
    this.dataSource = new PeriodicFeesDataSource(this.dataBS.asObservable(), this.servicePF);
  }

  // Metody odpowiedzialne za dodawanie wpisow planowanego budzetu
  btnAddPeriodicFee()
  {
    let dialogRef = this.dialog.open(AddPeriodicFeeDialogComponent, 
      {
        data: 
        { category: "",  name: "", paidFrom: "", 
          paidUntil: "0 ", paymentPeriod: "", paymentDeadline: "", warnings: "", 
          title: "Dodaj opłatę okresową"}
      })
  
    dialogRef.afterClosed().subscribe(
    result => {
                if(result != null)
                {
                result.id = this.dataSource.calculateFeeID(this.dataTable, result);
                this.servicePF.addBudgetPlan(result);
                this.dataSource.addItem(this.dataTable, result);
                this.dataSource.sortData(this.dataTable);
                this.dataBS.next(this.dataTable);
                }
              }
          )        
    }
  
  // Usuwanie wpisow
  btnRemoveRow(item: PeriodicFeeItem)
  {
    console.log(item.id);
    this.servicePF.deleteBudgetPlanItem(item.id);
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
                    this.servicePF.updateBudgetPlan(result, item.id);

                    this.dataSource.editItem(this.dataTable, item, result);

                    if(item.paidUntil.toLocaleLowerCase() != result.paidUntil.toLocaleLowerCase())
                    this.dataSource.sortData(this.dataTable);

                    this.dataBS.next(this.dataTable);
                  }
                }
            )   
  }
}