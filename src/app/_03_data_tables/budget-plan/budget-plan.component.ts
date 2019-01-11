import { Component, OnInit } from '@angular/core';

import { BudgetPlanItem } from 'src/app/_01_models/budget-plan-item';
import { BudgetPlanDataSource } from './budget-plan-datasource';
import { BudgetPlanService } from '../../_02_services/budget-plan-srvc.service'
import { UserAuthService } from '../../_02_services/user-auth-service.service';

import { Period } from '../../_01_models/period';
import { PeriodsService } from '../../_02_services/periods-srvc.service';

import { TransactionsService } from '../../_02_services/transactions-srvc.service';

import { AddBudgetPlanDialogComponent } from '../../_04_modal_dialogs/add-budget-plan-dialog/add-budget-plan-dialog.component';
import { MatDialog } from '@angular/material';
import { BehaviorSubject } from 'rxjs'
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';



@Component({
  selector: 'budget-plan',
  templateUrl: './budget-plan.component.html',
  styleUrls: ['../../app.component.css']
})
export class BudgetPlanComponent implements OnInit {

  constructor(private formBuilder: FormBuilder
             ,public dialog: MatDialog
             ,private userAuth: UserAuthService
             ,private serviceBP: BudgetPlanService
             ,private servicePrds: PeriodsService
             ,private serviceTrns: TransactionsService) {}

  transactionData: any[] = []
  budgetPlanData: BudgetPlanItem[] = [];
  dataSource: BudgetPlanDataSource = new BudgetPlanDataSource(null, this.serviceBP);
  dataTable: BudgetPlanItem[] = [];
  dataBS = new BehaviorSubject(this.dataTable);

  dataPivotSumm  = [{type: "Zysk",  plannedTotal: 0, aktualTotal: 0}
                  , {type: "Koszt", plannedTotal: 0, aktualTotal: 0}]
  
  displayedColumns = ['type', 'category', 'name', 'plannedAmount', 'currentAmount', 'difference', 'comment', 'actions'];
    
  filterPlanForm : FormGroup;
  periods = []

  initialPeriod = new Period('', null, null, '');
  
  get formInput() { return this.filterPlanForm.controls }

  ngOnInit() 
  {
    this.filterPlanForm = this.formBuilder.group(
      {
        cPeriods: new FormControl(this.initialPeriod.id),
      }
    )

    this.servicePrds.getPeriods().subscribe((data: any) =>
    {
      data.forEach(item =>
        {
          if(item.user == this.userAuth.usersLogin)
          this.periods.push(new Period(item._id.split("_")[0] + "_" + item._id.split("_")[1], item.periodFrom, item.periodUntil, item.user))
          else
          data.splice(data.indexOf(item), 1);
        })
      this.initialPeriod = this.servicePrds.getCurrentPeriod(this.periods);
      this.filterPlanForm.controls.cPeriods.setValue(this.initialPeriod.id);
    });

    this.serviceTrns.getTransactions(). subscribe((data: any) =>
    {
      data.forEach(item =>
        {
          if(item.user != this.userAuth.usersLogin) { data.splice(data.indexOf(item), 1) }
          else
          {
            this.transactionData.push( { type: item.type, category: item.subType, name: item.category, amount: item.amount, period: item.period })
          }
        })
    })

    this.dataSource = new BudgetPlanDataSource(this.dataBS.asObservable(), this.serviceBP); 
    this.serviceBP.getBudgetPlan().subscribe((data: any[]) =>
    {
      data.forEach(item => 
        {
          if( item.user != this.userAuth.usersLogin) { data.splice(data.indexOf(item), 1) }
          else
          {
            this.budgetPlanData.push(new BudgetPlanItem(item._id, item.type, item.category, item.name, item.period, item.amount, item.comment, item.user))
            
            if(item.user == this.userAuth.usersLogin && item.period == this.initialPeriod.id)
            this.dataTable.push(new BudgetPlanItem(item._id, item.type, item.category, item.name, item.period, item.amount, item.comment, item.user))
          }          
        })
      this.fillDataTableAmounts(this.transactionData);
      this.dataPivotSumm = this.dataSource.calculateReveCost(this.budgetPlanData, this.transactionData, this.initialPeriod.id);
      this.dataSource.sortData(this.dataTable);
      this.dataSource = new BudgetPlanDataSource(this.dataBS.asObservable(), this.serviceBP);
    })
  }

  // Dodawanie wpisu
  btnAddBudgetPlanItem()
  {
    let dialogRef = this.dialog.open(AddBudgetPlanDialogComponent, 
      {
        data: {
                type: "", category: "", name: "", period: "", 
                amount: 0, comment: "", title: "Dodaj wpis", periods: this.periods
              }
      })
  
    dialogRef.afterClosed().subscribe(
    result => {
                if(result != null)
                {
                  result.user = this.userAuth.usersLogin;
                  this.dataSource.addItem(this.budgetPlanData, result, 1);
                  this.dataSource.addItem(this.dataTable, result, 0);
                  this.fillDataTableAmounts(this.transactionData);
                  this.dataBS.next(this.dataTable);
                  this.dataSource.sortData(this.dataTable);
                  
                  if(result.type == "Zysk") { this.dataPivotSumm[0].plannedTotal += result.amount }
                  else { this.dataPivotSumm[1].plannedTotal += result.amount }
                }
              })        
  }
  
