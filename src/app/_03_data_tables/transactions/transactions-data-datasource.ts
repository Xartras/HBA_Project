import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { TransactionItem } from '../../_01_models/transaction-item';
import { TransactionsService } from '../../_02_services/transactions-srvc.service'


export class TransactionsDataDataSource extends DataSource<TransactionItem> {

  constructor(private transactions: Observable<TransactionItem[]>
             ,private serviceTrns: TransactionsService) { super(); }


  // Dodawanie wpisu
  addItem(data: TransactionItem[], item) 
  {
    item.id = this.calculateTransactionID(data, item);
    this.serviceTrns.addTransaction(item);
    data.push(item); 
  }

  // Generowanie ID transakcji
  calculateTransactionID(data: TransactionItem[], item)
  {
    let newID
    let idNumber = 1

    if(data.length < 1) { newID = idNumber.toString() + "_" + item.type + "_" + item.subType + "_" + item.category + "_" + item.name + "_" + item.user; }
    else
    {
      for(let i = 0; i < data.length; i++)
      {
        if(data[i].type == item.type && data[i].subType == item.subType
           && data[i].category == item.category && data[i].name == item.name)
        { idNumber++ }
      }

      newID = idNumber.toString() + "_" + item.type + "_" + item.subType + "_" + item.category + "_" + item.name + "_" + item.user;
    }

    return newID;    
  }

  // Edycja wpisu
  editItem(data: TransactionItem[], oldItem, newItem)
  {
    if(oldItem.type != newItem.type || oldItem.subType != newItem.subType 
       || oldItem.category != newItem.category || oldItem.name != newItem.name )
    newItem.id = this.updateIdOnEdit(data, newItem);

    this.serviceTrns.updateTransaction(newItem, oldItem.id);
    data[data.indexOf(oldItem)] = newItem;
  }

  // Usuwanie wpisu
  removeItem(data: TransactionItem[], item) 
  {
    this.serviceTrns.deleteTransaction(item.id);
    if(data.length > 1) this.updateIdOnRemove(data, item); 
    data.splice(data.indexOf(item), 1); 
  }

  // Aktualizowanie ID podczas usuwania wpisu
  private updateIdOnRemove(data: TransactionItem[], item: TransactionItem)
  {
    let oldID : String;
    data.forEach(element => 
      { 
        if( element.type == item.type && element.subType == item.subType 
            && element.category == item.category && element.name == item.name 
            && parseInt(element.id.split("_")[0]) > parseInt(item.id.split("_")[0]) )
        { 
          oldID = element.id;
          element.id = (parseInt(element.id.split("_")[0]) - 1).toString() + "_" + item.type + "_" + item.subType + "_" + item.category + "_" + item.name + "_" + item.user;
  
          this.serviceTrns.deleteTransaction(oldID);
          this.serviceTrns.addTransaction(element);
        }
      });
  }

  // Aktualizowanie ID po edycji wpisu
  private updateIdOnEdit(data: TransactionItem[], item: TransactionItem) : String
  {
    let updtdId = "";
    let idNumber = 1;

    data.forEach(element =>
      {
        if(element.type == item.type && element.subType == item.subType 
           && element.category == item.category && element.name == item.name)
        { idNumber++ }
      })
    
      updtdId = idNumber.toString() + "_" + item.type + "_" + item.subType + "_" + item.category + "_" + item.name + "_" + item.user;

      return updtdId; 
  }

    // pobranie typow srodkow
    summarizeSubtypes(data: TransactionItem[], period: string)
    {
      let subtypes = []
      let newSubtype = false
      let itemAdded = false

      data.forEach(item =>
        {
          if(item.period == period)
          {
            if(subtypes.length == 0) 
            {
              item.type == "Koszt" 
                ? subtypes.push({subtype: item.subType, reve: 0, cost: item.amount}) 
                : subtypes.push({subtype: item.subType, reve: item.amount, cost: 0})
            }
            else
            {
              subtypes.forEach(subtype => 
                {
                  if(item.subType == subtype.subtype)
                  {
                    item.type == "Koszt" ? subtype.cost += item.amount : subtype.reve += item.amount;
                    newSubtype = true;
                    itemAdded = true;
                    return;
                  }
                  else
                  {
                    newSubtype = false;
                  }
                })
              if(newSubtype == false && itemAdded == false) 
                item.type == "Koszt"
                  ? subtypes.push({subtype: item.subType, reve: 0, cost: item.amount}) 
                  : subtypes.push({subtype: item.subType, reve: item.amount, cost: 0})  
            }
            itemAdded = false;
          }
        })

        return subtypes;
    }

  // Metoda zwraca dane, które powinny zostać wyświetlone w przeglądarce
  connect(): Observable<TransactionItem[]> { return this.transactions }

  // Metoda do usuwania tabeli
  disconnect() {}
}

