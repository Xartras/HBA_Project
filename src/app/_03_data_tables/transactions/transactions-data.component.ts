import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { TransactionsDataDataSource } from './transactions-data-datasource';
import { AddTransactionDialogComponent } from '../../_04_modal_dialogs/add-transaction-dialog/add-transaction-dialog.component'; 
import { TransactionsService } from 'src/app/_02_services/transactions-srvc.service';
import { TransactionItem } from '../../_01_models/transaction-item';
import { UserAuthService } from '../../_02_services/user-auth-service.service';

import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-transactions-data',
  templateUrl: './transactions-data.component.html',
  styleUrls: ['./transactions-data.component.css']
})
export class TransactionsDataComponent implements OnInit {

  dataSource: TransactionsDataDataSource = new TransactionsDataDataSource(null, this.serviceTrns);
  dataTable: TransactionItem[] = []
  dataBS = new BehaviorSubject(this.dataTable)

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['type', 'subType', 'category', 'name', 'amount', 'description', 'accounted', 'entered', 'period', 'comment', 'actions'];

  constructor(public dialog: MatDialog, private serviceTrns: TransactionsService, private serviceUsr: UserAuthService) {}


  ngOnInit() 
  {
    this.dataSource = new TransactionsDataDataSource(this.dataBS.asObservable(), this.serviceTrns);
    this.serviceTrns.getTransactions().subscribe((data: any[]) =>
    {
      data.forEach(item => this.dataTable.push(new TransactionItem
        (item._id, item.type, item.subType, item.category, item.name, item.amount, item.description, 
         item.accounted, item.entered, item.period, item.comment, item.usersLogin)))

      this.dataSource = new TransactionsDataDataSource(this.dataBS.asObservable(), this.serviceTrns);
    })
  }

  // Dodawanie wpisu
  btnAddTransactionItem()
  {
    let dialogRef = this.dialog.open(AddTransactionDialogComponent, 
      {
        data: {
                type: "", subType: "", category: "", name: "", amount: "",
                description: "", accounted: "", entered: "", period: "", comment: "", title: "Dodaj wpis"
              }
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
    let dialogRef = this.dialog.open(AddTransactionDialogComponent, 
      {
        data: {
                type:        item.type,      subType:     item.subType,
                category:    item.category,  name:        item.name,
                amount:      item.amount,    description: item.description,
                accounted:   item.accounted, entered:     item.entered,
                period:      item.period,    comment:     item.comment,
                title:    "Edytuj wpis"
              }
      })
    dialogRef.afterClosed().subscribe(
      result => {
                  if(result != null)
                  {
                    result.id = item.id;
                    result.user = this.serviceUsr.usersLogin;
                    
                    this.dataSource.editItem(this.dataTable, item, result);
                    this.dataBS.next(this.dataTable);
                  }
                })  
  }

  // Usuwanie wpisu
  btnRemoveRow(item)
  {
    this.dataSource.removeItem(this.dataTable, item);
    this.dataBS.next(this.dataTable);
  }
}
