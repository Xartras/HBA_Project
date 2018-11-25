import { DataSource } from '@angular/cdk/collections';
import { MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { BudgetPlanItem } from '../../_models/budget-plan-item'
import { formatDate } from '@angular/common';


/**
 * Data source for the BudgetPlan view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class BudgetPlanDataSource extends DataSource<BudgetPlanItem> { 

  constructor(private sort: MatSort) { super(); }

  // Pobranie danych
  getData() : Array<BudgetPlanItem>
  {
    let budgetPlan: Array<BudgetPlanItem> = [
      new BudgetPlanItem("Zysk_Stałe_Wypłata_1", "Zysk", "Kasa", "Wypłata", <Date><any>formatDate("2018-10-01", "yyyy-MM-dd", "en-US"), 2500.12, "Wypłata za sierpień 2018"),
      new BudgetPlanItem("Koszt_Opłaty_Prąd_1", "Koszt", "Opłaty", "Prąd", <Date><any>formatDate("2018-10-02", "yyyy-MM-dd", "en-US"), 75.92, ""),
      new BudgetPlanItem("Koszt_Opłaty_Gaz_1", "Koszt", "Opłaty", "Gaz", <Date><any>formatDate("2018-10-05", "yyyy-MM-dd", "en-US"), 22.37, "")
    ]

    return budgetPlan;
  }

  data: Array<BudgetPlanItem> = this.getData();

  // Generowanie ID dla nowego wpisu
  private calculateNewId(item) : string
  {
    let newID : string = item.type+"_"+item.category+"_"+item.name+'_';
    let newIdNum : number = 0;
  
    for(let i = 0; i < this.data.length; i++)
    {
      if(this.data[i].type == item.type && this.data[i].category == item.category && this.data[i].name == item.name)
      { 
        if(parseInt(this.data[i].id.split("_")[3])  > newIdNum  )
        { newIdNum = parseInt(this.data[i].id.split("_")[3]) }
      }
      else
      { continue; }
    }  
  
    newIdNum++;
    return newID+newIdNum.toString();
  }

  // Aktualizowanie ID podczas usuwania wpisu
  private updateIDs(item)
  {
    this.data.forEach(itm => { 
      if(
            itm.type == item.type && itm.category == itm.category && itm.name == item.name 
        &&  parseInt(itm.id.split("_")[3]) > parseInt(item.id.split("_")[3])
        )
        { itm.id = itm.id.split("_")[0] + "_" + 
                   itm.id.split("_")[1] + "_" + 
                   itm.id.split("_")[2] + "_" + 
                   (parseInt(itm.id.split("_")[3])-1).toString();
        }
    });
  }

  // Dodawanie wpisu
  addItem(item)
  {
    item.id = this.calculateNewId(item);
    this.data.push(item);
  }

  // Usuwanie wpisu
  removeItem(item)
  {
    this.updateIDs(item);
    this.data.splice(this.data.indexOf(item), 1);
  }

  // Edycja wpisu
  editItem(oldItem, newItem)
  {
    this.data[this.data.indexOf(oldItem)] = newItem;
  }

  // Podsumowanie zyskow i kosztow
  calculateReveCost(data: BudgetPlanItem[])
  {
    let summarizedPlan = data.reduce(
      (prev, crnt) =>
      {
        if(!prev[crnt["type"]]) { prev[crnt["type"]] = [crnt] }
        else { prev[crnt["type"]].push(crnt) }

        return prev;
      }      
    )

    return Object.keys(summarizedPlan).map(key => ({key, value: summarizedPlan[key]}));
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<BudgetPlanItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getSortedData([...this.data]);
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   *  any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  // Sortowanie po nagłówkach
  private getSortedData(data: BudgetPlanItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'type': return compare(a.name, b.name, isAsc);
        case 'category': return compare(a.name, b.name, isAsc);
        case 'amount': return compare(a.name, b.name, isAsc);
        case 'name': return compare(a.name, b.name, isAsc);
        default: return 0;
      }
    });
  }
}

/** Porównywanie wpisów, używane przy sortowaniu po nagłówkach  */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
