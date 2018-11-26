import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { BudgetPlanItem } from '../../_models/budget-plan-item'
import { formatDate } from '@angular/common';


/**
 * Data source for the BudgetPlan view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class BudgetPlanDataSource extends DataSource<BudgetPlanItem> { 

  constructor(private budgetPlan: Observable<BudgetPlanItem[]>) { super(); }

  // Pobranie wszystkich danych
  private getData() : BudgetPlanItem[]
  {
    let budgetPlan: Array<BudgetPlanItem> = [
      new BudgetPlanItem("Zysk_Stałe_Wypłata_1", "Zysk", "Kasa", "Wypłata", <Date><any>formatDate("2018-10-27", "yyyy-MM-dd", "en-US"), <Date><any>formatDate("2018-11-26", "yyyy-MM-dd", "en-US"),2500.12, "Wypłata za sierpień 2018"),
      new BudgetPlanItem("Koszt_Opłaty_Prąd_1", "Koszt", "Opłaty", "Prąd", <Date><any>formatDate("2018-10-27", "yyyy-MM-dd", "en-US"), <Date><any>formatDate("2018-11-26", "yyyy-MM-dd", "en-US"),75.92, ""),
      new BudgetPlanItem("Koszt_Opłaty_Gaz_1", "Koszt", "Opłaty", "Gaz", <Date><any>formatDate("2018-10-27", "yyyy-MM-dd", "en-US"), <Date><any>formatDate("2018-11-26", "yyyy-MM-dd", "en-US"),22.37, "")
    ]

    return budgetPlan;
  }

  // Pobranie danych za dany okres
  getFilteredData(start: Date, end: Date) : BudgetPlanItem[]
  {
    let filteredData: BudgetPlanItem[] = this.getData().filter(
      result => result.periodBegin >= start
      && result.periodEnd <= end
    )

    return filteredData;
  }

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
    data.forEach(element => { 
      if(
        element.type == item.type && element.category == element.category && element.name == item.name 
        &&  parseInt(element.id.split("_")[3]) > parseInt(item.id.split("_")[3])
        )
        { element.id = element.id.split("_")[0] + "_" + 
                       element.id.split("_")[1] + "_" + 
                       element.id.split("_")[2] + "_" + 
                       (parseInt(element.id.split("_")[3])-1).toString();
        }
    });
  }

  // Dodawanie wpisu
  addItem(data: BudgetPlanItem[], item: BudgetPlanItem)
  {
    item.id = this.calculateNewId(data, item);
    data.push(item);
  }

  // Usuwanie wpisu
  removeItem(data: BudgetPlanItem[], item: BudgetPlanItem)
  {
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
        console.log(element);
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


