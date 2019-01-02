import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { HomeBillingsDataSource } from './home-billings-datasource';
import { AddHomeBillingItemDialogComponent } from '../../_04_modal_dialogs/add-home-billing-item-dialog/add-home-billing-item-dialog.component'
import { HomeBillingsService } from 'src/app/_02_services/home-billings-srvc.service';
import { HomeBillingItem } from '../../_01_models/home-billing-item'
import { UserAuthService } from '../../_02_services/user-auth-service.service'

import { BehaviorSubject } from 'rxjs'

@Component({
  selector: 'home-billings-data',
  templateUrl: './home-billings.component.html',
  styleUrls: ['./home-billings.component.css']
})
export class HomeBillingsDataComponent implements OnInit {
  dataSource: HomeBillingsDataSource = new HomeBillingsDataSource(null, this.serviceRes);
  dataTable: HomeBillingItem[] = []
  dataBS = new BehaviorSubject(this.dataTable)

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'period', 'quantity', 'actions'];

  constructor(public dialog: MatDialog, private serviceRes: HomeBillingsService, private serviceUsr: UserAuthService) {}


  ngOnInit() 
  {
    this.dataSource = new HomeBillingsDataSource(this.dataBS.asObservable(), this.serviceRes);
    this.serviceRes.getResources().subscribe((data: any[]) =>
    {
      data.forEach(item => this.dataTable.push(new HomeBillingItem(item._id, item.name, item.period, item.quantity, item.comment, item.usersLogin)))
      this.dataSource = new HomeBillingsDataSource(this.dataBS.asObservable(), this.serviceRes);
    })
  }

  // Dodawanie wpisu
  btnAddHomeBillingItem()
  {
    let dialogRef = this.dialog.open(AddHomeBillingItemDialogComponent, 
      {
        data: {name: "", period: "", quantity: "", comment: "", title: "Dodaj wpis"}
      })
  
    dialogRef.afterClosed().subscribe(
    result => {
                result.user = this.serviceUsr.usersLogin
                this.dataSource.addItem(this.dataTable, result);
                this.dataBS.next(this.dataTable);
              })       
  }

  // Edycja wpisu
  btnEditRow(item)
  {
    let dialogRef = this.dialog.open(AddHomeBillingItemDialogComponent, 
      {
        data: {
                name:     item.name,
                period:   item.period,
                quantity: item.quantity,
                comment:  item.comment,
                title:    "Edytuj wpis"
              }
      })
    dialogRef.afterClosed().subscribe(
      result => {
                  result.id = item.id;
                  result.user = this.serviceUsr.usersLogin
                  this.dataSource.editItem(this.dataTable, item, result);
                  this.dataBS.next(this.dataTable);
                })  
  }

  // Usuwanie wpisu
  btnRemoveRow(item)
  {
    this.dataSource.removeItem(this.dataTable, item);
    this.dataBS.next(this.dataTable);
  }
}
