import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { BudgetPlanItem } from '../../_01_models/budget-plan-item'
import { BudgetPlanService } from '../../_02_services/budget-plan-srvc.service'

/**
 * Data source for the BudgetPlan view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class BudgetPlanDataSource extends DataSource<BudgetPlanItem> { 

  constructor(private budgetPlan: Observable<BudgetPlanItem[]>
             ,private serviceBP: BudgetPlanService) { super(); }

  // Generowanie ID dla nowego wpisu
  private calculateNewId(data: BudgetPlanItem[], item: BudgetPlanItem) : string
  {
    let newID : string = item.type+"_"+item.category+"_"+item.name+'_';
    let newIdNum : number = 0;
  
    for(let i = 0; i < data.length; i++)
    {
      if(data[i].type == item.type && data[i].category == item.category && data[i].name == item.name)
      { 
        if(parseInt(data[i].id.split("_")[3])  > newIdNum  )
        { newIdNum = parseInt(data[i].id.split("_")[3]) }
      }
      else
      { continue; }
    }  
  
    newIdNum++;
    return newID+newIdNum.toString();
  }

  // Aktualizowanie ID podczas usuwania wpisu
  private updateIDs(data: BudgetPlanItem[], item: BudgetPlanItem)
  {
    let oldID : String;
    data.forEach(element => { 
      if(
        element.type == item.type && element.category == element.category && element.name == item.name 
        &&  parseInt(element.id.split("_")[3]) > parseInt(item.id.split("_")[3])
        )
        { 
          oldID = element.id;
          element.id = element.id.split("_")[0] + "_" + 
                       element.id.split("_")[1] + "_" + 
                       element.id.split("_")[2] + "_" + 
                       (parseInt(element.id.split("_")[3])-1).toString();
          this.serviceBP.deleteBudgetPlanItem(oldID);
          this.serviceBP.addBudgetPlan(element);
        }
    });
  }

  // Dodawanie wpisu
  addItem(data: BudgetPlanItem[], item: BudgetPlanItem)
  {
    item.id = this.calculateNewId(data, item);
    this.serviceBP.addBudgetPlan(item);
    data.push(item);
  }

  // Usuwanie wpisu
  removeItem(data: BudgetPlanItem[], item: BudgetPlanItem)
  {
    this.serviceBP.deleteBudgetPlanItem(item.id);
    this.updateIDs(data, item);
    data.splice(data.indexOf(item), 1);
  }

  // Edycja wpisu
  editItem(data: BudgetPlanItem[], oldItem: BudgetPlanItem, newItem: BudgetPlanItem)
  {
    data[data.indexOf(oldItem)] = newItem;
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
  calculateReveCost(data: BudgetPlanItem[])
  {
    let summarizedPlan = data.reduce(
      (groupedCategories, element) =>
      {
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


