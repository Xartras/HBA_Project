import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { BudgetPlanItem } from '../../_01_models/budget-plan-item'
import { BudgetPlanService } from '../../_02_services/budget-plan-srvc.service'

import { TransactionItem } from '../../_01_models/transaction-item'


export class BudgetPlanDataSource extends DataSource<BudgetPlanItem> { 

  constructor(private budgetPlan: Observable<BudgetPlanItem[]>
             ,private serviceBP: BudgetPlanService) { super(); }


  // Dodawanie wpisu
  addItem(data: BudgetPlanItem[], item: BudgetPlanItem, option: number)
  {
    item.id = this.calculateNewId(data, item);
    if(option == 1) this.serviceBP.addBudgetPlan(item);
    data.push(item);
  }

  // Generowanie ID dla nowego wpisu
  private calculateNewId(data: BudgetPlanItem[], newItem: BudgetPlanItem) : string
  {
    let newID
    let idNumber = 1

    if(data.length < 1) { newID = idNumber.toString() + "_" + newItem.type + "_" + newItem.category + "_" + newItem.name + "_" + newItem.user }
    else
    {
      for(let i = 0; i < data.length; i++)
      {
        if(data[i].type == newItem.type && data[i].category == newItem.category && data[i].name == newItem.name)
        { idNumber++ }
      }

      newID = idNumber.toString() + "_" + newItem.type + "_" + newItem.category + "_" + newItem.name + "_" + newItem.user
    }

    return newID;
  }

  // Edycja wpisu
  editItem(data: BudgetPlanItem[], oldItem: BudgetPlanItem, newItem: BudgetPlanItem, option: number)
  {
    if(option == 1)
    {
      if(oldItem.type != newItem.type || oldItem.category != newItem.category || oldItem.name != newItem.name )
      newItem.id = this.updateIdOnEdit(data, newItem);
  
      this.serviceBP.updateBudgetPlan(newItem, oldItem.id);
    }

    data[data.indexOf(oldItem)] = newItem;
  }

  // Usuwanie wpisu
  removeItem(data: BudgetPlanItem[], item: BudgetPlanItem)
  {
    this.serviceBP.deleteBudgetPlanItem(item.id);
    this.updateIdOnRemove(data, item);
    data.splice(data.indexOf(item), 1);
  }

  // Aktualizowanie ID po usunieciu wpisu
  private updateIdOnRemove(data: BudgetPlanItem[], item: BudgetPlanItem)
  {
    let oldID : String;
    data.forEach(element => 
      { 
        if( element.type == item.type && element.category == item.category && element.name == item.name && parseInt(element.id.split("_")[0]) > parseInt(item.id.split("_")[0]) )
        { 
          oldID = element.id;
          element.id = (parseInt(element.id.split("_")[0]) - 1).toString() + "_" + item.type + "_" + item.category + "_" + item.name + "_" + item.user;

          this.serviceBP.deleteBudgetPlanItem(oldID);
          this.serviceBP.addBudgetPlan(element);
        }
    });
  }

  // Aktualizowanie ID po edycji wpisu
  private updateIdOnEdit(data: BudgetPlanItem[], item: BudgetPlanItem) : string
  {
    let updtdId = "";
    let idNumber = 1;

    data.forEach(element =>
      {
        if(element.type == item.type && element.category == item.category && element.name == item.name)
        { idNumber++ }
      })
    
      updtdId = idNumber.toString() + "_" + item.type + "_" + item.category + "_" + item.name + "_" + item.user;

      return updtdId; 
  }


  // Sortowanie danych
  // od opłat, które trzeba dokonać najwcześniej (najmniejszy numer dnia)
  // do opłat, które trzeba dokonać najpóźniej (największy numer dnia)
  sortData(data: BudgetPlanItem[])
  {
    return data.sort(
      (a, b) => 
      {
        if( a.type == b.type)
        { return b.amount - a.amount; };

        return a.type > b.type ? -1 : 1;
      })
  }

  // Podsumowanie zyskow i kosztow
  calculateReveCost(dataBP: BudgetPlanItem[], dataTrn: TransactionItem[], period: string)
  {
    let summarizedData = [{type: "Zysk",  plannedTotal: 0, aktualTotal: 0}
                        , {type: "Koszt", plannedTotal: 0, aktualTotal: 0}]
    let calcBP = this.summarizeData(dataBP, period);
    let calcTrn = this.summarizeData(dataTrn, period);

    summarizedData[0].plannedTotal = calcBP.Zysk;
    summarizedData[0].aktualTotal = calcTrn.Zysk;

    summarizedData[1].plannedTotal = calcBP.Koszt;
    summarizedData[1].aktualTotal = calcTrn.Koszt;

    return summarizedData;
  }

  private summarizeData(data: any[], period: string)
  {
    let summarizedPlan = data.reduce(
      (groupedCategories, element) =>
      {
        if(element.period == period)
        groupedCategories[element.type] += <number>element.amount;

        return groupedCategories;
      }, {Zysk: 0, Koszt: 0}      
    )
    
    return summarizedPlan;
  }

  // Metoda zwraca dane, które powinny zostać wyświetlone
  connect(): Observable<BudgetPlanItem[]> {
    return this.budgetPlan
  }

  // Metoda do usuwania tabeli
  disconnect() {}
}


