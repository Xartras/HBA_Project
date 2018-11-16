import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { HomeBillingsDataSource } from './home-billings-datasource';
import { AddHomeBillingItemDialogComponent } from '../../_modal_dialogs/add-home-billing-item-dialog/add-home-billing-item-dialog.component'

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

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.dataSource = new HomeBillingsDataSource(this.paginator, this.sort);
  }

  // Dodawanie wpisu
  btnAddHomeBillingItem()
  {
    let dialogRef = this.dialog.open(AddHomeBillingItemDialogComponent, 
      {
        data: {name: "", period: "", actualState: 0, title: "Dodaj wpis"}
      })
  
    dialogRef.afterClosed().subscribe(
    result => {
                this.dataSource.addItem(result);
                this.dataSource.connect();
              })       
  }

  // Edycja wpisu
  btnEditRow(item)
  {
    let dialogRef = this.dialog.open(AddHomeBillingItemDialogComponent, 
      {
        data: {
                name: item.name,
                period: item.period,
                actualState: item.actualState,
                title: "Edytuj wpis"
              }
      })
    dialogRef.afterClosed().subscribe(
      result => {
                  this.dataSource.editItem(item, result);
                  this.dataSource.connect();
                })  
  }

  // Usuwanie wpisu
  btnRemoveRow(item)
  {
    this.dataSource.removeItem(item);
    this.dataSource.connect();
  }
}
