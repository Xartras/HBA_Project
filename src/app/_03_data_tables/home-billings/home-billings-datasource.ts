import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { HomeBillingItem } from '../../_01_models/home-billing-item';
import { HomeBillingsService } from '../../_02_services/home-billings-srvc.service'

/**
 * Data source for the HomeBillings view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class HomeBillingsDataSource extends DataSource<HomeBillingItem> {
  

  constructor(private resources: Observable<HomeBillingItem[]>
             ,private serviceRes: HomeBillingsService) { super(); }


  // Dodanie wpisu
  addItem(data: HomeBillingItem[], item)
  {
    item.id = this.calculateResourceID(data, item);
    this.serviceRes.addResource(item);
    data.push(item);
  }

  // Generowanie ID
  calculateResourceID(data: HomeBillingItem[], newItem) : String
  {
    let newID
    let idNumber = 1

    if(data.length < 1) { newID = idNumber.toString() + "_" + newItem.name + "_" + newItem.user; }
    else
    {
      for(let i = 0; i < data.length; i++)
      {
        if(data[i].name == newItem.name)
        { idNumber++ }
      }

      newID = idNumber.toString() + "_" + newItem.name + "_" + newItem.user;
    }

    return newID;
  }

  // Edycja wpisu
  editItem(data: HomeBillingItem[], oldItem, newItem)
  {
    if(oldItem.name != newItem.name)
    newItem.id = this.updateIdOnEdit(data, newItem);
    
    this.serviceRes.updateResource(newItem, oldItem.id);
    data[data.indexOf(oldItem)] = newItem;
  }
  
  // Usuwanie wpisu
  removeItem(data: HomeBillingItem[], item)
  {
    this.serviceRes.deleteResource(item.id);
    this.updateIdOnRemove(data, item);
    data.splice(data.indexOf(item), 1);
  }

  // Aktualizowanie ID podczas usuwania wpisu
  private updateIdOnRemove(data: HomeBillingItem[], item: HomeBillingItem)
  {
    let oldID : String;
    data.forEach(element => 
      { 
        if( element.name == item.name && parseInt(element.id.split("_")[0]) > parseInt(item.id.split("_")[0]) )
        { 
          oldID = element.id;
          element.id = (parseInt(element.id.split("_")[0]) - 1).toString() + "_" + item.name + "_" + item.user
  
          this.serviceRes.deleteResource(oldID);
          this.serviceRes.addResource(element);
        }
      });
  }

  // Aktualizowanie ID po edycji wpisu
  private updateIdOnEdit(data: HomeBillingItem[], item: HomeBillingItem) : String
  {
    let updtdId = "";
    let idNumber = 1;

    data.forEach(element =>
      {
        if(element.name == item.name)
        { idNumber++ }
      })
    
      updtdId = idNumber.toString() + "_" + item.name + "_" + item.user;

      return updtdId; 
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<HomeBillingItem[]> { return this.resources }

  // Metoda do usuwania tabeli
  disconnect() {}

}
