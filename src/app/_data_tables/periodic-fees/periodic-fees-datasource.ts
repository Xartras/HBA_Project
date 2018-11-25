import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { PeriodicFeeItem } from '../../_models/periodic-fee-item';


/**
 * Data source for the PeriodicFees view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class PeriodicFeesDataSource extends DataSource<PeriodicFeeItem> {
  
  constructor(private periodicFees: Observable<PeriodicFeeItem[]>) {
    super();
  }

  // Pobranie danych
  getData() : Array<PeriodicFeeItem>
  {
    let periodicFees : Array<PeriodicFeeItem> = [
      new PeriodicFeeItem('Mieszkanie_Prąd', 'Mieszkanie', 'Prąd', '13 dnia miesiąca', '2 miesiące', '', ''),
      new PeriodicFeeItem('Mieszkanie_Gaz', 'Mieszkanie', 'Gaz', '20 dnia miesiąca', '2 miesiące', '', ''),
      new PeriodicFeeItem('Bank_Kredyt', 'Bank', 'Kredyt', '5 dnia miesiąca', '1 miesiąc', '17.11.2019', 'Kredyt na remont domu')
    ]   

    return periodicFees;
  }
  
  // Dodawanie wpisu
  addItem(data: PeriodicFeeItem[], item)
  {
    item.id = item.category + "_" + item.name;
    data.push(item);
  }

  // Usuwanie wpisu
  removeItem(data: PeriodicFeeItem[], item)
  {
    data.splice(data.indexOf(item), 1);
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
