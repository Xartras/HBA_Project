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

  // Dodawanie wpisu
  addItem(data: PeriodicFeeItem[], item)
  {
    this.servicePF.addPeriodicFee(item);
    data.push(item);
  }

  // Generowanie ID
  calculateFeeID(data: PeriodicFeeItem[], newItem) : String
  {
    let newID
    let idNumber = 1

    if(data.length < 1) { newID = idNumber.toString() + "_" + newItem.category + "_" + newItem.name + "_" + newItem.user; }
    else
    {
      for(let i = 0; i < data.length; i++)
      {
        if(data[i].category == newItem.category && data[i].name == newItem.name)
        { idNumber++ }
      }

      newID = idNumber.toString() + "_" + newItem.category + "_" + newItem.name + "_" + newItem.user;
    }

    return newID;
  }

  // Edycja wpisu
  editItem(data: PeriodicFeeItem[], oldItem, newItem)
  {
    if(oldItem.category != newItem.category || oldItem.name != newItem.name)
    newItem.id = this.updateIdOnEdit(data, newItem);

    this.servicePF.updatePeriodicFee(newItem);
    data[data.indexOf(oldItem)] = newItem;
  }

  // Usuwanie wpisu
  removeItem(data: PeriodicFeeItem[], item)
  {
    this.servicePF.deletePeriodicFee(item.id);
    this.updateIdOnRemove(data, item);
    data.splice(data.indexOf(item), 1);
  }

  // Aktualizowanie ID podczas usuwania wpisu
  private updateIdOnRemove(data: PeriodicFeeItem[], item: PeriodicFeeItem)
  {
    let oldID : String;
    data.forEach(element => 
      { 
        if( element.category == item.category && element.name == item.name && parseInt(element.id.split("_")[0]) > parseInt(item.id.split("_")[0]) )
        { 
          oldID = element.id;
          element.id = (parseInt(element.id.split("_")[0]) - 1).toString() + "_" + item.category + "_" + item.name + "_" + item.user

          this.servicePF.deletePeriodicFee(oldID);
          this.servicePF.addPeriodicFee(element);
        }
    });
  }

  // Aktualizowanie ID po edycji wpisu
  private updateIdOnEdit(data: PeriodicFeeItem[], item: PeriodicFeeItem) : String
  {
    let updtdId = "";
    let idNumber = 1;

    data.forEach(element =>
      {
        if(element.category == item.category && element.name == item.name)
        { idNumber++ }
      })
    
      updtdId = idNumber.toString() + "_" + item.category + "_" + item.name + "_" + item.user;

      return updtdId; 
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
  connect(): Observable<PeriodicFeeItem[]> { return this.periodicFees; }

  // Metoda do usuwania tabeli
  disconnect() {}
}
