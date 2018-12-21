import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { PeriodicFeeItem } from '../../_01_models/periodic-fee-item';
import { PeriodicFeesService } from '../../_02_services/periodic-fees-srvc.service';

/**
 * Data source for the PeriodicFees view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class PeriodicFeesDataSource extends DataSource<PeriodicFeeItem> {
  
  constructor(private periodicFees: Observable<PeriodicFeeItem[]>
            , private servicePF: PeriodicFeesService) {
    super();
  }

  getData() : PeriodicFeeItem[]
  {
    let fees : PeriodicFeeItem[] = []

    return fees
  }

  // Dodawanie wpisu
  addItem(data: PeriodicFeeItem[], item)
  {
    data.push(item);
  }

  // Generowanie ID
  calculateFeeID(data: PeriodicFeeItem[], newItem) : String
  {
    let newID
    let idNumber = 1

    if(data.length < 1)
    {
      newID = "01_" + newItem.category + "_" + newItem.name;
    }
    else
    {
      for(let i = 0; i < data.length; i++)
      {
        if(data[i].category == newItem.category && data[i].name == newItem.name)
        { idNumber++ }
      }

    }
    newID = idNumber > 9 
    ? idNumber.toString() + "_" + newItem.category + "_" + newItem.name 
    : "0" + idNumber.toString() + "_" + newItem.category + "_" + newItem.name

    return newID;
  }

  // Usuwanie wpisu
  removeItem(data: PeriodicFeeItem[], item)
  {
    this.servicePF.deleteBudgetPlanItem(item.id);
    this.updateIDs(data, item);
    data.splice(data.indexOf(item), 1);
  }

    // Aktualizowanie ID podczas usuwania wpisu
    private updateIDs(data: PeriodicFeeItem[], item: PeriodicFeeItem)
    {
      let oldID : String;
      data.forEach(element => { 
        if(
          element.category == item.category && element.name == element.name
          &&  parseInt(element.id.split("_")[1]) > parseInt(item.id.split("_")[1])
          )
          { 
            oldID = element.id;
            element.id = element.id.split("_")[0] + "_" + 
                         element.id.split("_")[1] + "_" + 
                         element.id.split("_")[2] + "_" + 
                         (parseInt(element.id.split("_")[3])-1).toString();
            this.servicePF.deleteBudgetPlanItem(oldID);
            this.servicePF.addBudgetPlan(element);
          }
      });
    }

  // Edycja wpisu
  editItem(data: PeriodicFeeItem[], oldItem, newItem)
  {
    data[data.indexOf(oldItem)] = newItem;
  }

  // Sortowanie danych
  // od opłat, które trzeba dokonać najwcześniej (najmniejszy numer dnia)
  // do opłat, które trzeba dokonać najpóźniej (największy numer dnia)
  sortData(data: PeriodicFeeItem[])
  {
    return data.sort(
      (a, b) => 
      {
        return <number><any>a.paidUntil.split(" ")[0] - <number><any>b.paidUntil.split(" ")[0]
      })
  }

  // Sprawdzenie czy dana opłata nie została już zapisana
  isFeeAlreadyRegistered(data: PeriodicFeeItem[], item: PeriodicFeeItem) : boolean
  {
    return data.indexOf(item) != null ? true : false;
  }


  // Metoda zwraca dane, które powinny zostać wyświetlone
  connect(): Observable<PeriodicFeeItem[]> 
  { return this.periodicFees; }

  // Metoda do usuwania tabeli
  disconnect() {}

}