  // Usuwanie wpisow
  btnRemoveRow(item: BudgetPlanItem)
  {

    this.dataSource.removeItem(this.dataTable, item);
    this.dataSource.removeItem(this.budgetPlanData, item);
    this.dataBS.next(this.dataTable);
    this.dataPivotSumm = this.dataSource.calculateReveCost(this.budgetPlanData, this.transactionData,this.filterPlanForm.controls.cPeriods.value);
  }

  // Edycja wpisow
  btnEditRow(item: BudgetPlanItem)
  {

    let dialogRef = this.dialog.open(AddBudgetPlanDialogComponent, 
      {
        data: {
                type: item.type, 
                category: item.category, 
                name: item.name,
                period: item.period,
                amount: item.amount,
                comment: item.comment,
                title: "Edytuj wpis",
                periods: this.periods
              }
      })
    dialogRef.afterClosed().subscribe(
      result => {
                  if(result != null)
                 {
                    result.id = item.id;
                    result.user = this.userAuth.usersLogin;
                    this.dataSource.editItem(this.budgetPlanData, item, result, 1);
                    this.dataSource.editItem(this.dataTable, item, result, 0);
                    this.dataSource.sortData(this.dataTable);
                    this.fillDataTableAmounts(this.transactionData);
                    this.updateSummarizedReveCost(item, result);
                  }
                })   
  }

  onPeriodChange(event)
  {
    this.periods.forEach(prd =>
      {
        if(prd.id == event.target.value)
        {
          this.initialPeriod = prd
        }
      })
  }

  // Metoda aktualizuje dane przy dodaniu/usuwaniu wpisow
  getFilteredData()
  {
    let tempTable: BudgetPlanItem[] = [];
    this.budgetPlanData.forEach(item =>
      {
        if( item.period ==  this.filterPlanForm.controls.cPeriods.value )
        tempTable.push(item);
      })

    this.dataTable = tempTable;
    this.dataSource.sortData(this.dataTable);
    this.fillDataTableAmounts(this.transactionData);
    this.dataBS.next(this.dataTable);
    this.dataPivotSumm = this.dataSource.calculateReveCost(this.budgetPlanData, this.transactionData,this.filterPlanForm.controls.cPeriods.value);
    tempTable = []
  }

  // Metoda aktualizuje podsumowanie przychodow/kosztow przy edycji wpisow
  private updateSummarizedReveCost(oldItem: BudgetPlanItem, newItem: BudgetPlanItem)
  {
    // jesli zysk
    if(oldItem.type == "Zysk")
    { // jesli poprzednio wpis dotyczyl zysku i nadal dotyczy zysku to odejmujemu poprzednio wartosc i dodajemy nowa
      if(newItem.type == "Zysk")
      { this.dataPivotSumm[0].plannedTotal = this.dataPivotSumm[0].plannedTotal - oldItem.amount + newItem.amount }
      else
      { 
        // jesli wczesniej byl zysk a teraz jest koszt, to odejmujemy poprzednia wartosc od zysku i dodajemy nowa do kosztu
        this.dataPivotSumm[0].plannedTotal = this.dataPivotSumm[0].plannedTotal - oldItem.amount
        this.dataPivotSumm[1].plannedTotal = this.dataPivotSumm[1].plannedTotal + newItem.amount
      } 
    }
    // jesli koszt
    else
    { // jesli wczesniej byl koszt i nadal jest koszt odejmujemy poprzednia wartosc i dodajemy nowa
      if(newItem.type == "Koszt")
      { this.dataPivotSumm[1].plannedTotal = this.dataPivotSumm[1].plannedTotal - oldItem.amount + newItem.amount }
      else
      { // jesli wczesniej byl koszt a teraz jest zysk to odejmujemy poprzednia wartosc od kosztu i dodajemy nowa do zysku
        this.dataPivotSumm[1].plannedTotal = this.dataPivotSumm[1].plannedTotal - oldItem.amount
        this.dataPivotSumm[0].plannedTotal = this.dataPivotSumm[0].plannedTotal + newItem.amount
      } 
    }    
  }

  // Aktualizacja pol "Stan aktualny" i "Różnica" w tabeli wyświetlanej w przeglądarce
  private fillDataTableAmounts(dataTrns: any[])
  {
    let tempTrns = dataTrns
    this.dataTable.forEach(item =>
      {
        item.actualAmount = 0;
        item.difference = 0;
        tempTrns.forEach(trn =>
          {
            if(item.type == trn.type && item.category == trn.category && item.name == trn.name && item.period == trn.period)
            {
              item.actualAmount += trn.amount;
              item.difference = item.amount - item.actualAmount;
            }
          })
      })
    this.dataBS.next(this.dataTable);
  }
}
