import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { TransactionsDataDataSource } from './transactions-data-datasource';
import { AddTransactionDialogComponent } from '../../_04_modal_dialogs/add-transaction-dialog/add-transaction-dialog.component'; 
import { TransactionsService } from 'src/app/_02_services/transactions-srvc.service';
import { TransactionItem } from '../../_01_models/transaction-item';
import { UserAuthService } from '../../_02_services/user-auth-service.service';

import { Period } from '../../_01_models/period';
import { PeriodsService } from '../../_02_services/periods-srvc.service';

import { BehaviorSubject } from 'rxjs';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-transactions-data',
  templateUrl: './transactions-data.component.html',
  styleUrls: ['../../app.component.css']
})
export class TransactionsDataComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              public dialog: MatDialog, 
              private serviceTrns: TransactionsService, 
              private serviceUsr: UserAuthService,
              private servicePrds: PeriodsService) {}



  dataSource: TransactionsDataDataSource = new TransactionsDataDataSource(null, this.serviceTrns);
  dataTable: TransactionItem[] = []
  dataBS = new BehaviorSubject(this.dataTable)

  summarizedData = []
            
  displayedColumns = ['type', 'subType', 'category', 'name', 'amount', 'description', 'accounted', 'entered', 'period', 'comment', 'actions'];
  filterTransactionForm : FormGroup;
  periods = []

  initialPeriod = new Period('', null, null, '');
  get formInput() { return this.filterTransactionForm.controls }

  ngOnInit() 
  {
    this.filterTransactionForm = this.formBuilder.group(
      {
        cPeriods: new FormControl(this.initialPeriod.id),
      }
    )

    this.servicePrds.getPeriods().subscribe((data: any) =>
    {
      data.forEach(item =>
        {
          if(item.user == this.serviceUsr.usersLogin)
          this.periods.push(new Period(item._id.split("_")[0] + "_" + item._id.split("_")[1], item.periodFrom, item.periodUntil, item.user))
          else
          data.splice(data.indexOf(item), 1);
        })

      this.initialPeriod = this.servicePrds.getCurrentPeriod(this.periods);
      this.filterTransactionForm.controls.cPeriods.setValue(this.initialPeriod.id);
    });

    this.dataSource = new TransactionsDataDataSource(this.dataBS.asObservable(), this.serviceTrns);
    this.serviceTrns.getTransactions().subscribe((data: any[]) =>
    {
      data.forEach(item => this.dataTable.push(new TransactionItem
        (item._id, item.type, item.subType, item.category, item.name, item.amount, item.description, 
         item.accounted, item.entered, item.period, item.comment, item.usersLogin)))

      this.dataSource = new TransactionsDataDataSource(this.dataBS.asObservable(), this.serviceTrns);
      this.summarizedData = this.dataSource.summarizeSubtypes(this.dataTable, this.initialPeriod.id)
    })
  }

  // Dodawanie wpisu
  btnAddTransactionItem()
  {
    let dialogRef = this.dialog.open(AddTransactionDialogComponent, 
      {
        data: {
                type: "", subType: "", category: "", name: "", amount: "",
                description: "", accounted: "", entered: "", period: "", comment: "", title: "Dodaj wpis",
                periods: this.periods
              }
      })
  
    dialogRef.afterClosed().subscribe(
    result => {
                if(result != null)
                {
                  result.user = this.serviceUsr.usersLogin
                  this.dataSource.addItem(this.dataTable, result);
                  this.dataBS.next(this.dataTable);
                  this.updateSummarizedData('a', null, result, "1_2019")
                }
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
                title:    "Edytuj wpis",     periods:     this.periods
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
                    this.updateSummarizedData('e', item, result, "1_2019")
                  }
                })  
  }

  // Usuwanie wpisu
  btnRemoveRow(item)
  {
    this.dataSource.removeItem(this.dataTable, item);
    this.dataBS.next(this.dataTable);
    this.updateSummarizedData('d', null, item, "1_2019")
  }

  // Aktualizacja podsumowania srodkow pienieznych per zysk/koszt
  private updateSummarizedData(option: 'a'|'e'|'d', oldItem: TransactionItem, newItem: TransactionItem, period: string)
  {
    let subtypeNotExist = true;
    // jesli dodajemy nowy wpis
    if(option == 'a')
    {
      this.summarizedData.forEach(subtype =>
        {
          // jesli znajdziemy typ srodka pienieznego dodajemy wartosc do kosztu lub przychodu
          if(newItem.subType == subtype.subtype)
          {
            newItem.type == 'Koszt' ? subtype.cost += newItem.amount : subtype.reve += newItem.amount;
            subtypeNotExist = false;
            return;
          }
        })
      
      // jesli nie znajdziemy typu to dodajemy nowy wpis do podsumowania
      if(subtypeNotExist) 
        newItem.type == "Koszt" 
          ? this.summarizedData.push({subtype: newItem.subType, reve: 0, cost: newItem.amount})
          : this.summarizedData.push({subtype: newItem.subType, reve: newItem.amount, cost: 0})
    }

    // w przypadku edycji wpisu
    if(option == 'e')
    {
      this.summarizedData.forEach(subtype =>
        {
          // aktualizujemy wartosci kosztu/przychodu dla poprzedniego typu
          if(oldItem.subType == subtype.subtype) 
            oldItem.type == 'Koszt' ? subtype.cost -= oldItem.amount : subtype.reve -= oldItem.amount;

          // aktualizujemy wartosci do nowego typu (jesli istnieje)
          if(newItem.subType == subtype.subtype) 
          {
            newItem.type == 'Koszt' 
              ? subtype.cost += newItem.amount 
              : subtype.reve += newItem.amount;
            
              subtypeNotExist = false;
          }
        })

        // jesli po edycji wpisu mamy nowy typ, dodajemy do podsumowania
        if(subtypeNotExist) 
        newItem.type == "Koszt" 
          ? this.summarizedData.push({subtype: newItem.subType, reve: 0, cost: newItem.amount})
          : this.summarizedData.push({subtype: newItem.subType, reve: newItem.amount, cost: 0})
    }

    // aktualizujemy w przypadku usuwania wpisu
    if(option == 'd')
    {
      this.summarizedData.forEach(subtype =>
        {
          if(newItem.subType == subtype.subtype) 
            newItem.type == 'Koszt' ? subtype.cost -= newItem.amount : subtype.reve -= newItem.amount;
        })  
    }
  }
}
