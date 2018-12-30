import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { SavingPlanItem } from '../../_01_models/saving-plan-item';
import { SavingPlanService } from '../../_02_services/saving-plan-srvc.service';

/**
 * Data source for the SavingPlan view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class SavingPlanDataSource extends DataSource<SavingPlanItem> {

  constructor(private savingPlan : Observable<SavingPlanItem[]>
             ,private serviceSP: SavingPlanService) { super(); }

      
  // Generowanie ID dla nowego planu oszczednosciowego
  calculateID(data: SavingPlanItem[], item: SavingPlanItem) : string
  {
    let newID = "";
    let idNumber = 1;

    if( data.length < 1) newID = idNumber.toString() + "_" + item.target + "_" + item.user;
    else
    {
      for( let i = 0; i < data.length; i++)
      {
        if( item.target == data[i].target )
        idNumber++
      }

      newID = idNumber.toString() + "_" + item.target + "_" + item.user;
    }

    return newID;
  }

  // Aktualizowanie wpisow po usunieciu jednego z planow
  private updateIDs(data: SavingPlanItem[], item: SavingPlanItem)
  {
    let oldID : String;
    data.forEach(element => 
      { 
        if( element.target == item.target && parseInt(element.id.split("_")[0]) > parseInt(item.id.split("_")[0]) )
        { 
          oldID = element.id;
          element.id = (parseInt(element.id.split("_")[0]) - 1).toString() + "_" + item.target + "_" + item.user

          this.serviceSP.deleteSavingPlan(oldID);
          this.serviceSP.addSavingPlan(element);
        }
    });
  }

  // Dodawanie wpisu
  addItem(data: SavingPlanItem[], item: SavingPlanItem)
  {
    item.id = this.calculateID(data, item);
    this.serviceSP.addSavingPlan(item);
    data.push(item);
  }

  // Usuwanie wpisu
  removeItem(data: SavingPlanItem[], item: SavingPlanItem)
  {
    this.serviceSP.deleteSavingPlan(item.id);
    if(data.length > 2) this.updateIDs(data, item);
    data.splice(data.indexOf(item), 1);
  }

  // Edycja wpisu
  editItem(data: SavingPlanItem[], oldItem: SavingPlanItem, newItem: SavingPlanItem)
  {
    data[data.indexOf(oldItem)] = newItem;
  }

  // Metoda zwraca dane, które powinny zostać wyświetlone
  connect(): Observable<SavingPlanItem[]> { return this.savingPlan }


  // Metoda do usuwania tabeli
  disconnect() {}
}